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
        html: 'Pricing also shifts a little by area. If you\'re comparing options, browse real local listings in <a href="/groomers/raleigh-nc" class="text-brand hover:underline font-medium">Raleigh</a>, <a href="/groomers/durham-nc" class="text-brand hover:underline font-medium">Durham</a>, <a href="/groomers/cary-nc" class="text-brand hover:underline font-medium">Cary</a>, and <a href="/groomers/chapel-hill-nc" class="text-brand hover:underline font-medium">Chapel Hill</a> to see what groomers in your specific area are charging and offering before you book.',
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
        html: 'Ready to try mobile grooming? <a href="/search" class="text-brand hover:underline font-medium">Search the full directory</a> by city or service, or browse groomers in <a href="/groomers/raleigh-nc" class="text-brand hover:underline font-medium">Raleigh</a>, <a href="/groomers/durham-nc" class="text-brand hover:underline font-medium">Durham</a>, <a href="/groomers/greensboro-nc" class="text-brand hover:underline font-medium">Greensboro</a>, and beyond.',
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
        html: 'The easiest way to stay on schedule is to book with the same groomer on a recurring basis rather than waiting until your dog obviously needs it. A mobile groomer coming to your driveway every 4-8 weeks (depending on breed) removes the friction of scheduling a drop-off, which is usually the real reason grooming gets pushed back in the first place. <a href="/search" class="text-brand hover:underline font-medium">Search the full directory</a> to find a groomer near you in <a href="/groomers/raleigh-nc" class="text-brand hover:underline font-medium">Raleigh</a>, <a href="/groomers/cary-nc" class="text-brand hover:underline font-medium">Cary</a>, <a href="/groomers/durham-nc" class="text-brand hover:underline font-medium">Durham</a>, and beyond.',
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
];

export function getAllBlogPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
