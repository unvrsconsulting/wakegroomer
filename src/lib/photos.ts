// Real photos from Wikimedia Commons (CC BY / CC BY-SA — attribution required).
// Credits are rendered in the Footer per license terms; do not remove.
export type CreditedPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
  author: string;
  sourceUrl: string;
  license: string;
};

export const PHOTOS = {
  heroDog: {
    src: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Smiling_golden_retriever_in_a_grass_field.jpg",
    alt: "Smiling golden retriever sitting in a grass field",
    width: 3039,
    height: 2014,
    author: "Vetman212",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Smiling_golden_retriever_in_a_grass_field.jpg",
    license: "CC BY-SA 4.0",
  },
  groomingAction: {
    src: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Dog_Groomer_Norwich.jpg",
    alt: "A groomer trimming a dog's coat",
    width: 3000,
    height: 4000,
    author: "Vipoochie",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Dog_Groomer_Norwich.jpg",
    license: "CC BY-SA 4.0",
  },
  happyDog: {
    src: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Golden_Retriever_smiling.jpg",
    alt: "A happy golden retriever smiling",
    width: 4032,
    height: 3024,
    author: "Doriguzzi",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Golden_Retriever_smiling.jpg",
    license: "CC BY 4.0",
  },
  groomedPoodle: {
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Standard_Poodle_portrait.jpg",
    alt: "A well-groomed standard poodle portrait",
    width: 3888,
    height: 2592,
    author: "John Leslie",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Standard_Poodle_portrait.jpg",
    license: "CC BY 2.0",
  },
  puppy: {
    src: "https://upload.wikimedia.org/wikipedia/commons/2/26/Yellow_Labrador_puppy_%284165776031%29.jpg",
    alt: "A yellow Labrador puppy outdoors",
    width: 3888,
    height: 2592,
    author: "IDS.photos (Tiverton, UK)",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Yellow_Labrador_puppy_(4165776031).jpg",
    license: "CC BY-SA 2.0",
  },
  corgi: {
    src: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Corgi_in_Dog_show_in_Morro_Bay.jpg",
    alt: "A corgi at a dog show in Morro Bay",
    width: 3136,
    height: 2091,
    author: "Mike Baird",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Corgi_in_Dog_show_in_Morro_Bay.jpg",
    license: "CC BY 2.0",
  },
} satisfies Record<string, CreditedPhoto>;

// Ordered pool used to cycle a variety of dogs across repeating UI (hero
// flourishes, service grid thumbnails) so the same photo doesn't repeat
// right next to itself.
export const PHOTO_POOL = [
  PHOTOS.heroDog,
  PHOTOS.groomedPoodle,
  PHOTOS.puppy,
  PHOTOS.corgi,
  PHOTOS.happyDog,
  PHOTOS.groomingAction,
];
