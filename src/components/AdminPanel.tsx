import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  XCircle, 
  Lock, 
  TrendingUp, 
  BookOpen, 
  LogOut, 
  Database,
  Trash2,
  FileSpreadsheet,
  Mail,
  Phone
} from 'lucide-react';
import { PreRegistration, AcademicCycle } from '../types';

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  
  const [registrations, setRegistrations] = useState<PreRegistration[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('tous');
  const [cycleFilter, setCycleFilter] = useState<string>('tous');
  
  // Selected registration for modal detail view
  const [selectedReg, setSelectedReg] = useState<PreRegistration | null>(null);
  const [adminNotes, setAdminNotes] = useState('');

  // Initial load
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const data = localStorage.getItem('harmonia_pre_registrations');
    if (data) {
      setRegistrations(JSON.parse(data));
    } else {
      // Seed beautiful mock data so it's not empty and looks incredibly premium
      const mockSeeds: PreRegistration[] = [
        {
          id: "REG-2026-1042",
          studentFirstName: "Koffi",
          studentLastName: "Amegashie",
          gender: "M",
          birthDate: "2020-03-12",
          cycle: "primaire",
          gradeId: "cp1",
          gradeName: "CP1",
          previousSchool: "Maternelle Arc-en-Ciel",
          parentName: "Mme Kafui Amegashie",
          parentPhone: "90123456",
          parentEmail: "kafui.amegashie@gmail.com",
          parentRelationship: "mère",
          hasCanteen: true,
          hasTransport: false,
          registrationFee: 25000,
          totalTuition: 130000,
          totalExtras: 135000,
          grandTotal: 290000,
          submittedAt: new Date(Date.now() - 3 * 3600000).toISOString(), // 3 hours ago
          status: "en_attente",
          notes: "La mère a appelé, elle passera au secrétariat samedi matin."
        },
        {
          id: "REG-2026-9821",
          studentFirstName: "Mawuena",
          studentLastName: "Togbé",
          gender: "F",
          birthDate: "2014-08-22",
          cycle: "college",
          gradeId: "6eme",
          gradeName: "6ème",
          previousSchool: "Primaire Publique d'Adetikopé",
          parentName: "M. Kodjo Togbé",
          parentPhone: "91827364",
          parentEmail: "kodjo.togbe@yahoo.fr",
          parentRelationship: "père",
          hasCanteen: true,
          hasTransport: true,
          registrationFee: 30000,
          totalTuition: 170000,
          totalExtras: 225000,
          grandTotal: 425000,
          submittedAt: new Date(Date.now() - 24 * 3600000).toISOString(), // 1 day ago
          status: "contacte",
          notes: "Parent contacté le 13/07/2026. Intéressé par le paiement en 3 tranches."
        },
        {
          id: "REG-2026-0512",
          studentFirstName: "Sélom",
          studentLastName: "Adjadjé",
          gender: "M",
          birthDate: "2022-11-05",
          cycle: "jardin",
          gradeId: "ps",
          gradeName: "Petite Section (PS)",
          previousSchool: "Aucun",
          parentName: "Mme Eyram Adjadjé",
          parentPhone: "99452312",
          parentEmail: "eyram.ad@gmail.com",
          parentRelationship: "mère",
          hasCanteen: false,
          hasTransport: true,
          registrationFee: 25000,
          totalTuition: 110000,
          totalExtras: 90000,
          grandTotal: 225000,
          submittedAt: new Date(Date.now() - 48 * 3600000).toISOString(), // 2 days ago
          status: "valide",
          notes: "Dossier validé et inscription payée. Reçu n°084 émis."
        }
      ];
      localStorage.setItem('harmonia_pre_registrations', JSON.stringify(mockSeeds));
      setRegistrations(mockSeeds);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple passcode verification
    if (passcode === 'admin' || passcode === 'admin123' || passcode === 'harmonia') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Code d\'accès incorrect. Essayez "admin" ou "harmonia".');
    }
  };

  const handleUpdateStatus = (id: string, newStatus: 'en_attente' | 'contacte' | 'valide' | 'rejete') => {
    const updated = registrations.map(reg => {
      if (reg.id === id) {
        return { ...reg, status: newStatus, notes: adminNotes || reg.notes };
      }
      return reg;
    });
    setRegistrations(updated);
    localStorage.setItem('harmonia_pre_registrations', JSON.stringify(updated));
    if (selectedReg) {
      setSelectedReg({ ...selectedReg, status: newStatus, notes: adminNotes || selectedReg.notes });
    }
  };

  const handleSaveNotes = () => {
    if (!selectedReg) return;
    const updated = registrations.map(reg => {
      if (reg.id === selectedReg.id) {
        return { ...reg, notes: adminNotes };
      }
      return reg;
    });
    setRegistrations(updated);
    localStorage.setItem('harmonia_pre_registrations', JSON.stringify(updated));
    setSelectedReg({ ...selectedReg, notes: adminNotes });
    alert('Notes enregistrées avec succès !');
  };

  const handleResetDatabase = () => {
    if (window.confirm('Voulez-vous réinitialiser les inscriptions aux données d\'exemple ?')) {
      localStorage.removeItem('harmonia_pre_registrations');
      loadData();
    }
  };

  const handleClearDatabase = () => {
    if (window.confirm('Voulez-vous supprimer TOUTES les inscriptions de la base locale ?')) {
      localStorage.setItem('harmonia_pre_registrations', JSON.stringify([]));
      setRegistrations([]);
    }
  };

  const handleExportCSV = () => {
    if (registrations.length === 0) {
      alert("Aucune inscription à exporter.");
      return;
    }
    // Simple CSV generator
    const headers = "ID,Nom Eleve,Prenom Eleve,Genre,Cycle,Classe,Nom Parent,Telephone,Email,Montant Total,Statut,Date\n";
    const rows = registrations.map(r => 
      `"${r.id}","${r.studentLastName}","${r.studentFirstName}","${r.gender}","${r.cycle}","${r.gradeName}","${r.parentName}","+228 ${r.parentPhone}","${r.parentEmail}",${r.grandTotal},"${r.status}","${r.submittedAt.split('T')[0]}"`
    ).join("\n");
    
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `harmonia_pre_inscriptions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Compute dashboard metrics
  const totalCount = registrations.length;
  const pendingCount = registrations.filter(r => r.status === 'en_attente').length;
  const contactedCount = registrations.filter(r => r.status === 'contacte').length;
  const validatedCount = registrations.filter(r => r.status === 'valide').length;
  
  const estimatedRevenue = registrations
    .filter(r => r.status !== 'rejete')
    .reduce((sum, r) => sum + r.grandTotal, 0);

  const cashInflow = registrations
    .filter(r => r.status === 'valide')
    .reduce((sum, r) => sum + r.registrationFee, 0); // Cash immediately on validation registration fees

  // Filter list based on search and drop-downs
  const filteredRegistrations = registrations.filter(reg => {
    const studentFullName = `${reg.studentFirstName} ${reg.studentLastName}`.toLowerCase();
    const parentName = reg.parentName.toLowerCase();
    const matchesSearch = studentFullName.includes(searchTerm.toLowerCase()) || 
                          parentName.includes(searchTerm.toLowerCase()) ||
                          reg.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'tous' || reg.status === statusFilter;
    const matchesCycle = cycleFilter === 'tous' || reg.cycle === cycleFilter;
    
    return matchesSearch && matchesStatus && matchesCycle;
  });

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-16 bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="p-4 bg-brand-blue-50 text-brand-blue-900 rounded-full mb-3">
            <Lock className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-extrabold text-brand-blue-900 font-display">Portail Administratif</h3>
          <p className="text-slate-500 text-xs mt-1">
            Réservé au personnel du Complexe Scolaire Harmonia.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Code d'accès d'administration</label>
            <input
              type="password"
              placeholder="Saisir le code d'accès (ex: harmonia)"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue-800 text-center tracking-widest text-lg font-bold"
            />
          </div>

          {error && <p className="text-red-500 text-xs text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-brand-blue-900 hover:bg-brand-blue-950 text-white font-bold py-3 px-4 rounded-xl transition-colors font-display text-sm cursor-pointer"
          >
            Se Connecter
          </button>
        </form>

        <div className="mt-6 p-3 bg-slate-50 rounded-xl text-[11px] text-slate-400 text-center leading-relaxed">
          Pour la démonstration du site vitrine, le mot de passe est <strong>harmonia</strong> ou <strong>admin</strong>.
        </div>
      </div>
    );
  }

  // Admin Dashboard Dashboard View
  return (
    <div className="py-8 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-slate-400 uppercase font-mono font-bold tracking-widest">Base de Données d'Admission</span>
            </div>
            <h2 className="text-2xl font-black text-brand-blue-900 font-display">Tableau de Bord - Harmonia</h2>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold py-2.5 px-4 rounded-lg transition-colors border border-emerald-200"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Exporter en Excel / CSV</span>
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="flex items-center gap-1.5 text-xs bg-red-50 hover:bg-red-100 text-red-700 font-bold py-2.5 px-4 rounded-lg transition-colors border border-red-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>

        {/* Dynamic Metric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Total registrations */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pré-inscriptions</p>
              <h3 className="text-3xl font-black text-brand-blue-900 font-mono">{totalCount}</h3>
              <p className="text-[10px] text-slate-400">Enfants enregistrés en ligne</p>
            </div>
            <div className="p-3 bg-brand-blue-50 text-brand-blue-900 rounded-xl">
              <Users className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: Pending Status */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">En Attente</p>
              <h3 className="text-3xl font-black text-amber-500 font-mono">{pendingCount}</h3>
              <p className="text-[10px] text-slate-400">À contacter par le secrétariat</p>
            </div>
            <div className="p-3 bg-amber-50 text-amber-500 rounded-xl">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>
          </div>

          {/* Card 3: Validated Status */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Dossiers Validés</p>
              <h3 className="text-3xl font-black text-emerald-600 font-mono">{validatedCount}</h3>
              <p className="text-[10px] text-slate-400">Inscriptions définitives confirmées</p>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>

          {/* Card 4: Potential Sales Volume */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Volume Scolarités</p>
              <h3 className="text-2xl font-black text-brand-blue-900 font-mono tracking-tight">{estimatedRevenue.toLocaleString('fr-FR')} <span className="text-xs">CFA</span></h3>
              <p className="text-[10px] text-slate-400">Chiffre d'affaires potentiel</p>
            </div>
            <div className="p-3 bg-indigo-50 text-indigo-700 rounded-xl">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Database seeding controllers */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-wrap justify-between items-center gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-brand-gold-500" />
            <span><strong>Outils de test</strong> pour le site vitrine.</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={loadData}
              className="py-1 px-3 border border-slate-200 rounded hover:bg-slate-50 transition-all font-semibold"
            >
              Actualiser la liste
            </button>
            <button
              onClick={handleResetDatabase}
              className="py-1 px-3 bg-amber-50 text-amber-700 border border-amber-200 rounded hover:bg-amber-100 transition-all font-semibold"
            >
              Seed Données d'Exemple
            </button>
            <button
              onClick={handleClearDatabase}
              className="py-1 px-3 bg-red-50 text-red-700 border border-red-200 rounded hover:bg-red-100 transition-all font-semibold flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              <span>Vider la Base</span>
            </button>
          </div>
        </div>

        {/* Main Content Area: Search, Filters, Data Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100">
          
          {/* Filters Bar */}
          <div className="p-6 bg-slate-50 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-sm">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Rechercher élève, parent, n° dossier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue-800 text-sm"
              />
            </div>

            {/* Selector Dropdowns */}
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-slate-500 font-semibold">Cycle :</span>
                <select
                  value={cycleFilter}
                  onChange={(e) => setCycleFilter(e.target.value)}
                  className="bg-transparent text-xs font-bold text-slate-700 focus:outline-none"
                >
                  <option value="tous">Tous les cycles</option>
                  <option value="jardin">Maternelle</option>
                  <option value="primaire">Primaire</option>
                  <option value="college">Collège</option>
                  <option value="lycee">Lycée</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-slate-500 font-semibold">Statut :</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-transparent text-xs font-bold text-slate-700 focus:outline-none"
                >
                  <option value="tous">Tous les statuts</option>
                  <option value="en_attente">En attente</option>
                  <option value="contacte">Contacté</option>
                  <option value="valide">Validé</option>
                  <option value="rejete">Refusé</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table list */}
          <div className="overflow-x-auto">
            {filteredRegistrations.length === 0 ? (
              <div className="p-12 text-center text-slate-400 space-y-2">
                <Users className="w-12 h-12 text-slate-300 mx-auto" />
                <p className="font-semibold text-slate-500">Aucune inscription trouvée</p>
                <p className="text-xs max-w-sm mx-auto">Essayez de modifier vos filtres ou effectuez une recherche avec d'autres termes.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <th className="p-4 pl-6">N° Dossier / Date</th>
                    <th className="p-4">Élève (Genre)</th>
                    <th className="p-4">Cycle & Classe</th>
                    <th className="p-4">Parent / Contact</th>
                    <th className="p-4 text-right">Frais Estimés</th>
                    <th className="p-4 text-center">Statut</th>
                    <th className="p-4 pr-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredRegistrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-slate-50/30 transition-colors">
                      {/* Column 1: Dossier ID and Date */}
                      <td className="p-4 pl-6">
                        <span className="font-bold font-mono text-brand-blue-900 text-xs block">{reg.id}</span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {new Date(reg.submittedAt).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </td>

                      {/* Column 2: Student Name */}
                      <td className="p-4">
                        <div className="font-semibold text-slate-800">
                          <span className="uppercase">{reg.studentLastName}</span> {reg.studentFirstName}
                        </div>
                        <span className="text-[11px] font-bold text-slate-400">
                          {reg.gender === 'M' ? 'Garçon' : 'Fille'} • {new Date().getFullYear() - new Date(reg.birthDate).getFullYear()} ans
                        </span>
                      </td>

                      {/* Column 3: Cycle / Class */}
                      <td className="p-4 font-semibold">
                        <span className="text-slate-700 block">{reg.gradeName}</span>
                        <span className="text-[10px] uppercase font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-bold">
                          {reg.cycle}
                        </span>
                      </td>

                      {/* Column 4: Parent info */}
                      <td className="p-4 space-y-0.5">
                        <div className="font-medium text-slate-700">{reg.parentName} <span className="text-xs text-slate-400">({reg.parentRelationship})</span></div>
                        <div className="flex items-center gap-3 text-xs text-slate-500 font-mono font-medium">
                          <span className="flex items-center gap-0.5">
                            <Phone className="w-3 h-3 text-brand-gold-500" />
                            +228 {reg.parentPhone}
                          </span>
                        </div>
                      </td>

                      {/* Column 5: Total fees */}
                      <td className="p-4 text-right font-bold font-mono text-brand-blue-900">
                        <span>{reg.grandTotal.toLocaleString('fr-FR')}</span>
                        <span className="text-[10px] block text-slate-400 font-normal">CFA</span>
                      </td>

                      {/* Column 6: Status Badge */}
                      <td className="p-4 text-center">
                        <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${
                          reg.status === 'valide' ? 'bg-emerald-50 text-emerald-700' :
                          reg.status === 'contacte' ? 'bg-blue-50 text-blue-700' :
                          reg.status === 'rejete' ? 'bg-red-50 text-red-700' :
                          'bg-amber-50 text-amber-700'
                        }`}>
                          {reg.status === 'valide' && <><CheckCircle className="w-3.5 h-3.5" /> <span>Validé</span></>}
                          {reg.status === 'contacte' && <><Phone className="w-3.5 h-3.5" /> <span>Contacté</span></>}
                          {reg.status === 'rejete' && <><XCircle className="w-3.5 h-3.5" /> <span>Refusé</span></>}
                          {reg.status === 'en_attente' && <><Clock className="w-3.5 h-3.5" /> <span>En attente</span></>}
                        </span>
                      </td>

                      {/* Column 7: Actions */}
                      <td className="p-4 text-center pr-6">
                        <button
                          onClick={() => {
                            setSelectedReg(reg);
                            setAdminNotes(reg.notes || '');
                          }}
                          className="text-xs bg-slate-100 hover:bg-brand-blue-900 hover:text-white text-slate-700 font-bold py-1.5 px-3 rounded transition-all shadow-sm cursor-pointer"
                        >
                          Gérer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>

      {/* Detail & status manager Modal overlay */}
      {selectedReg && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="bg-brand-blue-900 text-white p-6 flex justify-between items-center">
              <div>
                <span className="text-brand-gold-400 font-mono font-bold text-xs">ID DOSSIER : {selectedReg.id}</span>
                <h3 className="text-xl font-bold font-display mt-1">Gestion de la Pré-inscription</h3>
              </div>
              <button
                onClick={() => setSelectedReg(null)}
                className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white focus:outline-none"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 text-sm">
              {/* Student Summary block */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl text-xs border border-slate-100">
                <div>
                  <h4 className="font-bold text-brand-blue-900 text-xs font-mono uppercase mb-2">DÉTAILS ÉLÈVE</h4>
                  <p><span className="text-slate-500">Nom complet:</span> <strong className="uppercase text-slate-800">{selectedReg.studentLastName} {selectedReg.studentFirstName}</strong></p>
                  <p><span className="text-slate-500">Genre:</span> <strong>{selectedReg.gender === 'M' ? 'Garçon' : 'Fille'}</strong></p>
                  <p><span className="text-slate-500">Date de naiss:</span> <strong>{new Date(selectedReg.birthDate).toLocaleDateString('fr-FR')}</strong></p>
                  <p><span className="text-slate-500">Classe / Cycle:</span> <strong>{selectedReg.gradeName} ({selectedReg.cycle})</strong></p>
                  <p><span className="text-slate-500">Provenance:</span> <span className="italic">{selectedReg.previousSchool}</span></p>
                </div>
                <div>
                  <h4 className="font-bold text-brand-blue-900 text-xs font-mono uppercase mb-2">CONTACT PARENT</h4>
                  <p><span className="text-slate-500">Parent:</span> <strong>{selectedReg.parentName} ({selectedReg.parentRelationship})</strong></p>
                  <p><span className="text-slate-500">Téléphone:</span> <strong>+228 {selectedReg.parentPhone}</strong></p>
                  <p><span className="text-slate-500">Email:</span> <strong>{selectedReg.parentEmail}</strong></p>
                  <p><span className="text-slate-500">Cantine:</span> <strong>{selectedReg.hasCanteen ? 'Oui' : 'Non'}</strong></p>
                  <p><span className="text-slate-500">Bus:</span> <strong>{selectedReg.hasTransport ? 'Oui' : 'Non'}</strong></p>
                </div>
              </div>

              {/* Financial calculations */}
              <div className="space-y-2">
                <h4 className="font-bold text-brand-blue-900 text-xs font-mono uppercase">VENTILATION DES DROITS SCOLAIRES</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-slate-100 p-3 rounded-lg text-xs">
                    <p className="flex justify-between"><span>Droit d'Inscription:</span> <strong>{selectedReg.registrationFee.toLocaleString('fr-FR')} CFA</strong></p>
                    <p className="flex justify-between mt-1"><span>Écolage annuel:</span> <strong>{selectedReg.totalTuition.toLocaleString('fr-FR')} CFA</strong></p>
                    <p className="flex justify-between mt-1"><span>Services Optionnels:</span> <strong>{selectedReg.totalExtras.toLocaleString('fr-FR')} CFA</strong></p>
                  </div>
                  <div className="bg-brand-blue-50 border border-brand-blue-100 p-3 rounded-lg flex flex-col justify-center">
                    <span className="text-[10px] font-bold text-slate-500">TOTAL ESTIMÉ :</span>
                    <span className="text-xl font-mono font-black text-brand-blue-900">{selectedReg.grandTotal.toLocaleString('fr-FR')} CFA</span>
                  </div>
                </div>
              </div>

              {/* Status Update Actions */}
              <div className="space-y-2.5">
                <h4 className="font-bold text-brand-blue-900 text-xs font-mono uppercase">CHANGER LE STATUT DU DOSSIER</h4>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => handleUpdateStatus(selectedReg.id, 'en_attente')}
                    className={`py-2 px-1 border rounded-lg text-xs font-bold text-center transition-all ${
                      selectedReg.status === 'en_attente'
                        ? 'bg-amber-500 text-white border-amber-500'
                        : 'border-slate-200 text-amber-700 hover:bg-amber-50'
                    }`}
                  >
                    En Attente
                  </button>
                  
                  <button
                    onClick={() => handleUpdateStatus(selectedReg.id, 'contacte')}
                    className={`py-2 px-1 border rounded-lg text-xs font-bold text-center transition-all ${
                      selectedReg.status === 'contacte'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-slate-200 text-blue-700 hover:bg-blue-50'
                    }`}
                  >
                    Contacté
                  </button>

                  <button
                    onClick={() => handleUpdateStatus(selectedReg.id, 'valide')}
                    className={`py-2 px-1 border rounded-lg text-xs font-bold text-center transition-all ${
                      selectedReg.status === 'valide'
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'border-slate-200 text-emerald-700 hover:bg-emerald-50'
                    }`}
                  >
                    Validé
                  </button>

                  <button
                    onClick={() => handleUpdateStatus(selectedReg.id, 'rejete')}
                    className={`py-2 px-1 border rounded-lg text-xs font-bold text-center transition-all ${
                      selectedReg.status === 'rejete'
                        ? 'bg-red-600 text-white border-red-600'
                        : 'border-slate-200 text-red-700 hover:bg-red-50'
                    }`}
                  >
                    Refusé
                  </button>
                </div>
              </div>

              {/* Internal Administration Notes */}
              <div className="space-y-2">
                <h4 className="font-bold text-brand-blue-900 text-xs font-mono uppercase">NOTES INTERNES DU SECRÉTARIAT</h4>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Ex: Le parent viendra effectuer le versement de la première tranche (85 000 CFA) le 1er Septembre."
                  rows={3}
                  className="w-full border border-slate-200 rounded-lg p-3 text-xs focus:outline-none focus:ring-2 focus:ring-brand-blue-800"
                />
                <button
                  onClick={handleSaveNotes}
                  className="bg-slate-800 hover:bg-slate-900 text-white text-xs py-1.5 px-3 rounded-md transition-colors font-bold cursor-pointer"
                >
                  Enregistrer les Notes
                </button>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedReg(null)}
                className="bg-brand-blue-900 text-white font-bold text-xs py-2 px-5 rounded-lg transition-colors cursor-pointer"
              >
                Fermer
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
