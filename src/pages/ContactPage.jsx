import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';

// Datos de la empresa (reemplaza con tus datos reales)
const companyInfo = {
  phone: '+51 987 654 321',
  email: 'contacto@tuempresa.com',
  address: 'Jr. Cuarzos 1880, San Juan de Lurigancho',
  whatsapp: '51974640915',
  mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.3041!2d-77.0547!3d-11.9889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDU5JzIwLjAiUyA3N8KwMDMnMTcuMCJX!5e0!3m2!1ses!2spe!4v1234567890'
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Hola, soy ${formData.name}
Email: ${formData.email}
Teléfono: ${formData.phone}
Mensaje: ${formData.message}`;
    window.open(`https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)'
        }}></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <MessageCircle className="mx-auto mb-6 animate-bounce" size={56} strokeWidth={1.5} />
          <h1 className="text-6xl font-black mb-6 tracking-tight">¡Hablemos!</h1>
          <p className="text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Estamos listos para atender tus consultas y brindarte la mejor atención
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20 pb-20">
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Cards */}
          {[
            { 
              icon: Phone, 
              title: 'Llámanos', 
              info: companyInfo.phone, 
              link: `tel:${companyInfo.phone}`,
              color: 'from-blue-500 to-cyan-500',
              description: 'Lun - Vie: 8AM - 6PM'
            },
            { 
              icon: Mail, 
              title: 'Escríbenos', 
              info: companyInfo.email, 
              link: `mailto:${companyInfo.email}`,
              color: 'from-purple-500 to-pink-500',
              description: 'Te respondemos en 24h'
            },
            { 
              icon: MapPin, 
              title: 'Visítanos', 
              info: companyInfo.address,
              color: 'from-green-500 to-emerald-500',
              description: 'Fácil acceso y parking'
            }
          ].map((item, index) => (
            <div key={index} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
              <div className="p-8">
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  <item.icon className="text-white" size={28} />
                </div>
                <h3 className="font-bold text-2xl mb-2 text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{item.description}</p>
                {item.link ? (
                  <a href={item.link} className="text-gray-700 hover:text-blue-600 font-medium text-lg transition-colors block break-words">
                    {item.info}
                  </a>
                ) : (
                  <p className="text-gray-700 font-medium text-lg">{item.info}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-3 bg-white rounded-3xl shadow-xl p-8 lg:p-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Envíanos un mensaje</h2>
            <p className="text-gray-600 text-lg mb-8">Completa el formulario y nos pondremos en contacto contigo</p>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nombre completo</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                    placeholder="Juan Pérez"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Teléfono</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                    placeholder="+51 999 999 999"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                  placeholder="ejemplo@correo.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Mensaje</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none resize-none"
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                ></textarea>
              </div>
              
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-5 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
              >
                <Send size={22} />
                Enviar Mensaje por WhatsApp
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-8">
            {/* Schedule */}
            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white rounded-3xl shadow-xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
              <div className="relative">
                <Clock className="mb-6" size={40} strokeWidth={1.5} />
                <h3 className="text-3xl font-black mb-6">Horario de Atención</h3>
                <div className="space-y-4">
                  {[
                    { day: 'Lunes - Viernes', hours: '8:00 AM - 6:00 PM', available: true },
                    { day: 'Sábados', hours: '9:00 AM - 2:00 PM', available: true },
                    { day: 'Domingos', hours: 'Cerrado', available: false }
                  ].map((schedule, index) => (
                    <div key={index} className="flex items-center justify-between py-4 border-b border-white/20 last:border-0">
                      <span className="font-bold text-lg">{schedule.day}</span>
                      <span className={`text-lg ${schedule.available ? 'text-blue-100' : 'text-white/60'}`}>
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${companyInfo.whatsapp}?text=Hola,%20tengo%20una%20consulta`}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 p-8 text-center group"
            >
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Phone size={40} />
              </div>
              <h4 className="text-2xl font-black mb-2">Chat Directo</h4>
              <p className="text-green-100 mb-4">Respuesta inmediata por WhatsApp</p>
              <div className="inline-flex items-center gap-2 text-lg font-bold">
                Iniciar Chat
                <Send size={20} />
              </div>
            </a>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="p-8 lg:p-12 border-b border-gray-100">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <MapPin className="text-white" size={32} />
              </div>
              <div>
                <h2 className="text-4xl font-black text-gray-900 mb-3">Nuestra Ubicación</h2>
                <p className="text-gray-600 text-lg mb-4">{companyInfo.address}</p>
                <p className="text-gray-500">
                  Fácil acceso desde cualquier punto de la ciudad • Estacionamiento disponible
                </p>
              </div>
            </div>
          </div>
          
          <div className="relative h-96 lg:h-[500px]">
            <iframe
              src={companyInfo.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de la tienda"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;