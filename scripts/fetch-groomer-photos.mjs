// Assigns one unique, real, credited "happy dog" (or "happy cat" for
// businesses offering Cat Grooming) stock photo per business in seed.ts,
// plus one per service-category tile on the homepage — sourced from
// Wikimedia Commons (CC BY / CC BY-SA / public domain only) and written to
// src/lib/groomerPhotos.generated.ts and src/lib/servicePhotos.generated.ts.
// Re-run after adding or removing businesses/services.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const DOG_QUERIES = [
  "happy dog outdoors", "smiling dog portrait", "dog tongue out happy", "dog playing park joy",
  "puppy happy playing", "dog wagging tail happy", "happy golden retriever", "happy labrador smiling",
  "dog running joy field", "cheerful dog portrait", "happy poodle", "happy beagle",
  "happy corgi smiling", "happy small dog", "dog smiling camera", "content dog relaxed happy",
  "happy dachshund", "happy german shepherd", "happy husky smiling", "happy boxer dog",
  "happy shih tzu", "happy yorkshire terrier", "happy chihuahua", "happy border collie",
  "happy cocker spaniel", "happy schnauzer", "happy pomeranian", "happy maltese dog",
  "happy french bulldog", "happy australian shepherd", "happy cavalier king charles",
  "happy boston terrier", "happy great pyrenees", "happy bichon frise", "happy doodle dog",
  "happy mixed breed dog", "dog smiling grass", "dog happy beach", "dog happy sunshine",
  "puppy smiling cute", "dog joyful jumping", "dog grinning", "excited happy dog",
  "happy dog sitting", "happy dog panting", "dog smile ears", "dog happy face close up",
  "happy rescue dog", "happy senior dog", "happy small dog outdoors", "happy dog park",
  "playful dog happy", "dog happy leash walk", "content dog sunbathing",
  "dog blissful", "dog delighted", "dog ecstatic", "dog eager happy",
  "happy dog groomed clean", "freshly groomed happy dog", "happy dog fluffy coat",
  "happy dog looking up", "happy dog head tilt", "happy dog resting sun", "happy dog car window",
  "happy dog garden", "happy dog porch", "happy dog living room", "happy dog couch",
  "happy dog field wildflowers", "happy dog lake swimming", "happy dog snow play",
  "content dog owner lap", "happy shelter dog adopted", "happy adopted dog new home",
  "grateful happy dog", "happy fluffy puppy", "adorable happy puppy face",
  "happy dog stick fetch", "happy dog ball fetch", "happy dog frisbee",
  "happy dog after bath", "clean happy dog fur", "happy small breed dog portrait",
  "happy westie", "happy scottish terrier", "happy jack russell", "happy papillon dog",
  "happy shiba inu", "happy pug", "happy basset hound", "happy whippet",
  "happy weimaraner", "happy vizsla", "happy newfoundland dog", "happy collie",
  "happy sheepdog", "happy setter dog", "happy pointer dog", "happy spitz dog",
  "happy terrier mix", "happy lap dog", "happy dog owner park", "dog happy trail hike",
  "dog happy backyard summer", "dog happy snow winter", "dog happy autumn leaves",
  "dog grin wide happy", "dog joyful expression", "content puppy resting happy",
  "dog beaming happy face", "dog thrilled excited",
];

const CAT_QUERIES = [
  "happy cat playing", "content cat smiling", "happy kitten playing", "cat relaxed happy sunny",
  "happy cat", "content cat", "cat smiling", "happy kitten", "cute happy cat",
  "cat purring content", "happy maine coon cat", "happy persian cat", "happy ragdoll cat",
  "domestic cat relaxed happy",
];

const OK_LICENSE = /^(CC BY-SA|CC BY|CC0|Public domain|PD)/i;
const BAD_WORDS =
  /dysplasia|diagram|map\b|logo|postage|stamp|statue|painting|drawing|illustration|skeleton|anatomy|taxidermy|skull|x-ray|xray|book|novel|djvu|pdf|cartoon|clipart|clip art|meme|toy\b|plush|costume|dead|sick|injur|surgery|tattoo|wedding/i;
