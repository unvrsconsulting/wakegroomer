export type ContentBlock =
  | { type: "p"; html: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type BlogHeroImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  author: string;
  sourceUrl: string;
  license: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  publishedAt: string;
  heroImage: BlogHeroImage;
  content: ContentBlock[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "mobile-dog-grooming-cost-guide-raleigh-durham-triangle",
    title: "Mobile Dog Grooming Cost Guide: What to Expect in the Raleigh-Durham Triangle",
    metaDescription:
      "How much does mobile dog grooming cost in the Raleigh-Durham Triangle? A breakdown of typical prices by service, size, and coat type from local NC groomers.",
    excerpt:
      "Wondering why mobile grooming quotes vary so much across Raleigh, Durham, and Cary? Here's what actually drives the price, and typical ranges by service.",
    publishedAt: "2026-08-25",
    heroImage: {
      src: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Rio_limon_venezuela225.jpg",
      alt: "A happy dog smiling outdoors",
      width: 4288,
      height: 2848,
      author: "jaimeluisgg",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Rio_limon_venezuela225.jpg",
      license: "CC BY 1.0",
    },
    content: [
      {
        type: "p",
        html: "If you've called around for a quote in Raleigh, Durham, or Cary and gotten three different numbers for what sounds like the same haircut, you're not imagining things. Mobile dog grooming pricing in the Triangle depends on more than just breed. Here's what actually goes into a quote, and what you should expect to pay by service.",
      },
      { type: "h2", text: "What Affects the Price of Mobile Dog Grooming?" },
      {
        type: "p",
        html: "Four things move the number more than anything else: your dog's <strong>size and weight</strong>, the <strong>condition of the coat</strong> (a matted or heavily shedding dog takes longer), your dog's <strong>temperament</strong> (anxious or reactive dogs need more patience and time), and any <strong>add-ons</strong> like teeth brushing or anal gland expression. A calm 15-pound Shih Tzu with a well-maintained coat and a nervous 90-pound Golden Retriever who hasn't been brushed in months are simply not the same job, even though both are technically a \"full groom.\"",
      },
      { type: "h2", text: "Typical Price Ranges by Service" },
      {
        type: "p",
        html: "Prices vary by groomer and by dog, but here's what's typical for mobile grooming across the Triangle:",
      },
      {
        type: "ul",
        items: [
          '<a href="/services/bath-brush" class="text-brand hover:underline font-medium">Bath &amp; Brush</a> (small to medium dog): roughly $45–$75',
          '<a href="/services/full-groom" class="text-brand hover:underline font-medium">Full Groom</a> (bath, haircut, nails, ears): roughly $75–$150, more for large or double-coated breeds',
          '<a href="/services/nail-trim" class="text-brand hover:underline font-medium">Nail Trim</a> only: roughly $15–$25',
          '<a href="/services/de-shedding-treatment" class="text-brand hover:underline font-medium">De-Shedding Treatment</a>: usually $20–$40 on top of a bath',
          '<a href="/services/de-matting" class="text-brand hover:underline font-medium">De-Matting</a>: often billed by the half-hour once mats are severe, since it\'s the most time-intensive add-on',
          '<a href="/services/cat-grooming" class="text-brand hover:underline font-medium">Cat Grooming</a>: typically starts higher than dog bathing, reflecting the extra care most cats need',
        ],
      },
      { type: "h2", text: "Why Mobile Grooming Costs What It Does" },
      {
        type: "p",
        html: "A mobile groomer only sees one client at a time, drives a fully equipped van or trailer to your driveway, and doesn't need you to drop off or pick up. That convenience is baked into the price, but it also means your dog isn't sitting in a crate next to a dozen barking strangers waiting their turn. For anxious, senior, or reactive dogs, that one-on-one time is often worth the premium on its own.",
      },
      { type: "h2", text: "How to Compare Quotes Across the Triangle" },
      {
        type: "p",
        html: 'Pricing also shifts a little by area. If you\'re comparing options, browse real local listings in <a href="/groomers/raleigh-nc" class="text-brand hover:underline font-medium">Raleigh</a>, <a href="/groomers/durham-nc" class="text-brand hover:underline font-medium">Durham</a>, <a href="/groomers/cary-nc" class="text-brand hover:underline font-medium">Cary</a>, <a href="/groomers/apex-nc" class="text-brand hover:underline font-medium">Apex</a>, and <a href="/groomers/chapel-hill-nc" class="text-brand hover:underline font-medium">Chapel Hill</a> to see what groomers in your specific area are charging and offering before you book.',
      },
      { type: "h2", text: "Getting the Best Value" },
      {
        type: "p",
        html: 'Ask upfront whether the quote includes nails, ears, and a sanitary trim, or whether those are add-ons. Look for a groomer with a <strong>Verified badge</strong>, which means the business owner has confirmed ownership through their Google Business Profile. And when in doubt, <a href="/search" class="text-brand hover:underline font-medium">search the full directory</a> by city, service, or business name to compare a few options before committing.',
      },
    ],
  },
  {
    slug: "grooming-double-coated-dogs-nc-humidity-shedding-season",
    title: "Grooming Double-Coated Dogs in North Carolina's Humidity: A Seasonal Guide",
    metaDescription:
      "Double-coated breeds struggle in NC's humid summers. Here's when to schedule de-shedding and de-matting appointments to keep your dog cool and comfortable year-round.",
    excerpt:
      "Golden Retrievers, Huskies, and Corgis weren't built for a Carolina summer. Here's a season-by-season grooming calendar to keep a double coat healthy in NC's humidity.",
    publishedAt: "2026-09-01",
    heroImage: {
      src: "https://upload.wikimedia.org/wikipedia/commons/3/3c/11.10.2015_Samoyed.jpg",
      alt: "A fluffy double-coated Samoyed dog outdoors",
      width: 7712,
      height: 4352,
      author: "Alexander Patrikeev",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:11.10.2015_Samoyed.jpg",
      license: "CC BY-SA 4.0",
    },
    content: [
      {
        type: "p",
        html: 'North Carolina\'s mix of hot, humid summers and mild, damp winters is tough on double-coated breeds like Golden Retrievers, Huskies, Corgis, Samoyeds, and German Shepherds. That\'s true whether you\'re in <a href="/groomers/raleigh-nc" class="text-brand hover:underline font-medium">Raleigh</a>, <a href="/groomers/durham-nc" class="text-brand hover:underline font-medium">Durham</a>, or out toward <a href="/groomers/greensboro-nc" class="text-brand hover:underline font-medium">Greensboro</a>. Their undercoat is built to insulate against dry cold, not trap moisture against the skin in 90% humidity. Left unmanaged, that undercoat turns into a mat-prone, heat-trapping problem by mid-summer.',
      },
      { type: "h2", text: "Why Humidity Is Hard on Double Coats" },
      {
        type: "p",
        html: "A healthy double coat actually helps regulate temperature when it's properly maintained, but a neglected one does the opposite. Trapped moisture under a thick undercoat creates the perfect environment for hot spots, yeast, and matting, especially around the ears, armpits, and hindquarters where airflow is worst. Shaving a double coat down to the skin isn't the fix (it can damage the coat's ability to regrow properly and remove sun protection), which is why regular de-shedding is the better long-term approach.",
      },
      { type: "h2", text: "A Seasonal Grooming Calendar for the Triangle and Triad" },
      {
        type: "ul",
        items: [
          "<strong>Spring (March–May):</strong> This is peak blowout season as winter undercoat sheds out. A thorough <a href=\"/services/de-shedding-treatment\" class=\"text-brand hover:underline font-medium\">de-shedding treatment</a> now prevents a summer's worth of loose fur from matting.",
          "<strong>Summer (June–August):</strong> NC humidity is at its worst. Bathe and brush more frequently, and watch closely for mats behind the ears and under the collar. If mats have already set in, a <a href=\"/services/de-matting\" class=\"text-brand hover:underline font-medium\">de-matting appointment</a> is worth it before they pull on the skin.",
          "<strong>Fall (September–November):</strong> A lighter shed as the undercoat starts building back in for winter. Good time for a maintenance groom before holiday travel and shorter walks.",
          "<strong>Winter (December–February):</strong> Shedding slows, but don't skip grooming entirely. Damp winter walks plus a thick coat is still a matting risk, just a smaller one.",
        ],
      },
      { type: "h2", text: "Signs Your Dog Needs a De-Shedding or De-Matting Appointment" },
      {
        type: "ul",
        items: [
          "Visible tangles or mats, especially behind the ears, under the front legs, or around the tail",
          "A musty or yeasty smell even shortly after a bath",
          "Excessive licking or scratching in one spot",
          "Fur coming out in clumps rather than a steady, light shed",
          "A coat that looks dull or feels greasy despite regular brushing",
        ],
      },
      { type: "h2", text: "Book a Mobile Groomer for Your Double-Coated Dog" },
      {
        type: "p",
        html: 'Mobile grooming is especially convenient for de-shedding, since it\'s a messier, longer service best done at home rather than in a crowded salon. <a href="/search" class="text-brand hover:underline font-medium">Search local mobile groomers</a> who offer <a href="/services/de-shedding-treatment" class="text-brand hover:underline font-medium">de-shedding</a> and <a href="/services/de-matting" class="text-brand hover:underline font-medium">de-matting</a>, or browse by city in <a href="/groomers/cary-nc" class="text-brand hover:underline font-medium">Cary</a> and <a href="/groomers/apex-nc" class="text-brand hover:underline font-medium">Apex</a> to find someone who already works with double-coated breeds in your neighborhood.',
      },
    ],
  },
  {
    slug: "mobile-grooming-for-senior-and-anxious-dogs-nc",
    title: "Why Mobile Grooming Is Better for Senior and Anxious Dogs",
    metaDescription:
      "Salons can overwhelm senior or anxious dogs. Learn why at-home mobile grooming is gentler, and what to ask before booking a groomer in North Carolina.",
    excerpt:
      "A busy grooming salon can be genuinely stressful for an older or anxious dog. Here's why one-on-one, at-home grooming is often the better fit, and how to choose the right groomer.",
    publishedAt: "2026-09-05",
    heroImage: {
      src: "https://upload.wikimedia.org/wikipedia/commons/9/97/Dog_for_Senior_Dog_Food_Diet_Wikipedia_Page.jpg",
      alt: "A calm senior dog resting",
      width: 5184,
      height: 3456,
      author: "Leo_65",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Dog_for_Senior_Dog_Food_Diet_Wikipedia_Page.jpg",
      license: "CC0 1.0",
    },
    content: [
      {
        type: "p",
        html: "Not every dog handles a traditional grooming salon well, and it usually has nothing to do with bad behavior. For a senior dog with stiff joints or fading eyesight, or an anxious dog who's never been comfortable around strangers and other animals, a busy salon can turn a routine bath into a genuinely stressful event.",
      },
      { type: "h2", text: "Why Traditional Salons Can Be Overwhelming" },
      {
        type: "p",
        html: "A typical salon means a crate next to unfamiliar dogs, unfamiliar smells, loud dryers, and a wait for their turn that can stretch to hours. For a dog with anxiety, that's a lot of triggers stacked on top of each other before the actual grooming even starts. For a senior dog, the drop-off and pickup alone (getting in and out of a car, standing on slippery salon floors) can be physically hard.",
      },
      { type: "h2", text: "How One-on-One, At-Home Grooming Helps" },
      {
        type: "p",
        html: 'A mobile groomer works with a single client per appointment, not a dozen dogs booked back-to-back. Your dog is groomed steps from your front door, in a quiet, familiar driveway instead of a crate room full of strangers. There\'s no car ride, no waiting room, and no second trip to pick up. Even a simple <a href="/services/bath-brush" class="text-brand hover:underline font-medium">bath and brush</a> becomes far less stressful without the car ride and waiting room. For a dog who\'s already anxious about vet visits or car rides, cutting those triggers out entirely can make grooming days dramatically calmer.',
      },
      { type: "h2", text: "Tips for Grooming a Senior or Anxious Dog" },
      {
        type: "ul",
        items: [
          "Ask for shorter, more frequent sessions instead of one long groom if your dog has limited stamina",
          "Mention any joint pain or mobility issues so the groomer can adjust handling and positioning",
          "Check with your vet first if your dog has a heart condition, is on medication, or has had a recent medical event",
          "Look for a groomer who's willing to go slowly and take breaks rather than rushing through the appointment",
        ],
      },
      { type: "h2", text: "Questions to Ask Before Booking" },
      {
        type: "ul",
        items: [
          "Have you worked with senior or anxious dogs before, and how do you handle a dog that gets nervous mid-groom?",
          "What's your plan if my dog needs a break or won't tolerate part of the service?",
          "Do you have a Verified badge confirming you're a real, owner-confirmed business?",
        ],
      },
      { type: "h2", text: "Find a Gentle, Verified Groomer Near You" },
      {
        type: "p",
        html: 'Whether you\'re in <a href="/groomers/raleigh-nc" class="text-brand hover:underline font-medium">Raleigh</a>, <a href="/groomers/durham-nc" class="text-brand hover:underline font-medium">Durham</a>, or <a href="/groomers/cary-nc" class="text-brand hover:underline font-medium">Cary</a>, <a href="/search" class="text-brand hover:underline font-medium">search the full directory</a> and look for the Verified badge on a groomer\'s profile before booking. It means the business owner has confirmed ownership through their Google Business Profile, which is one more signal you\'re dealing with a real, established business rather than an unverified listing.',
      },
    ],
  },
  {
    slug: "mobile-dog-grooming-vs-salon-which-is-right",
    title: "Mobile Dog Grooming vs. Traditional Pet Salons: Which Is Right for Your Dog?",
    metaDescription:
      "Mobile grooming or a traditional salon? An honest comparison of cost, convenience, and which dogs benefit most from each, from local NC groomers.",
    excerpt:
      "Not sure whether to book a mobile groomer or head to a salon? Here's a clear-eyed look at what each actually offers, and when one makes more sense than the other.",
    publishedAt: "2026-09-08",
    heroImage: {
      src: "https://upload.wikimedia.org/wikipedia/commons/7/76/Playful_mood_%2810635512194%29.jpg",
      alt: "A happy dog rolling playfully in the grass",
      width: 4470,
      height: 2980,
      author: "Takashi Hososhima from Tokyo, Japan",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Playful_mood_(10635512194).jpg",
      license: "CC BY-SA 2.0",
    },
    content: [
      {
        type: "p",
        html: "Both mobile grooming and traditional salons can do a great job. The right choice usually comes down to your dog's temperament, your schedule, and what specific service you need done. Here's an honest comparison, not a sales pitch, so you can pick what actually fits.",
      },
      { type: "h2", text: "What Mobile Grooming Does Best" },
      {
        type: "p",
        html: 'A mobile groomer works with a single client per appointment, in a quiet, familiar driveway instead of a crate room full of strangers. There\'s no car ride, no drop-off, and no waiting room. That one-on-one setup is a real advantage for <a href="/blog/mobile-grooming-for-senior-and-anxious-dogs-nc" class="text-brand hover:underline font-medium">anxious or senior dogs</a>, multi-pet households booking back-to-back appointments, or anyone whose schedule doesn\'t leave room for a salon trip and a second trip to pick up.',
      },
      { type: "h2", text: "What a Traditional Salon Does Best" },
      {
        type: "p",
        html: "Salons have an edge in a few specific situations. Severe matting that needs real time and specialized de-matting tools is often faster to resolve with a full salon setup. Very large or physically strong dogs sometimes need a lift table or a second groomer to assist safely. And if all you need is a quick walk-in bath with no appointment, a salon can sometimes get you in and out faster than scheduling a home visit.",
      },
      { type: "h2", text: "Cost Comparison" },
      {
        type: "p",
        html: 'Mobile grooming usually runs somewhat higher than an equivalent salon service, since you\'re paying for the convenience of a groomer coming to you instead of the other way around. For real numbers by service, see our <a href="/blog/mobile-dog-grooming-cost-guide-raleigh-durham-triangle" class="text-brand hover:underline font-medium">mobile grooming cost guide for the Raleigh-Durham Triangle</a>. For dogs who get stressed by salons, many owners find the extra cost is worth it just in reduced anxiety alone.',
      },
      { type: "h2", text: "Which Dogs Benefit Most From Mobile Grooming" },
      {
        type: "ul",
        items: [
          "Anxious or reactive dogs who get overwhelmed by other animals and unfamiliar smells",
          "Senior dogs with joint pain or mobility issues who struggle with car rides and slippery salon floors",
          "Dogs who need a <a href=\"/services/full-groom\" class=\"text-brand hover:underline font-medium\">full groom</a> or <a href=\"/services/bath-brush\" class=\"text-brand hover:underline font-medium\">bath and brush</a> on a predictable schedule without the hassle of drop-off",
          "Households with multiple pets who'd rather have everyone groomed in one visit at home",
        ],
      },
      { type: "h2", text: "When a Salon Visit Might Make More Sense" },
      {
        type: "ul",
        items: [
          "Heavy, long-neglected matting that needs a longer, more involved <a href=\"/services/de-matting\" class=\"text-brand hover:underline font-medium\">de-matting</a> session",
          "Very large breeds that need specialized equipment to handle safely",
          "A one-off, budget-conscious bath with no appointment needed",
        ],
      },
      { type: "h2", text: "How to Decide" },
      {
        type: "p",
        html: "If your dog gets stressed by car rides, other animals, or unfamiliar environments, mobile grooming is almost always the gentler option. If you're working with a severely matted coat or a dog that needs extra hands to manage safely, it's worth calling ahead and asking a groomer directly whether they can handle it at your home or would recommend a salon visit first.",
      },
      { type: "h2", text: "Find a Mobile Groomer Near You" },
      {
        type: "p",
        html: 'Ready to try mobile grooming? <a href="/search" class="text-brand hover:underline font-medium">Search the full directory</a> by city or service, or browse groomers in <a href="/groomers/raleigh-nc" class="text-brand hover:underline font-medium">Raleigh</a>, <a href="/groomers/durham-nc" class="text-brand hover:underline font-medium">Durham</a>, <a href="/groomers/apex-nc" class="text-brand hover:underline font-medium">Apex</a>, <a href="/groomers/greensboro-nc" class="text-brand hover:underline font-medium">Greensboro</a>, and beyond.',
      },
    ],
  },
  {
    slug: "how-often-should-you-groom-your-dog-breed-guide",
    title: "How Often Should You Groom Your Dog? A Breed-by-Breed Guide",
    metaDescription:
      "How often does your dog actually need grooming? A practical breed-by-breed guide from short-haired to double-coated dogs, plus signs it's time to book.",
    excerpt:
      "From a weekly-brush Poodle to a twice-a-year Beagle, grooming frequency depends heavily on breed and coat type. Here's a practical guide to how often your dog actually needs it.",
    publishedAt: "2026-09-09",
    heroImage: {
      src: "https://upload.wikimedia.org/wikipedia/commons/a/a8/My_cousin%27s_poodle_is_perched_and_not_knowing_what_to_make_of_me._%285898350017%29.jpg",
      alt: "A well-groomed curly-coated poodle resting on a couch",
      width: 4752,
      height: 3168,
      author: "cogdogblog",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:My_cousin%27s_poodle_is_perched_and_not_knowing_what_to_make_of_me._(5898350017).jpg",
      license: "CC BY 2.0",
    },
    content: [
      {
        type: "p",
        html: "There's no single right answer to \"how often should I groom my dog?\" A short-haired Beagle and a curly-coated Poodle are on completely different schedules, and getting it wrong in either direction, too little or too much, can mean matting, skin issues, or just an uncomfortable dog. Here's a practical breakdown by coat type.",
      },
      { type: "h2", text: "Short-Haired, Low-Maintenance Breeds" },
      {
        type: "p",
        html: 'Beagles, Labradors, Boxers, and similar short, single-coated breeds are the easiest to keep up with. A <a href="/services/bath-brush" class="text-brand hover:underline font-medium">bath and brush</a> every 6-8 weeks is usually plenty, mostly to manage odor and light shedding rather than any haircut. These breeds rarely need a full groom at all.',
      },
      { type: "h2", text: "Double-Coated Breeds" },
      {
        type: "p",
        html: 'Golden Retrievers, Huskies, Corgis, and German Shepherds carry a dense undercoat that needs regular attention, especially during heavy shedding seasons. Plan on a bath and <a href="/services/de-shedding-treatment" class="text-brand hover:underline font-medium">de-shedding treatment</a> every 4-6 weeks. For the full seasonal breakdown (these breeds have it especially rough in NC summers), see our guide to <a href="/blog/grooming-double-coated-dogs-nc-humidity-shedding-season" class="text-brand hover:underline font-medium">grooming double-coated dogs in North Carolina\'s humidity</a>.',
      },
      { type: "h2", text: "Curly and Continuously-Growing Coats" },
      {
        type: "p",
        html: 'Poodles, Doodles, Bichons, and similar breeds have hair that keeps growing like human hair rather than shedding out. Skipping appointments doesn\'t just mean a shaggier look, it means mats, and mats close to the skin can become painful fast. These breeds need a <a href="/services/full-groom" class="text-brand hover:underline font-medium">full groom</a> every 4-6 weeks without exception, and a <a href="/services/de-matting" class="text-brand hover:underline font-medium">de-matting</a> session if a visit gets pushed back too long.',
      },
      { type: "h2", text: "Wire-Haired and Terrier Breeds" },
      {
        type: "p",
        html: "Schnauzers, Westies, and other wire-coated terriers typically need clipping or hand-stripping every 6-8 weeks to maintain their coat texture and keep the classic terrier shape from growing out into something shapeless.",
      },
      { type: "h2", text: "Signs Your Dog Is Overdue, Regardless of Breed" },
      {
        type: "ul",
        items: [
          "Mats or tangles you can feel even through a quick pet, especially behind the ears or under the legs",
          "A noticeable odor that comes back within a day or two of a bath",
          "Nails clicking loudly on hard floors",
          "Shedding that seems constant rather than seasonal",
          "Visible discomfort when you touch certain areas of the coat",
        ],
      },
      { type: "h2", text: "Building a Schedule That Actually Sticks" },
      {
        type: "p",
        html: 'The easiest way to stay on schedule is to book with the same groomer on a recurring basis rather than waiting until your dog obviously needs it. A mobile groomer coming to your driveway every 4-8 weeks (depending on breed) removes the friction of scheduling a drop-off, which is usually the real reason grooming gets pushed back in the first place. <a href="/search" class="text-brand hover:underline font-medium">Search the full directory</a> to find a groomer near you in <a href="/groomers/raleigh-nc" class="text-brand hover:underline font-medium">Raleigh</a>, <a href="/groomers/cary-nc" class="text-brand hover:underline font-medium">Cary</a>, <a href="/groomers/apex-nc" class="text-brand hover:underline font-medium">Apex</a>, <a href="/groomers/durham-nc" class="text-brand hover:underline font-medium">Durham</a>, and beyond.',
      },
    ],
  },
  {
    slug: "how-to-prepare-for-first-mobile-grooming-appointment",
    title: "How to Prepare Your Dog for Their First Mobile Grooming Appointment",
    metaDescription:
      "Booking your dog's first mobile groomer visit? Here's exactly how to prepare your dog, your driveway, and your paperwork so the appointment goes smoothly.",
    excerpt:
      "A little prep goes a long way for a first mobile grooming visit. Here's what to do before the groomer's van pulls up, from parking access to calming an anxious dog.",
    publishedAt: "2026-09-10",
    heroImage: {
      src: "https://upload.wikimedia.org/wikipedia/commons/6/63/Dog_running_to_see_the_owner.jpg",
      alt: "A small shaggy-coated dog running excitedly down a driveway",
      width: 2946,
      height: 1970,
      author: "Gabyrlo",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Dog_running_to_see_the_owner.jpg",
      license: "CC BY-SA 4.0",
    },
    content: [
      {
        type: "p",
        html: "A mobile groomer visit works differently than a salon drop-off, so first-timers are often unsure what they're supposed to do to get ready. The good news: prep is minimal, but a few small things make the appointment go a lot smoother for everyone, especially your dog.",
      },
      { type: "h2", text: "Clear Space for the Groomer's Van or Trailer" },
      {
        type: "p",
        html: "Most mobile units are fully self-contained with their own water and power, but not all of them, so it's worth asking when you book. Either way, leave a clear stretch of driveway or curb for the vehicle to park close to your home, and let the groomer know ahead of time if your street has tight parking or a shared driveway.",
      },
      { type: "h2", text: "Have Your Dog's Info Ready" },
      {
        type: "p",
        html: "Keep vaccination records handy, and be ready to mention any skin conditions, allergies, recent injuries, or behavioral quirks (nervous around clippers, doesn't like paws touched, that kind of thing). The more the groomer knows going in, the calmer the appointment tends to go. If you're booking with someone new, look for a Verified badge on their profile, it means the business owner has confirmed ownership through their Google Business Profile.",
      },
      { type: "h2", text: "Help an Anxious Dog Feel Comfortable" },
      {
        type: "ul",
        items: [
          "Take a short walk beforehand to burn off nervous energy",
          "Avoid a big meal right before the appointment",
          "Keep a familiar blanket or toy nearby. Mobile grooming already removes a lot of the stress of a salon, and familiar smells help even more",
          "Stay close by, but let the groomer work without hovering. Most dogs settle faster without an anxious owner watching every second",
        ],
      },
      {
        type: "p",
        html: 'For dogs who struggle with grooming in general, not just the mobile part, our guide on <a href="/blog/mobile-grooming-for-senior-and-anxious-dogs-nc" class="text-brand hover:underline font-medium">mobile grooming for senior and anxious dogs</a> has more specific tips.',
      },
      { type: "h2", text: "Know What Service You're Booking" },
      {
        type: "p",
        html: 'Confirm upfront whether you\'re booking a <a href="/services/bath-brush" class="text-brand hover:underline font-medium">bath and brush</a> or a <a href="/services/full-groom" class="text-brand hover:underline font-medium">full groom</a>, and whether nails, ears, and a sanitary trim are included. Surprise add-ons are the most common source of confusion at pickup (or in this case, at the curb). If you\'re unsure what things typically cost, our <a href="/blog/mobile-dog-grooming-cost-guide-raleigh-durham-triangle" class="text-brand hover:underline font-medium">mobile grooming cost guide</a> breaks it down by service.',
      },
      { type: "h2", text: "What Happens During the Appointment" },
      {
        type: "p",
        html: "The groomer sets up outside or in their van, and works with your dog one-on-one from start to finish, no crating, no waiting for a turn. Depending on the service and your dog's coat, expect anywhere from 1 to 3 hours. You're free to go about your day nearby; most groomers will text or knock when they're done.",
      },
      { type: "h2", text: "After the Appointment" },
      {
        type: "p",
        html: 'Once it\'s done, this is a good time to ask about a recurring schedule so you\'re not starting from scratch next time. How often that should be depends heavily on your dog\'s coat, our <a href="/blog/how-often-should-you-groom-your-dog-breed-guide" class="text-brand hover:underline font-medium">breed-by-breed grooming frequency guide</a> covers what\'s typical.',
      },
      { type: "h2", text: "Ready to Book?" },
      {
        type: "p",
        html: '<a href="/search" class="text-brand hover:underline font-medium">Search the full directory</a> by city or service, or browse groomers in <a href="/groomers/raleigh-nc" class="text-brand hover:underline font-medium">Raleigh</a>, <a href="/groomers/durham-nc" class="text-brand hover:underline font-medium">Durham</a>, <a href="/groomers/cary-nc" class="text-brand hover:underline font-medium">Cary</a>, and beyond.',
      },
    ],
  },
  {
    slug: "puppys-first-grooming-appointment-when-to-start",
    title: "Puppy's First Grooming Appointment: When to Start and What to Expect",
    metaDescription:
      "When should a puppy have their first grooming appointment? The right age to start, what a first groom actually involves, and how to make it a good experience.",
    excerpt:
      "Starting grooming too late can make a dog fearful of it for life. Here's the right age to book a puppy's first appointment, and how to set them up for a lifetime of calm grooming.",
    publishedAt: "2026-09-11",
    heroImage: {
      src: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Golden_Retriever_12weeks.JPG",
      alt: "A calm 12-week-old golden retriever puppy resting on the floor",
      width: 1600,
      height: 1200,
      author: "Beatrice Milek",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Golden_Retriever_12weeks.JPG",
      license: "CC BY 3.0",
    },
    content: [
      {
        type: "p",
        html: "A puppy's early experiences with grooming shape how they feel about it for the rest of their life. Wait too long, or make the first visit stressful, and you can end up with a dog who fights every bath and trim for years. Start early and keep it positive, and grooming becomes just another routine part of life.",
      },
      { type: "h2", text: "The Right Age to Start" },
      {
        type: "p",
        html: "Most groomers and vets recommend a puppy's first grooming visit around 10 to 12 weeks old, once they've had their second round of puppy vaccinations. Breeds with fast-growing or high-maintenance coats, like Poodles, Doodles, and Shih Tzus, benefit from starting on the earlier end of that window since they'll need regular grooming for life anyway. Short-haired breeds have more flexibility, but starting early still matters for building comfort with handling, not just coat care.",
      },
      { type: "h2", text: "What a Puppy's First Appointment Actually Involves" },
      {
        type: "p",
        html: "A first visit is intentionally light: a gentle bath, a light brush-out, a nail trim, and an ear check. It's not usually a full haircut, even for breeds that will eventually need one. The goal at this stage is a calm, positive experience, not a finished look. A good groomer will go slowly, let your puppy sniff the tools first, and stop if things get overwhelming rather than pushing through.",
      },
      { type: "h2", text: "Why Mobile Grooming Is Especially Good for a Puppy's First Visit" },
      {
        type: "p",
        html: 'A busy salon, with unfamiliar dogs, loud dryers, and a wait for their turn, can be a lot for a puppy who\'s still forming their opinion of what grooming even is. Mobile grooming skips all of that: your puppy stays in a quiet, familiar spot, gets one-on-one attention, and never has to wait in a crate next to strangers. For more on why that matters, see our guide on <a href="/blog/mobile-grooming-for-senior-and-anxious-dogs-nc" class="text-brand hover:underline font-medium">mobile grooming for anxious dogs</a>, the same reasoning applies to a nervous first-timer of any age. Our <a href="/blog/how-to-prepare-for-first-mobile-grooming-appointment" class="text-brand hover:underline font-medium">guide to preparing for a first mobile grooming appointment</a> covers the basics of getting ready either way.',
      },
      { type: "h2", text: "Setting Your Puppy Up for Success" },
      {
        type: "ul",
        items: [
          "Handle your puppy's paws, ears, and mouth regularly at home so being touched there feels normal, not scary",
          "Get them used to the sound of clippers or a hair dryer at a distance before their first real appointment",
          "Keep early handling sessions short and end on a good note, with a treat or praise",
          "Avoid making a big, anxious deal out of the appointment. Puppies pick up on your energy",
        ],
      },
      { type: "h2", text: "How Often After the First Visit" },
      {
        type: "p",
        html: 'Once the first appointment goes well, most puppies settle into a regular schedule based on their coat type. A Golden Retriever or Corgi puppy will start needing regular <a href="/services/de-shedding-treatment" class="text-brand hover:underline font-medium">de-shedding</a> as their adult coat comes in, while a Poodle or Doodle puppy should move to a <a href="/services/full-groom" class="text-brand hover:underline font-medium">full groom</a> every 4-6 weeks fairly quickly. Our <a href="/blog/how-often-should-you-groom-your-dog-breed-guide" class="text-brand hover:underline font-medium">breed-by-breed grooming frequency guide</a> has the specifics.',
      },
      { type: "h2", text: "Find a Groomer Who's Good With Puppies" },
      {
        type: "p",
        html: 'Not every groomer has the patience for a squirmy first-timer, so it\'s worth asking directly about their experience with puppies before booking. <a href="/search" class="text-brand hover:underline font-medium">Search the full directory</a> to find a groomer near you in <a href="/groomers/raleigh-nc" class="text-brand hover:underline font-medium">Raleigh</a>, <a href="/groomers/durham-nc" class="text-brand hover:underline font-medium">Durham</a>, <a href="/groomers/greensboro-nc" class="text-brand hover:underline font-medium">Greensboro</a>, and beyond.',
      },
    ],
  },
  {
    slug: "mobile-cat-grooming-does-your-cat-need-it",
    title: "Mobile Cat Grooming: Does Your Cat Actually Need a Professional Groomer?",
    metaDescription:
      "Most cats groom themselves just fine, but some genuinely need professional help. Here's when a cat benefits from mobile grooming, and what an appointment involves.",
    excerpt:
      "Cats are famously self-sufficient groomers, so does yours actually need a professional? For long-haired, senior, or overweight cats, often yes. Here's when it helps.",
    publishedAt: "2026-09-12",
    heroImage: {
      src: "https://upload.wikimedia.org/wikipedia/commons/3/36/Eating_grass_by_the_window_%2854392351235%29.jpg",
      alt: "A fluffy long-haired orange and white cat sitting by a window",
      width: 3842,
      height: 2162,
      author: "Egor Plenkin",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Eating_grass_by_the_window_(54392351235).jpg",
      license: "CC BY 4.0",
    },
    content: [
      {
        type: "p",
        html: "Cats have a well-earned reputation as self-sufficient groomers, and most healthy, short-haired cats really don't need much help from a human. But that reputation leads a lot of owners to assume their cat never needs professional grooming, which isn't quite true for every cat.",
      },
      { type: "h2", text: "When a Cat Actually Needs Professional Grooming" },
      {
        type: "ul",
        items: [
          "Long-haired breeds like Persians and Maine Coons, whose coats mat easily no matter how much they self-groom",
          "Senior or arthritic cats who physically can't reach certain spots on their own body anymore",
          "Overweight cats with the same reach problem, particularly around the lower back and hindquarters",
          "Any cat that's already developed mats, since those don't resolve with more self-grooming, they need to be professionally removed",
        ],
      },
      { type: "h2", text: "Why Mobile Grooming Makes Sense for Cats" },
      {
        type: "p",
        html: "If dogs find a busy salon stressful, cats tend to find it worse. Cats are territorial, don't love car rides, and are often sharing a waiting area with dogs, which is its own problem for a species that didn't sign up to be around them. Mobile grooming solves all of that at once: no carrier ride, no unfamiliar animals, and a groomer working in a space your cat already knows.",
      },
      { type: "h2", text: "What a Cat Grooming Appointment Involves" },
      {
        type: "p",
        html: 'A typical cat grooming session is gentler and usually shorter than a dog\'s full groom. It generally includes a bath (if the cat tolerates it), brushing out loose fur, de-matting where needed, a nail trim, and a sanitary trim around the hindquarters. Not every cat needs every step, a good <a href="/services/cat-grooming" class="text-brand hover:underline font-medium">cat grooming</a> appointment is tailored to what that specific cat needs and can tolerate that day.',
      },
      { type: "h2", text: "Signs Your Cat Needs a Groomer" },
      {
        type: "ul",
        items: [
          "Visible mats, especially around the hindquarters, armpits, or belly where cats have trouble reaching",
          "A dull, greasy, or unkempt-looking coat despite normal self-grooming",
          "An increase in hairballs, which can mean loose fur isn't being managed well",
          "Reduced self-grooming due to obesity, arthritis, or dental pain, worth mentioning to your vet too",
        ],
      },
      { type: "h2", text: "Tips for a Smoother Cat Grooming Visit" },
      {
        type: "ul",
        items: [
          "Keep dogs and other pets separated or out of the room during the appointment",
          "Avoid scheduling right after a stressful event, like a vet visit or a trip",
          "Leave a familiar blanket or bed nearby so your cat has something that smells like home",
          "Don't fast your cat beforehand unless a sedative is planned. A hungry cat is rarely a cooperative one",
        ],
      },
      { type: "h2", text: "Find a Mobile Cat Groomer Near You" },
      {
        type: "p",
        html: '<a href="/services/cat-grooming" class="text-brand hover:underline font-medium">Search groomers who offer cat grooming</a> or browse the full directory by city in <a href="/groomers/raleigh-nc" class="text-brand hover:underline font-medium">Raleigh</a>, <a href="/groomers/durham-nc" class="text-brand hover:underline font-medium">Durham</a>, <a href="/groomers/cary-nc" class="text-brand hover:underline font-medium">Cary</a>, and beyond.',
      },
    ],
  },
  {
    slug: "matted-dog-fur-when-shaving-is-necessary",
    title: "Matted Dog Fur: Why Groomers Sometimes Have to Shave It Down (and How to Prevent It)",
    metaDescription:
      "Why does a mobile groomer sometimes have to shave a matted dog down? The real welfare reasons, what to expect at the appointment, and how to prevent it happening again.",
    excerpt:
      "A badly matted coat isn't just messy, it can hurt. Here's why groomers sometimes have no choice but to shave it down, and how regular brushing keeps you off that list.",
    publishedAt: "2026-09-14",
    heroImage: {
      src: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Bobtail_otak%C3%A9_chien.jpg",
      alt: "An Old English Sheepdog with a long, thick coat that mats easily without regular brushing",
      width: 6000,
      height: 8000,
      author: "Bobtailotake",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Bobtail_otak%C3%A9_chien.jpg",
      license: "CC BY-SA 4.0",
    },
    content: [
      {
        type: "p",
        html: "Every mobile groomer in North Carolina has had this conversation: a dog comes out for its appointment with a coat that looks fine on the surface, but underneath is a solid mat of tangled fur against the skin. And the answer, more often than owners expect, is that the only responsible option is to shave it down short. It's not the groomer being lazy or skipping a good brush-out. It's usually the only humane choice left.",
      },
      { type: "h2", text: "What Causes Matting in the First Place" },
      {
        type: "p",
        html: 'Mats form when loose undercoat, dead hair, and debris get tangled together faster than they get brushed out. A few things make it happen fast:',
      },
      {
        type: "ul",
        items: [
          'Double-coated and curly-coated breeds shed into their own topcoat instead of falling away, which is why <a href="/blog/grooming-double-coated-dogs-nc-humidity-shedding-season" class="text-brand hover:underline font-medium">double-coated dogs in NC\'s humidity</a> mat faster than short-haired breeds',
          "Bathing or swimming without brushing first and fully drying afterward, since damp tangled fur locks into a mat as it dries",
          "Friction points, behind the ears, under the collar, in the armpits, and between the toes, where fur rubs constantly and owners rarely check",
          "Skipping grooming appointments during a heavy shedding season and letting a small tangle turn into a dense mat over several weeks",
        ],
      },
      { type: "h2", text: "Why Groomers Sometimes Have to Shave a Matted Coat Down" },
      {
        type: "p",
        html: "A mild tangle can usually be worked out with a slicker brush and some patience. A severe mat is a different problem. Once fur is matted tight against the skin, it behaves less like hair and more like a cast, and trying to comb it out at that point does more harm than a clean shave-down.",
      },
      {
        type: "ul",
        items: [
          "Tight mats pull on the skin with every movement, which is uncomfortable at best and painful at worst",
          "Matted fur traps moisture and heat against the skin, especially in a humid NC summer, creating the perfect environment for hot spots and skin infections",
          "Mats hide what's underneath. Groomers regularly find fleas, ticks, sores, or early skin infections once a mat is removed that were completely invisible before",
          "Severe matting can restrict blood flow to the skin and, in extreme cases around the legs or tail, restrict circulation altogether",
          "Trying to comb out a tight mat risks far more skin trauma (and takes far longer) than clipping it away with the right tools",
        ],
      },
      { type: "h2", text: "What to Expect During a Shave-Down Appointment" },
      {
        type: "p",
        html: 'A good mobile groomer will stop and talk to you before shaving anything down; most ask you to sign a mat-removal consent form first, since clippers have to work close to the skin on a tight mat and a small nick is a real (if uncommon) risk on already-irritated skin. Expect your dog to look noticeably shorter and, sometimes, patchy or uneven where the mats were worst, since the clipper has to follow the mat line rather than an even length all over. The coat typically grows back looking normal within a few months. If you book a <a href="/services/de-matting" class="text-brand hover:underline font-medium">de-matting</a> add-on and the mats turn out to be too severe or too close to the skin to safely work through, don\'t be surprised if the groomer recommends a full shave-down instead.',
      },
      { type: "h2", text: "How to Prevent Matting Between Visits" },
      {
        type: "p",
        html: 'The good news is that matting is almost entirely preventable with a routine. A few habits go a long way:',
      },
      {
        type: "ul",
        items: [
          'Brush a few minutes several times a week, more often for long or curly coats, focusing on the friction points behind the ears, armpits, and legs',
          "Always brush out any tangles before a bath, and make sure your dog is fully dry (not just damp) before letting the coat sit",
          'Book grooming on a regular schedule rather than waiting for the coat to look bad. See our <a href="/blog/how-often-should-you-groom-your-dog-breed-guide" class="text-brand hover:underline font-medium">breed-by-breed grooming frequency guide</a> for a realistic interval',
          'Ask your groomer about a shorter, easier-to-maintain trim for shedding season if daily brushing isn\'t realistic for your schedule',
        ],
      },
      { type: "h2", text: "Booking Regular Maintenance" },
      {
        type: "p",
        html: 'A quick <a href="/services/bath-brush" class="text-brand hover:underline font-medium">Bath &amp; Brush</a> or <a href="/services/full-groom" class="text-brand hover:underline font-medium">Full Groom</a> every 4-6 weeks catches tangles long before they become mats. <a href="/search" class="text-brand hover:underline font-medium">Search the full directory</a> or browse local listings in <a href="/groomers/oxford-nc" class="text-brand hover:underline font-medium">Oxford</a>, <a href="/groomers/carrboro-nc" class="text-brand hover:underline font-medium">Carrboro</a>, and <a href="/groomers/durham-nc" class="text-brand hover:underline font-medium">Durham</a> to find a mobile groomer near you.',
      },
    ],
  },
  {
    slug: "fall-dog-grooming-guide-north-carolina-flea-tick-season",
    title: "Fall Dog Grooming Guide: What Changes in North Carolina's Mild Autumns",
    metaDescription:
      "Fall grooming isn't just about less shedding. Here's what changes for NC dogs as temperatures drop, including why fleas and ticks stay active longer than you'd think.",
    excerpt:
      "North Carolina's mild fall means fleas and ticks don't just disappear when the leaves do. Here's what to actually adjust in your dog's grooming routine this season.",
    publishedAt: "2026-09-15",
    heroImage: {
      src: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Focused_%28105158567%29.jpeg",
      alt: "Close-up of an alert dog outdoors in warm autumn light",
      width: 2048,
      height: 1362,
      author: "Peter Kiss",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Focused_(105158567).jpeg",
      license: "CC BY 3.0",
    },
    content: [
      {
        type: "p",
        html: "Once the weather cools off, a lot of NC pet owners quietly stop thinking about grooming until spring. That's a mistake here. North Carolina's fall is mild enough that several of the things you'd normally worry about in summer, fleas, ticks, and shedding, don't actually go away when the calendar says autumn. Here's what genuinely changes this season, and what doesn't.",
      },
      { type: "h2", text: "Fleas and Ticks Don't Take the Fall Off in NC" },
      {
        type: "p",
        html: 'Most of the Triangle and Piedmont doesn\'t see a hard, sustained frost until well into November, sometimes later. Fleas and ticks stay active in that window, and fallen leaf piles are actually a favorite hiding spot for ticks looking for a warm, humid place to wait for a host. If your dog spends time in yards, parks, or wooded trails this fall, a <a href="/services/flea-tick-treatment" class="text-brand hover:underline font-medium">Flea &amp; Tick Treatment</a> as part of a regular grooming visit is still worth keeping on the schedule, not just something to think about in July.',
      },
      { type: "h2", text: "Your Dog's Coat Still Needs Attention" },
      {
        type: "p",
        html: 'Shedding usually slows down once the heavy summer blowout season passes, but that doesn\'t mean brushing stops mattering. Indoor heat kicks on earlier than most owners expect in NC, and it dries out skin and coat just like it does for people. Dry skin plus a coat that isn\'t being brushed regularly is exactly how small tangles turn into mats, especially for the double-coated and curly breeds covered in our <a href="/blog/grooming-double-coated-dogs-nc-humidity-shedding-season" class="text-brand hover:underline font-medium">guide to grooming double-coated dogs</a>.',
      },
      { type: "h2", text: "Watch the Paws on Fall Walks" },
      {
        type: "ul",
        items: [
          "Fallen leaf piles hide sticks, acorns, and other debris that can get lodged between toe pads",
          "Longer nails catch more easily on wet leaves and uneven ground. Keep up with a regular <a href=\"/services/nail-trim\" class=\"text-brand hover:underline font-medium\">Nail Trim</a> or <a href=\"/services/nail-grinding\" class=\"text-brand hover:underline font-medium\">Nail Grinding</a>",
          "Check paw pads after walks for small cuts or irritation, especially if your dog has been in wooded areas",
          "Mud from fall rain tracks into the house fast. A quick <a href=\"/services/bath-brush\" class=\"text-brand hover:underline font-medium\">Bath &amp; Brush</a> keeps things manageable between full grooms",
        ],
      },
      { type: "h2", text: "Adjusting Your Grooming Schedule for the Season" },
      {
        type: "p",
        html: 'Fall is a good time to reassess how often your dog actually needs to be groomed, rather than sticking to a summer schedule out of habit. Coat type, activity level, and how much time your dog spends outside all factor in. Our <a href="/blog/how-often-should-you-groom-your-dog-breed-guide" class="text-brand hover:underline font-medium">breed-by-breed grooming frequency guide</a> breaks down a realistic interval so you\'re not over- or under-grooming as the seasons shift.',
      },
      { type: "h2", text: "Book a Fall Grooming Visit" },
      {
        type: "p",
        html: '<a href="/search" class="text-brand hover:underline font-medium">Search the full directory</a> or browse local listings in <a href="/groomers/raleigh-nc" class="text-brand hover:underline font-medium">Raleigh</a>, <a href="/groomers/durham-nc" class="text-brand hover:underline font-medium">Durham</a>, and <a href="/groomers/greensboro-nc" class="text-brand hover:underline font-medium">Greensboro</a> to find a mobile groomer near you.',
      },
    ],
  },
  {
    slug: "how-to-choose-a-trustworthy-mobile-dog-groomer-checklist",
    title: "How to Choose a Trustworthy Mobile Dog Groomer: A Pre-Booking Checklist",
    metaDescription:
      "Mobile grooming means a stranger with clippers comes to your driveway. Here's what to actually check before booking, from insurance to how quotes are handled.",
    excerpt:
      "Mobile grooming means letting someone you've never met into your driveway with clippers running. Here's what's actually worth checking before you book.",
    publishedAt: "2026-09-16",
    heroImage: {
      src: "https://upload.wikimedia.org/wikipedia/commons/6/67/Arwen%2C_Corgi.jpg",
      alt: "An alert, well-groomed Pembroke Welsh Corgi sitting outdoors",
      width: 6000,
      height: 4000,
      author: "Randall R. Saxton",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Arwen,_Corgi.jpg",
      license: "CC BY 2.0",
    },
    content: [
      {
        type: "p",
        html: "Mobile grooming is convenient enough that it's easy to book the first name that shows up and move on with your day. But you're letting someone you've likely never met park a van in your driveway, handle your dog one-on-one with no one else around, and run clippers close to their skin. A few minutes of checking before you book is worth it, and most legitimate groomers are happy to answer these questions.",
      },
      { type: "h2", text: "Ask About Insurance and Bonding" },
      {
        type: "p",
        html: "A legitimate mobile grooming business carries liability insurance, covering everything from an accidental nick to property damage from the van itself. It's a completely normal question to ask directly: \"Are you insured?\" A groomer who's been in business for a while will usually answer without hesitation. Vague or defensive answers are worth noting.",
      },
      { type: "h2", text: "Look Past the Star Rating" },
      {
        type: "ul",
        items: [
          "A 5.0 rating with 2 reviews tells you a lot less than a 4.8 with 100",
          'Look for a <a href="/search" class="text-brand hover:underline font-medium">Verified badge</a> on the listing, which means the business owner has confirmed ownership through their own Google Business Profile, not just a name someone else typed in',
          "Read a few of the actual written reviews, not just the number. Look for mentions of punctuality, communication, and how the groomer handled a nervous or difficult dog",
        ],
      },
      { type: "h2", text: "Get a Clear, Itemized Quote First" },
      {
        type: "p",
        html: 'A trustworthy groomer will tell you upfront what\'s included in a quote, and what counts as an add-on. If your dog\'s coat is matted or overdue for a trim, ask directly whether that changes the price before the appointment, not after. Our <a href="/blog/mobile-dog-grooming-cost-guide-raleigh-durham-triangle" class="text-brand hover:underline font-medium">cost guide for the Triangle</a> breaks down what typical pricing actually looks like by service, so you know if a quote is reasonable.',
      },
      { type: "h2", text: "What a Trustworthy Groomer Will Never Do" },
      {
        type: "ul",
        items: [
          "Refuse to discuss their mat-removal policy. A good groomer explains upfront that severely matted fur may need to be shaved down for your dog's safety, not sprung on you as a surprise. See our guide on <a href=\"/blog/matted-dog-fur-when-shaving-is-necessary\" class=\"text-brand hover:underline font-medium\">why shaving a mat down is sometimes the only humane option</a>",
          "Rush through the appointment or seem impatient with an anxious dog",
          "Get defensive when you ask reasonable questions about their process, training, or insurance",
          "Pressure you to book add-ons you didn't ask about on the spot",
        ],
      },
      { type: "h2", text: "Pay Attention to the First Visit" },
      {
        type: "p",
        html: 'How a groomer handles the first appointment tells you a lot. Do they introduce themselves and let your dog sniff around the van before starting? Do they ask about any health issues, past grooming experiences, or specific concerns? Our guide on <a href="/blog/how-to-prepare-for-first-mobile-grooming-appointment" class="text-brand hover:underline font-medium">preparing for a first mobile grooming appointment</a> covers what a good first visit should look like from your side.',
      },
      { type: "h2", text: "Find a Verified Groomer Near You" },
      {
        type: "p",
        html: '<a href="/search" class="text-brand hover:underline font-medium">Search the full directory</a> or browse local listings in <a href="/groomers/cary-nc" class="text-brand hover:underline font-medium">Cary</a>, <a href="/groomers/apex-nc" class="text-brand hover:underline font-medium">Apex</a>, <a href="/groomers/chapel-hill-nc" class="text-brand hover:underline font-medium">Chapel Hill</a>, and <a href="/groomers/wake-forest-nc" class="text-brand hover:underline font-medium">Wake Forest</a> to compare real, local groomers before you book.',
      },
    ],
  },
  {
    slug: "doodle-poodle-mix-grooming-guide-different-coat-routine",
    title: "Doodle and Poodle-Mix Grooming: Why Their Coats Need a Different Routine",
    metaDescription:
      "Goldendoodles, Labradoodles, and other poodle mixes don't shed like other dogs, and that changes everything about their grooming schedule. Here's what's actually different.",
    excerpt:
      "Doodles don't shed like a Lab or Golden, and treating their coat the same way is how a manageable curl turns into a solid mat. Here's what's actually different.",
    publishedAt: "2026-09-17",
    heroImage: {
      src: "https://upload.wikimedia.org/wikipedia/commons/8/84/2021-03-30_16_55_16_A_Golden_Doodle_standing_in_a_lawn_in_the_Parkway_Village_section_of_Ewing_Township%2C_Mercer_County%2C_New_Jersey.jpg",
      alt: "A Goldendoodle with a full curly coat standing in a yard",
      width: 4032,
      height: 3024,
      author: "Famartin",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:2021-03-30_16_55_16_A_Golden_Doodle_standing_in_a_lawn_in_the_Parkway_Village_section_of_Ewing_Township,_Mercer_County,_New_Jersey.jpg",
      license: "CC BY-SA 4.0",
    },
    content: [
      {
        type: "p",
        html: "Goldendoodles, Labradoodles, Bernedoodles, and other poodle mixes have exploded in popularity across North Carolina, and for good reason. But a lot of new doodle owners groom them the same way they would a Golden Retriever or a Lab, and that's exactly how a manageable curl turns into a solid mat within a few weeks.",
      },
      { type: "h2", text: "Why Doodle Coats Are Fundamentally Different" },
      {
        type: "p",
        html: 'Most dogs shed on a cycle: loose undercoat works its way out and falls away, which is what makes de-shedding tools effective on breeds covered in our <a href="/blog/grooming-double-coated-dogs-nc-humidity-shedding-season" class="text-brand hover:underline font-medium">guide to double-coated dogs</a>. Poodle-mix coats behave more like human hair. They grow continuously and rarely fall out on their own, which sounds convenient until you realize it means loose hair has nowhere to go except tangling into the curl around it.',
      },
      { type: "h2", text: "How Often Doodles Actually Need Grooming" },
      {
        type: "ul",
        items: [
          "A full haircut every 6-8 weeks, regardless of how the coat looks day to day. Waiting until it \"needs\" a cut usually means it's already matting underneath",
          'Brushing several times a week at minimum, more for longer or wavier coats. See our <a href="/blog/how-often-should-you-groom-your-dog-breed-guide" class="text-brand hover:underline font-medium">breed-by-breed grooming frequency guide</a> for how doodles compare to other coat types',
          "Extra attention behind the ears, under the collar, in the armpits, and around the tail base, the same friction points that cause trouble on any coat, but faster on a doodle",
        ],
      },
      { type: "h2", text: "Preventing the Matting Doodles Are Famous For" },
      {
        type: "p",
        html: 'Doodle coats need to be brushed all the way down to the skin, not just on the surface. A brush that glides through the top layer while a dense mat forms underneath is one of the most common reasons doodle owners get blindsided by a shave-down recommendation. If it\'s already gotten away from you, our guide on <a href="/blog/matted-dog-fur-when-shaving-is-necessary" class="text-brand hover:underline font-medium">why groomers sometimes have to shave a matted coat down</a> explains why that\'s a safety call, not a shortcut.',
      },
      { type: "h2", text: "Choosing a Cut That's Easier to Maintain" },
      {
        type: "p",
        html: 'A shorter "puppy cut" or "teddy bear trim" sheds far less maintenance burden onto you between visits than growing out a longer, fluffier coat. If daily brushing isn\'t realistic for your schedule, ask your groomer for a shorter length at each <a href="/services/full-groom" class="text-brand hover:underline font-medium">Full Groom</a>. It won\'t eliminate brushing entirely, but it buys you more room for error before a tangle becomes a mat.',
      },
      { type: "h2", text: "Find a Doodle-Experienced Groomer" },
      {
        type: "p",
        html: '<a href="/search" class="text-brand hover:underline font-medium">Search the full directory</a> or browse local listings in <a href="/groomers/holly-springs-nc" class="text-brand hover:underline font-medium">Holly Springs</a>, <a href="/groomers/morrisville-nc" class="text-brand hover:underline font-medium">Morrisville</a>, and <a href="/groomers/knightdale-nc" class="text-brand hover:underline font-medium">Knightdale</a> to find a mobile groomer comfortable with curly and doodle coats.',
      },
    ],
  },
  {
    slug: "dog-nail-trims-why-they-matter-nick-the-quick",
    title: "Dog Nail Trims: Why They Matter and What to Do If You Nick the Quick",
    metaDescription:
      "Overgrown nails aren't just a cosmetic issue, they change how a dog stands and walks. Here's why regular trims matter and what to do if the quick gets nicked.",
    excerpt:
      "Overgrown nails do more than click on hardwood floors. Here's why regular trims actually matter, and what to do (calmly) if the quick gets nicked.",
    publishedAt: "2026-09-18",
    heroImage: {
      src: "https://upload.wikimedia.org/wikipedia/commons/9/98/Dog_nails_close-up_%2849810706286%29.jpg",
      alt: "Extreme close-up of a dog's nails showing the pink quick inside",
      width: 5472,
      height: 3648,
      author: "Jernej Furman",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Dog_nails_close-up_(49810706286).jpg",
      license: "CC BY 2.0",
    },
    content: [
      {
        type: "p",
        html: "Nail trims are the grooming task most owners put off the longest, usually because it's the one their dog seems to hate the most. That's a mistake. Overgrown nails aren't just a cosmetic issue or a noisy floor problem, they change how a dog actually stands and walks, and the longer they go untrimmed, the harder they are to fix.",
      },
      { type: "h2", text: "Why Overgrown Nails Are a Real Problem" },
      {
        type: "ul",
        items: [
          "Long nails hit the ground before the paw pad does, which pushes toes back and forces weight onto the wrong part of the foot",
          "Over time, this can splay the toes and put extra strain on the joints, especially in older dogs already dealing with arthritis",
          "Nails that curl can grow into the paw pad in extreme cases, which is painful and usually requires a vet visit",
          "The quick, the blood vessel and nerve inside the nail, grows longer along with an overgrown nail, which is exactly why overdue nails are harder to trim short without discomfort",
        ],
      },
      { type: "h2", text: "Trim or Grind?" },
      {
        type: "p",
        html: 'Mobile groomers typically offer both a <a href="/services/nail-trim" class="text-brand hover:underline font-medium">Nail Trim</a> (clippers) and <a href="/services/nail-grinding" class="text-brand hover:underline font-medium">Nail Grinding</a> (a rotary tool that files the nail down). Grinding tends to leave smoother edges and lets the groomer work more gradually, which can mean less risk of cutting too close on dogs with long-overdue nails. Clippers are faster and quieter, which matters more for dogs who are anxious about vibration or noise. A good groomer will pick based on your dog\'s temperament rather than defaulting to one method for everyone.',
      },
      { type: "h2", text: "What to Do If You Nick the Quick" },
      {
        type: "p",
        html: "It happens, even to experienced groomers, especially on dark nails where the quick isn't visible. It looks alarming, nails bleed more than the injury actually warrants, but it's rarely serious. Apply firm, steady pressure with a clean cloth or styptic powder (cornstarch works in a pinch) for a minute or two. Bleeding that doesn't slow down after several minutes, or any sign of infection in the days after, is worth a call to your vet.",
      },
      { type: "h2", text: "How Often Dogs Actually Need Nail Trims" },
      {
        type: "p",
        html: "Most dogs need a trim every 3-4 weeks, though it depends on activity level. Dogs that walk mostly on pavement wear their nails down naturally faster than dogs that spend most of their time on grass or carpet. A simple test: if you can hear your dog's nails clicking on a hard floor when they walk normally, they're overdue.",
      },
      { type: "h2", text: "Book a Nail Trim" },
      {
        type: "p",
        html: '<a href="/search" class="text-brand hover:underline font-medium">Search the full directory</a> or browse local listings in <a href="/groomers/clayton-nc" class="text-brand hover:underline font-medium">Clayton</a>, <a href="/groomers/fuquay-varina-nc" class="text-brand hover:underline font-medium">Fuquay-Varina</a>, and <a href="/groomers/garner-nc" class="text-brand hover:underline font-medium">Garner</a> to find a mobile groomer near you.',
      },
    ],
  },
  {
    slug: "dog-ear-cleaning-humidity-infection-prevention",
    title: "Dog Ear Cleaning: Why It Matters More in North Carolina's Humidity",
    metaDescription:
      "Floppy-eared breeds are especially prone to ear infections, and NC's humidity makes it worse. Here's what to watch for and how regular ear cleaning helps.",
    excerpt:
      "Humidity traps moisture in a dog's ear canal, and floppy ears block airflow even more. Here's why ear infections are so common in NC and how to prevent them.",
    publishedAt: "2026-09-20",
    heroImage: {
      src: "https://upload.wikimedia.org/wikipedia/commons/0/03/A_basset_hound_in_a_park_on_a_sunny_day.jpg",
      alt: "A Basset Hound with long floppy ears sitting in a park",
      width: 3840,
      height: 5760,
      author: "Brittbritt80053",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:A_basset_hound_in_a_park_on_a_sunny_day.jpg",
      license: "CC BY-SA 4.0",
    },
    content: [
      {
        type: "p",
        html: "Ear infections are one of the most common reasons dogs end up at the vet, and North Carolina's climate doesn't do them any favors. Floppy-eared breeds like Cocker Spaniels, Basset Hounds, and Labradors are especially prone, and the state's long, humid stretches make the underlying problem worse than it would be in a drier climate.",
      },
      { type: "h2", text: "Why Humidity Makes Ear Infections More Likely" },
      {
        type: "p",
        html: "A dog's ear canal is naturally warm and dark, which is already a decent environment for bacteria and yeast. Add humidity, and moisture that would otherwise evaporate quickly instead lingers in the canal after a bath, a swim, or just a muggy afternoon outside. Floppy ears make it worse by blocking airflow that would help the canal dry out on its own, which is exactly why breeds like Cocker Spaniels and Basset Hounds see ear infections so much more often than dogs with upright ears.",
      },
      { type: "h2", text: "Signs Your Dog's Ears Need Attention" },
      {
        type: "ul",
        items: [
          "Frequent head shaking or scratching at one or both ears",
          "A noticeable odor coming from the ear",
          "Redness, swelling, or visible discharge inside the ear",
          "Sensitivity or flinching when the ear area is touched",
        ],
      },
      {
        type: "p",
        html: "None of these are something to diagnose or treat yourself. If you notice any of them, a vet visit is the right next step. Regular ear cleaning is about prevention, not treating an active infection.",
      },
      { type: "h2", text: "What's Included in a Professional Ear Cleaning" },
      {
        type: "p",
        html: 'A groomer offering <a href="/services/ear-cleaning" class="text-brand hover:underline font-medium">Ear Cleaning</a> typically uses a gentle, vet-approved solution and cotton, never a cotton swab pushed deep into the canal, which can pack debris further in rather than remove it. For breeds that grow hair inside the ear canal, like Poodles and some terriers, plucking excess hair as part of the service also helps improve airflow between visits.',
      },
      { type: "h2", text: "Helping Between Grooming Visits" },
      {
        type: "ul",
        items: [
          "Dry your dog's ears thoroughly after baths or swimming, gently patting rather than rubbing",
          "Check ears periodically for odor or discharge, especially during NC's most humid months",
          "Avoid over-cleaning. Too-frequent cleaning can irritate the ear canal just as much as neglecting it",
        ],
      },
      { type: "h2", text: "Book an Ear Cleaning" },
      {
        type: "p",
        html: '<a href="/search" class="text-brand hover:underline font-medium">Search the full directory</a> or browse local listings in <a href="/groomers/youngsville-nc" class="text-brand hover:underline font-medium">Youngsville</a>, <a href="/groomers/zebulon-nc" class="text-brand hover:underline font-medium">Zebulon</a>, and <a href="/groomers/smithfield-nc" class="text-brand hover:underline font-medium">Smithfield</a> to find a mobile groomer near you.',
      },
    ],
  },
  {
    slug: "dog-dental-health-teeth-brushing-grooming-routine",
    title: "Dog Dental Health: Why Teeth Brushing Belongs in Your Grooming Routine",
    metaDescription:
      "Most dogs show signs of dental disease by age 3. Here's why teeth brushing matters beyond bad breath, and how to build a routine between grooming visits.",
    excerpt:
      "Bad breath is usually the first sign of a much bigger problem. Most dogs show some dental disease by age 3, here's what to actually do about it.",
    publishedAt: "2026-09-21",
    heroImage: {
      src: "https://upload.wikimedia.org/wikipedia/commons/9/97/BeagleToothbrush.jpg",
      alt: "A Beagle chewing on a dog toothbrush outdoors",
      width: 2304,
      height: 1728,
      author: "Jrragan",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:BeagleToothbrush.jpg",
      license: "CC BY-SA 4.0",
    },
    content: [
      {
        type: "p",
        html: "Dental disease is one of the most common health problems in dogs, and one of the most overlooked. Most dogs show some signs of it by age three, yet teeth brushing rarely makes it into a regular grooming routine the way baths and haircuts do. That gap matters more than most owners realize.",
      },
      { type: "h2", text: "Why Dental Health Matters Beyond Bad Breath" },
      {
        type: "p",
        html: "Bad breath is usually the first sign owners notice, but it's rarely the actual problem. Left unaddressed, plaque hardens into tartar, which irritates and infects the gums. Beyond the pain and eventual tooth loss that can cause, the bacteria from advanced gum disease can enter the bloodstream and has been linked to strain on the heart, kidneys, and liver. It's a bigger deal than a haircut, even though it gets far less attention.",
      },
      { type: "h2", text: "What Professional Teeth Brushing During Grooming Actually Does" },
      {
        type: "p",
        html: 'A <a href="/services/teeth-brushing" class="text-brand hover:underline font-medium">Teeth Brushing</a> add-on during a grooming visit isn\'t a substitute for regular veterinary dental care, but it helps knock back plaque before it hardens into tartar, and it gets your dog more comfortable with having their mouth handled, which makes home brushing easier too. Groomers use dog-safe enzymatic toothpaste designed to work on contact rather than relying on scrubbing alone.',
      },
      { type: "h2", text: "Signs of Dental Problems to Watch For" },
      {
        type: "ul",
        items: [
          "Persistent bad breath that doesn't improve with a bath or brushing",
          "Yellow or brown buildup along the gumline",
          "Red, swollen, or bleeding gums",
          "Reluctance to chew, dropping food, or pawing at the mouth",
        ],
      },
      {
        type: "p",
        html: "As with any health concern, these are signs to bring up with your vet, not something to diagnose or treat on your own. Regular brushing is about prevention, not fixing an active problem.",
      },
      { type: "h2", text: "Building a Home Routine Between Visits" },
      {
        type: "ul",
        items: [
          "Brush a few times a week if daily isn\'t realistic. Any consistent routine beats none",
          "Only ever use toothpaste made for dogs. Human toothpaste often contains xylitol, which is toxic to dogs, along with foaming agents dogs shouldn\'t swallow",
          "Dental chews and water additives can help between brushings, but they supplement a routine, they don\'t replace one",
          "Start slow with a puppy or a dog new to brushing. A few seconds of positive handling around the mouth is more useful early on than trying to brush a full set of teeth on day one",
        ],
      },
      { type: "h2", text: "Book a Grooming Visit with Teeth Brushing" },
      {
        type: "p",
        html: '<a href="/search" class="text-brand hover:underline font-medium">Search the full directory</a> or browse local listings in <a href="/groomers/wendell-nc" class="text-brand hover:underline font-medium">Wendell</a>, <a href="/groomers/rolesville-nc" class="text-brand hover:underline font-medium">Rolesville</a>, and <a href="/groomers/angier-nc" class="text-brand hover:underline font-medium">Angier</a> to find a mobile groomer near you.',
      },
    ],
  },
  {
    slug: "multi-pet-household-mobile-grooming-scheduling-guide",
    title: "Grooming Multiple Dogs: How Mobile Grooming Handles Multi-Pet Households",
    metaDescription:
      "Two or three dogs shouldn't mean two or three separate salon trips. Here's how mobile grooming actually handles multi-pet households, and what to ask about pricing.",
    excerpt:
      "Multiple dogs usually means multiple grooming headaches. Here's how mobile grooming actually simplifies it, and what to ask before booking for more than one pet.",
    publishedAt: "2026-09-22",
    heroImage: {
      src: "https://upload.wikimedia.org/wikipedia/commons/1/1f/2_dogs_in_a_morning_forest.jpg",
      alt: "Two dogs standing together outdoors in a sunlit forest",
      width: 4896,
      height: 3264,
      author: "Stewart Black",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:2_dogs_in_a_morning_forest.jpg",
      license: "CC BY 2.0",
    },
    content: [
      {
        type: "p",
        html: "Multi-dog households are common across North Carolina, and grooming logistics get more complicated fast once you're past one pet. Coordinating two or three separate salon drop-offs, or trying to keep multiple dogs calm in a crowded waiting area, is exactly the kind of hassle mobile grooming was built to solve.",
      },
      { type: "h2", text: "Why Mobile Grooming Works Well for Multiple Pets" },
      {
        type: "p",
        html: "One van visit can cover your whole household in a single afternoon instead of multiple separate trips. Dogs not currently being groomed can wait comfortably inside your own house rather than in a crate next to unfamiliar dogs, which tends to keep everyone calmer, including the dog whose turn it is.",
      },
      { type: "h2", text: "What to Ask About Multi-Pet Pricing" },
      {
        type: "ul",
        items: [
          "Some groomers offer a per-additional-pet discount for the same visit. Don't assume it's automatic, ask directly when you book",
          "Pricing still scales with each dog's size, coat, and condition, so a discount on the second dog doesn't mean a flat rate across very different dogs",
          "Confirm whether the quote covers the full visit or just the first pet, so there are no surprises when the appointment wraps up",
        ],
      },
      { type: "h2", text: "Scheduling Tips for Multiple Dogs" },
      {
        type: "ul",
        items: [
          "Groom the calmer dog first when possible. It sets a relaxed tone that can make the next dog easier to handle",
          "Keep dogs not currently being groomed in a separate room. Even well-behaved dogs get distracted watching a sibling get bathed",
          "If one dog is notably more anxious, mention it upfront so the groomer can plan the order and pacing around it",
        ],
      },
      { type: "h2", text: "Cats and Dogs in the Same Household" },
      {
        type: "p",
        html: 'If your household includes both, keep them separated during the visit regardless of how well they normally get along. Our guide on <a href="/blog/mobile-cat-grooming-does-your-cat-need-it" class="text-brand hover:underline font-medium">mobile cat grooming</a> covers what a cat-specific appointment typically looks like, which tends to be a slower, gentler process than a dog\'s.',
      },
      { type: "h2", text: "Book for Your Whole Household" },
      {
        type: "p",
        html: '<a href="/search" class="text-brand hover:underline font-medium">Search the full directory</a> or browse local listings in <a href="/groomers/lillington-nc" class="text-brand hover:underline font-medium">Lillington</a>, <a href="/groomers/mebane-nc" class="text-brand hover:underline font-medium">Mebane</a>, and <a href="/groomers/thomasville-nc" class="text-brand hover:underline font-medium">Thomasville</a> to find a mobile groomer near you.',
      },
    ],
  },
  {
    slug: "what-happens-during-mobile-dog-grooming-appointment-walkthrough",
    title: "What Happens During a Mobile Dog Grooming Appointment: A Step-by-Step Walkthrough",
    metaDescription:
      "Never booked a mobile groomer before? Here's exactly what happens from the moment the van pulls up to the final brush-out, step by step.",
    excerpt:
      "Not sure what actually happens when a mobile groomer shows up? Here's the full appointment, step by step, from arrival to the final brush-out.",
    publishedAt: "2026-09-23",
    heroImage: {
      src: "https://upload.wikimedia.org/wikipedia/commons/5/58/Chocolate_Lab.jpg",
      alt: "A content chocolate Labrador with a clean, freshly groomed look",
      width: 2904,
      height: 1976,
      author: "Dsw4",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Chocolate_Lab.jpg",
      license: "Public domain",
    },
    content: [
      {
        type: "p",
        html: "If you've never booked a mobile groomer before, the process can feel like a black box. Someone shows up in a van, takes your dog inside, and comes back out an hour or two later with a cleaner, fluffier dog. Here's what's actually happening in between.",
      },
      { type: "h2", text: "Arrival and Check-In" },
      {
        type: "p",
        html: 'The groomer parks in your driveway, introduces themselves, and usually takes a few minutes to say hello to your dog before anything else happens. This is when they\'ll check in about your dog\'s coat condition, any health concerns, and the style you want. It\'s also your chance to bring up anything specific. Our guide on <a href="/blog/how-to-prepare-for-first-mobile-grooming-appointment" class="text-brand hover:underline font-medium">preparing for your first appointment</a> covers what to have ready.',
      },
      { type: "h2", text: "The Bath" },
      {
        type: "p",
        html: "Most mobile grooming vans carry their own heated water supply and a tub or bathing station built into the vehicle. Your dog is bathed with shampoo chosen for their coat and skin type, then rinsed thoroughly. For dogs with matted or heavily tangled coats, the groomer may need to address that before the bath rather than after, since water tightens mats.",
      },
      { type: "h2", text: "Drying and Brushing" },
      {
        type: "p",
        html: 'A high-velocity dryer blows most of the water out of the coat, and the groomer brushes out tangles and loose hair as they go. For shedding breeds, this is where a <a href="/services/de-shedding-treatment" class="text-brand hover:underline font-medium">de-shedding treatment</a> makes the biggest difference, since most of the loose undercoat comes out during the dry-and-brush stage.',
      },
      { type: "h2", text: "The Haircut and Finishing Touches" },
      {
        type: "ul",
        items: [
          "Clipping or scissoring to the style you agreed on at check-in",
          "A nail trim or grind, plus any ear cleaning or sanitary trim included in your package",
          "Any add-ons you booked, like teeth brushing",
          "A final brush-out and, if you'd like, a finishing spray or bandana",
        ],
      },
      { type: "h2", text: "Wrap-Up and Rebooking" },
      {
        type: "p",
        html: 'Before leaving, a good groomer will walk you through anything they noticed, like skin irritation, a lump, or coat problems worth watching, and suggest a rebooking interval. Our guide on <a href="/blog/how-to-choose-a-trustworthy-mobile-dog-groomer-checklist" class="text-brand hover:underline font-medium">choosing a trustworthy mobile groomer</a> covers what a good visit should look like from start to finish.',
      },
      { type: "h2", text: "Find a Mobile Groomer Near You" },
      {
        type: "p",
        html: '<a href="/search" class="text-brand hover:underline font-medium">Search the full directory</a> or browse local listings in <a href="/groomers/pittsboro-nc" class="text-brand hover:underline font-medium">Pittsboro</a>, <a href="/groomers/selma-nc" class="text-brand hover:underline font-medium">Selma</a>, and <a href="/groomers/high-point-nc" class="text-brand hover:underline font-medium">High Point</a> to book your first mobile appointment.',
      },
    ],
  },
  {
    slug: "how-much-to-tip-a-mobile-dog-groomer",
    title: "How Much Should You Tip a Mobile Dog Groomer?",
    metaDescription:
      "Tipping a mobile dog groomer isn't always obvious. Here's the common rule of thumb, when to tip more, and when a tip isn't expected at all.",
    excerpt:
      "Tipping a groomer who comes to your driveway raises questions the salon never did. Here's the common rule of thumb, and when to adjust it.",
    publishedAt: "2026-09-24",
    heroImage: {
      src: "https://upload.wikimedia.org/wikipedia/commons/f/f0/A_cute_Maltese_dog.jpg",
      alt: "A freshly groomed white Maltese dog raising a paw",
      width: 4256,
      height: 2828,
      author: "Ed Yourdon",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:A_cute_Maltese_dog.jpg",
      license: "CC BY-SA 2.0",
    },
    content: [
      {
        type: "p",
        html: "Tipping is one of those questions nobody thinks about until the groomer is standing in your driveway waiting to be paid. There's no official rule, and mobile grooming adds a wrinkle: many mobile groomers are owner-operators, and owners don't always expect tips the way an employee at a salon might. Here's how to think about it.",
      },
      { type: "h2", text: "The Common Rule of Thumb" },
      {
        type: "p",
        html: "A commonly cited guideline for pet groomers is somewhere around 15 to 20 percent of the service total, similar to other personal-care services. Treat that as a starting point rather than a requirement. Some groomers build their pricing to cover their time fully and don't count on tips, while others rely on them more. When in doubt, it's perfectly fine to ask when you book.",
      },
      { type: "h2", text: "When It Makes Sense to Tip More" },
      {
        type: "ul",
        items: [
          "Your dog was difficult, anxious, or heavily matted and the groomer handled it with patience. Our guide on <a href=\"/blog/mobile-grooming-for-senior-and-anxious-dogs-nc\" class=\"text-brand hover:underline font-medium\">grooming senior and anxious dogs</a> covers why these appointments take more skill and time",
          "The groomer squeezed you in on short notice or worked around a tricky schedule",
          "The result was noticeably above what you expected, or the groomer noticed and flagged something about your dog's health",
          "It's the holiday season, when many people tip a little extra for personal services",
        ],
      },
      { type: "h2", text: "When a Tip Isn't Expected" },
      {
        type: "p",
        html: "If the groomer owns the business, a tip is a kind gesture rather than an obligation. Some owner-operators say so directly, and it's fine to take them at their word. A good review and a referral to a friend are often just as appreciated, and cost you nothing.",
      },
      { type: "h2", text: "Ways to Thank Your Groomer Beyond Cash" },
      {
        type: "ul",
        items: [
          "Leave a specific, positive online review mentioning what went well",
          "Recommend them to friends and neighbors",
          "Keep a regular rebooking schedule, which helps a small business plan its week",
          "Be ready on time, with your dog leashed and any concerns noted ahead of the visit. Our <a href=\"/blog/how-to-prepare-for-first-mobile-grooming-appointment\" class=\"text-brand hover:underline font-medium\">first appointment prep guide</a> covers how",
        ],
      },
      { type: "h2", text: "Find a Mobile Groomer Near You" },
      {
        type: "p",
        html: '<a href="/search" class="text-brand hover:underline font-medium">Search the full directory</a> or browse local listings in <a href="/groomers/burlington-nc" class="text-brand hover:underline font-medium">Burlington</a>, <a href="/groomers/graham-nc" class="text-brand hover:underline font-medium">Graham</a>, and <a href="/groomers/hillsborough-nc" class="text-brand hover:underline font-medium">Hillsborough</a> to find a mobile groomer near you.',
      },
    ],
  },
  {
    slug: "how-to-brush-your-dog-between-grooming-appointments",
    title: "How to Brush Your Dog at Home Between Grooming Appointments",
    metaDescription:
      "The right brush depends on your dog's coat. Learn which tools suit which coats, how to brush without causing mats, and how home brushing fits with mobile grooming.",
    excerpt:
      "A few minutes of brushing a week can be the difference between a quick tidy-up and a full de-matting. Here's how to match the tool to the coat and brush the right way.",
    publishedAt: "2026-09-25",
    heroImage: {
      src: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Australian_Shepherd_Portrait.jpg",
      alt: "An Australian Shepherd with a long, feathered coat looking at the camera",
      width: 2048,
      height: 1369,
      author: "Thcipriani",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Australian_Shepherd_Portrait.jpg",
      license: "CC BY-SA 4.0",
    },
    content: [
      {
        type: "p",
        html: "A professional groom every four to eight weeks does a lot, but it can't do everything on its own. What happens in the weeks between appointments decides how easy the next one is. Regular brushing keeps loose hair out of your house, keeps the coat from tangling, and gives you a chance to notice lumps, skin irritation, or ticks early. Here's how to do it well.",
      },
      { type: "h2", text: "Match the Brush to the Coat" },
      {
        type: "p",
        html: "There's no single best brush. The right tool depends on coat length and texture, and the wrong one can either miss the problem or irritate the skin. These are the general pairings groomers commonly recommend:",
      },
      {
        type: "ul",
        items: [
          "<strong>Short, smooth coats (Labs, Beagles, Boxers):</strong> a rubber curry brush or grooming mitt loosens dead hair and spreads skin oils",
          "<strong>Long or feathered coats (Aussies, Goldens, Setters):</strong> a pin brush for the surface, then a metal comb to check that it reaches the skin",
          "<strong>Double coats (Huskies, Shepherds, Corgis):</strong> an undercoat rake or a slicker brush to pull out loose undercoat, especially during shedding season",
          "<strong>Curly or wavy coats (Poodles, doodles, Bichons):</strong> a slicker brush followed by a comb, because curls hide tangles close to the skin",
          "<strong>Wiry coats (many terriers):</strong> a slicker brush or stripping comb, used gently",
        ],
      },
      { type: "h2", text: "Brush Down to the Skin, Not Just the Top" },
      {
        type: "p",
        html: "The most common mistake is brushing only the top layer. The coat can look smooth while a tangle forms underneath, usually where hair rubs: behind the ears, under the collar or harness, in the armpits, and along the back legs. Use the line-brushing method: hold the hair up with one hand, brush a thin layer down from the skin, then move to the next layer. Finish by running a comb through. If the comb catches, there's still a tangle to work out.",
      },
      { type: "h2", text: "How Often to Brush" },
      {
        type: "p",
        html: "Short-coated dogs may only need a weekly pass. Long, curly, and double-coated dogs generally do better with brushing several times a week, and daily during heavy shedding. Our <a href=\"/blog/how-often-should-you-groom-your-dog-breed-guide\" class=\"text-brand hover:underline font-medium\">breed-by-breed grooming frequency guide</a> covers how coat type changes the schedule, and our guide to <a href=\"/blog/grooming-double-coated-dogs-nc-humidity-shedding-season\" class=\"text-brand hover:underline font-medium\">double-coated dogs in North Carolina's humidity</a> explains why shedding season needs extra attention.",
      },
      { type: "h2", text: "Tips for a Dog Who Doesn't Like It" },
      {
        type: "ul",
        items: [
          "Start with very short sessions, a minute or two, and end before your dog gets restless",
          "Use treats and praise so brushing becomes something to look forward to",
          "Try a soft brush or a mitt first, and build up to the tool you actually need",
          "Brush after a walk or play session, when your dog is calmer",
          "Never yank through a tangle. Work it apart with your fingers or a comb from the tip inward",
        ],
      },
      { type: "h2", text: "What Not to Do With a Mat" },
      {
        type: "p",
        html: "Brushing a tight mat can hurt, and it often just packs the tangle down harder. Bathing a matted coat can also tighten mats as the hair swells. If you find one that won't loosen with gentle work, stop and have a groomer look at it. Our guide to <a href=\"/blog/matted-dog-fur-when-shaving-is-necessary\" class=\"text-brand hover:underline font-medium\">when shaving a matted dog is necessary</a> explains the options and why removing a severe mat is sometimes the kindest choice.",
      },
      { type: "h2", text: "How Home Brushing Fits With Mobile Grooming" },
      {
        type: "p",
        html: "A dog who is brushed regularly is easier to groom, and that often means a shorter, more comfortable appointment. Many mobile groomers are happy to show you which tools suit your dog's coat and how to use them, so it's worth asking at your next visit. If you want to know what a full visit involves, see our <a href=\"/blog/what-happens-during-mobile-dog-grooming-appointment-walkthrough\" class=\"text-brand hover:underline font-medium\">step-by-step walkthrough of a mobile grooming appointment</a>.",
      },
      { type: "h2", text: "Find a Mobile Groomer Near You" },
      {
        type: "p",
        html: '<a href="/search" class="text-brand hover:underline font-medium">Search the full directory</a> or browse local listings in <a href="/groomers/raleigh-nc" class="text-brand hover:underline font-medium">Raleigh</a>, <a href="/groomers/cary-nc" class="text-brand hover:underline font-medium">Cary</a>, and <a href="/groomers/durham-nc" class="text-brand hover:underline font-medium">Durham</a> to find a mobile groomer near you.',
      },
    ],
  },
  {
    slug: "how-often-should-you-bathe-your-dog",
    title: "How Often Should You Bathe Your Dog? A Guide by Coat and Lifestyle",
    metaDescription:
      "There's no single bathing schedule for every dog. Learn how coat type, activity, and skin affect how often to bathe your dog, and the signs you're overdoing it.",
    excerpt:
      "Bathing too rarely leaves dirt and odor behind, and bathing too often can dry out the skin. Here's how to find the right rhythm for your dog's coat and lifestyle.",
    publishedAt: "2026-09-26",
    heroImage: {
      src: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Cute_bath_dog.jpg",
      alt: "A small brown dog standing wet in a bathtub and looking up at the camera",
      width: 4032,
      height: 3024,
      author: "Kjeldgaardcameron",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Cute_bath_dog.jpg",
      license: "CC BY-SA 4.0",
    },
    content: [
      {
        type: "p",
        html: "Ask five dog owners how often they bathe their dogs and you'll get five different answers, from every week to a couple of times a year. The truth is that the right schedule depends on the dog. Here's how to work out what fits yours, and how bathing fits alongside brushing and professional grooming.",
      },
      { type: "h2", text: "A General Starting Point" },
      {
        type: "p",
        html: "A commonly cited rule of thumb is a bath roughly every four to eight weeks for many healthy dogs, though that range is a guideline rather than a rule. Dogs with oily coats, dogs who roll in things, and dogs with certain skin conditions may need more. Others do fine with less. If your dog has a skin condition, ask your veterinarian before setting a schedule, since some conditions call for specific shampoos and timing.",
      },
      { type: "h2", text: "How Coat Type Changes the Answer" },
      {
        type: "ul",
        items: [
          "<strong>Short, smooth coats:</strong> often need bathing only when dirty or smelly, since the coat doesn't trap much",
          "<strong>Double coats:</strong> bathe less often, but a bath followed by a thorough blow-out can help release loose undercoat. See our guide to <a href=\"/blog/grooming-double-coated-dogs-nc-humidity-shedding-season\" class=\"text-brand hover:underline font-medium\">grooming double-coated dogs in North Carolina</a>",
          "<strong>Curly and doodle coats:</strong> usually bathed on a regular grooming cycle, but always brushed out first, because water tightens tangles. Our <a href=\"/blog/doodle-poodle-mix-grooming-guide-different-coat-routine\" class=\"text-brand hover:underline font-medium\">doodle grooming guide</a> explains why",
          "<strong>Long or silky coats:</strong> typically need more frequent baths and conditioning to keep hair from tangling and picking up debris",
        ],
      },
      { type: "h2", text: "Lifestyle Matters as Much as Coat" },
      {
        type: "p",
        html: "A dog who swims in a pond, digs in red clay, or hikes muddy trails gets dirtier faster than a mostly indoor dog. In North Carolina, humid summers and clay soil can both shorten the time between baths. After a muddy day or a swim, a rinse is often enough, with a full shampoo saved for when the dog actually needs one.",
      },
      { type: "h2", text: "Signs You Might Be Bathing Too Often" },
      {
        type: "ul",
        items: [
          "Dry, flaky skin or a dull coat",
          "More scratching than usual after baths",
          "Red or irritated patches of skin",
          "A coat that feels harsh or brittle",
        ],
      },
      {
        type: "p",
        html: "Frequent shampooing can strip the natural oils that protect skin. If you see these signs, stretch the time between baths, use a gentle shampoo made for dogs, and talk to your vet if the irritation doesn't clear up.",
      },
      { type: "h2", text: "Signs Your Dog Is Due" },
      {
        type: "ul",
        items: [
          "A noticeable odor that returns quickly after brushing",
          "Visible dirt, or a greasy feel to the coat",
          "Hair that looks clumped or dull",
          "Your dog was in something you'd rather not describe",
        ],
      },
      { type: "h2", text: "Brush First, Then Bathe" },
      {
        type: "p",
        html: "Whatever your schedule, brush before the bath. Water and shampoo can lock in tangles and turn small knots into tight mats. Our guide to <a href=\"/blog/how-to-brush-your-dog-between-grooming-appointments\" class=\"text-brand hover:underline font-medium\">brushing your dog between grooming appointments</a> covers the tools, and our article on <a href=\"/blog/matted-dog-fur-when-shaving-is-necessary\" class=\"text-brand hover:underline font-medium\">matted fur and when shaving is necessary</a> explains what happens when a coat is bathed with mats still in it. Ears also need care around bath time, so see our <a href=\"/blog/dog-ear-cleaning-humidity-infection-prevention\" class=\"text-brand hover:underline font-medium\">ear cleaning guide</a>.",
      },
      { type: "h2", text: "Where Professional Grooming Fits In" },
      {
        type: "p",
        html: "For many owners, a regular mobile groom replaces most home baths. The groomer bathes, dries, and brushes the coat properly, and you can top up at home with a rinse when needed. See our <a href=\"/blog/how-often-should-you-groom-your-dog-breed-guide\" class=\"text-brand hover:underline font-medium\">breed-by-breed grooming frequency guide</a> to plan how often to book.",
      },
      { type: "h2", text: "Find a Mobile Groomer Near You" },
      {
        type: "p",
        html: '<a href="/search" class="text-brand hover:underline font-medium">Search the full directory</a> or browse local listings in <a href="/groomers/raleigh-nc" class="text-brand hover:underline font-medium">Raleigh</a>, <a href="/groomers/apex-nc" class="text-brand hover:underline font-medium">Apex</a>, and <a href="/groomers/greensboro-nc" class="text-brand hover:underline font-medium">Greensboro</a> to find a mobile groomer near you.',
      },
    ],
  },
  {
    slug: "dog-anal-gland-expression-what-to-know",
    title: "Dog Anal Gland Expression: What It Is and Does Your Dog Need It",
    metaDescription:
      "Anal gland expression sounds unpleasant, but it's a routine part of grooming for many dogs. Learn what the glands do, the signs of a problem, and how often it's needed.",
    excerpt:
      "It's not the most glamorous topic in dog care, but ignoring it can lead to real discomfort for your dog. Here's what anal glands do and how to tell if yours needs help.",
    publishedAt: "2026-09-27",
    heroImage: {
      src: "https://upload.wikimedia.org/wikipedia/commons/d/de/Smooth_Dachshund_red_and_tan_portrait.jpg",
      alt: "Close-up portrait of a smooth-coated Dachshund with long ears in warm sunlight",
      width: 2352,
      height: 1960,
      author: "Raven Underwood",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Smooth_Dachshund_red_and_tan_portrait.jpg",
      license: "CC BY 2.0",
    },
    content: [
      {
        type: "p",
        html: "Anal glands aren't a fun topic, but they matter. Every dog has two small glands on either side of the anus that release a distinct-smelling fluid, normally in small amounts whenever your dog has a bowel movement. For most dogs this happens naturally and nobody ever thinks about it. For others, the glands don't empty well on their own, and that's when problems start.",
      },
      { type: "h2", text: "What the Glands Are For" },
      {
        type: "p",
        html: "The fluid these glands produce carries scent information dogs use to identify each other, which is part of why dogs sniff each other the way they do. In a healthy dog, normal bowel movements apply enough pressure to empty the glands on their own. Some dogs, though, especially small breeds, overweight dogs, and dogs with softer stools, don't empty them fully through normal activity.",
      },
      { type: "h2", text: "Signs Your Dog's Glands Need Attention" },
      {
        type: "ul",
        items: [
          "Scooting, or dragging their rear end along the ground or carpet",
          "Excessive licking or biting at the base of the tail",
          "A strong, fishy odor that doesn't go away with a bath",
          "Visible discomfort when sitting, or a reluctance to sit",
          "Swelling or redness near the tail base, which can signal an impacted or infected gland and needs a veterinarian, not a groomer",
        ],
      },
      { type: "h2", text: "Who's More Likely to Need Help" },
      {
        type: "p",
        html: "Small and toy breeds are commonly affected, along with dogs that are overweight or have consistently soft stool. Diet plays a role too. A vet can advise on whether more fiber would help your dog's glands empty more naturally. Plenty of dogs never need manual expression at all, so there's no need to add it to a routine your dog doesn't need.",
      },
      { type: "h2", text: "Who Handles Expression" },
      {
        type: "p",
        html: "Many groomers offer external gland expression as an add-on during a regular grooming appointment, done from outside the body. It's a routine service for groomers who offer it, similar to a nail trim. If your dog shows signs of an impacted, infected, or abscessed gland, that's a veterinary matter, since it may need internal treatment or medication that's outside what a groomer provides. When in doubt, or if signs don't improve after a routine expression, see your vet.",
      },
      { type: "h2", text: "Should You Do It Yourself?" },
      {
        type: "p",
        html: "It's technically possible to learn, but it's easy to do incorrectly, cause pain, or push fluid the wrong direction, so most owners leave it to a professional. If your dog needs frequent expression, ask your groomer or vet to show you what a normal, healthy gland feels like versus a full one, so you know what to watch for between visits.",
      },
      { type: "h2", text: "How This Fits Into a Grooming Routine" },
      {
        type: "p",
        html: "If your dog is prone to gland issues, it's worth mentioning at every grooming appointment rather than waiting for scooting to show up. It pairs naturally with the rest of a routine visit. Our guides to <a href=\"/blog/how-often-should-you-groom-your-dog-breed-guide\" class=\"text-brand hover:underline font-medium\">how often to groom by breed</a> and <a href=\"/blog/how-often-should-you-bathe-your-dog\" class=\"text-brand hover:underline font-medium\">how often to bathe your dog</a> cover the rest of a typical schedule, and our <a href=\"/blog/dog-nail-trims-why-they-matter-nick-the-quick\" class=\"text-brand hover:underline font-medium\">nail trim guide</a> covers another small but easy-to-overlook part of routine care.",
      },
      { type: "h2", text: "Find a Mobile Groomer Near You" },
      {
        type: "p",
        html: '<a href="/search" class="text-brand hover:underline font-medium">Search the full directory</a> or browse local listings in <a href="/groomers/durham-nc" class="text-brand hover:underline font-medium">Durham</a>, <a href="/groomers/cary-nc" class="text-brand hover:underline font-medium">Cary</a>, and <a href="/groomers/chapel-hill-nc" class="text-brand hover:underline font-medium">Chapel Hill</a> to find a mobile groomer near you.',
      },
    ],
  },
  {
    slug: "mobile-dog-grooming-apartment-no-driveway",
    title: "Can a Mobile Dog Groomer Come to an Apartment or a Home Without a Driveway?",
    metaDescription:
      "Live in an apartment, condo, or a home with no driveway? Here's what a mobile dog groomer typically needs, what to check with your landlord or HOA, and how to make booking easy.",
    excerpt:
      "No driveway doesn't automatically rule out mobile grooming. Here's what groomers usually need at your address, and what to sort out before booking.",
    publishedAt: "2026-09-28",
    heroImage: {
      src: "https://upload.wikimedia.org/wikipedia/commons/7/76/Bernese_Mountain_Dog_side_profile.jpg",
      alt: "A Bernese Mountain Dog standing on grass beside a chain-link fence with its tongue out",
      width: 2980,
      height: 1995,
      author: "Prof helix",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Bernese_Mountain_Dog_side_profile.jpg",
      license: "CC BY-SA 4.0",
    },
    content: [
      {
        type: "p",
        html: "One of the first questions people ask before booking a mobile groomer is whether it will work at their address. If you rent an apartment, own a condo, or live on a street with no driveway, it's natural to wonder where a grooming van or trailer would even go. The short answer is that it often works, but the details depend on the groomer and on your property's parking rules.",
      },
      { type: "h2", text: "What a Mobile Groomer Usually Needs" },
      {
        type: "p",
        html: "Setups vary from one business to the next, so treat this as a general picture and confirm with your groomer. Most mobile groomers work from a van or trailer, and many are self-contained, meaning they carry their own water and power. Others may ask for access to an outlet or a hose. The one thing nearly every mobile groomer needs is a legal place to park close to your door for the length of the appointment.",
      },
      {
        type: "ul",
        items: [
          "A legal parking spot near your home, on the street, in a lot, or in a driveway",
          "Enough room for the vehicle, which is larger than a typical car",
          "A short, safe walk between your door and the vehicle for your dog",
          "In some cases, access to power or water, if the groomer's setup requires it. Ask when you book",
        ],
      },
      { type: "h2", text: "Apartments and Condos" },
      {
        type: "p",
        html: "In a complex, the main question is parking. Some communities have guest parking, visitor permits, or gated entrances, and some restrict commercial vehicles. Before booking, it helps to check three things: where a visitor can legally park, whether the groomer needs a gate code or a visitor pass, and how far the parking area is from your door. Let the groomer know about stairs, elevators, and the walking distance so they can plan around it.",
      },
      { type: "h2", text: "Homes With No Driveway" },
      {
        type: "p",
        html: "If you live on a street with no driveway, the groomer can often park at the curb in front of your home, as long as it's legal and there's room. Give them clear instructions, such as which side of the street is open and any time limits or permit rules. On busy streets, a quick message the day before about where parking tends to be available can save time.",
      },
      { type: "h2", text: "HOAs and Neighborhood Rules" },
      {
        type: "p",
        html: "Some homeowner associations limit commercial vehicles or parking on the street. Rules differ widely, so it's worth checking yours if you're unsure. A service visit that lasts an hour or two is different from a vehicle parked overnight, but only your HOA can say how it applies. If there's a rule that could be a problem, ask the association before the appointment rather than during it.",
      },
      { type: "h2", text: "Rural Properties and Long Driveways" },
      {
        type: "p",
        html: "The opposite problem comes up on rural properties: gravel roads, soft ground after rain, steep or narrow driveways, or tight turning room. If any of that applies to you, mention it when you book so the groomer can decide where to park safely. North Carolina clay can get slick after a storm, so it's worth planning for that too.",
      },
      { type: "h2", text: "How to Make Booking Easy" },
      {
        type: "ul",
        items: [
          "Give the full address and exact parking instructions when you book",
          "Share any gate code, visitor pass rules, or building access details ahead of time",
          "Be ready at the door with your dog leashed so the appointment starts on time",
          "Mention stairs, long walks, or anything that could affect getting your dog to the vehicle",
        ],
      },
      { type: "h2", text: "What Happens Once You're Set Up" },
      {
        type: "p",
        html: "Once parking is sorted, the appointment itself is the same wherever you live. Our <a href=\"/blog/what-happens-during-mobile-dog-grooming-appointment-walkthrough\" class=\"text-brand hover:underline font-medium\">step-by-step walkthrough of a mobile grooming appointment</a> covers what to expect, and our <a href=\"/blog/how-to-prepare-for-first-mobile-grooming-appointment\" class=\"text-brand hover:underline font-medium\">first appointment prep guide</a> covers how to get ready. If you're still weighing your options, see <a href=\"/blog/mobile-dog-grooming-vs-salon-which-is-right\" class=\"text-brand hover:underline font-medium\">mobile grooming versus a salon</a>.",
      },
      { type: "h2", text: "Find a Mobile Groomer Near You" },
      {
        type: "p",
        html: '<a href="/search" class="text-brand hover:underline font-medium">Search the full directory</a> or browse local listings in <a href="/groomers/raleigh-nc" class="text-brand hover:underline font-medium">Raleigh</a>, <a href="/groomers/durham-nc" class="text-brand hover:underline font-medium">Durham</a>, and <a href="/groomers/cary-nc" class="text-brand hover:underline font-medium">Cary</a> to find a mobile groomer near you.',
      },
    ],
  },
  {
    slug: "does-my-dog-need-vaccinations-before-mobile-grooming",
    title: "Does My Dog Need to Be Vaccinated Before a Mobile Grooming Appointment?",
    metaDescription:
      "Most groomers ask about vaccination status before a first appointment. Here's why it matters, what's commonly requested, and how to prepare for booking.",
    excerpt:
      "It's a common question before a first booking: does my dog need shots before the groomer comes? Here's why it comes up and what to have ready.",
    publishedAt: "2026-09-30",
    heroImage: {
      src: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Beagle_puppy_Cadet_2.jpg",
      alt: "A young Beagle puppy looking up at the camera with an open, happy expression",
      width: 533,
      height: 543,
      author: "Soccersmp",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Beagle_puppy_Cadet_2.jpg",
      license: "CC BY-SA 4.0",
    },
    content: [
      {
        type: "p",
        html: "If this is your first time booking a mobile groomer, you may be asked about your dog's vaccination status before the appointment is confirmed. It's a reasonable question, and knowing why it's asked, and what's typically expected, makes booking faster and less stressful for everyone.",
      },
      { type: "h2", text: "Why Groomers Ask" },
      {
        type: "p",
        html: "A mobile groomer works closely with your dog, often in an enclosed van or trailer, and may handle several dogs from different households in a single day. Confirming vaccination status is a common-sense precaution that protects your dog, the groomer, and every other dog on the schedule that day. Policies vary by business, so what's requested at one groomer may differ slightly from another.",
      },
      { type: "h2", text: "What's Commonly Requested" },
      {
        type: "ul",
        items: [
          "<strong>Rabies vaccination:</strong> often required by state or local law regardless of grooming, and commonly the first thing a groomer will ask about",
          "<strong>Bordetella (kennel cough):</strong> frequently requested by groomers and boarding facilities, since dogs are sometimes in shared spaces or close quarters",
          "<strong>General up-to-date core vaccines:</strong> many groomers ask that a dog be current on their vet's recommended schedule",
        ],
      },
      {
        type: "p",
        html: "This isn't a complete or universal list, and requirements differ by groomer and sometimes by state or county law. Your veterinarian is the right source for what your dog actually needs and when, based on age, health, and lifestyle. When in doubt, ask the groomer directly what they require before you book.",
      },
      { type: "h2", text: "What to Have Ready" },
      {
        type: "ul",
        items: [
          "Your dog's vaccination records, or the name of your veterinary clinic if the groomer wants to verify directly",
          "The date of the most recent rabies vaccination",
          "Any known health conditions, allergies, or medications, since a groomer may adjust their approach around these",
          "Whether your dog is a puppy, and if so, where they are in their vaccination series. See our <a href=\"/blog/puppys-first-grooming-appointment-when-to-start\" class=\"text-brand hover:underline font-medium\">puppy grooming guide</a> for how age affects timing",
        ],
      },
      { type: "h2", text: "What If My Dog Isn't Fully Vaccinated Yet?" },
      {
        type: "p",
        html: "Puppies are usually still completing their vaccination series when owners first start thinking about grooming. Many groomers have their own policy for younger puppies, from waiting until certain vaccines are done to taking extra precautions during the visit. This is worth asking about directly when you book, rather than assuming either way.",
      },
      { type: "h2", text: "Health Conditions Are Worth Mentioning Too" },
      {
        type: "p",
        html: "Vaccination status is only part of the picture. If your dog has a skin condition, anxiety, mobility issues, or a history of reacting poorly to handling, telling the groomer ahead of time helps them prepare. Our guide to <a href=\"/blog/mobile-grooming-for-senior-and-anxious-dogs-nc\" class=\"text-brand hover:underline font-medium\">grooming senior and anxious dogs</a> covers how groomers commonly adjust for dogs who need extra patience.",
      },
      { type: "h2", text: "Getting Ready for the Appointment" },
      {
        type: "p",
        html: "Once vaccination and health details are sorted, the rest of preparation is straightforward. Our <a href=\"/blog/how-to-prepare-for-first-mobile-grooming-appointment\" class=\"text-brand hover:underline font-medium\">first appointment prep guide</a> covers what else to have ready, and our <a href=\"/blog/what-happens-during-mobile-dog-grooming-appointment-walkthrough\" class=\"text-brand hover:underline font-medium\">appointment walkthrough</a> covers what to expect once the groomer arrives.",
      },
      { type: "h2", text: "Find a Mobile Groomer Near You" },
      {
        type: "p",
        html: '<a href="/search" class="text-brand hover:underline font-medium">Search the full directory</a> or browse local listings in <a href="/groomers/raleigh-nc" class="text-brand hover:underline font-medium">Raleigh</a>, <a href="/groomers/durham-nc" class="text-brand hover:underline font-medium">Durham</a>, and <a href="/groomers/wake-forest-nc" class="text-brand hover:underline font-medium">Wake Forest</a> to find a mobile groomer near you.',
      },
    ],
  },
  {
    slug: "dog-paw-care-why-groomers-trim-fur-between-toes",
    title: "Dog Paw Care: Why Groomers Trim the Fur Between Your Dog's Toes",
    metaDescription:
      "Trimming the fur around a dog's paw pads is a small grooming step with a real purpose: traction, less debris buildup, and fewer mats between the toes.",
    excerpt:
      "It's an easy part of grooming to overlook, but the fur around your dog's paw pads affects traction, debris buildup, and comfort. Here's why groomers trim it.",
    publishedAt: "2026-10-01",
    heroImage: {
      src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Border_collie_running_down_the_beach_at_low_tide.jpg",
      alt: "A black and white Border Collie running along the shoreline",
      width: 640,
      height: 640,
      author: "Kyknoord",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Border_collie_running_down_the_beach_at_low_tide.jpg",
      license: "CC BY 2.0",
    },
    content: [
      {
        type: "p",
        html: "A dog's paws do a lot of work. They cover pavement, trails, grass, and gravel, and they're one of the few parts of the body that's in near-constant contact with whatever's underneath. Paw care is an easy detail to overlook in a grooming routine, but it's one that affects comfort and traction more than people expect.",
      },
      { type: "h2", text: "Why Fur Grows Between the Pads" },
      {
        type: "p",
        html: "Many dogs, especially breeds with thicker or longer coats, grow fur between and around their paw pads. In small amounts this is normal, but when it gets long it can hide what's actually touching the ground and start causing problems the owner doesn't immediately notice.",
      },
      { type: "h2", text: "What Overgrown Paw Fur Can Cause" },
      {
        type: "ul",
        items: [
          "<strong>Less traction:</strong> fur between the pads can make hardwood floors, tile, and smooth surfaces slicker for a dog to walk on",
          "<strong>Matting:</strong> dirt, grass seeds, and moisture collect in the fur and tangle, sometimes tight enough to be uncomfortable. See our <a href=\"/blog/matted-dog-fur-when-shaving-is-necessary\" class=\"text-brand hover:underline font-medium\">guide to matted fur</a> for how matting develops",
          "<strong>Ice and debris buildup in cold weather:</strong> longer paw fur holds onto snow, ice, and salt more than a trimmed paw does",
          "<strong>Hidden irritation:</strong> overgrown fur can mask redness, cracked pads, or something stuck between the toes until it's already bothering the dog",
        ],
      },
      { type: "h2", text: "Signs Your Dog's Paws Could Use Attention" },
      {
        type: "ul",
        items: [
          "Slipping or sliding on smooth floors more than usual",
          "Visibly long fur poking out between the toes or pads",
          "Licking or chewing at the paws",
          "Small mats or clumps visible when you check between the toes",
        ],
      },
      { type: "h2", text: "How It's Usually Handled" },
      {
        type: "p",
        html: "Paw trimming is typically a quick part of a regular groom rather than a separate appointment. A groomer trims the fur flush with the pad using scissors or clippers, which takes just a minute or two per paw. It's gentle when done carefully, and most dogs tolerate it well once they're used to having their paws handled.",
      },
      { type: "h2", text: "Checking Paws Between Grooms" },
      {
        type: "p",
        html: "Between appointments, it's worth glancing at your dog's paws every so often, especially after muddy walks or icy weather. A quick check for stuck debris, small mats, or cracked pads can catch a problem early. This pairs naturally with the rest of a home routine. Our guide to <a href=\"/blog/how-to-brush-your-dog-between-grooming-appointments\" class=\"text-brand hover:underline font-medium\">brushing between grooming appointments</a> and our <a href=\"/blog/dog-nail-trims-why-they-matter-nick-the-quick\" class=\"text-brand hover:underline font-medium\">nail trim guide</a> cover the rest of what deserves regular attention.",
      },
      { type: "h2", text: "Find a Mobile Groomer Near You" },
      {
        type: "p",
        html: '<a href="/search" class="text-brand hover:underline font-medium">Search the full directory</a> or browse local listings in <a href="/groomers/cary-nc" class="text-brand hover:underline font-medium">Cary</a>, <a href="/groomers/apex-nc" class="text-brand hover:underline font-medium">Apex</a>, and <a href="/groomers/greensboro-nc" class="text-brand hover:underline font-medium">Greensboro</a> to find a mobile groomer near you.',
      },
    ],
  },
  {
    slug: "golden-retriever-grooming-guide",
    title: "Golden Retriever Grooming Guide: Coat Care, Shedding, and What to Expect",
    metaDescription:
      "Golden Retrievers have a dense double coat that sheds year-round and heavily twice a year. Here's how to manage it, what a groomer does, and how NC humidity factors in.",
    excerpt:
      "That gorgeous Golden Retriever coat takes real upkeep. Here's what the double coat needs, how shedding season works, and what a groomer typically does for the breed.",
    publishedAt: "2026-10-02",
    heroImage: {
      src: "https://upload.wikimedia.org/wikipedia/commons/1/12/4_years_old_Golden_Retriever.JPG",
      alt: "A Golden Retriever sitting in a garden, showing its full feathered double coat",
      width: 1918,
      height: 1296,
      author: "BKP",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:4_years_old_Golden_Retriever.JPG",
      license: "CC BY-SA 3.0",
    },
    content: [
      {
        type: "p",
        html: "Golden Retrievers are bred to carry a dense, water-resistant double coat, and that coat is a big part of what makes the breed look the way it does. It's also real work to maintain. Left alone, it sheds constantly, mats in the feathering behind the ears and legs, and gets noticeably heavier twice a year. Here's what actually goes into keeping a Golden's coat healthy.",
      },
      { type: "h2", text: "Understanding the Double Coat" },
      {
        type: "p",
        html: "A Golden Retriever's coat has two layers: a coarser, water-repellent outer coat and a soft, dense undercoat that insulates. The undercoat is the one that sheds heavily, especially during seasonal coat blows in spring and fall. The two layers mean a Golden needs different tools than a single-coated breed, and brushing only the surface misses most of the problem.",
      },
      { type: "h2", text: "The Right Tools and Technique" },
      {
        type: "ul",
        items: [
          "<strong>Undercoat rake or slicker brush:</strong> reaches down to pull loose undercoat out rather than just smoothing the top layer",
          "<strong>Metal comb:</strong> useful for checking the feathering behind the ears, on the chest, and on the back of the legs, where mats tend to start",
          "<strong>Line brushing:</strong> working in small sections from the skin outward catches tangles a quick surface brush misses. Our <a href=\"/blog/how-to-brush-your-dog-between-grooming-appointments\" class=\"text-brand hover:underline font-medium\">brushing guide</a> covers the technique in more detail",
        ],
      },
      { type: "h2", text: "Shedding Season: What to Expect" },
      {
        type: "p",
        html: "Most Golden Retrievers shed year-round at a low level and then substantially more during two seasonal coat blows, typically as the weather changes in spring and fall. During these stretches, more frequent brushing and a de-shedding treatment at grooming appointments can make a real difference in how much hair ends up in the house. See our guide to <a href=\"/blog/grooming-double-coated-dogs-nc-humidity-shedding-season\" class=\"text-brand hover:underline font-medium\">grooming double-coated dogs in North Carolina</a> for how the state's humidity affects the timing.",
      },
      { type: "h2", text: "Bathing Without Weighing Down the Coat" },
      {
        type: "p",
        html: "Goldens don't typically need frequent baths, but when they do get one, a thorough rinse and a full dry matter more than people expect. Leaving a damp undercoat can trap moisture against the skin, which in NC's humidity can contribute to skin irritation and a musty odor. Our <a href=\"/blog/how-often-should-you-bathe-your-dog\" class=\"text-brand hover:underline font-medium\">bathing frequency guide</a> covers general timing by coat type.",
      },
      { type: "h2", text: "Ears, Which Need Extra Attention" },
      {
        type: "p",
        html: "A Golden Retriever's floppy, well-furred ears limit airflow, which can make them more prone to moisture buildup and ear infections than breeds with upright ears. Regular ear checks and cleaning are worth building into the routine. Our <a href=\"/blog/dog-ear-cleaning-humidity-infection-prevention\" class=\"text-brand hover:underline font-medium\">ear cleaning guide</a> covers what to watch for.",
      },
      { type: "h2", text: "What a Groomer Typically Does" },
      {
        type: "p",
        html: "A standard groom for a Golden Retriever usually includes a bath, a thorough blow-dry and brush-out to release loose undercoat, a sanitary trim, nail care, and ear cleaning. Most groomers avoid shaving a Golden's coat except in rare medical cases, since the double coat regulates temperature and protects skin, and shaving it can cause the regrowth to come in unevenly. Our guide to <a href=\"/blog/matted-dog-fur-when-shaving-is-necessary\" class=\"text-brand hover:underline font-medium\">when shaving is actually necessary</a> covers the exceptions.",
      },
      { type: "h2", text: "A Simple Maintenance Rhythm" },
      {
        type: "ul",
        items: [
          "Brush two to three times a week most of the year, more often during seasonal coat blows",
          "Check ears weekly, more often after swimming",
          "Book a professional groom with a de-shedding treatment every 6-8 weeks, adjusted for shedding season",
          "Trim nails regularly between grooms if they're audibly clicking on hard floors",
        ],
      },
      { type: "h2", text: "Find a Mobile Groomer Near You" },
      {
        type: "p",
        html: '<a href="/search" class="text-brand hover:underline font-medium">Search the full directory</a> or browse local listings in <a href="/groomers/raleigh-nc" class="text-brand hover:underline font-medium">Raleigh</a>, <a href="/groomers/cary-nc" class="text-brand hover:underline font-medium">Cary</a>, and <a href="/groomers/durham-nc" class="text-brand hover:underline font-medium">Durham</a> to find a mobile groomer near you.',
      },
    ],
  },
  {
    slug: "dachshund-grooming-guide",
    title: "Dachshund Grooming Guide: Coat Types, Back Health, and What to Expect",
    metaDescription:
      "Dachshunds come in smooth, wirehaired, and longhaired coats, each with different grooming needs. Here's how to care for each, plus handling tips for their long backs.",
    excerpt:
      "Smooth, wirehaired, or longhaired, a Dachshund's grooming needs depend heavily on which coat type you have. Here's how each is different, and what to know about handling.",
    publishedAt: "2026-10-02",
    heroImage: {
      src: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Longhaired_Dachshund_portrait.jpg",
      alt: "Close-up portrait of a longhaired Dachshund resting its chin on a book",
      width: 1024,
      height: 782,
      author: "Dan Bennett",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Longhaired_Dachshund_portrait.jpg",
      license: "CC BY 2.0",
    },
    content: [
      {
        type: "p",
        html: "Dachshunds come in three distinct coat types, and that one detail changes almost everything about how to groom one. A smooth Dachshund needs very little coat care, while a wirehaired or longhaired Dachshund needs a real routine. Add in their famously long back, and there's a bit more to know about this breed than its size suggests.",
      },
      { type: "h2", text: "Smooth Coat" },
      {
        type: "p",
        html: "The smooth coat is short, shiny, and low-maintenance. A weekly wipe-down with a rubber curry brush or grooming mitt removes loose hair and keeps the coat glossy. Smooth Dachshunds don't need haircuts, but they can still get cold easily given their short coat and small size, which is more of a comfort note than a grooming one.",
      },
      { type: "h2", text: "Wirehaired Coat" },
      {
        type: "p",
        html: "The wirehaired coat is dense, harsh-textured, and benefits from regular brushing to prevent matting, particularly around the beard and eyebrows. Some owners have this coat type hand-stripped periodically, a technique that removes dead hair and maintains the wiry texture, rather than clipped. Not every groomer offers hand-stripping, so it's worth asking specifically if you want that look maintained.",
      },
      { type: "h2", text: "Longhaired Coat" },
      {
        type: "p",
        html: "The longhaired coat is the one that needs the most attention. Feathering on the ears, chest, legs, and tail can mat if not brushed regularly, especially behind the ears and in the armpits. A metal comb is useful for checking that brushing is reaching the skin and not just smoothing the surface. Our <a href=\"/blog/how-to-brush-your-dog-between-grooming-appointments\" class=\"text-brand hover:underline font-medium\">brushing guide</a> covers the line-brushing technique that works well for feathered coats.",
      },
      { type: "h2", text: "Ear Care Across All Three Types" },
      {
        type: "p",
        html: "All Dachshunds have long, floppy ears regardless of coat type, which limits airflow and can make them more prone to wax buildup and infection. Regular ear checks are worth doing across the board. Our <a href=\"/blog/dog-ear-cleaning-humidity-infection-prevention\" class=\"text-brand hover:underline font-medium\">ear cleaning guide</a> covers what to look for.",
      },
      { type: "h2", text: "Handling a Long Back" },
      {
        type: "p",
        html: "Dachshunds are prone to back problems because of their long spine and short legs, and this is worth mentioning to your groomer, especially if your dog has had any back issues. A groomer experienced with the breed typically supports a Dachshund's body carefully during handling, avoiding unnecessary jumping or being held in a way that strains the back. If your dog has a known back condition, let the groomer know before the appointment starts.",
      },
      { type: "h2", text: "Nails Matter More Than They Look" },
      {
        type: "p",
        html: "Because Dachshunds are low to the ground, long nails can affect how their feet and legs sit when standing or walking, adding strain to a frame that's already long relative to its legs. Regular nail trims are a small thing that's easy to stay on top of. Our <a href=\"/blog/dog-nail-trims-why-they-matter-nick-the-quick\" class=\"text-brand hover:underline font-medium\">nail trim guide</a> covers how often that should happen.",
      },
      { type: "h2", text: "A Simple Routine by Coat Type" },
      {
        type: "ul",
        items: [
          "<strong>Smooth:</strong> weekly wipe-down, occasional bath, routine nail and ear care",
          "<strong>Wirehaired:</strong> regular brushing, periodic hand-stripping or trimming, routine nail and ear care",
          "<strong>Longhaired:</strong> brushing several times a week with attention to feathering, routine nail and ear care",
        ],
      },
      { type: "h2", text: "Find a Mobile Groomer Near You" },
      {
        type: "p",
        html: '<a href="/search" class="text-brand hover:underline font-medium">Search the full directory</a> or browse local listings in <a href="/groomers/durham-nc" class="text-brand hover:underline font-medium">Durham</a>, <a href="/groomers/apex-nc" class="text-brand hover:underline font-medium">Apex</a>, and <a href="/groomers/chapel-hill-nc" class="text-brand hover:underline font-medium">Chapel Hill</a> to find a mobile groomer near you.',
      },
    ],
  },
  {
    slug: "cairn-terrier-grooming-guide",
    title: "Cairn Terrier Grooming Guide: Hand-Stripping, Coat Care, and What to Expect",
    metaDescription:
      "Cairn Terriers have a harsh double coat that's often hand-stripped rather than clipped. Learn how the coat works, how to maintain it, and what to ask a groomer.",
    excerpt:
      "That scruffy Cairn Terrier look is the result of a specific coat type. Here's how hand-stripping compares to clipping, and how to keep the coat in shape between grooms.",
    publishedAt: "2026-10-02",
    heroImage: {
      src: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Cairn_Terrier_portrait.jpg",
      alt: "Portrait of a Cairn Terrier with a shaggy, harsh-textured coat and upright ears",
      width: 1600,
      height: 1600,
      author: "John",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Cairn_Terrier_portrait.jpg",
      license: "CC BY 2.0",
    },
    content: [
      {
        type: "p",
        html: "The Cairn Terrier's shaggy, slightly untidy look isn't an accident. It comes from a specific double coat that's different from the soft, fluffy coat many people picture on a small dog. That coat is also why Cairn owners often ask about hand-stripping, a technique many groomers don't offer. Here's how the coat works and what your options are.",
      },
      { type: "h2", text: "How a Cairn Terrier's Coat Works" },
      {
        type: "p",
        html: "Cairn Terriers have two layers: a harsh, weather-resistant outer coat and a soft undercoat beneath it. The outer coat is the one that gives the breed its rugged texture, and it was originally bred to protect the dog while working in rough, damp terrain. Compared with many breeds, Cairns are generally described as low-shedding, but the dead outer hair still needs to come out somehow.",
      },
      { type: "h2", text: "Hand-Stripping vs. Clipping" },
      {
        type: "p",
        html: "There are two common ways to keep a Cairn's coat tidy, and they produce different results.",
      },
      {
        type: "ul",
        items: [
          "<strong>Hand-stripping:</strong> a groomer pulls out dead outer hair by hand or with a stripping tool. It's commonly preferred for keeping the coat's harsh texture and natural color, and it's the traditional method for the breed. It takes skill and time, and not every groomer offers it",
          "<strong>Clipping:</strong> clippers cut the coat to a shorter, tidier length. It's faster and widely available, but clipping tends to soften the outer coat over time and can change its color and texture, which some owners are happy with and others aren't",
        ],
      },
      {
        type: "p",
        html: "Neither is wrong. Pet owners often choose based on lifestyle, budget, and how much they care about preserving the traditional coat. If hand-stripping matters to you, ask a groomer directly whether they offer it before you book, since this is a specialized skill.",
      },
      { type: "h2", text: "Brushing Between Grooms" },
      {
        type: "p",
        html: "Even a well-kept Cairn coat can tangle, especially in the longer hair on the legs, beard, and eyebrows. A slicker brush and a metal comb are the usual tools, and brushing a few times a week keeps small tangles from becoming mats. Our <a href=\"/blog/how-to-brush-your-dog-between-grooming-appointments\" class=\"text-brand hover:underline font-medium\">brushing guide</a> covers technique, and our guide to <a href=\"/blog/matted-dog-fur-when-shaving-is-necessary\" class=\"text-brand hover:underline font-medium\">matted fur</a> explains what happens when tangles get ahead of you.",
      },
      { type: "h2", text: "Bathing Without Softening the Coat" },
      {
        type: "p",
        html: "Over-bathing can strip natural oils and soften a harsh coat. Cairns generally don't need frequent baths unless they've gotten into something, so it's worth keeping the schedule modest. Our <a href=\"/blog/how-often-should-you-bathe-your-dog\" class=\"text-brand hover:underline font-medium\">bathing frequency guide</a> covers how coat type affects the right rhythm.",
      },
      { type: "h2", text: "Ears, Eyes, and Face" },
      {
        type: "p",
        html: "A Cairn's upright ears get better airflow than a floppy-eared breed's, but hair around the ears and eyes still collects debris. A quick tidy of the hair around the eyes and a regular ear check are good habits. Our <a href=\"/blog/dog-ear-cleaning-humidity-infection-prevention\" class=\"text-brand hover:underline font-medium\">ear cleaning guide</a> covers what to look for.",
      },
      { type: "h2", text: "Nails and Paws" },
      {
        type: "p",
        html: "Like any terrier that loves to dig and run, a Cairn benefits from regular nail trims and a check of the fur between the paw pads. See our guides on <a href=\"/blog/dog-nail-trims-why-they-matter-nick-the-quick\" class=\"text-brand hover:underline font-medium\">nail trims</a> and <a href=\"/blog/dog-paw-care-why-groomers-trim-fur-between-toes\" class=\"text-brand hover:underline font-medium\">paw care</a> for the basics.",
      },
      { type: "h2", text: "What to Ask a Groomer" },
      {
        type: "ul",
        items: [
          "Do you offer hand-stripping, or only clipping?",
          "What coat length and style do you recommend for my dog's lifestyle?",
          "How often should I book to keep the coat in shape?",
          "Do you do a tidy of the face, feet, and sanitary areas as part of a standard groom?",
        ],
      },
      { type: "h2", text: "Find a Mobile Groomer Near You" },
      {
        type: "p",
        html: '<a href="/search" class="text-brand hover:underline font-medium">Search the full directory</a> or browse local listings in <a href="/groomers/morrisville-nc" class="text-brand hover:underline font-medium">Morrisville</a>, <a href="/groomers/cary-nc" class="text-brand hover:underline font-medium">Cary</a>, and <a href="/groomers/raleigh-nc" class="text-brand hover:underline font-medium">Raleigh</a> to find a mobile groomer near you.',
      },
    ],
  },
  {
    slug: "poodle-grooming-guide",
    title: "Poodle Grooming Guide: Coat Care, Clip Styles, and How Often to Book",
    metaDescription:
      "Poodles have a curly, continuously growing coat that needs regular professional grooming. Learn how the coat works, common clip styles, and how to keep it from matting.",
    excerpt:
      "A Poodle's curly coat doesn't shed much, but it never stops growing and it mats quickly. Here's how the coat works, what clip styles are common, and how to stay ahead of tangles.",
    publishedAt: "2026-10-05",
    heroImage: {
      src: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Miniature_poodle.jpg",
      alt: "A groomed apricot Miniature Poodle lying down with a rounded topknot and fluffy leg and tail pom-poms",
      width: 3947,
      height: 2652,
      author: "Boxerista96",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Miniature_poodle.jpg",
      license: "CC BY 4.0",
    },
    content: [
      {
        type: "p",
        html: "Poodles are known for being low-shedding, which is a big part of their appeal. But low-shedding doesn't mean low-maintenance. A Poodle's dense, curly coat grows continuously, and the hair that does fall out tends to stay trapped in the curls instead of drifting onto your floor. That's why Poodles generally need regular professional grooming and consistent brushing at home.",
      },
      { type: "h2", text: "Three Sizes, One Coat Type" },
      {
        type: "p",
        html: "Poodles come in Toy, Miniature, and Standard sizes. The coat is the same type across all three, so the care principles are the same, but size affects handling, how long a groom takes, and how much coat there is to maintain. A Standard Poodle has much more hair to brush through than a Toy.",
      },
      { type: "h2", text: "Why Poodle Coats Mat" },
      {
        type: "p",
        html: "Tight curls and constantly growing hair create plenty of places for tangles to start, especially behind the ears, under the legs, around the collar, and along the tail. Because shed hair gets caught in the curls rather than falling out, a Poodle can look fine on the surface while a mat builds underneath. Our guide to <a href=\"/blog/matted-dog-fur-when-shaving-is-necessary\" class=\"text-brand hover:underline font-medium\">matted fur and when shaving is necessary</a> explains what happens when that goes too long.",
      },
      { type: "h2", text: "Common Clip Styles" },
      {
        type: "ul",
        items: [
          "<strong>Short all-over pet clip:</strong> a trimmed, even length across the body that's easy to maintain and popular for everyday pets",
          "<strong>Styled pet cuts:</strong> a longer, rounded topknot and ears with trimmed body and legs, sometimes with leg and tail pom-poms, for a more classic Poodle look",
          "<strong>Traditional show clips:</strong> styles such as the Continental and English Saddle are mainly seen in the show ring and take significant upkeep",
        ],
      },
      {
        type: "p",
        html: "Most pet Poodles do best with a pet-friendly clip that matches how much brushing the owner is realistically able to do. A longer, more styled coat looks great but needs more frequent care, so it's worth being honest with your groomer about your routine.",
      },
      { type: "h2", text: "How Often to Book" },
      {
        type: "p",
        html: "Many Poodle owners book a professional groom every four to six weeks, which is the same general range we cover in our <a href=\"/blog/how-often-should-you-groom-your-dog-breed-guide\" class=\"text-brand hover:underline font-medium\">breed-by-breed grooming frequency guide</a>. A shorter clip can stretch toward the longer end of that range, while a longer styled coat usually needs the shorter end.",
      },
      { type: "h2", text: "Brushing at Home" },
      {
        type: "p",
        html: "A slicker brush followed by a metal comb is the usual combination for a Poodle. Brush in sections down to the skin, and use the comb to check that you've reached the base of the coat. Our <a href=\"/blog/how-to-brush-your-dog-between-grooming-appointments\" class=\"text-brand hover:underline font-medium\">brushing guide</a> covers the technique, and several brushing sessions a week are common for longer coats.",
      },
      { type: "h2", text: "Bathing and Drying" },
      {
        type: "p",
        html: "Always brush a Poodle before the bath, since water can tighten tangles. A thorough dry afterward matters just as much, because a damp curly coat can trap moisture against the skin. Our <a href=\"/blog/how-often-should-you-bathe-your-dog\" class=\"text-brand hover:underline font-medium\">bathing frequency guide</a> covers timing by coat type.",
      },
      { type: "h2", text: "Ears, Face, and Tear Staining" },
      {
        type: "p",
        html: "Poodles can grow hair inside the ear canal, and some groomers remove excess hair as part of a groom. Opinions on how much to remove vary, so it's worth following your veterinarian's advice if your dog is prone to ear problems. Our <a href=\"/blog/dog-ear-cleaning-humidity-infection-prevention\" class=\"text-brand hover:underline font-medium\">ear cleaning guide</a> covers what to watch for. Poodles, especially light-colored ones, can also develop tear staining around the eyes, and keeping the face trimmed and clean helps.",
      },
      { type: "h2", text: "Poodle or Poodle Mix?" },
      {
        type: "p",
        html: "If you have a Poodle mix rather than a purebred, the coat can behave differently. Our <a href=\"/blog/doodle-poodle-mix-grooming-guide-different-coat-routine\" class=\"text-brand hover:underline font-medium\">doodle and poodle mix guide</a> covers how those coats differ and why the routine isn't always the same.",
      },
      { type: "h2", text: "What to Ask a Groomer" },
      {
        type: "ul",
        items: [
          "What clip would you recommend for my dog's lifestyle and my brushing routine?",
          "How often should I book to keep the coat from matting?",
          "How do you handle ear hair and face trimming?",
          "Is there a different approach for a puppy's first grooms?",
        ],
      },
      { type: "h2", text: "Find a Mobile Groomer Near You" },
      {
        type: "p",
        html: '<a href="/search" class="text-brand hover:underline font-medium">Search the full directory</a> or browse local listings in <a href="/groomers/raleigh-nc" class="text-brand hover:underline font-medium">Raleigh</a>, <a href="/groomers/cary-nc" class="text-brand hover:underline font-medium">Cary</a>, and <a href="/groomers/greensboro-nc" class="text-brand hover:underline font-medium">Greensboro</a> to find a mobile groomer near you.',
      },
    ],
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
