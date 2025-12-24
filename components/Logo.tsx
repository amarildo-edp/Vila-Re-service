
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = 48, showText = false }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm transition-transform hover:rotate-12 duration-500"
      >
        {/* Círculo de Fundo com Degradê */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
        </defs>
        
        {/* Aro Exterior Segmentado (Representativo das 8 áreas) */}
        <circle cx="50" cy="50" r="48" stroke="url(#logoGradient)" strokeWidth="0.5" strokeDasharray="1 2" />
        
        {/* Ícones das Atividades em Círculo */}
        <g className="icons-group">
          {/* Elétrica */}
          <text x="45" y="18" fontSize="10" fill="#2563eb">⚡</text>
          {/* Hidráulica */}
          <text x="75" y="30" fontSize="10" fill="#2563eb">💧</text>
          {/* Pintura */}
          <text x="85" y="55" fontSize="10" fill="#2563eb">🖌️</text>
          {/* Construção */}
          <text x="75" y="82" fontSize="10" fill="#2563eb">🏗️</text>
          {/* Jardinagem */}
          <text x="45" y="93" fontSize="10" fill="#2563eb">🍃</text>
          {/* Mecânica */}
          <text x="15" y="82" fontSize="10" fill="#2563eb">⚙️</text>
          {/* TI */}
          <text x="5" y="55" fontSize="10" fill="#2563eb">💻</text>
          {/* Limpeza */}
          <text x="15" y="30" fontSize="10" fill="#2563eb">🧹</text>
        </g>

        {/* Círculo Central com "V" */}
        <circle cx="50" cy="50" r="28" fill="url(#logoGradient)" />
        <path 
          d="M38 42L50 65L62 42" 
          stroke="white" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      </svg>
      
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">
            Vila Ré
          </span>
          <span className="text-xs font-bold text-blue-600 tracking-[0.2em] uppercase">
            Service
          </span>
        </div>
      )}
    </div>
  );
};
