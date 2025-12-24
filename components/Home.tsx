
import React from 'react';
import { CATEGORIES } from '../constants';
import { AppView, ServiceCategory } from '../types';
import { Logo } from './Logo';

interface HomeProps {
  setView: (view: AppView) => void;
  onSelectCategory: (cat: ServiceCategory) => void;
}

export const Home: React.FC<HomeProps> = ({ setView, onSelectCategory }) => {
  return (
    <div className="space-y-16 py-12">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 text-center space-y-8 flex flex-col items-center">
        <Logo size={120} className="mb-4" />
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">
          O profissional certo para <br />
          <span className="text-blue-600">qualquer serviço.</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          A Vila Ré Service conecta você com os melhores especialistas da região em poucos minutos. Praticidade e segurança em um só lugar.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => setView('request')}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl shadow-blue-200 hover:scale-105 transition-transform"
          >
            Solicitar Serviço Agora
          </button>
          <button 
            onClick={() => setView('pro-signup')}
            className="bg-white border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-50 transition-colors"
          >
            Quero Trabalhar
          </button>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold">O que você precisa?</h2>
            <p className="text-slate-500">Escolha uma categoria para começar</p>
          </div>
          <button className="text-blue-600 font-semibold text-sm hover:underline">Ver todas</button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat);
                setView('request');
              }}
              className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-50 transition-all group text-center"
            >
              <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform">{cat.icon}</span>
              <span className="font-semibold text-sm text-slate-700">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-blue-600 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4">
            <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-2xl">✨</div>
            <h3 className="text-xl font-bold">Profissionais Qualificados</h3>
            <p className="text-blue-100">Validamos identidades e checamos referências para sua total segurança na Vila Ré.</p>
          </div>
          <div className="space-y-4">
            <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-2xl">⚡</div>
            <h3 className="text-xl font-bold">Atendimento Rápido</h3>
            <p className="text-blue-100">Receba até 4 orçamentos em menos de 30 minutos após a solicitação.</p>
          </div>
          <div className="space-y-4">
            <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-2xl">🔒</div>
            <h3 className="text-xl font-bold">Pagamento Seguro</h3>
            <p className="text-blue-100">Sua satisfação garantida ou o suporte ajuda você a resolver qualquer problema.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
