type TranslationShape<Value> = Value extends readonly unknown[]
  ? readonly string[]
  : Value extends object
    ? { [Key in keyof Value]: TranslationShape<Value[Key]> }
    : string;

export const serbianDictionary = {
  navigation: {
    portal: "Portal",
    kosmos: "Kosmos Mi",
    program: "Program",
    donate: "Podrži Sunce",
    podcasts: "Podkasti",
    articles: "Tekstovi",
    news: "Vesti",
    player: "Plejer",
    toggle: "Otvori navigaciju",
    socialLinks: "Društvene mreže",
    language: "Izaberi jezik",
  },
  footer: {
    about: "O NAMA",
    contact: "KONTAKT",
    tuneIn: "SLUŠAJ",
    networks: "MREŽE",
    streaming: "24/7 strimovanje na svim glavnim platformama.",
    copyright: "Copyright © Sun Radio 2017 - 2026",
  },
  player: {
    play: "Pusti",
    pause: "Pauziraj",
    mute: "Utišaj",
    unmute: "Uključi zvuk",
    volume: "Jačina zvuka",
    nowPlaying: "Sada svira",
    live: "UŽIVO",
    fallbackTrack: "SunRadio uživo",
    fallbackArtist: "SunRadio",
    fallbackTitle: "Uživo",
    artworkAlt: "Trenutno se emituje",
  },
  ticker: {
    recentlyPlayed: "Nedavno emitovano",
    liveLocations: "Lokacije slušalaca",
    listeners: "slušalaca",
    waitingForListeners: "čekamo slušaoce",
    fallbackItems: [
      "SUN RADIO",
      "Deep House",
      "Kosmički zvuci",
      "Podkasti",
      "Tekstovi",
      "Emisije uživo",
      "Zajednica",
    ],
  },
  ui: {
    readMore: "PROČITAJ VIŠE",
    viewAllPodcasts: "SVI PODKASTI",
    viewAllArticles: "SVI TEKSTOVI",
    backTo: "Nazad na",
    share: {
      share: "Podeli",
      copyLink: "Kopiraj link",
      copied: "Link je kopiran.",
      copyError: "Link nije moguće kopirati.",
      facebook: "Podeli na Facebooku",
      x: "Podeli na X-u",
    },
    loading: "Učitavanje",
    empty: "Nema sadržaja.",
    error: "Sadržaj trenutno nije dostupan.",
  },
  listing: {
    filterLabel: "Filtriraj po kategorijama",
    allCategories: "Sve kategorije",
    featuredHeading: "Najnoviji sadržaj",
    moreHeading: "Još sadržaja",
    loadMore: "Učitaj još",
    loading: "Učitavanje…",
    noResults: "Nema sadržaja za izabrane kategorije.",
    loadError: "Sadržaj trenutno nije moguće učitati.",
  },
  seo: {
    brand: "SunRadio",
    defaultTitle: "SunRadio — Nezavisni internet radio",
    defaultDescription:
      "SunRadio je nezavisna internet radio stanica posvećena muzici, kulturi i otvorenim idejama.",
    previewTitle: "Pregled sadržaja",
    pages: {
      home: {
        title: "Nezavisni internet radio",
        description:
          "Slušajte SunRadio, otkrijte podkaste, tekstove, vesti i emisije.",
      },
      articles: {
        title: "Tekstovi",
        description: "Članci, kolumne i priče iz SunRadio redakcije.",
      },
      news: {
        title: "Vesti",
        description: "Najnovije vesti, događaji i obaveštenja sa SunRadija.",
      },
      podcasts: {
        title: "Podkasti",
        description: "Emisije, miksevi i razgovori iz SunRadio arhive.",
      },
      program: {
        title: "Program",
        description: "Pogledajte raspored emisija i programa na SunRadiju.",
      },
      about: {
        title: "Redakcija",
        description: "Upoznajte ljude koji stvaraju SunRadio zajednicu.",
      },
      donate: {
        title: "Podrži Sunce",
        description: "Podržite nezavisni rad i razvoj SunRadija.",
      },
      projects: {
        title: "Projekti",
        description: "Posebni projekti i saradnje SunRadio zajednice.",
      },
      resident: {
        title: "Rezident SunRadija",
        description: "Upoznajte rezidente SunRadija i njihov rad.",
      },
    },
  },
  pages: {
    about: {
      eyebrow: "Kosmos Mi",
      residentsHeading: "Na Suncu svoje autorske sadržaje redovno emituju još",
      roles: {
        radioEditor: "Radio urednik",
        podcastHost: "Voditelj podkasta",
        socialMediaManager: "Menadžer društvenih mreža",
      },
    },
    podcasts: {
      eyebrow: "SunRadio arhiva",
      mixcloudArchive: "Mixcloud arhiva",
      latestDescription: "Odabrane emisije i miksevi iz SunRadio arhive.",
    },
    program: {
      eyebrow: "Program",
    },
    donate: {
      eyebrow: "Podržite SunRadio",
      paypal: "PayPal",
      patreon: "Patreon",
      communityTitle: "Sunce opstaje zahvaljujući zajednici",
      communityParagraphs: [
        "Godinama istrajavamo u izgradnji slobodnog i nezavisnog medija koji neguje kulturu za koju nema mesta u popularnim i komercijalnim sredstvima dezinformisanja.",
        "Naš radio ne emituje reklame. Nemamo sponzore niti finansijere. Ni od koga i ni od čega ne zavisimo. Sve što stvaramo je plod volonterskog rada članova naše slobodne redakcije.",
      ],
      directDonation: "Direktna donacija",
      dinarAccount: "Dinarski račun",
      foreignAccount: "Devizni račun",
      supportTitle: "Kako vaša podrška pomaže?",
      supportBenefits: [
        "Održavanje striminga i servera",
        "Razvoj emisija, podkasta i tekstova",
        "Podrška nezavisnoj internet radio kulturi",
      ],
      directDonationHeading: "Direktnom donacijom",
      accountNumber: "Broj računa:",
      transferPurpose: "Svrha uplate:",
      recipient: "Primalac:",
      swift: "SWIFT kod:",
      iban: "IBAN / broj računa:",
      intermediary: "Posrednička banka",
      accountWithInstitution: "Banka primaoca",
    },
    projects: {
      eyebrow: "SunRadio projekti",
    },
  },
  program: {
    weekdays: [
      "Ponedeljak",
      "Utorak",
      "Sreda",
      "Četvrtak",
      "Petak",
      "Subota",
      "Nedelja",
    ],
    morningAndDaytime: "Jutro i dan",
    eveningAndNight: "Veče i noć",
    empty: "Nema programa za ovaj period.",
  },
  home: {
    featured: "Izdvojeno",
    featuredDescription: "Pogledajte najnoviji izbor izdvojenog sadržaja.",
    latestEpisodes: "Najnovije epizode",
    latestPodcastsDescription: "Izdvojene podkaste koje smo odabrali za vas.",
    latestArticles: "Najnoviji tekstovi",
    latestArticlesDescription: "Izdvojene tekstove koje smo odabrali za vas.",
    popularResidents: "Popularni rezidenti",
    featuredTags: {
      article: "Tekstovi",
      podcast: "Podkasti",
      news: "Vesti",
    },
    featuredSlides: {
      mobileApp: {
        title: "Ponesi Sunce sa sobom",
        description: "Pobedi mrak, budi sunčev zrak! Skini mobilnu aplikaciju.",
        tag: "Emisija",
      },
      podcastSeries: {
        title: "Novi serijal emisija",
        description: "Autorski program, razgovori i muzika koju volimo.",
        tag: "Podkast",
      },
      programEvents: {
        title: "SunRadio događaji",
        description: "Prati najave, gostovanja i specijalne programe uživo.",
        tag: "Događaj",
      },
      editorial: {
        title: "Priče iz redakcije",
        description: "Kultura, muzika i ljudi koji donose drugačiji zvuk.",
        tag: "Tekst",
      },
    },
  },
  archive: {
    portalEyebrow: "SunRadio portal",
    articles: {
      title: "Tekstovi",
      description: "Tekstovi, kolumne i priče iz SunRadio redakcije.",
      sectionTitle: "Najnoviji tekstovi",
      sectionDescription: "Odabrani članci iz SunRadio arhive.",
    },
    news: {
      title: "Vesti",
      description: "Najnovije vesti, događaji i obaveštenja iz redakcije.",
      sectionTitle: "Najnovije vesti",
      sectionDescription: "Aktuelnosti iz SunRadio sveta.",
    },
  },
  donateBanner: {
    eyebrow: "Podržite SunRadio",
    title: "Podržite Sunce da nastavi da sija",
    description:
      "Pozivamo vas da podržite opstanak i rast našeg radija. Nemamo sponzore niti finansijere. Želimo da zavisimo samo od vas.",
    learnMore: "Saznajte više",
    paypal: "PayPal",
    patreon: "Patreon",
  },
  residents: {
    namePrefix: "Rezident",
    profileLabel: "Rezident",
    placeholder: "Detalji o ovom rezidentu biće dostupni uskoro.",
    examples: {
      podcast:
        "Primer rezidenta koji kroz podkaste otkriva nove ideje, priče i glasove.",
      news: "Primer profila posvećenog aktuelnim temama i pričama iz lokalne zajednice.",
      article:
        "Primer autora koji povezuje muziku, kulturu i priče iz svakodnevnog života.",
      radio:
        "Primer radio rezidenta koji kroz pažljivo odabrane setove istražuje nove zvuke.",
    },
    back: "Nazad na popularne rezidente",
    imageAlt: "Privremena ilustracija rezidenta",
    tags: {
      podcast: "Podkast",
      news: "Vesti",
      article: "Tekstovi",
      radio: "Radio",
    },
  },
  content: {
    imageAlt: "Slika sadržaja",
    embedTitle: "Ugrađeni medijski sadržaj",
    invalidContent: "Medijski sadržaj nije dostupan.",
    previousSlide: "Prethodna slika",
    nextSlide: "Sledeća slika",
  },
} as const;