const EXCLUDE =
  /lccn|contact sheet|library\)|fortepan|post medieval|general view|\bimo\b|kennels?\b|kids playing|children pet|ford library|ford park|wallace reid|spbgu|badger-dog|hoh campground|downbeat|geraldine farrar|anna fitziu|hazel mackaye|\bmen\b|\bwomen\b|harvard museum|natural history|mineral|specimen|\bmine\b|\bmines\b|geology|obama|dat[ _]dog|hot[ _]dog|corndog|frenchmen st|show \d{4}|dog show|\bakc\b|winner show|conformation|kennel club show|geograph\.org\.uk|balloon dog|doggie bar|poodle skirt|dog parking|dog delight|pandemic notice|covid-19|sled dog|statue|sculpture|memorial|monument/i;
const HUMAN_WORDS =
  /\b(man|woman|girl|boy|kid|child|person|people|lady|guy)\b|portrait of a young|holding a|family members/i;
// "chihuahua" is excluded here on purpose — as a bare keyword it also matches
// Wikimedia's many "<mineral>, Chihuahua, Mexico" museum-specimen photos
// (the state, not the dog breed), which is exactly the bug that put four rock
// photos on business pages. Match the breed only when not followed by ", mexico".
const DOG_WORD =
  /dog|puppy|pup\b|beagle|poodle|corgi|retriever|husky|terrier|spaniel|hound|pooch|labrador|bichon|schnauzer|dachshund|chihuahua(?!,? mexico)|shepherd|pyrenees|doodle|shih ?tzu|pomeranian|maltese|cavalier|boxer/i;
const CAT_WORD = /\bcat\b|kitten|feline|maine coon|persian|ragdoll/i;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const UA = "NCMobilePetGroomersResearch/1.0 (contact: connorlbolin@gmail.com)";

async function fetchJson(url, retries = 4) {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      await sleep(2000 * (i + 1));
    }
  }
  throw new Error("failed after retries: " + url);
}

async function searchFiles(query, limit = 35) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&srlimit=${limit}&format=json`;
  const json = await fetchJson(url);
  return (json.query?.search ?? []).map((r) => r.title);
}

async function getImageInfo(titles) {
  const results = [];
  for (let i = 0; i < titles.length; i += 30) {
    const batch = titles.slice(i, i + 30);
    const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(batch.join("|"))}&prop=imageinfo&iiprop=url|size|extmetadata&format=json`;
    const json = await fetchJson(url);
    const pages = json.query?.pages ?? {};
    for (const p of Object.values(pages)) {
      if (!p.imageinfo) continue;
      const info = p.imageinfo[0];
      const meta = info.extmetadata ?? {};
      results.push({
        title: p.title,
        url: info.url,
        width: info.width,
        height: info.height,
        license: meta.LicenseShortName?.value ?? "",
        artist: (meta.Artist?.value ?? "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(),
        descriptionUrl: info.descriptionurl,
      });
    }
    await sleep(500);
  }
  return results;
}

function cleanCandidates(list, subjectWordRe) {
  const seen = new Set();
  return list.filter((x) => {
    const ext = (x.title.match(/\.(\w+)$/) || [])[1]?.toLowerCase();
    if (!["jpg", "jpeg", "png"].includes(ext)) return false;
    if (!x.width || !x.height || x.width < 700 || x.height < 500) return false;
    if (!OK_LICENSE.test(x.license || "")) return false;
    if (!x.artist || x.artist.length === 0 || x.artist.length > 120) return false;
    if (BAD_WORDS.test(x.title)) return false;
    if (EXCLUDE.test(x.title)) return false;
    if (HUMAN_WORDS.test(x.title)) return false;
    if (!subjectWordRe.test(x.title)) return false;
    if (seen.has(x.title)) return false;
    seen.add(x.title);
    return true;
  });
}

