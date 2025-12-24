
import React, { useState } from 'react';

interface CreditPurchaseProps {
  onSuccess: (amount: number) => void;
  onCancel: () => void;
}

export const CreditPurchase: React.FC<CreditPurchaseProps> = ({ onSuccess, onCancel }) => {
  const [amount, setAmount] = useState<number>(50);
  const [method, setMethod] = useState<'pix' | 'card'>('pix');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchase = () => {
    setIsProcessing(true);
    // Simula processamento de pagamento
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess(amount);
    }, 2000);
  };

  const options = [25, 50, 100, 200, 500];

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Adicionar Créditos</h2>
          <p className="text-slate-500 text-sm">Escolha o valor que deseja recarregar para liberar novos leads.</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => setAmount(opt)}
              className={`py-3 rounded-xl border-2 font-bold transition-all ${
                amount === opt ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 text-slate-500 hover:border-blue-200'
              }`}
            >
              R$ {opt}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <p className="font-bold text-sm">Forma de Pagamento</p>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setMethod('pix')}
              className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
                method === 'pix' ? 'border-blue-600 bg-blue-50' : 'border-slate-100'
              }`}
            >
              <span className="text-xl">💠</span>
              <span className="font-bold">PIX</span>
            </button>
            <button
              onClick={() => setMethod('card')}
              className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
                method === 'card' ? 'border-blue-600 bg-blue-50' : 'border-slate-100'
              }`}
            >
              <span className="text-xl">💳</span>
              <span className="font-bold">Cartão</span>
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-4">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total a pagar:</span>
            <span className="text-blue-600 text-2xl font-black">R$ {amount.toFixed(2)}</span>
          </div>

          <button
            disabled={isProcessing}
            onClick={handlePurchase}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-3"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                Processando...
              </>
            ) : (
              `Pagar com ${method.toUpperCase()}`
            )}
          </button>
          
          <button 
            disabled={isProcessing}
            onClick={onCancel} 
            className="w-full text-slate-400 font-bold hover:text-slate-600 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
      
      <p className="mt-8 text-center text-xs text-slate-400">
        Pagamento processado de forma segura via Mercado Pago. Seus créditos são liberados instantaneamente após a confirmação.
      </p>
    </div>
  );
};
