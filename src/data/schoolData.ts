import { ClassGrade, AcademicCycle } from '../types';

export const SITE_URL = 'https://csharmonia.vercel.app';

export const SCHOOL_INFO = {
  name: 'Complexe Scolaire Harmonia',
  shortName: 'Harmonia',
  motto: 'Travail - Discipline - Excellence',
  slogan: "Un cadre d'harmonie pour l'épanouissement de vos enfants",
  foundedYear: 2024,
  location: 'Lomé, Adetikopé, quartier Yevou',
  locationDetail: "À droite dans la Von, avant la maison Abass, tout droit à 150 mètres devant",
  email: 'harmoniaschool925@gmail.com',
  phones: ['22 55 44 54', '90 06 25 24', '90 04 18 83'],
  whatsapp: '22890062524',
  mapQuery: 'Adetikopé, Lomé, Togo',
};

export const tel = (p: string) => `tel:+228${p.replace(/\s/g, '')}`;

export const img = (name: string) => ({
  src: `/images/${name}-800.webp`,
  srcSet: `/images/${name}-800.webp 800w, /images/${name}-1600.webp 1600w`,
});

export const GRADES: ClassGrade[] = [
  { id: 'ps', name: 'Petite Section (PS)', cycle: 'jardin', tuitionFee: 110000 },
  { id: 'ms', name: 'Moyenne Section (MS)', cycle: 'jardin', tuitionFee: 120000 },
  { id: 'gs', name: 'Grande Section (GS)', cycle: 'jardin', tuitionFee: 120000 },
  { id: 'cp1', name: 'CP1', cycle: 'primaire', tuitionFee: 130000 },
  { id: 'cp2', name: 'CP2', cycle: 'primaire', tuitionFee: 130000 },
  { id: 'ce1', name: 'CE1', cycle: 'primaire', tuitionFee: 140000 },
  { id: 'ce2', name: 'CE2', cycle: 'primaire', tuitionFee: 140000 },
  { id: 'cm1', name: 'CM1', cycle: 'primaire', tuitionFee: 150000 },
  { id: 'cm2', name: 'CM2', cycle: 'primaire', tuitionFee: 150000 },
  { id: '6eme', name: '6ème', cycle: 'college', tuitionFee: 170000 },
  { id: '5eme', name: '5ème', cycle: 'college', tuitionFee: 170000 },
  { id: '4eme', name: '4ème', cycle: 'college', tuitionFee: 180000 },
  { id: '3eme', name: '3ème', cycle: 'college', tuitionFee: 190000 },
  { id: '2nde_a4', name: 'Seconde A4', cycle: 'lycee', tuitionFee: 210000 },
  { id: '2nde_cd', name: 'Seconde C/D', cycle: 'lycee', tuitionFee: 210000 },
  { id: '1ere_a4', name: 'Première A4', cycle: 'lycee', tuitionFee: 220000 },
  { id: '1ere_d', name: 'Première D', cycle: 'lycee', tuitionFee: 220000 },
  { id: 'tle_a4', name: 'Terminale A4', cycle: 'lycee', tuitionFee: 230000 },
  { id: 'tle_d', name: 'Terminale D', cycle: 'lycee', tuitionFee: 230000 },
];

export const CYCLES: Record<AcademicCycle, { title: string; levels: string; age: string; image: string; soon?: boolean; description: string; highlights: string[] }> = {
  jardin: {
    title: "Jardin d'enfants", levels: 'PS · MS · GS', age: '2 à 5 ans', image: 'eveil',
    description: "Un espace ludique, sécurisé et coloré pour une transition douce vers la scolarisation : éveil sensoriel, expression orale et premiers pas vers l'autonomie.",
    highlights: ['Éveil linguistique précoce (français & anglais)', 'Psychomotricité', 'Chants, contes et travaux manuels', 'Effectifs réduits'],
  },
  primaire: {
    title: 'Cours primaire', levels: 'CP1 → CM2', age: '6 à 11 ans', image: 'classe-primaire',
    description: "L'âge des apprentissages fondamentaux : lecture, écriture, calcul et premières notions scientifiques, avec une initiation au numérique.",
    highlights: ['Bilinguisme progressif', 'Ressources numériques en classe', 'Sorties pédagogiques', 'Accompagnement méthodologique'],
  },
  college: {
    title: 'Collège', levels: '6ème → 3ème', age: '12 à 15 ans', image: 'college',
    description: "Un enseignement structuré pour consolider les acquis, développer l'esprit d'analyse et préparer sereinement le BEPC.",
    highlights: ['Travaux pratiques', 'Club scientifique & informatique', 'Préparation au BEPC', 'Citoyenneté et leadership'],
  },
  lycee: {
    title: 'Lycée', levels: 'Séries A4 & D', age: '16 à 18 ans', image: 'lycee', soon: true,
    description: "Le cycle de la spécialisation : séries littéraire (A4) et scientifique (D), avec un encadrement rigoureux jusqu'au baccalauréat.",
    highlights: ["Parcours d'excellence", 'Orientation post-bac', 'Laboratoires', 'Conférences et travaux guidés'],
  },
};

export const REGISTRATION_FEES: Record<AcademicCycle, number> = { jardin: 25000, primaire: 25000, college: 30000, lycee: 35000 };
export const EXTRA_FEES = { canteenMonthly: 15000, transportMonthly: 10000, monthsPerYear: 9 };

export const FACILITIES = [
  { id: 'salles', name: 'Salles de classe aérées', image: 'salles', description: 'Des salles spacieuses, bien ventilées et équipées d’un mobilier adapté à chaque âge pour favoriser la concentration.' },
  { id: 'cantine', name: 'Cantine scolaire', image: 'cantine', description: 'Des repas équilibrés préparés sur place dans le respect strict des règles d’hygiène.' },
  { id: 'bibliotheque', name: 'Bibliothèque', image: 'bibliotheque', description: 'Manuels officiels, romans jeunesse et encyclopédies : un espace calme pour lire et réviser.' },
  { id: 'informatique', name: 'Salle informatique', image: 'informatique', description: 'Bureautique, codage créatif (Scratch) et recherche en ligne sécurisée dès le primaire.' },
];

export const GALLERY = [
  { image: 'salles', caption: 'Salles de classe' },
  { image: 'eveil', caption: "Jardin d'enfants" },
  { image: 'college', caption: 'Collège' },
  { image: 'bibliotheque', caption: 'Bibliothèque' },
  { image: 'informatique', caption: 'Salle informatique' },
  { image: 'cantine', caption: 'Cantine' },
  { image: 'classe-primaire', caption: 'Cours primaire' },
];

export const VALUES = [
  { title: 'Travail', text: 'Le goût de l’effort et des méthodes solides, au quotidien.' },
  { title: 'Discipline', text: 'Un cadre clair et bienveillant qui rassure élèves et familles.' },
  { title: 'Excellence', text: 'L’ambition de faire progresser chaque élève à son meilleur niveau.' },
];

export const fcfa = (n: number) => new Intl.NumberFormat('fr-FR').format(n).replace(/\u202f|\u00a0/g, ' ') + ' FCFA';
