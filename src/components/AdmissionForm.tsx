import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  BookOpen, 
  School, 
  Calendar, 
  CheckCircle2, 
  Printer, 
  Coins, 
  Utensils, 
  Bus,
  ArrowRight,
  Info,
  ChevronDown
} from 'lucide-react';
import { GRADES, REGISTRATION_FEES, EXTRA_FEES, SCHOOL_INFO } from '../data/schoolData';
import { PreRegistration, AcademicCycle } from '../types';

export default function AdmissionForm() {
  // Form state
  const [studentFirstName, setStudentFirstName] = useState('');
  const [studentLastName, setStudentLastName] = useState('');
  const [gender, setGender] = useState<'M' | 'F' | ''>('');
  const [birthDate, setBirthDate] = useState('');
  const [cycle, setCycle] = useState<AcademicCycle>('jardin');
  const [gradeId, setGradeId] = useState('');
  const [previousSchool, setPreviousSchool] = useState('');
  
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentRelationship, setParentRelationship] = useState('père');
  
  const [hasCanteen, setHasCanteen] = useState(false);
  const [hasTransport, setHasTransport] = useState(false);
  
  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<PreRegistration | null>(null);

  // Filter grades based on selected cycle
  const filteredGrades = GRADES.filter(g => g.cycle === cycle);

  // Set default grade when cycle changes
  useEffect(() => {
    if (filteredGrades.length > 0) {
      setGradeId(filteredGrades[0].id);
    }
  }, [cycle]);

  // Compute live estimates
  const currentGrade = GRADES.find(g => g.id === gradeId) || filteredGrades[0];
  const registrationFee = REGISTRATION_FEES[cycle] || 25000;
  const tuitionFee = currentGrade ? currentGrade.tuitionFee : 120000;
  
  const canteenCost = hasCanteen ? EXTRA_FEES.canteenMonthly * EXTRA_FEES.monthsPerYear : 0;
  const transportCost = hasTransport ? EXTRA_FEES.transportMonthly * EXTRA_FEES.monthsPerYear : 0;
  const totalExtras = canteenCost + transportCost;
  const grandTotal = registrationFee + tuitionFee + totalExtras;

  // Western Africa Tranche breakdowns
  // Tranche 1: Registration Fee + 50% Tuition + optional transport/canteen first 3 months
  // Tranche 2: 30% Tuition + optional transport/canteen next 3 months
  // Tranche 3: 20% Tuition + optional transport/canteen last 3 months
  const tranche1 = Math.round(tuitionFee * 0.5) + (hasCanteen ? EXTRA_FEES.canteenMonthly * 3 : 0) + (hasTransport ? EXTRA_FEES.transportMonthly * 3 : 0);
  const tranche2 = Math.round(tuitionFee * 0.3) + (hasCanteen ? EXTRA_FEES.canteenMonthly * 3 : 0) + (hasTransport ? EXTRA_FEES.transportMonthly * 3 : 0);
  const tranche3 = Math.round(tuitionFee * 0.2) + (hasCanteen ? EXTRA_FEES.canteenMonthly * 3 : 0) + (hasTransport ? EXTRA_FEES.transportMonthly * 3 : 0);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!studentFirstName.trim()) newErrors.studentFirstName = "Prénom requis";
    if (!studentLastName.trim()) newErrors.studentLastName = "Nom de famille requis";
    if (!gender) newErrors.gender = "Veuillez sélectionner le genre";
    if (!birthDate) newErrors.birthDate = "Date de naissance requise";
    if (!parentName.trim()) newErrors.parentName = "Nom du parent requis";
    if (!parentPhone.trim()) {
      newErrors.parentPhone = "Numéro de téléphone requis";
    } else if (!/^\d{8,15}$/.test(parentPhone.replace(/[\s\-\+\(\)]/g, ''))) {
      newErrors.parentPhone = "Numéro de téléphone invalide (8 à 15 chiffres)";
    }
    if (parentEmail && !/\S+@\S+\.\S+/.test(parentEmail)) {
      newErrors.parentEmail = "Format d'adresse email invalide";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      // scroll to errors
      const firstError = Object.keys(errors)[0];
      const element = document.getElementsByName(firstError)[0];
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    // Simulate database insertion delay
    setTimeout(() => {
      const selectedGrade = GRADES.find(g => g.id === gradeId);
      
      const newRegistration: PreRegistration = {
        id: `REG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        studentFirstName,
        studentLastName,
        gender: gender as 'M' | 'F',
        birthDate,
        cycle,
        gradeId,
        gradeName: selectedGrade ? selectedGrade.name : gradeId,
        previousSchool: previousSchool || "Aucun (Première inscription)",
        
        parentName,
        parentPhone,
        parentEmail: parentEmail || "Non renseigné",
        parentRelationship,
        
        hasCanteen,
        hasTransport,
        
        registrationFee,
        totalTuition: tuitionFee,
        totalExtras,
        grandTotal,
        
        submittedAt: new Date().toISOString(),
        status: 'en_attente'
      };

      // Save to localStorage
      const existing = localStorage.getItem('harmonia_pre_registrations');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newRegistration);
      localStorage.setItem('harmonia_pre_registrations', JSON.stringify(list));

      setSubmittedData(newRegistration);
      setIsSubmitting(false);
      
      // Reset form
      setStudentFirstName('');
      setStudentLastName('');
      setGender('');
      setBirthDate('');
      setPreviousSchool('');
      setParentName('');
      setParentPhone('');
      setParentEmail('');
      setHasCanteen(false);
      setHasTransport(false);
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-grid-pattern py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-brand-gold-600 font-mono text-sm font-bold uppercase tracking-widest bg-brand-gold-500/10 px-3 py-1 rounded-full">
            Inscriptions & Tarifs
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-blue-900 tracking-tight mt-3">
            Pré-inscription en Ligne
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base font-light">
            Calculez vos frais de scolarité en temps réel et remplissez le formulaire de pré-inscription pour réserver la place de votre enfant pour la rentrée 2026-2027.
          </p>
        </div>

        {/* If successfully submitted */}
        <AnimatePresence mode="wait">
          {submittedData ? (
            <motion.div
              key="success-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100"
            >
              {/* Stamped Success Header */}
              <div className="bg-emerald-600 text-white p-8 text-center flex flex-col items-center">
                <CheckCircle2 className="w-16 h-16 text-emerald-100 mb-3 animate-bounce" />
                <h3 className="text-2xl font-bold font-display">Pré-inscription Enregistrée !</h3>
                <p className="text-emerald-100 text-sm mt-2 max-w-lg">
                  Le dossier de votre enfant a été reçu avec succès par l'administration du Complexe Scolaire Harmonia.
                </p>
                <div className="mt-4 bg-emerald-700/50 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-mono tracking-widest font-bold">
                  N° DE DOSSIER : {submittedData.id}
                </div>
              </div>

              {/* Printable Voucher/Slip Content */}
              <div id="registration-slip" className="p-8 space-y-6 text-slate-800 bg-slate-50/50">
                
                {/* School Header on slip */}
                <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                  <div>
                    <h4 className="font-bold text-lg text-brand-blue-900 font-display">{SCHOOL_INFO.name}</h4>
                    <p className="text-xs text-slate-500 font-mono italic">Motto: {SCHOOL_INFO.motto}</p>
                    <p className="text-xs text-slate-500 mt-1">{SCHOOL_INFO.locationDetail}</p>
                  </div>
                  <div className="text-right text-xs">
                    <p className="font-semibold text-slate-700">Fiche de Pré-inscription</p>
                    <p className="text-slate-500 mt-0.5">Date : {new Date(submittedData.submittedAt).toLocaleDateString('fr-FR')}</p>
                    <p className="text-brand-blue-900 font-bold font-mono mt-0.5">{submittedData.id}</p>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  {/* Student Details */}
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <h5 className="font-bold text-brand-blue-900 border-b border-slate-100 pb-2 mb-2 font-display flex items-center gap-1.5">
                      <User className="w-4 h-4 text-brand-gold-500" />
                      Élève
                    </h5>
                    <div className="space-y-1.5">
                      <p><span className="text-slate-500">Nom :</span> <strong className="uppercase">{submittedData.studentLastName}</strong></p>
                      <p><span className="text-slate-500">Prénom :</span> <strong>{submittedData.studentFirstName}</strong></p>
                      <p><span className="text-slate-500">Genre :</span> <strong>{submittedData.gender === 'M' ? 'Masculin (Garçon)' : 'Féminin (Fille)'}</strong></p>
                      <p><span className="text-slate-500">Date de Naissance :</span> <strong>{new Date(submittedData.birthDate).toLocaleDateString('fr-FR')}</strong></p>
                      <p><span className="text-slate-500">Classe Demandée :</span> <strong className="text-brand-blue-900">{submittedData.gradeName}</strong></p>
                      <p><span className="text-slate-500">Établissement précédent :</span> <span className="italic">{submittedData.previousSchool}</span></p>
                    </div>
                  </div>

                  {/* Parent Details */}
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <h5 className="font-bold text-brand-blue-900 border-b border-slate-100 pb-2 mb-2 font-display flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-brand-gold-500" />
                      Parent / Tuteur
                    </h5>
                    <div className="space-y-1.5">
                      <p><span className="text-slate-500">Nom complet :</span> <strong>{submittedData.parentName}</strong></p>
                      <p><span className="text-slate-500">Lien de parenté :</span> <strong className="capitalize">{submittedData.parentRelationship}</strong></p>
                      <p><span className="text-slate-500">Téléphone :</span> <strong>+228 {submittedData.parentPhone}</strong></p>
                      <p><span className="text-slate-500">Email :</span> <strong>{submittedData.parentEmail}</strong></p>
                      <p><span className="text-slate-500">Cantine choisie :</span> <strong>{submittedData.hasCanteen ? 'Oui' : 'Non'}</strong></p>
                      <p><span className="text-slate-500">Transport choisi :</span> <strong>{submittedData.hasTransport ? 'Oui' : 'Non'}</strong></p>
                    </div>
                  </div>
                </div>

                {/* Financial breakdown */}
                <div className="bg-brand-blue-900 text-white p-5 rounded-xl">
                  <h5 className="font-bold border-b border-white/20 pb-2 mb-3 font-display text-brand-gold-400 flex items-center gap-1.5">
                    <Coins className="w-4 h-4" />
                    Estimation des Frais & Scolarité
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Frais d'inscription (Unique) :</span>
                      <span className="font-mono">{submittedData.registrationFee.toLocaleString('fr-FR')} CFA</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Scolarité / Écolage annuel ({submittedData.gradeName}) :</span>
                      <span className="font-mono">{submittedData.totalTuition.toLocaleString('fr-FR')} CFA</span>
                    </div>
                    {submittedData.hasCanteen && (
                      <div className="flex justify-between text-slate-300">
                        <span>Option Cantine (9 mois) :</span>
                        <span className="font-mono">{(EXTRA_FEES.canteenMonthly * EXTRA_FEES.monthsPerYear).toLocaleString('fr-FR')} CFA</span>
                      </div>
                    )}
                    {submittedData.hasTransport && (
                      <div className="flex justify-between text-slate-300">
                        <span>Option Transport (9 mois) :</span>
                        <span className="font-mono">{(EXTRA_FEES.transportMonthly * EXTRA_FEES.monthsPerYear).toLocaleString('fr-FR')} CFA</span>
                      </div>
                    )}
                    
                    <div className="pt-2 border-t border-white/20 flex justify-between text-base font-bold text-brand-gold-400">
                      <span>MONTANT TOTAL ESTIMÉ :</span>
                      <span className="font-mono">{submittedData.grandTotal.toLocaleString('fr-FR')} CFA</span>
                    </div>
                  </div>
                </div>

                {/* Local West African Payment Installments Notice */}
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-900 space-y-2">
                  <p className="font-bold flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    Facilité de Paiement en Échéances (3 Tranches) :
                  </p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>1ère Tranche :</strong> {tranche1.toLocaleString('fr-FR')} CFA <span className="text-slate-500">(à payer à la rentrée scolaire)</span></li>
                    <li><strong>2ème Tranche :</strong> {tranche2.toLocaleString('fr-FR')} CFA <span className="text-slate-500">(avant le 1er Janvier 2027)</span></li>
                    <li><strong>3ème Tranche :</strong> {tranche3.toLocaleString('fr-FR')} CFA <span className="text-slate-500">(avant le 1er Avril 2027)</span></li>
                  </ul>
                  <p className="mt-1 text-slate-500">
                    * Les frais d'inscription de <strong>{submittedData.registrationFee.toLocaleString('fr-FR')} CFA</strong> doivent obligatoirement être réglés en supplément lors de la validation finale du dossier au secrétariat.
                  </p>
                </div>

                {/* Stamped signature area */}
                <div className="flex justify-between items-end pt-8 text-xs text-slate-400">
                  <div>
                    <p className="font-semibold text-slate-600">Complexe Scolaire Harmonia</p>
                    <p>Secrétariat d'Admission</p>
                    <p className="mt-10 font-mono italic">Document généré automatiquement</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-600">Signature du Parent</p>
                    <p className="mt-14 border-t border-dashed border-slate-300 w-36 ml-auto"></p>
                  </div>
                </div>
              </div>

              {/* Success Actions */}
              <div className="bg-slate-100 p-5 px-8 flex flex-col sm:flex-row justify-between gap-4">
                <button
                  onClick={() => setSubmittedData(null)}
                  className="text-slate-600 hover:text-slate-900 font-semibold text-sm py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Inscrire un autre enfant
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center justify-center gap-2 bg-brand-blue-900 hover:bg-brand-blue-950 text-white font-bold text-sm py-3 px-6 rounded-lg transition-colors shadow-md"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimer ma Fiche d'inscription</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="enrollment-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              
              {/* Left Column: Pre-registration form (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-2xl shadow-lg border border-slate-100 p-6 sm:p-8">
                <h3 className="text-xl font-bold text-brand-blue-900 mb-6 font-display border-b border-slate-100 pb-3 flex items-center gap-2">
                  <School className="w-5 h-5 text-brand-gold-500" />
                  Dossier de Candidature
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Section: ÉLÈVE */}
                  <div className="space-y-4">
                    <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 font-mono">1. Informations de l'Élève</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Nom de famille *</label>
                        <input
                          type="text"
                          name="studentLastName"
                          value={studentLastName}
                          onChange={(e) => setStudentLastName(e.target.value)}
                          placeholder="Ex: ADJOLOU"
                          className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-800 ${errors.studentLastName ? 'border-red-500 bg-red-50/20' : 'border-slate-200'}`}
                        />
                        {errors.studentLastName && <p className="text-red-500 text-xs mt-1">{errors.studentLastName}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Prénom de l'élève *</label>
                        <input
                          type="text"
                          name="studentFirstName"
                          value={studentFirstName}
                          onChange={(e) => setStudentFirstName(e.target.value)}
                          placeholder="Ex: Koffi Emmanuel"
                          className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-800 ${errors.studentFirstName ? 'border-red-500 bg-red-50/20' : 'border-slate-200'}`}
                        />
                        {errors.studentFirstName && <p className="text-red-500 text-xs mt-1">{errors.studentFirstName}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Genre / Sexe *</label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setGender('M')}
                            className={`py-2 px-3 border rounded-lg text-sm font-medium transition-all ${
                              gender === 'M'
                                ? 'bg-brand-blue-50 border-brand-blue-800 text-brand-blue-900 font-bold'
                                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            Masculin (Garçon)
                          </button>
                          <button
                            type="button"
                            onClick={() => setGender('F')}
                            className={`py-2 px-3 border rounded-lg text-sm font-medium transition-all ${
                              gender === 'F'
                                ? 'bg-brand-blue-50 border-brand-blue-800 text-brand-blue-900 font-bold'
                                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            Féminin (Fille)
                          </button>
                        </div>
                        {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Date de naissance *</label>
                        <div className="relative">
                          <input
                            type="date"
                            name="birthDate"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-800 ${errors.birthDate ? 'border-red-500 bg-red-50/20' : 'border-slate-200'}`}
                          />
                        </div>
                        {errors.birthDate && <p className="text-red-500 text-xs mt-1">{errors.birthDate}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Cycle d'enseignement *</label>
                        <select
                          value={cycle}
                          onChange={(e) => setCycle(e.target.value as AcademicCycle)}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue-800"
                        >
                          <option value="jardin">Maternelle (Jardin d'enfants)</option>
                          <option value="primaire">Cours Primaire</option>
                          <option value="college">Le Collège</option>
                          <option value="lycee">Le Lycée (A4 & D)</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Classe demandée *</label>
                        <select
                          value={gradeId}
                          onChange={(e) => setGradeId(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue-800"
                        >
                          {filteredGrades.map((g) => (
                            <option key={g.id} value={g.id}>
                              {g.name} {g.cycle === 'lycee' ? '(Bientôt Disponible)' : ''}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Dernier établissement fréquenté</label>
                      <input
                        type="text"
                        value={previousSchool}
                        onChange={(e) => setPreviousSchool(e.target.value)}
                        placeholder="Ex: Jardin d'enfants de Lomé II (Laisser vide si première scolarisation)"
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-800"
                      />
                    </div>
                  </div>

                  {/* Section: PARENT */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 font-mono">2. Informations du Parent / Tuteur</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Nom complet du Parent *</label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                            <User className="w-4 h-4" />
                          </span>
                          <input
                            type="text"
                            name="parentName"
                            value={parentName}
                            onChange={(e) => setParentName(e.target.value)}
                            placeholder="Ex: M. Jean-Claude ADJOLOU"
                            className={`w-full pl-9 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-800 ${errors.parentName ? 'border-red-500 bg-red-50/20' : 'border-slate-200'}`}
                          />
                        </div>
                        {errors.parentName && <p className="text-red-500 text-xs mt-1">{errors.parentName}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Lien de parenté *</label>
                        <select
                          value={parentRelationship}
                          onChange={(e) => setParentRelationship(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue-800"
                        >
                          <option value="père">Père</option>
                          <option value="mère">Mère</option>
                          <option value="oncle_tante">Oncle / Tante</option>
                          <option value="tuteur">Tuteur légal</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Téléphone (WhatsApp de préférence) *</label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 text-sm font-semibold select-none">
                            +228
                          </span>
                          <input
                            type="tel"
                            name="parentPhone"
                            value={parentPhone}
                            onChange={(e) => setParentPhone(e.target.value)}
                            placeholder="90 06 25 24"
                            className={`w-full pl-15 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-800 ${errors.parentPhone ? 'border-red-500 bg-red-50/20' : 'border-slate-200'}`}
                          />
                        </div>
                        {errors.parentPhone && <p className="text-red-500 text-xs mt-1">{errors.parentPhone}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Adresse Email</label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                            <Mail className="w-4 h-4" />
                          </span>
                          <input
                            type="email"
                            name="parentEmail"
                            value={parentEmail}
                            onChange={(e) => setParentEmail(e.target.value)}
                            placeholder="parent@gmail.com"
                            className={`w-full pl-9 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-800 ${errors.parentEmail ? 'border-red-500 bg-red-50/20' : 'border-slate-200'}`}
                          />
                        </div>
                        {errors.parentEmail && <p className="text-red-500 text-xs mt-1">{errors.parentEmail}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Section: OPTIONS */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 font-mono">3. Services Optionnels d'Harmonia</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Canteen box */}
                      <button
                        type="button"
                        onClick={() => setHasCanteen(!hasCanteen)}
                        className={`flex items-start gap-3 p-4 border rounded-xl text-left transition-all ${
                          hasCanteen 
                            ? 'border-brand-blue-800 bg-brand-blue-50/40 shadow-sm' 
                            : 'border-slate-200 hover:bg-slate-50/50'
                        }`}
                      >
                        <span className={`p-2 rounded-lg shrink-0 ${hasCanteen ? 'bg-brand-blue-800 text-white' : 'bg-slate-100 text-slate-500'}`}>
                          <Utensils className="w-5 h-5" />
                        </span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-sm text-brand-blue-900 font-display">La Cantine</span>
                            <span className="bg-brand-gold-500 text-brand-blue-950 text-[10px] font-bold px-1.5 py-0.5 rounded">
                              Optionnel
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">Repas chauds, sains et équilibrés servis à midi.</p>
                          <p className="text-xs font-mono font-semibold text-brand-blue-900 mt-2">
                            +{EXTRA_FEES.canteenMonthly.toLocaleString('fr-FR')} CFA / mois
                          </p>
                        </div>
                      </button>

                      {/* Transport Box */}
                      <button
                        type="button"
                        onClick={() => setHasTransport(!hasTransport)}
                        className={`flex items-start gap-3 p-4 border rounded-xl text-left transition-all ${
                          hasTransport 
                            ? 'border-brand-blue-800 bg-brand-blue-50/40 shadow-sm' 
                            : 'border-slate-200 hover:bg-slate-50/50'
                        }`}
                      >
                        <span className={`p-2 rounded-lg shrink-0 ${hasTransport ? 'bg-brand-blue-800 text-white' : 'bg-slate-100 text-slate-500'}`}>
                          <Bus className="w-5 h-5" />
                        </span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-sm text-brand-blue-900 font-display">Bus Scolaire</span>
                            <span className="bg-brand-gold-500 text-brand-blue-950 text-[10px] font-bold px-1.5 py-0.5 rounded">
                              Optionnel
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">Ramassage sécurisé matin et après-midi.</p>
                          <p className="text-xs font-mono font-semibold text-brand-blue-900 mt-2">
                            +{EXTRA_FEES.transportMonthly.toLocaleString('fr-FR')} CFA / mois
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Submission note */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-500 leading-relaxed flex gap-2.5">
                    <Info className="w-4 h-4 text-brand-blue-900 shrink-0 mt-0.5" />
                    <span>
                      En soumettant cette pré-inscription, vous réservez une place temporaire. Le dossier devra être validé physiquement au secrétariat de l'école (Lomé Adetikopé) muni du bulletin scolaire précédent et des frais d'inscription requis.
                    </span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-blue-900 hover:bg-brand-blue-950 disabled:bg-slate-300 text-white font-display font-extrabold text-base py-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Traitement du dossier en cours...</span>
                      </>
                    ) : (
                      <>
                        <span>Envoyer ma demande de pré-inscription</span>
                        <ArrowRight className="w-5 h-5 text-brand-gold-400" />
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Right Column: Dynamic tuition estimator & pricing information (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Tuition Cost Summary Block */}
                <div className="bg-brand-blue-950 text-white rounded-2xl shadow-lg overflow-hidden border border-brand-blue-900 sticky top-24">
                  <div className="bg-brand-blue-900 p-6 border-b border-white/10 flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-brand-gold-500 text-brand-blue-950">
                      <Calculator className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg font-display">Estimateur de Scolarité</h4>
                      <p className="text-xs text-brand-blue-100">Calcul en temps réel selon vos sélections</p>
                    </div>
                  </div>

                  <div className="p-6 space-y-5 text-sm">
                    {/* Live configuration overview */}
                    <div className="space-y-3 pb-4 border-b border-white/10">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Classe sélectionnée :</span>
                        <span className="font-bold text-brand-gold-400">{currentGrade ? currentGrade.name : "N/A"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Cycle scolaire :</span>
                        <span className="font-bold uppercase text-xs tracking-wider bg-white/10 px-2 py-0.5 rounded text-slate-200">
                          {cycle}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Option Cantine :</span>
                        <span className={`font-bold text-xs ${hasCanteen ? 'text-emerald-400' : 'text-slate-400'}`}>
                          {hasCanteen ? 'Sélectionnée' : 'Non active'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Option Transport :</span>
                        <span className={`font-bold text-xs ${hasTransport ? 'text-emerald-400' : 'text-slate-400'}`}>
                          {hasTransport ? 'Sélectionné' : 'Non actif'}
                        </span>
                      </div>
                    </div>

                    {/* Breakdown details */}
                    <div className="space-y-3 pb-4 border-b border-white/10 font-mono text-xs text-slate-300">
                      <div className="flex justify-between">
                        <span>Frais d'Inscription (Une seule fois) :</span>
                        <span>{registrationFee.toLocaleString('fr-FR')} CFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Écolage Annuel :</span>
                        <span>{tuitionFee.toLocaleString('fr-FR')} CFA</span>
                      </div>
                      {hasCanteen && (
                        <div className="flex justify-between text-emerald-400">
                          <span>Cantine Scolaire (9 mois) :</span>
                          <span>{canteenCost.toLocaleString('fr-FR')} CFA</span>
                        </div>
                      )}
                      {hasTransport && (
                        <div className="flex justify-between text-emerald-400">
                          <span>Transport par Bus (9 mois) :</span>
                          <span>{transportCost.toLocaleString('fr-FR')} CFA</span>
                        </div>
                      )}
                    </div>

                    {/* Grand Total */}
                    <div className="flex justify-between items-baseline pt-2">
                      <span className="font-bold text-slate-200 font-display text-base">TOTAL ANNUEL :</span>
                      <div className="text-right">
                        <p className="text-2xl font-black text-brand-gold-400 font-mono">
                          {grandTotal.toLocaleString('fr-FR')}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono">FCFA / AN</p>
                      </div>
                    </div>

                    {/* West African Installments breakdown */}
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-xs text-slate-300 space-y-2">
                      <p className="font-bold text-brand-gold-400 font-display flex items-center gap-1">
                        <span>Paiement Échelonné Recommandé :</span>
                      </p>
                      <div className="grid grid-cols-3 gap-2 font-mono text-[11px] text-center">
                        <div className="bg-brand-blue-900/50 p-2 rounded border border-white/5">
                          <p className="text-[9px] text-slate-400 uppercase">Tranche 1</p>
                          <p className="font-bold text-slate-100 mt-1">{tranche1.toLocaleString('fr-FR')}</p>
                          <p className="text-[8px] text-slate-400 mt-0.5">Rentrée</p>
                        </div>
                        <div className="bg-brand-blue-900/50 p-2 rounded border border-white/5">
                          <p className="text-[9px] text-slate-400 uppercase">Tranche 2</p>
                          <p className="font-bold text-slate-100 mt-1">{tranche2.toLocaleString('fr-FR')}</p>
                          <p className="text-[8px] text-slate-400 mt-0.5">Janvier</p>
                        </div>
                        <div className="bg-brand-blue-900/50 p-2 rounded border border-white/5">
                          <p className="text-[9px] text-slate-400 uppercase">Tranche 3</p>
                          <p className="font-bold text-slate-100 mt-1">{tranche3.toLocaleString('fr-FR')}</p>
                          <p className="text-[8px] text-slate-400 mt-0.5">Avril</p>
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-tight">
                        * Les frais d'inscription ({registrationFee.toLocaleString('fr-FR')} CFA) sont à régler obligatoirement en sus à l'inscription de l'élève.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Info Box: Tuition Overview Table */}
                <div className="bg-white rounded-2xl shadow p-5 border border-slate-100 space-y-3">
                  <h4 className="font-bold text-sm text-brand-blue-900 font-display flex items-center gap-1.5">
                    <Coins className="w-4 h-4 text-brand-gold-500" />
                    Barème Général des Écolages
                  </h4>
                  <div className="overflow-x-auto text-xs">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-400">
                          <th className="py-2 font-semibold">Niveau / Cycle</th>
                          <th className="py-2 text-right font-semibold">Inscription</th>
                          <th className="py-2 text-right font-semibold">Écolage Annuel</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
                        <tr>
                          <td className="py-2 font-semibold">Maternelle (Jardin)</td>
                          <td className="py-2 text-right font-mono">25 000 CFA</td>
                          <td className="py-2 text-right font-mono">110K - 120K CFA</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-semibold">Primaire (CP à CM2)</td>
                          <td className="py-2 text-right font-mono">25 000 CFA</td>
                          <td className="py-2 text-right font-mono">130K - 150K CFA</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-semibold">Collège (6ème à 3ème)</td>
                          <td className="py-2 text-right font-mono">30 000 CFA</td>
                          <td className="py-2 text-right font-mono">170K - 190K CFA</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-semibold text-slate-400">Lycée (A4 & D) <span className="text-[8px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">Bientôt</span></td>
                          <td className="py-2 text-right font-mono text-slate-400">35 000 CFA</td>
                          <td className="py-2 text-right font-mono text-slate-400">210K - 230K CFA</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight pt-1">
                    Les manuels scolaires officiels et fournitures ne sont pas inclus dans l'écolage et restent à la charge du parent.
                  </p>
                </div>
              </div>
              
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
