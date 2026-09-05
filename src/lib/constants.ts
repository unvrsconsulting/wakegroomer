export const SITE_NAME = "Piedmont Mobile Groomers";
export const REGION_NAME = "the NC Piedmont";

// Every incorporated town/city in a roughly 45-mile ring around Raleigh —
// Wake County plus the neighboring counties in every direction — through
// Durham/Orange County and up I-40/I-85 toward the Piedmont Triad
// (Greensboro/High Point).
export const SERVICE_AREA_CITIES = [
  // Wake County
  "Raleigh",
  "Cary",
  "Apex",
  "Garner",
  "Wake Forest",
  "Morrisville",
  "Holly Springs",
  "Fuquay-Varina",
  "Knightdale",
  "Rolesville",
  "Wendell",
  "Zebulon",
  // Franklin County (north)
  "Youngsville",
  "Franklinton",
  "Louisburg",
  // Granville County (north)
  "Oxford",
  "Butner",
  // Durham / Orange County
  "Durham",
  "Chapel Hill",
  "Carrboro",
  "Hillsborough",
  // Chatham County (southwest)
  "Pittsboro",
  "Siler City",
  // Harnett County (south)
  "Angier",
  "Lillington",
  // Johnston County (southeast)
  "Clayton",
  "Smithfield",
  "Selma",
  "Four Oaks",
  // Alamance County (toward Greensboro)
  "Mebane",
  "Burlington",
  "Graham",
  // Guilford County (Piedmont Triad)
  "Greensboro",
  "High Point",
  "Jamestown",
];

// Approximate town-center coordinates, used for the homepage coverage map.
export const CITY_COORDS: Record<string, [number, number]> = {
  Raleigh: [35.7796, -78.6382],
  Cary: [35.7915, -78.7811],
  Apex: [35.7327, -78.8503],
  Garner: [35.7113, -78.6142],
  "Wake Forest": [35.9799, -78.5097],
  Morrisville: [35.8235, -78.8256],
  "Holly Springs": [35.6513, -78.8336],
  "Fuquay-Varina": [35.5843, -78.8],
  Knightdale: [35.7885, -78.4756],
  Rolesville: [35.9235, -78.548],
  Wendell: [35.7799, -78.3714],
  Zebulon: [35.8232, -78.3125],
  Youngsville: [36.0148, -78.5786],
  Franklinton: [36.1015, -78.4561],
  Louisburg: [36.1035, -78.2986],
  Oxford: [36.3118, -78.5911],
  Butner: [36.1298, -78.7583],
  Durham: [35.994, -78.8986],
  "Chapel Hill": [35.9132, -79.0558],
  Carrboro: [35.9101, -79.0753],
  Hillsborough: [36.0754, -79.0997],
  Pittsboro: [35.7176, -79.177],
  "Siler City": [35.7241, -79.4622],
  Angier: [35.504, -78.7386],
  Lillington: [35.3932, -78.8175],
  Clayton: [35.6501, -78.4561],
  Smithfield: [35.5085, -78.3392],
  Selma: [35.5424, -78.2875],
  "Four Oaks": [35.4432, -78.4267],
  Mebane: [36.0965, -79.267],
  Burlington: [36.0959, -79.4378],
  Graham: [36.0684, -79.4053],
  Greensboro: [36.0726, -79.792],
  "High Point": [35.9557, -79.9922],
  Jamestown: [35.9979, -79.9331],
};

export const ALL_SERVICES = [
  "Full Groom",
  "Bath & Brush",
  "Nail Trim",
  "De-Shedding Treatment",
  "Puppy's First Groom",
  "Senior Dog Grooming",
  "Cat Grooming",
  "Teeth Brushing",
  "Ear Cleaning",
  "Flea & Tick Treatment",
];
