
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface InfoPageProps {
  topic: string;
  onBack: () => void;
}

export const InfoPage: React.FC<InfoPageProps> = ({ topic, onBack }) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: `Você é o redator oficial da plataforma "Vila Ré Service", um marketplace de serviços que atua na Vila Ré, São Paulo. 
          Escreva o conteúdo completo, profissional e detalhado para a página: "${topic}". 
          REGRAS IMPORTANTES:
          1. Use Markdown para formatação (títulos, listas, negrito).
          2. O tom deve ser confiável e focado na comunidade local.
          3. NÃO inclua links de "Leia mais", placeholders de link como (#), botões fictícios ou seções de inscrição em newsletter.
          4. NÃO inclua "Fique por dentro!" ou chamadas para assinatura de e-mail.
          5. NÃO utilize réguas horizontais ou separadores como "---" ou "***".
          6. Termine o texto de forma conclusiva, sem ganchos para outros artigos ou rodapés de sistema.`,
        });
        
        // Limpeza rigorosa de placeholders e separadores indesejados
        const cleanedText = (response.text || '')
          .split('\n')
          .filter(line => {
            const trimmed = line.trim();
            const isPlaceholder = line.includes('[Leia o artigo') || line.includes('(#)') || line.includes('newsletter');
            const isSeparator = trimmed === '---' || trimmed === '***' || trimmed === '___';
            const isNewsletterHeader = trimmed.toLowerCase().includes('fique por dentro');
            return !isPlaceholder && !isSeparator && !isNewsletterHeader;
          })
          .join('\n');

        setContent(cleanedText.trim() || 'Conteúdo indisponível no momento.');
      } catch (error) {
        console.error("Erro ao gerar conteúdo:", error);
        setContent("Desculpe, não conseguimos carregar esta informação agora. Por favor, tente novamente em instantes.");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
    window.scrollTo(0, 0);
  }, [topic]);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in duration-500">
      <button 
        onClick={onBack}
        className="text-blue-600 font-bold mb-8 flex items-center gap-2 hover:translate-x-[-4px] transition-transform"
      >
        ← Voltar para o Início
      </button>

      {loading ? (
        <div className="space-y-6 animate-pulse">
          <div className="h-10 bg-slate-200 rounded-lg w-1/3"></div>
          <div className="space-y-3">
            <div className="h-4 bg-slate-200 rounded w-full"></div>
            <div className="h-4 bg-slate-200 rounded w-full"></div>
            <div className="h-4 bg-slate-200 rounded w-5/6"></div>
          </div>
          <div className="h-40 bg-slate-100 rounded-3xl"></div>
          <div className="space-y-3">
            <div className="h-4 bg-slate-200 rounded w-full"></div>
            <div className="h-4 bg-slate-200 rounded w-4/6"></div>
          </div>
        </div>
      ) : (
        <article className="prose prose-slate prose-blue max-w-none bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-slate-100 border border-slate-100">
          <h1 className="text-4xl font-black text-slate-900 mb-8 border-b pb-4">{topic}</h1>
          <div className="whitespace-pre-wrap text-slate-700 leading-relaxed text-lg">
            {content.split('\n').map((line, i) => {
              const trimmed = line.trim();
              if (trimmed === '') return <br key={i} />;
              
              // Evitar renderizar linhas que sejam apenas separadores caso tenham escapado do filtro
              if (trimmed === '---' || trimmed === '***') return null;

              if (line.startsWith('#')) {
                return <h2 key={i} className="font-bold text-2xl mt-6 mb-4 text-slate-900">{line.replace(/^#+\s/, '')}</h2>;
              }
              if (line.startsWith('- ') || line.startsWith('* ')) {
                return <li key={i} className="ml-4 mb-2">{line.substring(2)}</li>;
              }
              return (
                <p key={i} className="mb-4">
                  {line.replace(/\*\*(.*?)\*\*/g, '$1')}
                </p>
              );
            })}
          </div>
        </article>
      )}
      
      <div className="mt-12 bg-blue-50 p-6 rounded-2xl border border-blue-100 text-center">
        <p className="text-blue-800 font-medium">Ainda tem dúvidas sobre {topic}?</p>
        <button className="mt-2 text-blue-600 font-bold underline">Falar com nosso suporte</button>
      </div>
    </div>
  );
};
