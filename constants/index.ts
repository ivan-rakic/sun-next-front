import {
  SiFacebook,
  SiMixcloud,
  SiInstagram,
  SiSoundcloud,
  SiYoutube,
} from "react-icons/si";

export const mainLinks = [
  { id: "kosmos-mi", href: "/kosmos-mi", label: "Kosmos Mi" },
  { id: "program", href: "/program", label: "Program" },
  { id: "podrzi-sunce", href: "/podrzi-sunce", label: "Podrži Sunce" },
];

export const portalLinks = [
  { id: "podcasts", href: "/podcasts", label: "Podcasts" },
  { id: "articles", href: "/articles", label: "Articles" },
  { id: "news", href: "/news", label: "News" },
];

export const headerActions = [
  {
    id: "player",
    href: "https://player.sunradio.rs",
    label: "Player",
    external: true,
  },
  {
    id: "donate",
    href: "/podrzi-sunce",
    label: "Donate",
    primary: true,
  },
];

export const programDays = [
  {
    day: "Ponedeljak",
    shows: [
      {
        time: "06:00 - 08:00",
        title: "Sunrise Session",
        description: "Lagani jutarnji miks za početak dana.",
        isResident: false,
      },
      {
        time: "08:00 - 10:00",
        title: "Jutarnji program",
        description: "Vesti, muzika i pregled aktuelnosti.",
        isResident: false,
      },
      {
        time: "10:00 - 12:00",
        title: "Daily Flow",
        description: "Elektronski i chill dnevni ritmovi.",
        isResident: true,
        slug: "daily-flow",
      },
      {
        time: "12:00 - 14:00",
        title: "Sun Mix",
        description: "Odabrani hitovi i nova izdanja.",
        isResident: true,
        slug: "sun-mix",
      },
      {
        time: "14:00 - 16:00",
        title: "Open Frequencies",
        description: "Alternativni i indie zvuk.",
        isResident: false,
      },
      {
        time: "16:00 - 18:00",
        title: "City Pulse",
        description: "Popodnevni ritam grada.",
        isResident: false,
      },
      {
        time: "18:00 - 21:00",
        title: "Večernji program",
        description: "Autorske emisije i razgovori.",
        isResident: true,
        slug: "vecernji-program",
      },
      {
        time: "21:00 - 00:00",
        title: "Night Drive",
        description: "Noćni elektronski groove.",
        isResident: true,
        slug: "night-drive",
      },
    ],
  },

  {
    day: "Utorak",
    shows: [
      {
        time: "06:00 - 08:00",
        title: "Morning Echo",
        description: "Mirniji uvod u dan.",
        isResident: false,
      },
      {
        time: "08:00 - 10:00",
        title: "Jutarnji program",
        description: "Muzika i servisne informacije.",
        isResident: false,
      },
      {
        time: "10:00 - 12:00",
        title: "SunRadio Select",
        description: "Odabrani resident setovi.",
        isResident: true,
        slug: "sunradio-select",
      },
      {
        time: "12:00 - 14:00",
        title: "Midday Signals",
        description: "Lagani dnevni tempo.",
        isResident: false,
      },
      {
        time: "14:00 - 16:00",
        title: "Sun Mix",
        description: "Nove trake i lokalna scena.",
        isResident: true,
        slug: "sun-mix",
      },
      {
        time: "16:00 - 18:00",
        title: "Urban Lines",
        description: "Hip-hop, soul i broken beat.",
        isResident: false,
      },
      {
        time: "18:00 - 21:00",
        title: "Deep Signals",
        description: "Dub i deep elektronski zvuk.",
        isResident: true,
        slug: "deep-signals",
      },
      {
        time: "21:00 - 00:00",
        title: "Noćni talas",
        description: "Kasnovečernji ambijentalni izbor.",
        isResident: true,
        slug: "nocni-talas",
      },
    ],
  },

  {
    day: "Sreda",
    shows: [
      {
        time: "06:00 - 08:00",
        title: "Morning Atmosphere",
        description: "Lagani jutarnji ambient i downtempo.",
        isResident: false,
      },
      {
        time: "08:00 - 10:00",
        title: "Jutarnji program",
        description: "Aktuelnosti i dnevna muzika.",
        isResident: false,
      },
      {
        time: "10:00 - 12:00",
        title: "Analog Dreams",
        description: "Synthwave i retro elektronika.",
        isResident: true,
        slug: "analog-dreams",
      },
      {
        time: "12:00 - 14:00",
        title: "Open Air",
        description: "House i melodic selection.",
        isResident: false,
      },
      {
        time: "14:00 - 16:00",
        title: "Daily Rotation",
        description: "Dnevni izbor redakcije.",
        isResident: false,
      },
      {
        time: "16:00 - 18:00",
        title: "Sunset Frequencies",
        description: "Mellow ritmovi za kraj dana.",
        isResident: true,
        slug: "sunset-frequencies",
      },
      {
        time: "18:00 - 21:00",
        title: "Resident Session",
        description: "Gostujući DJ i resident emisije.",
        isResident: true,
        slug: "resident-session",
      },
      {
        time: "21:00 - 00:00",
        title: "Afterhours",
        description: "Minimal i deep techno selekcija.",
        isResident: true,
        slug: "afterhours",
      },
    ],
  },

  {
    day: "Četvrtak",
    shows: [
      {
        time: "06:00 - 08:00",
        title: "Sunrise Flow",
        description: "Jutarnji groove i chillout.",
        isResident: false,
      },
      {
        time: "08:00 - 10:00",
        title: "Jutarnji program",
        description: "Dnevni pregled i muzika.",
        isResident: false,
      },
      {
        time: "10:00 - 12:00",
        title: "Waveform",
        description: "Eksperimentalna elektronika.",
        isResident: true,
        slug: "waveform",
      },
      {
        time: "12:00 - 14:00",
        title: "Midday Groove",
        description: "House i disco selekcija.",
        isResident: false,
      },
      {
        time: "14:00 - 16:00",
        title: "City Stories",
        description: "Tematske emisije i intervjui.",
        isResident: false,
      },
      {
        time: "16:00 - 18:00",
        title: "Sun Mix",
        description: "Izbor nedeljnih favorita.",
        isResident: true,
        slug: "sun-mix",
      },
      {
        time: "18:00 - 21:00",
        title: "Night Signals",
        description: "Dub techno i melodic setovi.",
        isResident: true,
        slug: "night-signals",
      },
      {
        time: "21:00 - 00:00",
        title: "Late Frequencies",
        description: "Noćni elektronski miks.",
        isResident: false,
      },
    ],
  },

  {
    day: "Petak",
    shows: [
      {
        time: "06:00 - 08:00",
        title: "Weekend Start",
        description: "Lagani uvod u vikend.",
        isResident: false,
      },
      {
        time: "08:00 - 10:00",
        title: "Jutarnji program",
        description: "Pregled dana i muzika.",
        isResident: false,
      },
      {
        time: "10:00 - 12:00",
        title: "Friday Selection",
        description: "Redakcijski izbor nedelje.",
        isResident: false,
      },
      {
        time: "12:00 - 14:00",
        title: "SunRadio Club",
        description: "Club i dance selekcija.",
        isResident: true,
        slug: "sunradio-club",
      },
      {
        time: "14:00 - 16:00",
        title: "Open Frequencies",
        description: "Alternativni elektronski zvuk.",
        isResident: false,
      },
      {
        time: "16:00 - 18:00",
        title: "Weekend Warmup",
        description: "Energičniji ritmovi pred veče.",
        isResident: false,
      },
      {
        time: "18:00 - 21:00",
        title: "Friday Night",
        description: "Resident DJ večernji set.",
        isResident: true,
        slug: "friday-night",
      },
      {
        time: "21:00 - 00:00",
        title: "Club Rotation",
        description: "Kasnonoćni house i techno.",
        isResident: true,
        slug: "club-rotation",
      },
    ],
  },

  {
    day: "Subota",
    shows: [
      {
        time: "08:00 - 10:00",
        title: "Weekend Morning",
        description: "Sporiji vikend tempo.",
        isResident: false,
      },
      {
        time: "10:00 - 12:00",
        title: "Sunrise Vinyls",
        description: "Vinyl only selekcija.",
        isResident: true,
        slug: "sunrise-vinyls",
      },
      {
        time: "12:00 - 14:00",
        title: "Open Decks",
        description: "Gostujući lokalni DJ-evi.",
        isResident: false,
      },
      {
        time: "14:00 - 16:00",
        title: "House Movement",
        description: "Deep i soulful house.",
        isResident: true,
        slug: "house-movement",
      },
      {
        time: "16:00 - 18:00",
        title: "Sunset Lounge",
        description: "Balearic i lounge zvuk.",
        isResident: false,
      },
      {
        time: "18:00 - 21:00",
        title: "Resident Live",
        description: "Live stream DJ setovi.",
        isResident: true,
        slug: "resident-live",
      },
      {
        time: "21:00 - 00:00",
        title: "Saturday Night",
        description: "Glavni vikend program.",
        isResident: true,
        slug: "saturday-night",
      },
    ],
  },

  {
    day: "Nedelja",
    shows: [
      {
        time: "08:00 - 10:00",
        title: "Sunday Morning",
        description: "Mirniji početak nedelje.",
        isResident: false,
      },
      {
        time: "10:00 - 12:00",
        title: "Slow Frequencies",
        description: "Ambient i downtempo izbor.",
        isResident: true,
        slug: "slow-frequencies",
      },
      {
        time: "12:00 - 14:00",
        title: "Weekend Recap",
        description: "Najbolje iz prethodnih emisija.",
        isResident: false,
      },
      {
        time: "14:00 - 16:00",
        title: "Chill Selection",
        description: "Lagani house i electronica.",
        isResident: false,
      },
      {
        time: "16:00 - 18:00",
        title: "SunRadio Stories",
        description: "Razgovori i kulturne teme.",
        isResident: false,
      },
      {
        time: "18:00 - 21:00",
        title: "Sunday Session",
        description: "Nedeljni resident miks.",
        isResident: true,
        slug: "sunday-session",
      },
      {
        time: "21:00 - 00:00",
        title: "Night Breeze",
        description: "Zatvaranje nedelje uz chill elektroniku.",
        isResident: true,
        slug: "night-breeze",
      },
    ],
  },
];

