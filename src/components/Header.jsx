import { useState, useEffect } from 'react';

const Header = ({ currentView = 'home', setView = () => {} }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home',    label: 'Inicio'   },
    { id: 'catalog', label: 'Catálogo' },
    { id: 'about',   label: 'Nosotros' },
    { id: 'contact', label: 'Contacto' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 overflow-visible ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm h-16'
            : 'bg-white border-b border-gray-100 h-20'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between overflow-visible">

          {/* Logo — sobresale del header intencionalmente */}
          <button
            onClick={() => setView('home')}
            className="flex items-center gap-4 group overflow-visible"
          >
            <div className="relative overflow-visible flex items-center">
              <img
                src="/images/logo.png"
                alt="DYE AUTOPARTES"
                loading="eager"
                className={`object-contain drop-shadow-md group-hover:scale-105 transition-all duration-300 translate-y-2 ${
                  scrolled ? 'h-16' : 'h-24'
                }`}
              />
            </div>
            <div className="border-l border-gray-200 pl-4 flex flex-col justify-center">
              <span className="text-xl font-black text-slate-900 tracking-tight leading-none">
                DYE <span className="text-blue-600">AUTOPARTES</span>
              </span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.18em] mt-0.5">
                Tu socio en repuestos
              </span>
            </div>
          </button>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setView(link.id)}
                className={`relative py-2 text-sm font-bold uppercase tracking-widest transition-colors duration-200
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

            <button
              onClick={() => setView('catalog')}
              className="ml-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-black tracking-wide rounded-lg transition-colors"
            >
              Ver catálogo
            </button>
          </nav>

          {/* Hamburguesa móvil */}
          <button
            className="md:hidden p-2 text-slate-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menú"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`h-0.5 w-full bg-current transition-all duration-300 origin-center ${mobileMenuOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
              <span className={`h-0.5 w-full bg-current transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 w-full bg-current transition-all duration-300 origin-center ${mobileMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Overlay móvil — fuera del header para no heredar overflow */}
      <div
        className={`fixed inset-0 bg-white z-[90] md:hidden transition-transform duration-500 ${
          mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { setView(link.id); setMobileMenuOpen(false); }}
              className={`text-3xl font-black uppercase tracking-tight transition-colors ${
                currentView === link.id ? 'text-blue-600' : 'text-slate-800'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { setView('catalog'); setMobileMenuOpen(false); }}
            className="mt-4 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-black tracking-widest uppercase rounded-xl transition-colors"
          >
            Ver catálogo
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
