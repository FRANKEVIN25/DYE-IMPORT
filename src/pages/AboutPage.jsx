import { Target, Eye, Award, Users } from 'lucide-react';
import { companyInfo } from '../data/initialData';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-slate-300 pt-20">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div>
            <h1 className="text-6xl font-black text-white mb-6">
              Sobre <span className="text-blue-400">Nosotros</span>
            </h1>
            <p className="text-2xl text-gray-200 max-w-2xl">
              Más de una década brindando calidad y confianza en autopartes
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Company Description */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">
                ¿Quiénes <span className="text-blue-600">Somos?</span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {companyInfo.about.description}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Nuestro compromiso es proporcionar productos de la más alta calidad, 
                respaldados por un servicio al cliente excepcional y precios competitivos 
                que benefician a nuestros clientes.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800" 
                alt="Autopartes"
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-8 rounded-2xl shadow-xl">
                <div className="text-5xl font-black mb-2">100%</div>
                <div className="text-lg font-semibold">Compromiso con la calidad</div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-10 rounded-3xl shadow-lg">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                <Target className="text-white" size={32} />
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-4">Nuestra Misión</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                {companyInfo.about.mission}
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-10 rounded-3xl shadow-lg">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                <Eye className="text-white" size={32} />
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-4">Nuestra Visión</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                {companyInfo.about.vision}
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              Nuestros <span className="text-blue-600">Valores</span>
            </h2>
            <p className="text-xl text-gray-600">Los principios que nos guían cada día</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyInfo.about.values.map((value, index) => (
              <div 
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-t-4 border-blue-600"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Award className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-gradient-to-br from-gray-50 to-blue-50 -mx-4 px-4 md:mx-0 rounded-3xl py-16">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              Nuestro <span className="text-blue-600">Equipo</span>
            </h2>
            <p className="text-xl text-gray-600">Profesionales dedicados a tu satisfacción</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { role: 'Expertos en Autopartes', description: 'Personal capacitado con años de experiencia' },
              { role: 'Atención al Cliente', description: 'Equipo dedicado a resolver tus consultas' },
              { role: 'Técnicos Especializados', description: 'Asesoría profesional garantizada' }
            ].map((team, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Users className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{team.role}</h3>
                <p className="text-gray-600">{team.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-12 rounded-3xl shadow-2xl">
            <h2 className="text-4xl font-black mb-4">¿Listo para trabajar con nosotros?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Contáctanos hoy y descubre por qué somos la mejor opción en autopartes
            </p>
            <button 
              onClick={() => window.location.href = '#contact'}
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Contáctanos Ahora
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;