export const navLinks = [
  {
    href: "https://www.facebook.com/sunradio.rs/",
    title: "Facebook",
    icon: SiFacebook,
    color: "1877f2",
    target: "_blank",
  },
  {
    href: "/podrzi-sunce",
    title: "Instagram",
    icon: SiInstagram,
    color: "e1306c",
  },
  {
    href: "/podcast",
    title: "YouTube",
    icon: SiYoutube,
    color: "ff0000",
  },
  {
    href: "/projekti",
    title: "Soundcloud",
    icon: SiSoundcloud,
    color: "ff8800",
  },
  {
    href: "/kosmos-mi",
    title: "Mixcloud",
    icon: SiMixcloud,
    color: "52aad8",
  },
];

export const ABOUT_CONTENT = `Sun Radio je slobodna internet radio stanica čija je misija stvaranje otvorenih formi umetničke, obrazovne i zabavne prirode. Alternativni javni servis za svu decu Sunca.`;

export const CONTACT_CONTENT = `Kontaktirajte nas:
redakcija.sun@gmail.com
Support the Sun:
Donate - More Info`;

export const NETWORKS_CONTENT = `Facebook
Instagram
MixCloud
SoundCloud
Twitter
Youtube`;

export const featureData = [
  {
    key: "protraceni-zivoti-irski",
    imageSrc: "/images/astronaut.jpg",
    title: "Protraceni zivoti irski: Tema za do 264 funte Sterlinga",
    slug: "protraceni-zivoti-irski",
    author: "ivander",
    timeToRead: "5 min",
    roundedImage: true,
    isPrimary: true,
  },
  {
    key: "nije-zivot-jedna-tegla-ajvara",
    imageSrc: "/images/beach.jpg",
    title: "Nije zivot jedna tegla ajvara",
    slug: "nije-zivot-jedna-tegla-ajvara",
    author: "ivander",
    timeToRead: "3 min",
    roundedImage: true,
    isPrimary: false,
  },
  {
    key: "mali-korak-za-muziku",
    imageSrc: "/images/ocean.jpg",
    title: "Mali korak za muziku, veliki za domacu bluz scenu",
    slug: "mali-korak-za-muziku",
    author: "ivander",
    timeToRead: "4 min",
    roundedImage: true,
    isPrimary: false,
  },
];