export type FrontendDictionary = TranslationShape<typeof serbianDictionary>;

export const dictionaries = {
  "sr-Latn": serbianDictionary,
  en: {
    navigation: {
      portal: "Portal",
      kosmos: "Kosmos Mi",
      program: "Program",
      donate: "Support SunRadio",
      podcasts: "Podcasts",
      articles: "Articles",
      news: "News",
      player: "Player",
      toggle: "Toggle navigation",
      socialLinks: "Social links",
      language: "Choose language",
    },
    footer: {
      about: "ABOUT",
      contact: "CONTACT",
      tuneIn: "TUNE IN",
      networks: "NETWORKS",
      streaming: "24/7 streaming across all major platforms.",
      copyright: "Copyright © Sun Radio 2017 - 2026",
    },
    player: {
      play: "Play",
      pause: "Pause",
      mute: "Mute",
      unmute: "Unmute",
      volume: "Volume",
      nowPlaying: "Now playing",
      live: "LIVE",
      fallbackTrack: "SunRadio Live",
      fallbackArtist: "SunRadio",
      fallbackTitle: "Live",
      artworkAlt: "Now playing",
    },
    ticker: {
      recentlyPlayed: "Recently played",
      liveLocations: "Live locations",
      listeners: "listeners",
      waitingForListeners: "waiting for listeners",
      fallbackItems: [
        "SUN RADIO",
        "Deep House",
        "Cosmic Sounds",
        "Podcasts",
        "Articles",
        "Live Shows",
        "Community",
      ],
    },
    ui: {
      readMore: "READ MORE",
      viewAllPodcasts: "VIEW ALL PODCASTS",
      viewAllArticles: "VIEW ALL ARTICLES",
      backTo: "Back to",
      share: {
        share: "Share",
        copyLink: "Copy link",
        copied: "Link copied.",
        copyError: "Could not copy the link.",
        facebook: "Share on Facebook",
        x: "Share on X",
      },
      loading: "Loading",
      empty: "No content available.",
      error: "Content is currently unavailable.",
    },
    listing: {
      filterLabel: "Filter by category",
      allCategories: "All categories",
      featuredHeading: "Latest content",
      moreHeading: "More content",
      loadMore: "Load more",
      loading: "Loading…",
      noResults: "No content found for the selected categories.",
      loadError: "Content could not be loaded right now.",
    },
    seo: {
      brand: "SunRadio",
      defaultTitle: "SunRadio — Independent Online Radio",
      defaultDescription:
        "SunRadio is an independent online radio station for music, culture, and open ideas.",
      previewTitle: "Content preview",
      pages: {
        home: {
          title: "Independent Online Radio",
          description:
            "Listen to SunRadio and discover podcasts, articles, news, and shows.",
        },
        articles: {
          title: "Articles",
          description: "Articles, columns, and stories from the SunRadio team.",
        },
        news: {
          title: "News",
          description: "The latest SunRadio news, events, and announcements.",
        },
        podcasts: {
          title: "Podcasts",
          description:
            "Shows, mixes, and conversations from the SunRadio archive.",
        },
        program: {
          title: "Schedule",
          description: "Explore the SunRadio show and broadcast schedule.",
        },
        about: {
          title: "Our Team",
          description: "Meet the people who make up the SunRadio community.",
        },
        donate: {
          title: "Support SunRadio",
          description: "Support independent radio and the growth of SunRadio.",
        },
        projects: {
          title: "Projects",
          description:
            "Special projects and collaborations from the SunRadio community.",
        },
        resident: {
          title: "SunRadio Resident",
          description: "Meet SunRadio residents and discover their work.",
        },
      },
    },
    pages: {
      about: {
        eyebrow: "Kosmos Mi",
        residentsHeading:
          "Other creators also regularly broadcast their work on SunRadio",
        roles: {
          radioEditor: "Radio Editor",
          podcastHost: "Podcast Host",
          socialMediaManager: "Social Media Manager",
        },
      },
      podcasts: {
        eyebrow: "SunRadio archive",
        mixcloudArchive: "Mixcloud archive",
        latestDescription:
          "Selected shows and mixes from the SunRadio archive.",
      },
      program: {
        eyebrow: "Program",
      },
      donate: {
        eyebrow: "Support SunRadio",
        paypal: "PayPal",
        patreon: "Patreon",
        communityTitle: "SunRadio thrives because of its community",
        communityParagraphs: [
          "For years, we have worked to build a free and independent media outlet that supports culture overlooked by popular and commercial media.",
          "Our radio has no advertising, sponsors, or funders. Everything we create comes from the volunteer work of our independent editorial team.",
        ],
        directDonation: "Direct donation",
        dinarAccount: "Dinar account",
        foreignAccount: "Foreign currency account",
        supportTitle: "How does your support help?",
        supportBenefits: [
          "Maintaining streaming and servers",
          "Developing shows, podcasts, and articles",
          "Supporting independent internet radio culture",
        ],
        directDonationHeading: "Donate directly",
        accountNumber: "Account number:",
        transferPurpose: "Payment purpose:",
        recipient: "Recipient:",
        swift: "SWIFT code:",
        iban: "IBAN / account number:",
        intermediary: "Intermediary bank",
        accountWithInstitution: "Beneficiary bank",
      },
      projects: {
        eyebrow: "SunRadio projects",
      },
    },
    program: {
      weekdays: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      morningAndDaytime: "Morning & Daytime",
      eveningAndNight: "Evening & Night",
      empty: "No programming is available for this period.",
    },
    home: {
      featured: "Featured",
      featuredDescription: "Explore the latest selection of featured content.",
      latestEpisodes: "Latest episodes",
      latestPodcastsDescription: "Selected podcasts picked for you.",
      latestArticles: "Latest articles",
      latestArticlesDescription: "Selected articles picked for you.",
      popularResidents: "Popular Residents",
      featuredTags: {
        article: "Articles",
        podcast: "Podcasts",
        news: "News",
      },
      featuredSlides: {
        mobileApp: {
          title: "Take the Sun with You",
          description:
            "Beat the dark, be a ray of sunshine! Get the mobile app.",
          tag: "Show",
        },
        podcastSeries: {
          title: "A New Series",
          description: "Original shows, conversations, and music we love.",
          tag: "Podcast",
        },
        programEvents: {
          title: "SunRadio Events",
          description: "Follow announcements, guests, and special live shows.",
          tag: "Event",
        },
        editorial: {
          title: "Stories from the Team",
          description: "Culture, music, and people bringing a different sound.",
          tag: "Article",
        },
      },
    },
    archive: {
      portalEyebrow: "SunRadio portal",
      articles: {
        title: "Articles",
        description: "Articles, columns, and stories from the SunRadio team.",
        sectionTitle: "Latest articles",
        sectionDescription: "Selected stories from the SunRadio archive.",
      },
      news: {
        title: "News",
        description: "The latest news, events, and updates from the team.",
        sectionTitle: "Latest news",
        sectionDescription: "Updates from the world of SunRadio.",
      },
    },
    donateBanner: {
      eyebrow: "Support SunRadio",
      title: "Help Sun keep shining",
      description:
        "Support the continuity and growth of our radio. We have no sponsors or funders; we want to rely on you alone.",
      learnMore: "Learn more",
      paypal: "PayPal",
      patreon: "Patreon",
    },
    residents: {
      namePrefix: "Resident",
      profileLabel: "Resident",
      placeholder: "More information about this resident will be added soon.",
      examples: {
        podcast:
          "An example resident sharing new ideas, stories, and voices through podcasts.",
        news: "An example profile focused on current topics and stories from the local community.",
        article:
          "An example writer connecting music, culture, and stories from everyday life.",
        radio:
          "An example radio resident exploring new sounds through carefully curated sets.",
      },
      back: "Back to popular residents",
      imageAlt: "Temporary resident illustration",
      tags: {
        podcast: "Podcast",
        news: "News",
        article: "Articles",
        radio: "Radio",
      },
    },
    content: {
      imageAlt: "Content image",
      embedTitle: "Embedded media",
      invalidContent: "Media is unavailable.",
      previousSlide: "Previous image",
      nextSlide: "Next image",
    },
  } satisfies FrontendDictionary,
  de: {
    navigation: {
      portal: "Portal",
      kosmos: "Kosmos Mi",
      program: "Programm",
      donate: "SunRadio unterstützen",
      podcasts: "Podcasts",
      articles: "Artikel",
      news: "Neuigkeiten",
      player: "Player",
      toggle: "Navigation umschalten",
      socialLinks: "Soziale Netzwerke",
      language: "Sprache wählen",
    },
    footer: {
      about: "ÜBER UNS",
      contact: "KONTAKT",
      tuneIn: "EINSCHALTEN",
      networks: "NETZWERKE",
      streaming: "24/7 Streaming auf allen wichtigen Plattformen.",
      copyright: "Copyright © Sun Radio 2017 - 2026",
    },
    player: {
      play: "Abspielen",
      pause: "Pausieren",
      mute: "Stummschalten",
      unmute: "Ton einschalten",
      volume: "Lautstärke",
      nowPlaying: "Läuft gerade",
      live: "LIVE",
      fallbackTrack: "SunRadio Live",
      fallbackArtist: "SunRadio",
      fallbackTitle: "Live",
      artworkAlt: "Läuft gerade",
    },
    ticker: {
      recentlyPlayed: "Kürzlich gespielt",
      liveLocations: "Hörerstandorte",
      listeners: "Hörer",
      waitingForListeners: "warte auf Hörer",
      fallbackItems: [
        "SUN RADIO",
        "Deep House",
        "Kosmische Klänge",
        "Podcasts",
        "Artikel",
        "Live-Shows",
        "Community",
      ],
    },
    ui: {
      readMore: "WEITERLESEN",
      viewAllPodcasts: "ALLE PODCASTS",
      viewAllArticles: "ALLE ARTIKEL",
      backTo: "Zurück zu",
      share: {
        share: "Teilen",
        copyLink: "Link kopieren",
        copied: "Link kopiert.",
        copyError: "Der Link konnte nicht kopiert werden.",
        facebook: "Auf Facebook teilen",
        x: "Auf X teilen",
      },
      loading: "Lädt",
      empty: "Keine Inhalte verfügbar.",
      error: "Inhalte sind derzeit nicht verfügbar.",
    },
    listing: {
      filterLabel: "Nach Kategorie filtern",
      allCategories: "Alle Kategorien",
      featuredHeading: "Neueste Inhalte",
      moreHeading: "Weitere Inhalte",
      loadMore: "Mehr laden",
      loading: "Wird geladen…",
      noResults: "Keine Inhalte für die ausgewählten Kategorien gefunden.",
      loadError: "Inhalte können derzeit nicht geladen werden.",
    },
    seo: {
      brand: "SunRadio",
      defaultTitle: "SunRadio — Unabhängiges Internetradio",
      defaultDescription:
        "SunRadio ist ein unabhängiger Internetradiosender für Musik, Kultur und offene Ideen.",
      previewTitle: "Inhaltsvorschau",
      pages: {
        home: {
          title: "Unabhängiges Internetradio",
          description:
            "Höre SunRadio und entdecke Podcasts, Artikel, Nachrichten und Sendungen.",
        },
        articles: {
          title: "Artikel",
          description:
            "Artikel, Kolumnen und Geschichten aus dem SunRadio-Team.",
        },
        news: {
          title: "Neuigkeiten",
          description:
            "Die neuesten Nachrichten, Veranstaltungen und Meldungen von SunRadio.",
        },
        podcasts: {
          title: "Podcasts",
          description: "Sendungen, Mixe und Gespräche aus dem SunRadio-Archiv.",
        },
        program: {
          title: "Programm",
          description: "Entdecke den Sendeplan und das Programm von SunRadio.",
        },
        about: {
          title: "Unser Team",
          description:
            "Lerne die Menschen hinter der SunRadio-Community kennen.",
        },
        donate: {
          title: "SunRadio unterstützen",
          description:
            "Unterstütze unabhängiges Radio und die Entwicklung von SunRadio.",
        },
        projects: {
          title: "Projekte",
          description:
            "Besondere Projekte und Kooperationen der SunRadio-Community.",
        },
        resident: {
          title: "SunRadio Resident",
          description: "Lerne SunRadio Residents und ihre Arbeit kennen.",
        },
      },
    },
    pages: {
      about: {
        eyebrow: "Kosmos Mi",
        residentsHeading:
          "Auch andere Kreative senden regelmäßig ihre Inhalte auf SunRadio",
        roles: {
          radioEditor: "Radioredaktion",
          podcastHost: "Podcast-Moderation",
          socialMediaManager: "Social-Media-Management",
        },
      },
      podcasts: {
        eyebrow: "SunRadio Archiv",
        mixcloudArchive: "Mixcloud-Archiv",
        latestDescription:
          "Ausgewählte Sendungen und Mixe aus dem SunRadio-Archiv.",
      },
      program: {
        eyebrow: "Programm",
      },
      donate: {
        eyebrow: "Unterstütze SunRadio",
        paypal: "PayPal",
        patreon: "Patreon",
        communityTitle: "SunRadio besteht dank seiner Community",
        communityParagraphs: [
          "Seit Jahren bauen wir ein freies und unabhängiges Medium auf, das Kultur fördert, für die es in populären und kommerziellen Medien wenig Platz gibt.",
          "Unser Radio sendet keine Werbung und hat keine Sponsoren oder Geldgeber. Alles, was wir schaffen, entsteht durch die ehrenamtliche Arbeit unseres unabhängigen Teams.",
        ],
        directDonation: "Direkte Spende",
        dinarAccount: "Dinar-Konto",
        foreignAccount: "Fremdwährungskonto",
        supportTitle: "Wie hilft deine Unterstützung?",
        supportBenefits: [
          "Streaming und Server betreiben",
          "Sendungen, Podcasts und Artikel entwickeln",
          "Unabhängige Internetradiokultur unterstützen",
        ],
        directDonationHeading: "Direkt spenden",
        accountNumber: "Kontonummer:",
        transferPurpose: "Verwendungszweck:",
        recipient: "Empfänger:",
        swift: "SWIFT-Code:",
        iban: "IBAN / Kontonummer:",
        intermediary: "Vermittlerbank",
        accountWithInstitution: "Empfängerbank",
      },
      projects: {
        eyebrow: "SunRadio Projekte",
      },
    },
    program: {
      weekdays: [
        "Montag",
        "Dienstag",
        "Mittwoch",
        "Donnerstag",
        "Freitag",
        "Samstag",
        "Sonntag",
      ],
      morningAndDaytime: "Morgen & Tag",
      eveningAndNight: "Abend & Nacht",
      empty: "Für diesen Zeitraum ist kein Programm verfügbar.",
    },
    home: {
      featured: "Ausgewählt",
      featuredDescription: "Entdecke unsere aktuelle Auswahl an Empfehlungen.",
      latestEpisodes: "Neueste Episoden",
      latestPodcastsDescription: "Ausgewählte Podcasts für dich.",
      latestArticles: "Neueste Artikel",
      latestArticlesDescription: "Ausgewählte Artikel für dich.",
      popularResidents: "Beliebte Residents",
      featuredTags: {
        article: "Artikel",
        podcast: "Podcasts",
        news: "Neuigkeiten",
      },
      featuredSlides: {
        mobileApp: {
          title: "Die Sonne immer dabei",
          description: "Bring Licht ins Dunkel und lade die App herunter.",
          tag: "Sendung",
        },
        podcastSeries: {
          title: "Eine neue Sendereihe",
          description: "Eigene Sendungen, Gespräche und Musik, die wir lieben.",
          tag: "Podcast",
        },
        programEvents: {
          title: "SunRadio Veranstaltungen",
          description: "Ankündigungen, Gäste und besondere Live-Sendungen.",
          tag: "Event",
        },
        editorial: {
          title: "Geschichten aus dem Team",
          description: "Kultur, Musik und Menschen mit einem anderen Sound.",
          tag: "Artikel",
        },
      },
    },
    archive: {
      portalEyebrow: "SunRadio Portal",
      articles: {
        title: "Artikel",
        description: "Artikel, Kolumnen und Geschichten aus dem SunRadio-Team.",
        sectionTitle: "Neueste Artikel",
        sectionDescription: "Ausgewählte Beiträge aus dem SunRadio-Archiv.",
      },
      news: {
        title: "Neuigkeiten",
        description: "Neuigkeiten, Veranstaltungen und Meldungen aus dem Team.",
        sectionTitle: "Neueste Meldungen",
        sectionDescription: "Aktuelles aus der SunRadio-Welt.",
      },
    },
    donateBanner: {
      eyebrow: "Unterstütze SunRadio",
      title: "Hilf mit, dass die Sonne weiter scheint",
      description:
        "Unterstütze den Fortbestand und das Wachstum unseres Radios. Wir haben keine Sponsoren oder Geldgeber und möchten allein auf dich zählen.",
      learnMore: "Mehr erfahren",
      paypal: "PayPal",
      patreon: "Patreon",
    },
    residents: {
      namePrefix: "Resident",
      profileLabel: "Resident",
      placeholder: "Weitere Informationen zu diesem Resident folgen in Kürze.",
      examples: {
        podcast:
          "Ein Beispiel-Resident, der durch Podcasts neue Ideen, Geschichten und Stimmen teilt.",
        news: "Ein Beispielprofil zu aktuellen Themen und Geschichten aus der lokalen Gemeinschaft.",
        article:
          "Ein Beispielautor, der Musik, Kultur und Geschichten aus dem Alltag verbindet.",
        radio:
          "Ein Beispiel-Radio-Resident, der mit sorgfältig ausgewählten Sets neue Klänge erkundet.",
      },
      back: "Zurück zu beliebten Residents",
      imageAlt: "Vorläufige Resident-Illustration",
      tags: {
        podcast: "Podcast",
        news: "Nachrichten",
        article: "Artikel",
        radio: "Radio",
      },
    },
    content: {
      imageAlt: "Inhaltsbild",
      embedTitle: "Eingebettete Medien",
      invalidContent: "Medien sind nicht verfügbar.",
      previousSlide: "Vorheriges Bild",
      nextSlide: "Nächstes Bild",
    },
  } satisfies FrontendDictionary,
} satisfies Record<"sr-Latn" | "en" | "de", FrontendDictionary>;
