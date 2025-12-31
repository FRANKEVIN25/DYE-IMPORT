import { useState, useEffect } from 'react';

const Header = ({ currentView = 'home', setView = () => {} }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Inicio' },
    { id: 'catalog', label: 'Catálogo' },
    { id: 'about', label: 'Nosotros' },
    { id: 'contact', label: 'Contacto' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-md h-16 md:h-20' 
          : 'bg-white border-b border-gray-100 h-20 md:h-24'
      }`}
    >
      {/* Reducimos el padding lateral del contenedor (px-2 md:px-4) para ganar espacio */}
      <div className="max-w-7xl mx-auto h-full px-2 md:px-4">
        <div className="flex items-center justify-between h-full relative">
          
          {/* LADO IZQUIERDO: LOGO IDENTIDAD (Ahora más a la izquierda) */}
          <div 
            className="flex items-center cursor-pointer group -ml-2 md:-ml-6" // Margen negativo para pegarlo al borde
            onClick={() => setView('home')}
          >
            {/* Contenedor del Logo */}
            <div className="relative w-24 md:w-32 h-10">
              <img 
                src="/images/logo.png" 
                alt="DYE IMPORT" 
                className={`absolute left-0 transition-all duration-500 object-contain drop-shadow-md
                  ${scrolled ? 'h-20 md:h-24 -top-6' : 'h-28 md:h-32 -top-10'}
                  group-hover:scale-105`}
              />
            </div>

            {/* Texto de Marca */}
            <div className="ml-6 md:ml-10 flex flex-col justify-center border-l border-gray-200 pl-4 py-1">
              <span className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter leading-none">
                DYE <span className="text-blue-600">IMPORT</span>
              </span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">
                Tu socio en repuestos
              </span>
            </div>
          </div>

          {/* NAVEGACIÓN */}
          <nav className="hidden md:flex items-center space-x-10 pr-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setView(link.id)}
                className={`relative py-2 text-sm font-bold uppercase tracking-widest transition-colors duration-300
                  ${currentView === link.id 
                    ? 'text-blue-600' 
                    : 'text-slate-500 hover:text-slate-900'
                  }
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 
                  after:bg-blue-600 after:transition-transform after:duration-300
                  ${currentView === link.id ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'}
                `}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* MENÚ MÓVIL */}
          <button 
            className="md:hidden p-2 text-slate-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`h-0.5 w-full bg-current transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`h-0.5 w-full bg-current ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`h-0.5 w-full bg-current transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* OVERLAY MÓVIL */}
      <div className={`fixed inset-0 bg-white z-[90] md:hidden transition-transform duration-500 ${
        mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="flex flex-col items-center justify-center h-full space-y-10">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { setView(link.id); setMobileMenuOpen(false); }}
              className={`text-2xl font-black uppercase tracking-tighter ${
                currentView === link.id ? 'text-blue-600' : 'text-slate-800'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header; 