export type PodcastItem = {
  id: number;
  slug: string;
  title: string;
  date: string;
  displayDate: string;
  category: string;
  duration: string;
  image: string;
  description: string;
  mixcloudUrl: string;
};

export const PODCASTS: PodcastItem[] = [
  {
    id: 1,
    slug: "decije-igre",
    title: "Decije igre",
    date: "2022-03-01",
    displayDate: "March 1, 2022",
    category: "Show",
    duration: "62 min",
    image: "/images/mountains.jpg",
    description:
      "Radio emisija iz SunRadio arhive. Muzika, razgovor i slobodna akcija u kosmickom ritmu.",
    mixcloudUrl:
      "https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Fsunradiosan%2Fde%C4%8Dije-igre-emisija-4-sunradiors%2F",
  },
  {
    id: 2,
    slug: "solar-sessions-vol-18",
    title: "Solar Sessions Vol. 18",
    date: "2024-04-12",
    displayDate: "April 12, 2024",
    category: "Mix",
    duration: "60 min",
    image: "/images/flowers.jpg",
    description:
      "Melodican izbor za lagano putovanje kroz suncane frekvencije.",
    mixcloudUrl:
      "https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Fsunradiosan%2F",
  },
  {
    id: 3,
    slug: "orbit-sounds-episode-09",
    title: "Orbit Sounds Episode 09",
    date: "2024-05-03",
    displayDate: "May 3, 2024",
    category: "Podcast",
    duration: "66 min",
    image: "/images/astronaut.jpg",
    description: "Zvukovi orbite, razgovori i selekcija za nocno slusanje.",
    mixcloudUrl:
      "https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Fsunradiosan%2F",
  },
  {
    id: 4,
    slug: "stellar-vibrations-episode-42",
    title: "Stellar Vibrations Episode 42",
    date: "2024-06-10",
    displayDate: "June 10, 2024",
    category: "Deep",
    duration: "68 min",
    image: "/images/trees.jpg",
    description: "Melodican deep journey kroz frekvencije kosmosa.",
    mixcloudUrl:
      "https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Fsunradiosan%2F",
  },
  {
    id: 5,
    slug: "galactic-grooves-with-aria",
    title: "Galactic Grooves With Aria",
    date: "2024-07-21",
    displayDate: "July 21, 2024",
    category: "Afro House",
    duration: "70 min",
    image: "/images/ocean.jpg",
    description: "Afro house putovanje kroz galaksiju zvukova sa Ariom.",
    mixcloudUrl:
      "https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Fsunradiosan%2F",
  },
];
export const slides = [
  {
    src: "/images/astronaut.jpg",
    name: "Slide 1",
    desc: "Description 1",
    stat: "Stat 1",
  },
  {
    src: "/images/beach.jpg",
    name: "Slide 2",
    desc: "Description 2",
    stat: "Stat 2",
  },
  {
    src: "/images/ocean.jpg",
    name: "Slide 3",
    desc: "Description 3",
    stat: "Stat 3",
  },
  {
    src: "/images/mountains.jpg",
    name: "Slide 4",
    desc: "Description 4",
    stat: "Stat 4",
  },
];

