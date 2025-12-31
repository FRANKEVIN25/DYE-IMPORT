import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';

const WhatsAppFloat = ({ phoneNumber = '51999999999', message = 'Hola, tengo una consulta' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');

  const handleWhatsAppClick = () => {
    const text = customMessage || message;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setIsOpen(false);
    setCustomMessage('');
  };

  return (
    <>
      {/* Botón flotante principal */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Mini ventana de chat */}
        {isOpen && (
          <div className="absolute bottom-20 right-0 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden mb-4 animate-slide-up">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <MessageCircle className="text-green-600" size={24} />
                </div>
                <div className="text-white">
                  <h3 className="font-bold text-lg">DYE IMPORT</h3>
                  <p className="text-sm text-green-100">En línea</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 bg-gray-50">
              <div className="bg-white rounded-lg shadow p-4 mb-4">
                <p className="text-gray-700 text-sm mb-2">
                  👋 ¡Hola! Bienvenido a DYE IMPORT
                </p>
                <p className="text-gray-600 text-sm">
                  ¿En qué podemos ayudarte hoy?
                </p>
              </div>
              
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Escribe tu mensaje aquí..."
                className="w-full border-2 border-gray-200 rounded-lg p-3 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none resize-none mb-3"
                rows="3"
              />
              
              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                Iniciar conversación
              </button>
            </div>
          </div>
        )}

        {/* Botón principal */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
          aria-label="Abrir WhatsApp"
        >
          {/* Efecto de pulso */}
          <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></span>
          
          {/* Icono */}
          <MessageCircle className="text-white relative z-10" size={28} strokeWidth={2} />
          
          {/* Badge de notificación */}
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
            1
          </span>
        </button>

        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute bottom-0 right-20 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
            ¿Necesitas ayuda?
            <div className="absolute top-1/2 -right-1 w-2 h-2 bg-gray-900 transform rotate-45 -translate-y-1/2"></div>
          </div>
        )}
      </div>

      {/* Estilos de animación */}
      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default WhatsAppFloat;