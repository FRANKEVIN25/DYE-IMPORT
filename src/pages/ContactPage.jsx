import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

// ─────────────────────────────────────────────
// CONFIGURA AQUÍ TUS CREDENCIALES DE EMAILJS
// (ver instrucciones al final del archivo)
// ─────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'service_jawrppo';
const EMAILJS_TEMPLATE_ID = 'template_687zxrw';
const EMAILJS_PUBLIC_KEY  = 'BrD6Rv90LlUY399IC';

const companyInfo = {
  phone: '+51 974 640 915',
  email: 'ventas@dyeautopartes.com',
  address: 'Parque Unión Panamericana 429, La Victoria, Lima',
  whatsapp: '51974640915',
  mapUrl: 'https://www.google.com/maps?q=-12.0764203,-77.0218279&z=17&output=embed',
  social: {
    facebook: 'https://www.facebook.com/wuhan.autopartes',
    whatsapp: 'https://wa.me/51974640915',
    instagram: '',
    tiktok: '',
  }
};

// ─── Íconos SVG sociales ───────────────────────
const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

// ─────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────
const ContactPage = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus('sending');
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none text-gray-900 text-sm font-medium placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all';

  const contactCards = [
    {
      icon: Phone,
      title: 'Llámanos',
      sub: 'Lun – Vie: 8 AM – 6 PM',
      value: companyInfo.phone,
      href: `tel:${companyInfo.phone}`,
      accent: 'bg-blue-600',
      ring: 'ring-blue-100',
    },
    {
      icon: Mail,
      title: 'Escríbenos',
      sub: 'Respondemos en menos de 24 h',
      value: companyInfo.email,
      href: `mailto:${companyInfo.email}`,
      accent: 'bg-violet-600',
      ring: 'ring-violet-100',
    },
    {
      icon: MapPin,
      title: 'Visítanos',
      sub: 'Fácil acceso y parking',
      value: companyInfo.address,
      href: null,
      accent: 'bg-emerald-600',
      ring: 'ring-emerald-100',
    },
  ];

  const schedule = [
    { day: 'Lunes – Viernes', hours: '8:00 AM – 6:00 PM', open: true },
    { day: 'Sábados',         hours: '9:00 AM – 2:00 PM', open: true },
    { day: 'Domingos',        hours: 'Cerrado',            open: false },
  ];

  return (
    <div className="min-h-screen bg-slate-300">

      {/* ── HERO ── */}
      <section className="relative bg-gray-950 overflow-hidden">
        {/* Fondo texturizado sutil */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />

        <div className="relative max-w-7xl mx-auto px-6 py-28 text-center">
          <p className="text-blue-400 text-xs font-black tracking-[0.3em] uppercase mb-5">
            Estamos para ayudarte
          </p>
          <h1 className="text-6xl md:text-7xl font-black text-white leading-[0.9] mb-6">
            HABLEMOS
          </h1>
          <div className="w-12 h-0.5 bg-blue-500 mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed mb-12">
            Dinos lo que necesitas y te ayudamos a encontrar la pieza exacta para tu vehículo.
          </p>

          {/* Redes sociales */}
          <div className="flex items-center justify-center gap-3">
            <span className="text-gray-600 text-xs font-bold uppercase tracking-widest mr-1">Síguenos</span>
            {companyInfo.social.facebook && (
              <a href={companyInfo.social.facebook} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 hover:bg-blue-600 border border-white/8 hover:border-blue-600 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300">
                <FacebookIcon />
              </a>
            )}
            {companyInfo.social.whatsapp && (
              <a href={companyInfo.social.whatsapp} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 hover:bg-green-600 border border-white/8 hover:border-green-600 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300">
                <WhatsAppIcon />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── CARDS DE CONTACTO ── */}
      <section className="max-w-5xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {contactCards.map((card, i) => {
            const Icon = card.icon;
            const inner = (
              <div className={`group bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl p-7 transition-all duration-300 hover:-translate-y-1 ring-4 ring-transparent hover:${card.ring}`}>
                <div className={`w-11 h-11 ${card.accent} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon size={20} className="text-white" />
                </div>
                <p className="font-black text-gray-900 text-base mb-0.5">{card.title}</p>
                <p className="text-gray-400 text-xs font-medium mb-3">{card.sub}</p>
                <p className="text-gray-700 text-sm font-semibold leading-snug break-words">{card.value}</p>
              </div>
            );
            return card.href
              ? <a key={i} href={card.href}>{inner}</a>
              : <div key={i}>{inner}</div>;
          })}
        </div>
      </section>

      {/* ── FORMULARIO + SIDEBAR ── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Formulario — 3 columnas */}
          <div className="lg:col-span-3 bg-white border border-gray-100 rounded-3xl shadow-xl p-8 md:p-10">
            <p className="text-blue-600 text-xs font-black tracking-[0.3em] uppercase mb-3">Formulario de contacto</p>
            <h2 className="text-3xl font-black text-gray-900 mb-1">Envíanos un mensaje</h2>
            <p className="text-gray-400 text-sm mb-8">Te responderemos directamente a tu correo.</p>

            {status === 'success' ? (
              /* ── Estado éxito ── */
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-5">
                  <CheckCircle size={32} className="text-green-500" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">¡Mensaje enviado!</h3>
                <p className="text-gray-500 text-sm max-w-xs mb-6">
                  Lo recibimos correctamente. Te contactaremos pronto.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-blue-600 text-sm font-bold hover:underline"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">
                      Nombre completo <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Juan Pérez"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">
                      Teléfono
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+51 999 999 999"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">
                    Correo electrónico <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ejemplo@correo.com"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">
                    Mensaje <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Cuéntanos qué repuesto necesitas, modelo de tu vehículo..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm font-medium bg-red-50 rounded-xl px-4 py-3">
                    Hubo un error al enviar. Verifica tu configuración de EmailJS o escríbenos directamente.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white py-4 rounded-xl font-black text-sm tracking-wide transition-all shadow-xl shadow-blue-900/20 hover:-translate-y-0.5 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <>
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={17} />
                      ENVIAR MENSAJE
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Sidebar — 2 columnas */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Horario */}
            <div className="bg-gray-950 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}
              />
              <div className="relative">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center mb-5">
                  <Clock size={18} className="text-blue-400" />
                </div>
                <h3 className="text-xl font-black mb-6">Horario de Atención</h3>
                <div className="space-y-4">
                  {schedule.map((s, i) => (
                    <div key={i} className={`flex justify-between items-center py-3 ${i < schedule.length - 1 ? 'border-b border-white/8' : ''}`}>
                      <span className="font-bold text-sm text-gray-200">{s.day}</span>
                      <span className={`text-sm font-semibold ${s.open ? 'text-blue-300' : 'text-gray-600'}`}>
                        {s.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${companyInfo.whatsapp}?text=Hola,%20necesito%20informaci%C3%B3n%20sobre%20un%20repuesto`}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-green-600 hover:bg-green-500 transition-all duration-300 rounded-3xl p-8 text-white flex flex-col items-center text-center hover:-translate-y-1 shadow-xl shadow-green-900/20"
            >
              <div className="w-14 h-14 bg-white/15 group-hover:bg-white/25 rounded-2xl flex items-center justify-center mb-4 transition-colors">
                <WhatsAppIcon />
              </div>
              <h4 className="font-black text-lg mb-1">Chat Directo</h4>
              <p className="text-green-100 text-xs mb-4">Respuesta inmediata por WhatsApp</p>
              <div className="flex items-center gap-2 text-sm font-black bg-white/15 px-5 py-2 rounded-full">
                Iniciar Chat <Send size={13} />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── MAPA ── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="px-8 py-7 flex items-center gap-5 border-b border-gray-100">
            <div className="w-11 h-11 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin size={20} className="text-white" />
            </div>
            <div>
              <h2 className="font-black text-gray-900 text-lg leading-none mb-1">Nuestra Ubicación</h2>
              <p className="text-gray-500 text-sm">{companyInfo.address}</p>
            </div>
          </div>
          <div className="h-80 md:h-[420px]">
            <iframe
              src={companyInfo.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación DYE AUTOPARTES"
            />
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  CONFIGURACIÓN DE EMAILJS (5 minutos)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Instala el paquete:
   npm install @emailjs/browser

2. Crea cuenta gratis en https://emailjs.com

3. En el dashboard de EmailJS:
   a) Email Services → Add Service → Gmail (u otro)
      Copia el SERVICE_ID

   b) Email Templates → Create Template
      Usa estas variables en el cuerpo del template:
        {{name}}     ← nombre del cliente
        {{email}}    ← su correo (para poder responderle)
        {{phone}}    ← su teléfono
        {{message}}  ← su mensaje
      
      En "To Email" pon: ventas@autopartespro.com
      Copia el TEMPLATE_ID

   c) Account → Public Key
      Copia la PUBLIC_KEY

4. Reemplaza las 3 constantes al inicio de este archivo:
   const EMAILJS_SERVICE_ID  = 'service_XXXXXXX';
   const EMAILJS_TEMPLATE_ID = 'template_XXXXXXX';
   const EMAILJS_PUBLIC_KEY  = 'XXXXXXXXXXXXXXXX';

¡Listo! Cada mensaje llega directo al correo corporativo.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/