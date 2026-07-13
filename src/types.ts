export type AcademicCycle = 'jardin' | 'primaire' | 'college' | 'lycee';

export interface ClassGrade {
  id: string;
  name: string;
  cycle: AcademicCycle;
  tuitionFee: number; // Écolage annuel
}

export interface PreRegistration {
  id: string;
  studentFirstName: string;
  studentLastName: string;
  gender: 'M' | 'F';
  birthDate: string;
  cycle: AcademicCycle;
  gradeId: string;
  gradeName: string;
  previousSchool: string;
  
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  parentRelationship: string;
  
  hasCanteen: boolean;
  hasTransport: boolean;
  
  registrationFee: number; // Frais d'inscription
  totalTuition: number;
  totalExtras: number;
  grandTotal: number;
  
  submittedAt: string;
  status: 'en_attente' | 'contacte' | 'valide' | 'rejete';
  notes?: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  submittedAt: string;
  status: 'non_lu' | 'traite';
}

export interface SchoolFacility {
  id: string;
  name: string;
  frenchTitle: string;
  description: string;
  image: string;
  highlights: string[];
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
  accentText: string;
}