function getSeedBusinesses() {
  const src = fs.readFileSync(path.join(root, "src/lib/seed.ts"), "utf8");
  const marker = "SeedGroomer[] = [";
  const start = src.indexOf(marker) + marker.length - 1;
  let depth = 0,
    end = -1;
  for (let i = start; i < src.length; i++) {
    if (src[i] === "[") depth++;
    if (src[i] === "]") {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  const body = src.slice(start, end + 1);
  const objs = [];
  let d2 = 0,
    s2 = -1;
  for (let i = 0; i < body.length; i++) {
    if (body[i] === "{") {
      if (d2 === 0) s2 = i;
      d2++;
    }
    if (body[i] === "}") {
      d2--;
      if (d2 === 0) objs.push(body.slice(s2, i + 1));
    }
  }
  return objs.map((o) => ({
    slug: o.match(/slug: "([^"]+)"/)[1],
    hasCat: /"Cat Grooming"/.test(o),
  }));
}

function esc(s) {
  return String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, " ");
}

function toEntry(p) {
  return {
    src: p.url,
    width: p.width,
    height: p.height,
    author: p.artist,
    sourceUrl: p.descriptionUrl,
    license: p.license,
  };
}

function writeCreditedPhotoMap(mapping, outPath, header) {
  let out = "";
  out += header;
  out += 'import type { CreditedPhoto } from "./photos";\n\n';
  out += `export const ${outPath.exportName}: Record<string, CreditedPhoto> = {\n`;
  for (const [key, p] of Object.entries(mapping)) {
    out += `  "${key}": {\n`;
    out += `    src: "${esc(p.src)}",\n`;
    out += `    alt: "",\n`;
    out += `    width: ${p.width},\n`;
    out += `    height: ${p.height},\n`;
    out += `    author: "${esc(p.author)}",\n`;
    out += `    sourceUrl: "${esc(p.sourceUrl)}",\n`;
    out += `    license: "${esc(p.license)}",\n`;
    out += `  },\n`;
  }
  out += "};\n";
  fs.writeFileSync(path.join(root, outPath.file), out);
}

