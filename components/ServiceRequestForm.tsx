
import React, { useState } from 'react';
import { CATEGORIES } from '../constants';
import { ServiceCategory, AppView } from '../types';
import { getSmartAnalysis } from '../services/geminiService';

interface ServiceRequestFormProps {
  initialCategory?: ServiceCategory;
  setView: (view: AppView) => void;
  onSubmit: (request: any) => void;
}

export const ServiceRequestForm: React.FC<ServiceRequestFormProps> = ({ initialCategory, setView, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<ServiceCategory | null>(initialCategory || null);
  const [subcategory, setSubcategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [urgency, setUrgency] = useState<'low' | 'medium' | 'high'>('medium');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);

  const handleNextStep = async () => {
    if (step === 2 && description.length > 20) {
      setAiLoading(true);
      const analysis = await getSmartAnalysis(description);
      setAiAnalysis(analysis);
      setAiLoading(false);
    }
    setStep(prev => prev + 1);
  };

  const handleFormSubmit = () => {
    onSubmit({
      category: category?.name,
      subcategory,
      description,
      location,
      urgency,
      aiAnalysis
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 overflow-hidden relative">
        {/* Progress Bar */}
        <div className="h-2 bg-slate-100">
          <div 
            className="h-full bg-blue-600 transition-all duration-500" 
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        <div className="p-8 pt-10">
          {step === 1 && (
            <div className="space-y-6">
              <button 
                onClick={() => setView('home')}
                className="text-slate-400 hover:text-blue-600 font-medium text-sm flex items-center gap-1 mb-2 transition-colors"
              >
                ← Voltar ao Início
              </button>
              <h2 className="text-2xl font-bold">Qual o tipo de serviço?</h2>
              <div className="grid grid-cols-2 gap-4">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setCategory(cat);
                      setStep(2);
                    }}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      category?.id === cat.id ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-blue-200'
                    }`}
                  >
                    <span className="text-2xl block mb-1">{cat.icon}</span>
                    <span className="font-bold text-slate-800">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && category && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Conte mais detalhes</h2>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Subcategoria</label>
                <select 
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Selecione...</option>
                  {category.subcategories.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">O que precisa ser feito?</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Ex: Preciso instalar um novo disjuntor e 3 lâmpadas LED na cozinha..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex-1 py-3 text-slate-600 font-semibold hover:bg-slate-50 rounded-xl transition-colors">Voltar</button>
                <button 
                  disabled={!subcategory || description.length < 10}
                  onClick={handleNextStep}
                  className="flex-[2] bg-blue-600 text-white py-3 rounded-xl font-bold disabled:opacity-50 hover:bg-blue-700 transition-colors"
                >
                  Próximo
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Onde e Quando?</h2>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Cidade/Bairro</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ex: Vila Ré, Penha, Patriarca"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Urgência</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['low', 'medium', 'high'] as const).map(u => (
                    <button
                      key={u}
                      onClick={() => setUrgency(u)}
                      className={`py-2 rounded-lg border-2 font-medium transition-all ${
                        urgency === u ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 text-slate-500 hover:border-blue-200'
                      }`}
                    >
                      {u === 'low' ? 'Normal' : u === 'medium' ? 'Rápido' : 'Urgente'}
                    </button>
                  ))}
                </div>
              </div>

              {aiLoading ? (
                <div className="p-4 bg-blue-50 rounded-xl flex items-center gap-3 animate-pulse">
                  <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full" />
                  <span className="text-blue-600 text-sm font-medium">IA analisando seu pedido...</span>
                </div>
              ) : aiAnalysis && (
                <div className="p-4 bg-green-50 rounded-xl border border-green-100 space-y-2 animate-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🤖</span>
                    <span className="font-bold text-green-800">Dica da Vila Ré Service AI</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Baseado no seu relato, estimamos que este serviço custe em média 
                    <span className="font-bold"> R$ {aiAnalysis.estimatedBudget}</span>. 
                    {aiAnalysis.justification}
                  </p>
                </div>
              )}

              <div className="flex gap-4">
                <button onClick={() => setStep(2)} className="flex-1 py-3 text-slate-600 font-semibold hover:bg-slate-50 rounded-xl transition-colors">Voltar</button>
                <button 
                  disabled={!location}
                  onClick={handleNextStep}
                  className="flex-[2] bg-blue-600 text-white py-3 rounded-xl font-bold disabled:opacity-50 hover:bg-blue-700 transition-colors"
                >
                  Revisar Pedido
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Confirme sua solicitação</h2>
              <div className="bg-slate-50 p-6 rounded-2xl space-y-4 border border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-500 text-sm">Serviço</span>
                  <span className="font-bold text-slate-800">{category?.name} - {subcategory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 text-sm">Local</span>
                  <span className="font-bold text-slate-800">{location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 text-sm">Urgência</span>
                  <span className="font-bold text-slate-800 capitalize">
                    {urgency === 'low' ? 'Normal' : urgency === 'medium' ? 'Rápido' : 'Urgente'}
                  </span>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-sm text-slate-500 mb-1">Descrição</p>
                  <p className="text-slate-700">{description}</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 text-center">
                Ao clicar em confirmar, seu pedido será enviado para profissionais qualificados na sua região. 
                Você receberá os contatos gratuitamente.
              </p>
              <div className="flex gap-4">
                <button onClick={() => setStep(3)} className="flex-1 py-3 text-slate-600 font-semibold hover:bg-slate-50 rounded-xl transition-colors">Corrigir</button>
                <button 
                  onClick={handleFormSubmit}
                  className="flex-[2] bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors"
                >
                  Enviar Solicitação
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
