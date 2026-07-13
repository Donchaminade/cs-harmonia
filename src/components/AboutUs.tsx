import { motion } from 'motion/react';
import { STAFF_MEMBERS, TESTIMONIALS, SCHOOL_INFO } from '../data/schoolData';
import { Award, Compass, Heart, MessageSquare, Quote, Star, Users } from 'lucide-react';

export default function AboutUs() {
  const values = [
    {
      title: "Travail (Work)",
      description: "Le goût de l'effort et de la persévérance. Nous encourageons nos élèves à donner le meilleur d'eux-mêmes pour acquérir un savoir solide et durable.",
      icon: Award,
      color: 'bg-blue-50 text-brand-blue-900 border-blue-100'
    },
    {
      title: "Discipline",
      description: "Le respect de soi, des autres et du règlement. C'est le pilier qui garantit un climat serein, harmonieux, ordonné et hautement propice aux apprentissages.",
      icon: Compass,
      color: 'bg-amber-50 text-brand-gold-600 border-amber-100'
    },
    {
      title: "Excellence",
      description: "La quête continuelle de l'amélioration. Nous visons les plus hauts standards de réussite académique et humaine pour préparer les futurs cadres du pays.",
      icon: Star,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-100'
    }
  ];

  return (
    <div className="space-y-16 py-12 md:py-16">
      
      {/* 1. Brand Intro Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: Image Collage (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg h-[320px] sm:h-[400px]">
              {/* Photo representing the school administration and team */}
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800"
                alt="Complexe Scolaire Harmonia administration team"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-950/60 to-transparent" />
              
              {/* Stamped badge */}
              <div className="absolute top-4 right-4 bg-brand-gold-500 text-brand-blue-950 px-4 py-2 rounded-xl text-xs font-black font-display shadow-md">
                Fondé en 2024
              </div>
            </div>
            {/* Visual offset board */}
            <div className="absolute -bottom-4 -right-4 -left-4 h-3 bg-brand-gold-500 rounded-full blur-xl -z-10" />
          </div>

          {/* Right Block: Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-brand-blue-900 font-mono text-xs font-bold uppercase tracking-widest bg-brand-blue-50 px-3 py-1.5 rounded-full border border-brand-blue-100">
                Notre Histoire & Mission
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-blue-900 tracking-tight mt-3">
                Un Cadre de Rigueur et d'Épanouissement pour l'Avenir de vos Enfants
              </h2>
            </div>
            
            <p className="text-slate-600 font-light leading-relaxed text-sm sm:text-base">
              Né d'une volonté d'offrir une formation d'excellence au Togo, le <strong>Complexe Scolaire Harmonia</strong> s'est implanté à Lomé Adetikopé avec pour vocation d'allier rigueur intellectuelle et bienveillance pédagogique.
            </p>
            <p className="text-slate-600 font-light leading-relaxed text-sm sm:text-base">
              Nous pensons que l'éducation ne réside pas uniquement dans l'apprentissage par cœur, mais dans la compréhension active, l'éveil du sens critique et la formation du caractère moral de l'élève. Nos infrastructures de pointe et notre corps enseignant trié sur le volet garantissent à chaque enfant un accompagnement sur mesure.
            </p>

            <div className="flex gap-6 pt-4 border-t border-slate-100">
              <div className="text-center bg-slate-50 p-4 rounded-xl grow border border-slate-100">
                <p className="text-2xl font-black text-brand-blue-900 font-mono">100%</p>
                <p className="text-[10px] text-slate-500 font-semibold uppercase mt-1 tracking-wider">Objectif de Réussite</p>
              </div>
              <div className="text-center bg-slate-50 p-4 rounded-xl grow border border-slate-100">
                <p className="text-2xl font-black text-brand-gold-600 font-mono">20+</p>
                <p className="text-[10px] text-slate-500 font-semibold uppercase mt-1 tracking-wider">Professeurs Qualifiés</p>
              </div>
              <div className="text-center bg-slate-50 p-4 rounded-xl grow border border-slate-100">
                <p className="text-2xl font-black text-brand-blue-900 font-mono">15</p>
                <p className="text-[10px] text-slate-500 font-semibold uppercase mt-1 tracking-wider">Élèves max par classe</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Core Motto & Values Grid */}
      <div className="bg-slate-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-brand-gold-600 font-mono text-xs font-bold uppercase tracking-widest bg-brand-gold-500/10 px-3 py-1 rounded-full">
              Notre Devise
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-brand-blue-900 tracking-tight mt-3">
              Nos Trois Piliers Fondateurs
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 hover:shadow-md transition-all duration-300">
                  <div className={`p-3 rounded-xl inline-block border ${val.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-black text-brand-blue-900 font-display">
                    {val.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* 3. Meet the Administration & Founders */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-brand-blue-900 font-mono text-xs font-bold uppercase tracking-widest bg-brand-blue-50 px-3 py-1 rounded-full">
            Équipe administrative
          </span>
          <h3 className="text-2xl md:text-3xl font-extrabold text-brand-blue-900 tracking-tight mt-3">
            Direction & Administration
          </h3>
          <p className="text-slate-500 mt-2 text-xs sm:text-sm font-light">
            Une équipe engagée qui orchestre le développement de l'établissement avec intégrité, transparence et ambition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {STAFF_MEMBERS.map((staff) => (
            <div key={staff.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="h-64 overflow-hidden relative">
                <img
                  src={staff.avatar}
                  alt={staff.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-3 left-3 bg-brand-blue-900/95 text-white py-1 px-3 rounded-lg text-xs font-bold font-display">
                  {staff.role}
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h4 className="text-base font-black text-brand-blue-900 font-display">
                  {staff.name}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-light">
                  {staff.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* 4. Parent Testimonials Carousel / Grid */}
      <div className="bg-brand-blue-950 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-brand-gold-400 font-mono text-xs uppercase tracking-widest font-bold">Témoignages</span>
            <h3 className="text-2xl md:text-3xl font-extrabold font-display text-white mt-1">
              Ce que les parents en disent
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {TESTIMONIALS.map((test, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4 relative flex flex-col justify-between h-full">
                <Quote className="w-8 h-8 text-brand-gold-500/30 absolute top-4 right-4" />
                
                <p className="text-xs sm:text-sm text-slate-200 font-light leading-relaxed italic z-10">
                  "{test.content}"
                </p>

                <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                  <div className="h-9 w-9 bg-brand-gold-500/20 text-brand-gold-400 font-black rounded-full flex items-center justify-center text-xs">
                    {test.name.charAt(4)}
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-slate-100 font-display">{test.name}</h5>
                    <p className="text-[10px] text-slate-400">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}
