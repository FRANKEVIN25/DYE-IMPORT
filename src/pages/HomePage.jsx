import { useState, useEffect } from 'react';
import { ChevronRight, ArrowRight, ShieldCheck, ChevronLeft } from 'lucide-react';

// IMÁGENES HERO
const heroSlides = [
  {
    id: 'h1',
    subtitle: 'EXPERTISE AUTOMOTRIZ',
    title: 'SOLUCIONES EN REPUESTOS',
    highlight: 'PREMIUM',
    description: 'Componentes de alta ingeniería para mantener la integridad de tu vehículo.',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 'h2',
    subtitle: 'RENDIMIENTO ASEGURADO',
    title: 'TECNOLOGÍA QUE MUEVE TU',
    highlight: 'MUNDO',
    description: 'Stock completo de piezas originales y alternativas de primer nivel.',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=2000&auto=format&fit=crop',
  }
];

// ESTADÍSTICAS
const statsData = [
  { 
    label: 'Compromiso y experiencia que nos respaldan', 

    image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=400&fit=crop'
  },
  { 
    label: 'Disponibilidad inmediata en repuestos', 
   
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=400&h=400&fit=crop'
  },
  { 
    label: 'Alianzas con fabricantes reconocidos', 

    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop'
  },
  { 
    label: 'Comprometidos con la satisfacción del cliente', 
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=400&fit=crop'
  }
];

// CATEGORÍAS
const categoriesData = [
  { 
    id: 1, 
    name: 'Motor', 
    image: '/images/motor.png',
    count: '+1200 Artículos' 
  },
  { 
    id: 2, 
    name: 'Frenos', 
    image: '/images/frenos.png',
    count: '+800 Artículos' 
  },
  { 
    id: 3, 
    name: 'Suspensión', 
    image: '/images/suspencion.jpg',
    count: '+600 Artículos' 
  },
  { 
    id: 4, 
    name: 'Eléctrico', 
    image: '/images/electrico.jpg',
    count: '+950 Artículos' 
  },
  { 
    id: 5, 
    name: 'Transmisión', 
    image: '/images/transmision.jpg',
    count: '+400 Artículos' 
  },
  { 
    id: 6, 
    name: 'Iluminación', 
    image: '/images/Iluminacion.jpg',
    count: '+300 Artículos' 
  }
];

