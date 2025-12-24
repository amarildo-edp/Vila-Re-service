
import React from 'react';
import { ServiceRequest, User, AppView } from '../types';

interface ProDashboardProps {
  user: User;
  requests: ServiceRequest[];
  onUnlock: (reqId: string) => void;
  onAddCredits: () => void;
}

export const ProfessionalDashboard: React.FC<ProDashboardProps> = ({ user, requests, onUnlock, onAddCredits }) => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 space-y-8">
      {/* Header Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-sm mb-1">Seu Saldo</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">R$ {user.balance?.toFixed(2)}</span>
            <button 
              onClick={onAddCredits}
              className="text-blue-600 text-sm font-bold hover:underline"
            >
              + Adicionar créditos
            </button>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-sm mb-1">Leads Acessados</p>
          <span className="text-3xl font-bold text-slate-900">12</span>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-sm mb-1">Avaliação Média</p>
          <div className="flex items-center gap-1">
            <span className="text-3xl font-bold text-slate-900">4.9</span>
            <span className="text-yellow-400 text-xl">⭐</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Solicitações Recentes na Vila Ré</h2>
        <div className="grid gap-4">
          {requests.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-300 text-center">
              <p className="text-slate-400">Nenhuma solicitação encontrada no momento.</p>
            </div>
          ) : requests.map((req) => {
            const isUnlocked = req.unlockedBy.includes(user.id);
            return (
              <div 
                key={req.id} 
                className={`bg-white p-6 rounded-3xl border transition-all ${
                  isUnlocked ? 'border-green-200 bg-green-50/20' : 'border-slate-200 hover:border-blue-300'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                        req.urgency === 'high' ? 'bg-red-100 text-red-600' : 
                        req.urgency === 'medium' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {req.urgency === 'high' ? 'Urgente' : req.urgency === 'medium' ? 'Rápido' : 'Normal'}
                      </span>
                      <span className="text-slate-400 text-xs">• postado recentemente</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">{req.category} - {req.subcategory}</h3>
                    <p className="text-slate-600 text-sm line-clamp-2">{req.description}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">📍 {req.location}</span>
                      {req.budget && <span className="flex items-center gap-1">💰 Orçamento: R$ {req.budget}</span>}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    {isUnlocked ? (
                      <div className="text-right">
                        <p className="text-xs text-green-600 font-bold mb-1">Lead Desbloqueado</p>
                        <button 
                          className="bg-green-600 text-white px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-green-700 transition-colors"
                          onClick={() => alert(`Contatando ${req.clientName} pelo WhatsApp...`)}
                        >
                          📱 Ver WhatsApp
                        </button>
                      </div>
                    ) : (
                      <div className="text-right">
                        <p className="text-xs text-slate-400 mb-1">Preço do Lead</p>
                        <button 
                          onClick={() => onUnlock(req.id)}
                          className="bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-colors"
                        >
                          Liberar por R$ 15,00
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
