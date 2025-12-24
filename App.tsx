
import React, { useState, useEffect } from 'react';
import { AppView, User, ServiceCategory, ServiceRequest } from './types';
import { MOCK_REQUESTS, CATEGORIES } from './constants';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Logo } from './components/Logo';
import { ServiceRequestForm } from './components/ServiceRequestForm';
import { ProfessionalDashboard } from './components/ProfessionalDashboard';
import { CreditPurchase } from './components/CreditPurchase';
import { InfoPage } from './components/InfoPage';

const App: React.FC = () => {
  const [currentView, setView] = useState<AppView>('home');
  const [infoTopic, setInfoTopic] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [requests, setRequests] = useState<ServiceRequest[]>(MOCK_REQUESTS);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | undefined>();

  const handleLogin = (role: 'CLIENT' | 'PROFESSIONAL' | 'ADMIN') => {
    setUser({
      id: role === 'PROFESSIONAL' ? 'pro_123' : 'user_123',
      name: role === 'PROFESSIONAL' ? 'Carlos Elétrica' : 'Eduardo Santos',
      email: role === 'PROFESSIONAL' ? 'carlos@vilare.com' : 'eduardo@email.com',
      role,
      balance: role === 'PROFESSIONAL' ? 0.00 : 0
    });
    setView(role === 'PROFESSIONAL' ? 'pro-dashboard' : 'home');
  };

  const handleLogout = () => {
    setUser(null);
    setView('home');
  };

  const navigateToInfo = (topic: string) => {
    setInfoTopic(topic);
    setView('info');
  };

  const handleCreateRequest = (data: any) => {
    const newReq: ServiceRequest = {
      id: `req_${Date.now()}`,
      clientId: user?.id || 'guest',
      clientName: user?.name || 'Cliente Convidado',
      category: data.category,
      subcategory: data.subcategory,
      description: data.description,
      location: data.location,
      urgency: data.urgency,
      budget: data.aiAnalysis?.estimatedBudget,
      createdAt: Date.now(),
      unlockedBy: []
    };
    setRequests([newReq, ...requests]);
    alert('Pedido enviado com sucesso! Aguarde contato dos profissionais da Vila Ré.');
    setView('home');
  };

  const handleUnlockLead = (reqId: string) => {
    if (!user || user.balance === undefined || user.balance < 15) {
      if (confirm('Saldo insuficiente! Deseja adicionar créditos agora?')) {
        setView('add-credits');
      }
      return;
    }

    setRequests(prev => prev.map(r => 
      r.id === reqId ? { ...r, unlockedBy: [...r.unlockedBy, user.id] } : r
    ));
    setUser(prev => prev ? { ...prev, balance: (prev.balance || 0) - 15 } : null);
  };

  const handleAddCredits = (amount: number) => {
    setUser(prev => prev ? { ...prev, balance: (prev.balance || 0) + amount } : null);
    alert(`Sucesso! R$ ${amount.toFixed(2)} foram adicionados ao seu saldo.`);
    setView('pro-dashboard');
  };

  const FooterLink = ({ children, topic }: { children: React.ReactNode, topic?: string }) => (
    <li>
      <button 
        onClick={() => navigateToInfo(topic || children?.toString() || '')}
        className="text-slate-400 text-sm hover:text-white transition-colors text-left w-full"
      >
        {children}
      </button>
    </li>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentView={currentView} setView={setView} user={user} logout={handleLogout} />
      
      <main className="flex-grow bg-slate-50/50">
        {currentView === 'home' && (
          <Home 
            setView={setView} 
            onSelectCategory={(cat) => setSelectedCategory(cat)} 
          />
        )}

        {currentView === 'request' && (
          <ServiceRequestForm 
            initialCategory={selectedCategory} 
            setView={setView}
            onSubmit={handleCreateRequest}
          />
        )}

        {currentView === 'pro-dashboard' && user && (
          <ProfessionalDashboard 
            user={user} 
            requests={requests} 
            onUnlock={handleUnlockLead}
            onAddCredits={() => setView('add-credits')}
          />
        )}

        {currentView === 'add-credits' && user && (
          <CreditPurchase 
            onSuccess={handleAddCredits}
            onCancel={() => setView('pro-dashboard')}
          />
        )}

        {currentView === 'info' && (
          <InfoPage topic={infoTopic} onBack={() => setView('home')} />
        )}

        {currentView === 'login' && (
          <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-3xl shadow-xl border border-slate-100 text-center space-y-8 relative">
            <button 
              onClick={() => setView('home')}
              className="absolute top-4 left-6 text-slate-400 hover:text-blue-600 font-medium text-sm flex items-center gap-1"
            >
              ← Início
            </button>
            <h2 className="text-3xl font-bold pt-4">Acesse sua conta</h2>
            <div className="grid gap-4">
              <button onClick={() => handleLogin('CLIENT')} className="w-full py-4 rounded-2xl bg-blue-50 text-blue-700 font-bold hover:bg-blue-100 transition-colors">
                Sou Cliente (Quero contratar)
              </button>
              <button onClick={() => handleLogin('PROFESSIONAL')} className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
                Sou Profissional (Quero trabalhar)
              </button>
            </div>
            <p className="text-slate-400 text-sm">Novo por aqui? O cadastro é grátis e leva 1 minuto.</p>
          </div>
        )}

        {currentView === 'pro-signup' && (
          <div className="max-w-4xl mx-auto py-12 px-4 space-y-8">
            <button 
              onClick={() => setView('home')}
              className="text-slate-500 hover:text-blue-600 font-bold flex items-center gap-2 transition-colors"
            >
              ← Voltar ao Início
            </button>
            
            <div className="text-center space-y-6">
              <h1 className="text-4xl font-extrabold text-slate-900">Seja um profissional parceiro Vila Ré</h1>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto">Milhares de clientes na região procuram por serviços como o seu todos os dias.</p>
              
              <div className="grid md:grid-cols-3 gap-6 pt-8">
                {[
                  { title: 'Zero Taxa de Adesão', text: 'Você não paga nada para entrar e criar seu perfil.', icon: '💸' },
                  { title: 'Receba Leads Qualificados', text: 'Acesse apenas clientes que realmente precisam de você.', icon: '🎯' },
                  { title: 'Aumente seu Faturamento', text: 'Nossos parceiros aumentam em média 40% sua renda.', icon: '📈' }
                ].map(benefit => (
                  <div key={benefit.title} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-4xl mb-4">{benefit.icon}</div>
                    <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{benefit.text}</p>
                  </div>
                ))}
              </div>
              
              <div className="pt-10">
                <button onClick={() => handleLogin('PROFESSIONAL')} className="bg-blue-600 text-white px-12 py-5 rounded-2xl text-xl font-bold shadow-2xl shadow-blue-200 hover:scale-105 transition-all active:scale-95">
                  Começar agora gratuitamente
                </button>
                <p className="mt-4 text-slate-400 text-sm">Ao clicar em começar, você concorda com nossos termos de uso.</p>
              </div>
            </div>
          </div>
        )}

        {currentView === 'admin' && (
          <div className="max-w-7xl mx-auto py-12 px-4 space-y-8 text-center">
            <h1 className="text-3xl font-bold">Acesso Restrito ao Admin</h1>
            <p className="text-slate-500">Funcionalidade em desenvolvimento.</p>
            <button onClick={() => setView('home')} className="bg-slate-900 text-white px-6 py-2 rounded-xl">Voltar ao Início</button>
          </div>
        )}
      </main>

      <footer className="bg-slate-950 text-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Logo size={48} showText={true} className="brightness-200" />
            <p className="text-slate-400 text-sm">
              Conectando a Vila Ré com os melhores serviços técnicos e residenciais. 
              Segurança e qualidade em cada atendimento.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-lg border-b border-slate-800 pb-2">Para Clientes</h4>
            <ul className="space-y-2">
              <FooterLink>Como funciona</FooterLink>
              <FooterLink>Segurança</FooterLink>
              <FooterLink>Blog</FooterLink>
              <FooterLink topic="Categorias de Serviços">Categorias</FooterLink>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-lg border-b border-slate-800 pb-2">Para Profissionais</h4>
            <ul className="space-y-2">
              <FooterLink>Vantagens</FooterLink>
              <FooterLink>Planos e Preços</FooterLink>
              <FooterLink>Centro de Ajuda</FooterLink>
              <FooterLink>Regras de Conduta</FooterLink>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-lg border-b border-slate-800 pb-2">Institucional</h4>
            <ul className="space-y-2">
              <FooterLink>Sobre Nós</FooterLink>
              <FooterLink>Carreiras</FooterLink>
              <FooterLink>Termos de Uso</FooterLink>
              <FooterLink>Privacidade</FooterLink>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-900 text-center text-slate-500 text-xs">
          © 2024 Vila Ré Service Soluções Tecnológicas Ltda. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default App;
