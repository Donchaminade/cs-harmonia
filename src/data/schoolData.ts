import { HeroSlide, SchoolFacility, StaffMember, ClassGrade, AcademicCycle } from '../types';

export const SCHOOL_INFO = {
  name: "Complexe Scolaire Harmonia",
  motto: "Travail - Discipline - Excellence",
  slogan: "Un cadre d'harmonie pour l'épanouissement de vos enfants",
  foundedYear: 2024,
  location: "Lomé, Adetikope, précisément dans le quartier Yevou",
  locationDetail: "À droite dans la Von, avant la maison Abass, tout droit à 150 mètres devant",
  email: "harmoniaschool925@gmail.com",
  phones: ["22 55 44 54", "90 06 25 24", "90 04 18 83"],
  phoneFormatted: "+228 22 55 44 54 / +228 90 06 25 24 / +228 90 04 18 83",
  colors: {
    blue: "#1a365d", // Navy blue
    gold: "#eab308", // Yellow Gold
  }
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1600",
    title: "L'excellence académique à portée de main",
    subtitle: "Au Complexe Scolaire Harmonia, nous cultivons le talent unique de chaque élève de la maternelle au lycée.",
    accentText: "Inscriptions Ouvertes 2026-2027"
  },
  {
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1600",
    title: "Un corps enseignant dévoué et dynamique",
    subtitle: "Des professeurs expérimentés qui guident vos enfants avec passion, rigueur et bienveillance au quotidien.",
    accentText: "Équipe Pédagogique d'Élite"
  },
  {
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=1600",
    title: "Des infrastructures modernes & stimulantes",
    subtitle: "Salles de classe spacieuses, laboratoire informatique équipé, bibliothèque riche et cantine saine.",
    accentText: "Cadre d'Apprentissage Idéal"
  }
];

export const GRADES: ClassGrade[] = [
  // Jardin d'enfants (Maternelle)
  { id: 'ps', name: 'Petite Section (PS)', cycle: 'jardin', tuitionFee: 110000 },
  { id: 'ms', name: 'Moyenne Section (MS)', cycle: 'jardin', tuitionFee: 120000 },
  { id: 'gs', name: 'Grande Section (GS)', cycle: 'jardin', tuitionFee: 120000 },
  
  // Cours Primaire
  { id: 'cp1', name: 'CP1', cycle: 'primaire', tuitionFee: 130000 },
  { id: 'cp2', name: 'CP2', cycle: 'primaire', tuitionFee: 130000 },
  { id: 'ce1', name: 'CE1', cycle: 'primaire', tuitionFee: 140000 },
  { id: 'ce2', name: 'CE2', cycle: 'primaire', tuitionFee: 140000 },
  { id: 'cm1', name: 'CM1', cycle: 'primaire', tuitionFee: 150000 },
  { id: 'cm2', name: 'CM2', cycle: 'primaire', tuitionFee: 150000 },
  
  // Collège
  { id: '6eme', name: '6ème', cycle: 'college', tuitionFee: 170000 },
  { id: '5eme', name: '5ème', cycle: 'college', tuitionFee: 170000 },
  { id: '4eme', name: '4ème', cycle: 'college', tuitionFee: 180000 },
  { id: '3eme', name: '3ème', cycle: 'college', tuitionFee: 190000 },
  
  // Lycée (Bientôt disponible)
  { id: '2nde_a4', name: 'Seconde A4', cycle: 'lycee', tuitionFee: 210000 },
  { id: '2nde_cd', name: 'Seconde C/D', cycle: 'lycee', tuitionFee: 210000 },
  { id: '1ere_a4', name: 'Première A4', cycle: 'lycee', tuitionFee: 220000 },
  { id: '1ere_d', name: 'Première D', cycle: 'lycee', tuitionFee: 220000 },
  { id: 'tle_a4', name: 'Terminale A4', cycle: 'lycee', tuitionFee: 230000 },
  { id: 'tle_d', name: 'Terminale D', cycle: 'lycee', tuitionFee: 230000 }
];

export const CYCLE_DETAILS = {
  jardin: {
    title: "Jardin d'enfants",
    age: "2 à 5 ans",
    description: "Un espace ludique, sécurisé et coloré pour une transition douce vers la scolarisation. Nous favorisons l'épanouissement sensoriel, l'expression orale et l'initiation à l'autonomie.",
    highlights: ["Éveil linguistique précoce (Anglais & Français)", "Activités de psychomotricité", "Chants, contes et travaux manuels", "Effectifs réduits pour un suivi personnalisé"]
  },
  primaire: {
    title: "Cours Primaire",
    age: "6 à 11 ans",
    description: "L'âge des apprentissages fondamentaux. Nous accordons une importance primordiale à la maîtrise de la lecture, de l'écriture, du calcul et des premières notions scientifiques.",
    highlights: ["Bilinguisme progressif", "Ressources numériques en classe", "Sorties pédagogiques et projets créatifs", "Accompagnement méthodologique personnalisé"]
  },
  college: {
    title: "Le Collège",
    age: "12 à 15 ans",
    description: "Un enseignement structuré pour consolider les acquis et développer l'esprit d'analyse. Nous préparons activement nos collégiens au Brevet d'Études du Premier Cycle (BEPC).",
    highlights: ["Salles de travaux pratiques", "Club scientifique & informatique", "Préparation intensive aux examens", "Développement de la citoyenneté et du leadership"]
  },
  lycee: {
    title: "Le Lycée (A4 & D)",
    age: "16 à 18 ans",
    status: "BIENTÔT DISPONIBLE",
    description: "Le cycle de la spécialisation et de l'orientation académique. Nous offrons un encadrement rigoureux pour les séries Littéraire (A4) et Scientifique (D) pour garantir l'accès aux meilleures universités.",
    highlights: ["Parcours d'excellence académique", "Conseils d'orientation post-bac", "Laboratoires spécialisés", "Travaux d'études guidés et conférences"]
  }
};

