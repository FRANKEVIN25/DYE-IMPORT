import React, { useState } from 'react';
import { LockKeyhole, LogIn, ShieldCheck, AlertCircle } from 'lucide-react';

const LoginPage = ({ setIsAdmin, setView }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const ADMIN_HASH = "b08a090d624e257ba06ddeaed477a88dd794622c0995e48a44641b684040b72b";

  // Función para hashear la contraseña ingresada
  const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleLogin = async () => {
    if (!password.trim()) {
      setError('Por favor ingresa una contraseña');
      setTimeout(() => setError(''), 3000);
      return;
    }

    setIsLoading(true);
    
    try {
      // Simular delay de red (para hacer más realista)
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const hashedInput = await hashPassword(password);
      
      if (hashedInput === ADMIN_HASH) {
        setIsAdmin(true);
        setView('admin');
        setPassword('');
        setError('');
      } else {
        setError('Contraseña incorrecta');
        setPassword('');
        setTimeout(() => setError(''), 3000);
      }
    } catch (err) {
      setError('Error al procesar. Intenta de nuevo.');
      setTimeout(() => setError(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-blue-600 rounded-full blur-[120px] opacity-20"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-600 rounded-full blur-[120px] opacity-20"></div>

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-12 rounded-[2.5rem] shadow-2xl max-w-md w-full z-10 mx-4">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(59,130,246,0.5)] transform -rotate-6">
            <ShieldCheck className="text-white w-10 h-10" />
          </div>
          <h2 className="text-4xl font-extrabold text-white tracking-tight mb-2">
            Panel <span className="text-blue-400">Admin</span>
          </h2>
          <p className="text-slate-400 font-medium">Acceso seguro protegido</p>
        </div>

        <div className="space-y-6">
          <div className="relative group">
            <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors w-5 h-5" />
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleLogin()}
              disabled={isLoading}
              className={`w-full pl-12 pr-4 py-4 bg-slate-800/50 border-2 rounded-2xl focus:ring-4 focus:ring-blue-500/20 transition-all outline-none text-white placeholder:text-slate-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                error ? 'border-red-500 animate-shake' : 'border-slate-700 focus:border-blue-500'
              }`}
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 animate-fadeIn">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full group relative flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg shadow-blue-900/20 active:scale-95 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Verificando...
                </>
              ) : (
                <>
                  Acceder ahora <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </span>
            {!isLoading && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
            )}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
        .animate-shake {
          animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;