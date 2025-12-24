
import React from 'react';
import { AppView, User } from '../types';
import { Logo } from './Logo';

interface NavbarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  user: User | null;
  logout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setView, user, logout }) => {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
            <Logo size={40} showText={true} />
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                {user.role === 'PROFESSIONAL' && (
                  <button 
                    onClick={() => setView('pro-dashboard')}
                    className={`text-sm font-medium px-3 py-2 rounded-md ${currentView === 'pro-dashboard' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
                  >
                    Meu Painel
                  </button>
                )}
                {user.role === 'ADMIN' && (
                  <button 
                    onClick={() => setView('admin')}
                    className={`text-sm font-medium px-3 py-2 rounded-md ${currentView === 'admin' ? 'bg-purple-50 text-purple-600' : 'text-slate-600 hover:text-purple-600'}`}
                  >
                    Admin
                  </button>
                )}
                <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-semibold">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.role}</p>
                  </div>
                  <button 
                    onClick={logout}
                    className="text-sm text-red-500 hover:text-red-600 font-medium"
                  >
                    Sair
                  </button>
                </div>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setView('pro-signup')}
                  className="hidden sm:block text-sm font-medium text-slate-600 hover:text-blue-600"
                >
                  Sou Profissional
                </button>
                <button 
                  onClick={() => setView('login')}
                  className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md shadow-blue-200 hover:bg-blue-700 transition-all"
                >
                  Entrar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
