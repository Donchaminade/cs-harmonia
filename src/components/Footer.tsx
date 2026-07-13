import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, ShieldAlert } from 'lucide-react';
import SchoolLogo from './SchoolLogo';
import { SCHOOL_INFO } from '../data/schoolData';

interface FooterProps {
  onNavClick: (tab: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  // Contact Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('renseignement');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      alert("Veuillez remplir les champs obligatoires (Nom, Téléphone, Message).");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newInquiry = {
        id: `INQ-${Date.now()}`,
        name,
        email: email || "Non renseigné",
        phone,
        subject,
        message,
        submittedAt: new Date().toISOString(),
        status: 'non_lu'
      };

      // Save inquiries to localStorage so staff can read them!
      const existing = localStorage.getItem('harmonia_inquiries');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newInquiry);
      localStorage.setItem('harmonia_inquiries', JSON.stringify(list));

      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setSubject('renseignement');
      setMessage('');
      
      // Auto close success notification after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1200);
  };

  return (
    <footer className="bg-brand-blue-950 text-white font-sans">
      
      {/* Contact Form Overlay Panel (Above the actual footer, inside the section) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct info, office hours (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-brand-gold-400 font-mono text-xs uppercase tracking-widest font-bold">Secrétariat d'Admission</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white mt-1">
                Contactez Notre Équipe
              </h3>
              <p className="text-slate-300 font-light text-sm mt-3 leading-relaxed">
                Notre secrétariat vous accueille tous les jours de la semaine pour répondre à vos questions, faire visiter les locaux ou finaliser les inscriptions scolaires.
              </p>
            </div>

            {/* School Office hours details */}
            <div className="bg-white/5 border border-white/10 p-5 rounded-xl space-y-3.5 text-xs text-slate-300">
              <h4 className="font-bold text-brand-gold-400 uppercase font-mono tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                Heures d'Ouverture Secrétariat
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span>Lundi - Vendredi :</span>
                  <span className="font-semibold text-white">07h00 - 12h30 • 14h30 - 17h30</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span>Samedi matin :</span>
                  <span className="font-semibold text-white">08h00 - 12h00</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Dimanche :</span>
                  <span className="font-bold text-red-400">Fermé</span>
                </div>
              </div>
            </div>

            {/* Physical Coordinates List */}
            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-gold-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Localisation exacte (Adetikopé) :</p>
                  <p className="text-slate-300 mt-1">{SCHOOL_INFO.locationDetail}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-gold-500 shrink-0" />
                <div>
                  <p className="font-bold text-white">Lignes téléphoniques :</p>
                  <p className="text-slate-300 mt-0.5">{SCHOOL_INFO.phoneFormatted}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-gold-500 shrink-0" />
                <div>
                  <p className="font-bold text-white">Adresse Email :</p>
                  <p className="text-slate-300 mt-0.5">{SCHOOL_INFO.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mini Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white text-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-100">
            <h4 className="text-lg font-bold text-brand-blue-900 mb-1 font-display">Écrivez-nous un message</h4>
            <p className="text-xs text-slate-500 mb-6">Réponse garantie sous 24 à 48 heures de notre équipe pédagogique.</p>
            
            {isSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-xl text-center space-y-3 animate-in fade-in duration-200">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h5 className="font-bold text-base">Message envoyé avec succès !</h5>
                <p className="text-xs text-emerald-700 leading-relaxed max-w-sm mx-auto">
                  Merci de votre intérêt pour le Complexe Scolaire Harmonia. Notre équipe administrative vous recontactera très rapidement.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Votre nom complet *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: M. Koffi GABIN"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue-800 bg-slate-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Numéro de téléphone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="Ex: 90062524"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue-800 bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Adresse Email (Optionnel)</label>
                    <input
                      type="email"
                      placeholder="votre.email@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue-800 bg-slate-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Objet de votre demande</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue-800 bg-white"
                    >
                      <option value="renseignement">Demande de renseignements généraux</option>
                      <option value="rendez_vous">Rendez-vous avec la Direction</option>
                      <option value="tarifs">Questions sur les écolages / bourses</option>
                      <option value="autre">Autre demande de contact</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Votre message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Saisissez votre message ici..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue-800 bg-slate-50/50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-blue-900 hover:bg-brand-blue-950 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4.5 w-4.5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <span>Envoyer mon message</span>
                      <Send className="w-4 h-4 text-brand-gold-400" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Left Block: Logo and Slogan */}
          <div className="space-y-4">
            <SchoolLogo showText={true} size={56} className="bg-white/5 p-2 rounded-xl border border-white/5" />
            <p className="text-xs text-slate-400 italic leading-relaxed pt-2">
              "{SCHOOL_INFO.slogan}"
            </p>
            <p className="text-xs text-brand-gold-500 font-bold font-mono">
              Devise : {SCHOOL_INFO.motto}
            </p>
          </div>

          {/* Block 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm text-brand-gold-400 uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavClick('home')} className="hover:text-brand-gold-400 transition-colors">
                  Accueil du site
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('about')} className="hover:text-brand-gold-400 transition-colors">
                  À Propos d'Harmonia
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('cycles')} className="hover:text-brand-gold-400 transition-colors">
                  Cycles & Programmes
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('facilities')} className="hover:text-brand-gold-400 transition-colors">
                  Infrastructures & Vie
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('admissions')} className="hover:text-brand-gold-400 transition-colors">
                  Tarifs & Scolarité
                </button>
              </li>
            </ul>
          </div>

          {/* Block 3: Cycles / Offerings */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm text-brand-gold-400 uppercase tracking-wider">Nos Sections</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Maternelle (Jardin d'enfants)</li>
              <li>Cours Primaire (CP1 - CM2)</li>
              <li>Collège d'Enseignement Général</li>
              <li className="flex items-center gap-1.5">
                <span>Lycée Scientifique & Littéraire</span>
                <span className="text-[8px] bg-brand-gold-500 text-brand-blue-950 font-black px-1 rounded uppercase">Bientôt</span>
              </li>
            </ul>
          </div>

          {/* Block 4: Administration & Legal */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm text-brand-gold-400 uppercase tracking-wider">Espace Staff</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Consultez les rapports d'inscription ou validez les dossiers d'admission.
            </p>
            <button
              onClick={() => onNavClick('admin')}
              className="flex items-center gap-2 bg-white/10 hover:bg-brand-gold-500 hover:text-brand-blue-950 text-xs font-bold py-2 px-4 rounded-lg transition-all border border-white/10"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Tableau de bord admin</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar: copyright */}
        <div className="pt-8 mt-12 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Complexe Scolaire Harmonia. Tous droits réservés.</p>
          <div className="flex gap-4">
            <span>Travail - Discipline - Excellence</span>
            <span>•</span>
            <span>Adetikopé, Lomé, Togo</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