export const REGISTRATION_FEES: Record<AcademicCycle, number> = {
  jardin: 25000,
  primaire: 25000,
  college: 30000,
  lycee: 35000
};

export const EXTRA_FEES = {
  canteenMonthly: 15000,
  transportMonthly: 10000,
  monthsPerYear: 9
};

export const FACILITIES: SchoolFacility[] = [
  {
    id: "salles",
    name: "Grandes salles",
    frenchTitle: "Salles de classe aérées",
    description: "Des locaux modernes et parfaitement dimensionnés. Chaque salle est conçue pour optimiser la concentration, avec une ventilation naturelle optimale et un mobilier ergonomique adapté à chaque tranche d'âge.",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=1000",
    highlights: ["Tableaux blancs grand format", "Éclairage LED éco-responsable", "Rangement individuel pour chaque élève", "Affichages pédagogiques dynamiques"]
  },
  {
    id: "cantine",
    name: "Cantine scolaire",
    frenchTitle: "La Cantine d'Harmonia",
    description: "Une alimentation équilibrée et variée est essentielle pour l'apprentissage. Notre cantine propose des menus sains, préparés sur place dans des conditions d'hygiène rigoureuses sous l'œil de nutritionnistes.",
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=80&w=1000",
    highlights: ["Ingrédients frais et locaux", "Respect strict des normes d'hygiène", "Menus validés nutritionnellement", "Apprentissage du vivre-ensemble à table"]
  },
  {
    id: "librairie",
    name: "Librairie / Bibliothèque",
    frenchTitle: "L'Espace Lecture & Documentation",
    description: "Un véritable havre de savoir pour nourrir la curiosité des élèves. Notre bibliothèque regroupe des milliers d'ouvrages : manuels scolaires officiels, romans jeunesse, bandes dessinées et encyclopédies.",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1000",
    highlights: ["Coin lecture confortable pour les petits", "Espace d'étude silencieux pour les grands", "Ateliers hebdomadaires de lecture guidée", "Système d'emprunt de livres performant"]
  },
  {
    id: "informatique",
    name: "Salle informatique",
    frenchTitle: "Le Lab Digital & Informatique",
    description: "Parce que le monde de demain s'écrit avec le numérique. Notre laboratoire informatique permet aux élèves d'apprendre les bases de la bureautique, du codage créatif et de la recherche sécurisée en ligne.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000",
    highlights: ["Ordinateurs individuels modernes", "Connexion internet sécurisée et filtrée", "Initiation précoce au codage (Scratch)", "Sensibilisation à la citoyenneté numérique"]
  }
];

export const STAFF_MEMBERS: StaffMember[] = [
  {
    id: "dir",
    name: "M. Dondah Adjolou",
    role: "Directeur Fondateur",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    bio: "Fort de 15 ans d'expérience dans l'éducation et la gestion académique, M. Adjolou a fondé Harmonia avec une vision claire : offrir une formation de standard international accessible, axée sur les valeurs du travail et de la rigueur."
  },
  {
    id: "censeur",
    name: "Mme Amélie Lawson",
    role: "Censeur des Études",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    bio: "Spécialiste de la psychopédagogie, Mme Lawson coordonne le programme éducatif du primaire au collège, veillant au respect des programmes officiels et au perfectionnement continu de notre corps enseignant."
  },
  {
    id: "admin",
    name: "M. Kofi Mensah",
    role: "Secrétaire Général & Comptable",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    bio: "Pivot administratif de l'établissement, M. Mensah s'occupe de la gestion financière, des inscriptions et de la relation de confiance quotidienne avec les familles d'Harmonia."
  }
];

export const TESTIMONIALS = [
  {
    name: "Mme Kafui S.",
    role: "Mère de Koffi (CP2) et Amandine (Grande Section)",
    content: "Mes enfants adorent aller à l'école Harmonia ! L'accueil est extrêmement chaleureux, les professeurs sont très attentifs et le cadre est d'une propreté exemplaire. Les progrès de Koffi en lecture sont spectaculaires."
  },
  {
    name: "M. Kodjo T.",
    role: "Père de Mawuena (4ème)",
    content: "Ce qui me séduit au Complexe Scolaire Harmonia, c'est la discipline et la rigueur dans les études. Mon fils a développé un vrai rythme de travail grâce au suivi personnalisé mis en place par les enseignants. Je recommande à 100%."
  },
  {
    name: "Mme Eyram A.",
    role: "Mère de Sélom (Petite Section)",
    content: "Pour la maternelle, la sécurité et la douceur de l'encadrement sont mes priorités absolues. L'équipe du jardin d'enfants est formidable, très douce. Les locaux sont aérés, sécurisés, c'est idéal pour l'éveil."
  }
];