function parseGeneratedPhotoMap(relPath) {
  const file = path.join(root, relPath);
  if (!fs.existsSync(file)) return {};
  const src = fs.readFileSync(file, "utf8");
  const mapping = {};
  const entryRe = /"([^"]+)":\s*\{\s*src:\s*"([^"]+)",\s*alt:\s*"[^"]*",\s*width:\s*(\d+),\s*height:\s*(\d+),\s*author:\s*"((?:[^"\\]|\\.)*)",\s*sourceUrl:\s*"([^"]+)",\s*license:\s*"([^"]+)",\s*\},/g;
  let m;
  while ((m = entryRe.exec(src))) {
    mapping[m[1]] = {
      src: m[2],
      width: Number(m[3]),
      height: Number(m[4]),
      author: m[5].replace(/\\"/g, '"'),
      sourceUrl: m[6],
      license: m[7],
    };
  }
  return mapping;
}

// Pass slugs/service names as CLI args to replace only those entries and
// leave everything else untouched, e.g.:
//   node scripts/fetch-groomer-photos.mjs durham-soapy-paws "Bath & Brush"
// With no args, regenerates every business and service photo from scratch.
const forceKeys = new Set(process.argv.slice(2));
const forceAll = forceKeys.size === 0;

async function main() {
  const businesses = getSeedBusinesses().sort((a, b) => a.slug.localeCompare(b.slug));
  const allServices = fs
    .readFileSync(path.join(root, "src/lib/constants.ts"), "utf8")
    .match(/ALL_SERVICES = \[([\s\S]*?)\]/)[1]
    .match(/"([^"]+)"/g)
    .map((s) => s.replace(/"/g, ""));

  const existingGroomerPhotos = forceAll ? {} : parseGeneratedPhotoMap("src/lib/groomerPhotos.generated.ts");
  const existingServicePhotos = forceAll ? {} : parseGeneratedPhotoMap("src/lib/servicePhotos.generated.ts");
  const usedUrls = new Set([
    ...Object.values(existingGroomerPhotos).map((p) => p.src),
    ...Object.values(existingServicePhotos).map((p) => p.src),
  ]);

  const slugsToFill = businesses.filter((b) => forceAll || forceKeys.has(b.slug) || !existingGroomerPhotos[b.slug]);
  const servicesToFill = allServices.filter((s) => forceAll || forceKeys.has(s) || !existingServicePhotos[s]);

  const dogTitles = [];
  for (const q of DOG_QUERIES) {
    dogTitles.push(...(await searchFiles(q)));
    await sleep(300);
  }
  const catTitles = [];
  for (const q of CAT_QUERIES) {
    catTitles.push(...(await searchFiles(q)));
    await sleep(300);
  }

  const dogPool = cleanCandidates(await getImageInfo([...new Set(dogTitles)]), DOG_WORD).filter(
    (p) => !usedUrls.has(p.url)
  );
  const catPool = cleanCandidates(await getImageInfo([...new Set(catTitles)]), CAT_WORD).filter(
    (p) => !usedUrls.has(p.url)
  );

  const needDogs = slugsToFill.filter((b) => !b.hasCat).length + servicesToFill.filter((s) => s !== "Cat Grooming").length;
  const needCats = slugsToFill.filter((b) => b.hasCat).length + servicesToFill.filter((s) => s === "Cat Grooming").length;
  if (dogPool.length < needDogs || catPool.length < needCats) {
    throw new Error(
      `Not enough unique licensed happy-pet photos: have ${dogPool.length} dogs / ${catPool.length} cats, need ${needDogs} / ${needCats}`
    );
  }

  let dogIdx = 0,
    catIdx = 0;
  const groomerMapping = { ...existingGroomerPhotos };
  for (const { slug, hasCat } of slugsToFill) {
    const p = hasCat ? catPool[catIdx++] : dogPool[dogIdx++];
    groomerMapping[slug] = toEntry(p);
  }

  const serviceMapping = { ...existingServicePhotos };
  for (const service of servicesToFill) {
    const isCatService = service === "Cat Grooming";
    const p = isCatService ? catPool[catIdx++] : dogPool[dogIdx++];
    serviceMapping[service] = toEntry(p);
  }

  writeCreditedPhotoMap(
    groomerMapping,
    { file: "src/lib/groomerPhotos.generated.ts", exportName: "GROOMER_PHOTOS" },
    "// Auto-generated by scripts/fetch-groomer-photos.mjs — real, credited happy-pet\n" +
      "// photos from Wikimedia Commons (CC BY / CC BY-SA), one unique photo per\n" +
      "// business slug. Do not hand-edit; re-run the script to regenerate.\n"
  );
  writeCreditedPhotoMap(
    serviceMapping,
    { file: "src/lib/servicePhotos.generated.ts", exportName: "SERVICE_PHOTOS" },
    "// Auto-generated by scripts/fetch-groomer-photos.mjs — real, credited happy-pet\n" +
      "// photos from Wikimedia Commons (CC BY / CC BY-SA), one unique photo per\n" +
      "// service category (keyed by the exact ALL_SERVICES string). Do not\n" +
      "// hand-edit; re-run the script to regenerate.\n"
  );

  console.log(
    `Assigned ${dogIdx} new dog photos and ${catIdx} new cat photos (${slugsToFill.length} businesses + ${servicesToFill.length} services updated, ${businesses.length - slugsToFill.length} businesses + ${allServices.length - servicesToFill.length} services left untouched).`
  );
}

main();