export type ArticleItem = {
  slug: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  category: string;
  title: string;
  description: string;
  date: string;
  displayDate: string;
  content: string;
};

export const articles: ArticleItem[] = [
  {
    slug: "protraceni-zivoti-irski",
    href: "/articles/protraceni-zivoti-irski",
    imageSrc: "/images/mountains.jpg",
    imageAlt: "Mountains",
    category: "Kultura",
    title:
      "Protraćeni životi irski: Tema za do 264 funte Sterlinga (300 evra po današnjem kursu)?",
    description:
      "Elita vs Radništvo - Podeljeni grad Belfast i nacionalizam u Iraca",
    date: "2024-04-15",
    displayDate: "April 15, 2024",
    content:
      "Kompletan tekst članka o irskom životu i podeljenom gradu Belfastu koji dolazi iz Strapi CMS-a.",
  },
  {
    slug: "nije-zivot-jedna-tegla-ajvara",
    href: "/articles/nije-zivot-jedna-tegla-ajvara",
    imageSrc: "/images/beach.jpg",
    imageAlt: "Beach",
    category: "Životni stil",
    title: "Nije život jedna tegla ajvara",
    description: "O hrani, nostalgiji i onome što nas veže za prošlost.",
    date: "2024-05-02",
    displayDate: "May 2, 2024",
    content: "Kompletan tekst o ajvaru i životu koji dolazi iz Strapi CMS-a.",
  },
  {
    slug: "mali-korak-za-muziku",
    href: "/articles/mali-korak-za-muziku",
    imageSrc: "/images/ocean.jpg",
    imageAlt: "Ocean",
    category: "Muzika",
    title:
      'Mali korak za muziku, veliki za domaću bluz scenu - pesma "Locked Down"',
    description: "Kako jedna pesma može promeniti tok domaće muzičke scene.",
    date: "2024-05-20",
    displayDate: "May 20, 2024",
    content: "Kompletan tekst o bluz sceni koji dolazi iz Strapi CMS-a.",
  },
  {
    slug: "kosmicka-putovanja",
    href: "/articles/kosmicka-putovanja",
    imageSrc: "/images/galaxy.jpg",
    imageAlt: "Galaxy",
    category: "Nauka",
    title: "Kosmička putovanja: Šta znamo o svemiru",
    description: "Nauka i muzika se susreću u neočekivanom mestu.",
    date: "2024-06-01",
    displayDate: "June 1, 2024",
    content:
      "Kompletan tekst o kosmičkim putovanjima koji dolazi iz Strapi CMS-a.",
  },
];