// PRODUCTOS DESTACADOS DEL CARRUSEL
const highlightedProducts = [
  { id: 'hp1', name: "Amortiguadores Gas", category: "Suspensión", image: "https://images.unsplash.com/photo-1635437536607-b8572f443763?w=800" },
  { id: 'hp2', name: "Kit de Embrague", category: "Transmisión", image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800" },
  { id: 'hp3', name: "Discos Hi-Carbon", category: "Frenos", image: "https://images.unsplash.com/photo-1486006396193-471cf6a5ff1a?w=800" },
  { id: 'hp4', name: "Ópticas LED Sport", category: "Iluminación", image: "https://images.unsplash.com/photo-1549399500-c44d172e7343?w=800" },
  { id: 'hp5', name: "Batería Pro-Start", category: "Eléctrico", image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800" },
];

const HomePage = ({ products = [], setView = () => {}, setSelectedProduct = () => {}, setSelectedCategory = () => {} }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carouselPosition, setCarouselPosition] = useState(0);
  const featuredItems = products.filter(p => p.featured === true).slice(0, 4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const scrollCarousel = (direction) => {
    const container = document.getElementById('carousel-container');
    if (!container) return;
    
    const scrollAmount = 440;
    const newPosition = direction === 'left' 
      ? Math.max(0, carouselPosition - scrollAmount)
      : Math.min(container.scrollWidth - container.clientWidth, carouselPosition + scrollAmount);
    
    container.scrollTo({ left: newPosition, behavior: 'smooth' });
    setCarouselPosition(newPosition);
  };

  return (
    <div className="bg-white">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[90vh] min-h-[600px] overflow-hidden bg-gray-900">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
              index === currentSlide ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          >
            <img src={slide.image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900/60 to-transparent" />
          </div>
        ))}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center space-x-2 bg-blue-600/20 border border-blue-500/30 px-4 py-1.5 rounded-full animate-fade-in">
                <ShieldCheck className="text-blue-400" size={18} />
                <span className="text-blue-400 text-xs font-black tracking-[0.2em] uppercase">
                  {heroSlides[currentSlide].subtitle}
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] animate-fade-in-up">
                {heroSlides[currentSlide].title} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                  {heroSlides[currentSlide].highlight}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed animate-fade-in-up animation-delay-200">
                {heroSlides[currentSlide].description}
              </p>
              <div className="flex flex-wrap gap-4 pt-4 animate-fade-in-up animation-delay-400">
                <button
                  onClick={() => setView('catalog')}
                  className="group flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-xl shadow-blue-900/20"
                >
                  EXPLORAR CATÁLOGO
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-12 left-6 md:left-24 flex gap-4">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1 transition-all duration-500 ${i === currentSlide ? 'w-16 bg-blue-500' : 'w-8 bg-white/20'}`}
            />
          ))}
        </div>
      </section>

      {/* --- STATS SELLING POINTS --- */}
      <section className="relative z-10 -mt-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0.5 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
          {statsData.map((stat, i) => (
            <div key={i} className="bg-gray-900 p-8 flex flex-col items-center text-center group hover:bg-gray-850 transition-colors">
              <div 
                className="w-16 h-16 rounded-full bg-cover bg-center mb-4 group-hover:scale-110 transition-transform"
                style={{ backgroundImage: `url(${stat.image})` }}
              />
              <div className="text-3xl font-black text-white">{stat.val}</div>
              <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* --- PRODUCTOS DESTACADOS (Grid inicial) --- */}
      {featuredItems.length > 0 && (
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-2">
              <h2 className="text-sm font-black text-blue-600 tracking-[0.3em] uppercase">Selección Exclusiva</h2>
              <h3 className="text-5xl font-black text-gray-900">PRODUCTOS <span className="text-gray-400">DESTACADOS</span></h3>
            </div>
            <button onClick={() => setView('catalog')} className="flex items-center gap-2 font-bold text-gray-900 hover:text-blue-600 transition-colors group">
              VER TODA LA TIENDA <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredItems.map(p => (
              <div 
                key={p.id}
                onClick={() => { setSelectedProduct(p); setView('product'); }}
                className="group relative bg-white border border-gray-100 rounded-3xl p-4 transition-all hover:shadow-2xl hover:border-blue-100 cursor-pointer"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 mb-6">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black tracking-tighter text-blue-600 shadow-sm">
                    TOP VENTAS
                  </div>
                </div>
                <div className="px-2 space-y-1">
                  <h4 className="font-black text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors">{p.name}</h4>
                  <p className="text-gray-400 text-sm font-medium uppercase tracking-tighter">Original Equipment</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- CATEGORÍAS --- */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-black text-gray-900">ENCUENTRA TU <span className="text-blue-600">REPUESTO</span></h2>
            <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categoriesData.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat.id); setView('catalog'); }}
                className="group relative bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 text-center overflow-hidden h-64"
              >
                {/* Imagen de fondo */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url(${cat.image})` }}
                />
                
                {/* Overlay oscuro */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent group-hover:from-blue-900 group-hover:via-blue-900/60 transition-all duration-500" />
                
                {/* Contenido */}
                <div className="relative h-full flex flex-col justify-end p-6">
                  <div className="font-black text-white text-2xl mb-2 drop-shadow-lg">{cat.name}</div>
                  <div className="text-xs font-bold text-white/80 uppercase tracking-widest">
                    {cat.count}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- CARRUSEL VISUAL DE PRODUCTOS (DESLIZAMIENTO AUTOMÁTICO) --- */}
<section className="py-24 bg-white overflow-hidden">
  <div className="max-w-7xl mx-auto px-6 mb-12">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h2 className="text-sm font-black text-blue-600 tracking-[0.3em] uppercase mb-2">Galería de Repuestos</h2>
        <h3 className="text-5xl font-black text-gray-900">
          PIEZAS <span className="text-blue-600">DE ALTO RENDIMIENTO</span>
        </h3>
      </div>
      <p className="text-gray-500 font-medium max-w-sm md:text-right">
        Calidad certificada en cada componente para garantizar tu seguridad.
      </p>
    </div>
  </div>

  {/* Contenedor del scroll infinito */}
  <div className="relative flex overflow-hidden group">
    {/* Duplicamos el contenido ({...highlightedProducts, ...highlightedProducts}) 
        para que el scroll sea infinito y no se vea el salto al reiniciar 
    */}
    <div className="flex gap-8 animate-infinite-scroll hover:[animation-play-state:paused] py-4">
      {[...highlightedProducts, ...highlightedProducts].map((item, index) => (
        <div key={`${item.id}-${index}`} className="w-[300px] md:w-[420px] flex-shrink-0">
          <div className="group/card relative h-[500px] bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <img 
              src={item.image} 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover/card:scale-110 group-hover/card:opacity-40 transition-all duration-700" 
              alt={item.name} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/20 to-transparent" />
            
            <div className="absolute inset-0 p-10 flex flex-col justify-end">
              <span className="text-blue-400 text-xs font-black tracking-widest uppercase mb-2">
                {item.category}
              </span>
              <h4 className="text-3xl font-black text-white leading-tight mb-6 uppercase">
                {item.name}
              </h4>
              <button 
                onClick={() => setView('catalog')}
                className="flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-xl font-bold w-fit opacity-0 translate-y-4 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-300 shadow-xl"
              >
                VER MÁS <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Estilos actualizados */}
  <style>{`
    @keyframes infinite-scroll {
      from { transform: translateX(0); }
      to { transform: translateX(calc(-50% - 1rem)); }
    }
    .animate-infinite-scroll {
      display: flex;
      width: max-content;
      animation: infinite-scroll 40s linear infinite;
    }
    
    /* Pausar al pasar el mouse para que el usuario pueda hacer clic */
    .group:hover .animate-infinite-scroll {
      animation-play-state: paused;
    }

    .animation-delay-200 { animation-delay: 0.2s; animation-fill-mode: forwards; opacity: 0; }
    .animation-delay-400 { animation-delay: 0.4s; animation-fill-mode: forwards; opacity: 0; }
    
    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up { animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    
    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .animate-fade-in { animation: fade-in 1s ease-out; }
    
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  `}</style>
</section>

      <style>{`
        .animation-delay-200 { animation-delay: 0.2s; animation-fill-mode: forwards; opacity: 0; }
        .animation-delay-400 { animation-delay: 0.4s; animation-fill-mode: forwards; opacity: 0; }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 1s ease-out; }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default HomePage;