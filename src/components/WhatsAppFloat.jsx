import { X } from 'lucide-react';
import { useState } from 'react';

const WhatsAppSVG = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const WhatsAppFloat = ({ phoneNumber = '51999999999', message = 'Hola, tengo una consulta' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');

  const handleWhatsAppClick = () => {
    const text = customMessage.trim() || message;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, '_blank');
    setIsOpen(false);
    setCustomMessage('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">

      {/* Ventana de chat */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 mb-2">
          {/* Header del chat */}
          <div className="bg-[#075E54] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center">
                <WhatsAppSVG className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-none">DYE IMPORT</p>
                <p className="text-green-200 text-xs mt-0.5">Respuesta rápida</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
              aria-label="Cerrar"
            >
              <X size={18} />
            </button>
          </div>

          {/* Cuerpo */}
          <div className="p-4 bg-[#ECE5DD]">
            {/* Burbuja de mensaje */}
            <div className="bg-white rounded-xl rounded-tl-none px-4 py-3 shadow-sm mb-4 max-w-[85%]">
              <p className="text-gray-800 text-sm leading-relaxed">
                Hola! ¿En qué podemos ayudarte? Dinos el modelo de tu vehículo y te encontramos la pieza exacta.
              </p>
              <p className="text-gray-400 text-[10px] mt-1 text-right">DYE IMPORT</p>
            </div>

            {/* Input */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleWhatsAppClick(); } }}
                placeholder="Escribe tu mensaje..."
                className="w-full px-4 pt-3 pb-2 text-sm text-gray-800 placeholder-gray-400 outline-none resize-none"
                rows="2"
              />
              <div className="flex justify-end px-3 pb-3">
                <button
                  onClick={handleWhatsAppClick}
                  className="bg-[#075E54] hover:bg-[#064d44] text-white px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 transition-colors"
                >
                  <WhatsAppSVG className="w-3.5 h-3.5" />
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Botón flotante */}
      <div className="group relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-[#25D366] hover:bg-[#20bc5a] rounded-full shadow-xl hover:shadow-green-500/30 transition-all duration-300 hover:scale-110 flex items-center justify-center"
          aria-label="Abrir WhatsApp"
        >
          {isOpen
            ? <X className="text-white" size={22} />
            : <WhatsAppSVG className="w-7 h-7 text-white" />
          }
        </button>

        {/* Tooltip — en el wrapper group, no en el button */}
        {!isOpen && (
          <div className="absolute bottom-1/2 translate-y-1/2 right-16 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
            ¿Necesitas ayuda?
            <div className="absolute top-1/2 -right-1 w-2 h-2 bg-gray-900 rotate-45 -translate-y-1/2" />
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatsAppFloat;