export type NewsItem = {
  slug: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  category: string;
  title: string;
  description: string;
  date: string;
  displayDate: string;
  content: string;
};

export const news: NewsItem[] = [
  {
    slug: "novi-projekat-sunradio",
    href: "/news/novi-projekat-sunradio",
    imageSrc: "/images/astronaut.jpg",
    imageAlt: "Astronaut",
    category: "Novosti",
    title: "SunRadio pokreće novi projekat",
    description:
      "Saznajte više o uzbudljivom novom projektu koji je u pripremi.",
    date: "2024-07-01",
    displayDate: "July 1, 2024",
    content: "Detalji o novom projektu koji dolaze iz Strapi CMS-a.",
  },
  {
    slug: "festival-leto-2024",
    href: "/news/festival-leto-2024",
    imageSrc: "/images/beach.jpg",
    imageAlt: "Beach festival",
    category: "Događaji",
    title: "SunRadio na festivalu - Leto 2024",
    description: "SunRadio će biti prisutan na ovogodišnjem letnjim festivalu.",
    date: "2024-07-15",
    displayDate: "July 15, 2024",
    content: "Detalji o festivalu koji dolaze iz Strapi CMS-a.",
  },
  {
    slug: "nova-oprema-studio",
    href: "/news/nova-oprema-studio",
    imageSrc: "/images/mountains.jpg",
    imageAlt: "Studio",
    category: "Studio",
    title: "Nova oprema u SunRadio studiju",
    description: "Nadogradili smo naš studio novom audio opremom.",
    date: "2024-08-05",
    displayDate: "August 5, 2024",
    content: "Detalji o novoj opremi koji dolaze iz Strapi CMS-a.",
  },
  {
    slug: "gostovanje-radio-festivali",
    href: "/news/gostovanje-radio-festivali",
    imageSrc: "/images/ocean.jpg",
    imageAlt: "Ocean",
    category: "Gostovanje",
    title: "Gostovanje na regionalnim radio festivalima",
    description: "SunRadio predstavlja se na festivalima u regiji.",
    date: "2024-08-20",
    displayDate: "August 20, 2024",
    content: "Detalji o gostovanjima koji dolaze iz Strapi CMS-a.",
  },
];
