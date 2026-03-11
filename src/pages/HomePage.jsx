import { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronRight, ArrowRight, ShieldCheck, ChevronLeft, Package, Phone, MapPin, Zap, Award, Clock, Users } from 'lucide-react';

// IMÁGENES HERO
const heroSlides = [
  {
    id: 'h1',
    subtitle: 'EXPERTISE AUTOMOTRIZ',
    title: 'SOLUCIONES EN',
    title2: 'REPUESTOS',
    highlight: 'PREMIUM',
    description: 'Componentes de alta ingeniería para mantener la integridad de tu vehículo.',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=60&w=1920&auto=format&fit=crop',
    tag: '+ 500 productos'
  },
  {
    id: 'h2',
    subtitle: 'RENDIMIENTO ASEGURADO',
    title: 'TECNOLOGÍA QUE',
    title2: 'MUEVE TU',
    highlight: 'MUNDO',
    description: 'Stock completo de piezas originales y alternativas de primer nivel.',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=60&w=1920&auto=format&fit=crop',
    tag: 'Envíos a todo Perú'
  }
];

// STATS — ahora con iconos reales, sin fotos genéricas de Unsplash
const statsData = [
  { icon: Award,   label: 'Calidad Garantizada',     value: '100%',   sub: 'productos certificados'    },
  { icon: Clock,   label: 'Entrega Rápida',           value: '24h',    sub: 'despacho en Lima'          },
  { icon: Users,   label: 'Clientes Satisfechos',     value: '2,500+', sub: 'en todo el Perú'           },
  { icon: Zap,     label: 'Marcas Disponibles',       value: '80+',    sub: 'fabricantes aliados'       },
];

// CATEGORÍAS
const categoriesData = [
  { id: 1, name: 'Motor',       image: '/images/motor.png',        count: '120+ piezas' },
  { id: 2, name: 'Frenos',      image: '/images/frenos.png',       count: '95+ piezas'  },
  { id: 3, name: 'Suspensión',  image: '/images/suspencion.jpg',   count: '80+ piezas'  },
  { id: 4, name: 'Eléctrico',   image: '/images/electrico.jpg',    count: '60+ piezas'  },
  { id: 5, name: 'Transmisión', image: '/images/transmision.jpg',  count: '70+ piezas'  },
  { id: 6, name: 'Iluminación', image: '/images/Iluminacion.jpg',  count: '50+ piezas'  }
];

// PRODUCTOS DEL CARRUSEL VISUAL
const highlightedProducts = [
  { id: 'hp1', name: "Amortiguadores Gas",  category: "Suspensión",  image: "/images/amortiguadores_gas.png"  },
  { id: 'hp2', name: "Kit de Embrague",     category: "Transmisión", image: "/images/kit_de_embrague.png"     },
  { id: 'hp3', name: "Discos Hi-Carbon",    category: "Frenos",      image: "/images/discos12.png"            },
  { id: 'hp4', name: "Ópticas LED Sport",   category: "Iluminación", image: "/images/opticas.png"             },
  { id: 'hp5', name: "Batería Pro-Start",   category: "Eléctrico",   image: "/images/bateria.png"             },
];

// RAZONES — nueva sección "Por qué elegirnos"
const reasons = [
  {
    icon: ShieldCheck,
    title: 'Garantía real',
    desc: 'Todos nuestros productos cuentan con garantía de fábrica y soporte postventa directo.'
  },
  {
    icon: Zap,
    title: 'Stock inmediato',
    desc: 'Más de 500 referencias disponibles en almacén. Pedidos despachados el mismo día.'
  },
  {
    icon: Award,
    title: 'Marcas reconocidas',
    desc: 'Trabajamos solo con fabricantes certificados. Sin genéricos sin respaldo.'
  },
  {
    icon: Phone,
    title: 'Asesoría técnica',
    desc: 'Nuestro equipo te ayuda a identificar la pieza exacta para tu vehículo.'
  },
];

// ============================================
// IMAGEN CON LAZY LOAD
// ============================================
const OptimizedImage = ({ src, alt, className, priority = false }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative w-full h-full">
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gray-800/40 animate-pulse" />
      )}
      {!error ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`${className} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <Package className="text-gray-300" size={48} />
        </div>
      )}
    </div>
  );
};

// ============================================
// SKELETON LOADER
// ============================================
const ProductSkeleton = () => (
  <div className="min-w-[85%] md:min-w-[calc(50%-1rem)] lg:min-w-[calc(25%-1.5rem)] snap-start">
    <div className="bg-white border border-gray-100 rounded-3xl p-4 animate-pulse">
      <div className="aspect-square rounded-2xl bg-gray-200 mb-6"></div>
      <div className="px-2 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-100 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);

// ============================================
// HOMEPAGE
// ============================================
const HomePage = ({
  products = [],
  isLoadingData = false,
  setView = () => {},
  setSelectedProduct = () => {},
  setSelectedCategory = () => {}
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroReady, setHeroReady] = useState(false);
  const scrollRef = useRef(null);

  const featuredItems = useMemo(() =>
    products.filter(p => p.featured === true),
    [products]
  );

  // Auto-slide del hero
  useEffect(() => {
    setHeroReady(true);
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const scrollFeatured = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white font-sans">

      {/* ===================== HERO ===================== */}
      <section className="relative h-screen min-h-[640px] max-h-[900px] overflow-hidden bg-gray-950">

        {/* Slides */}
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <OptimizedImage
              src={slide.image}
              alt=""
              priority={index === 0}
              className="w-full h-full object-cover"
            />
            {/* Gradiente más dramático — más oscuro izquierda */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 via-gray-950/60 to-gray-950/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />
          </div>
        ))}

        {/* Línea decorativa vertical */}
        <div className="absolute left-6 md:left-20 top-0 bottom-0 w-px bg-white/5 hidden md:block" />

        {/* Número de slide estilo editorial */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`transition-all duration-500 rounded-full ${
                i === currentSlide
                  ? 'w-1.5 h-10 bg-blue-500'
                  : 'w-1.5 h-4 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Contenido hero */}
        <div className={`absolute inset-0 flex items-center transition-all duration-700 ${heroReady ? 'opacity-100' : 'opacity-0'}`}>
          <div className="max-w-7xl mx-auto px-6 md:px-20 w-full">
            <div className="max-w-2xl">

              {/* Tag pill */}
              <div className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/25 px-4 py-1.5 rounded-full mb-6">
                <ShieldCheck size={14} className="text-blue-400" />
                <span className="text-blue-300 text-[11px] font-black tracking-[0.25em] uppercase">
                  {heroSlides[currentSlide].subtitle}
                </span>
              </div>

              {/* Título */}
              <h1 className="text-[clamp(2.8rem,7vw,6.5rem)] font-black leading-[0.88] text-white mb-6 hero-title">
                {heroSlides[currentSlide].title}<br />
                {heroSlides[currentSlide].title2}<br />
                <span className="text-blue-500">{heroSlides[currentSlide].highlight}</span>
              </h1>

              {/* Línea separadora pequeña */}
              <div className="w-12 h-0.5 bg-blue-500 mb-6" />

              <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-md">
                {heroSlides[currentSlide].description}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setView('catalog')}
                  className="group flex items-center gap-3 px-7 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm tracking-wide transition-all shadow-2xl shadow-blue-900/40 hover:shadow-blue-500/30 hover:-translate-y-0.5"
                >
                  EXPLORAR CATÁLOGO
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="https://wa.me/51974640915"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-7 py-4 bg-white/8 hover:bg-white/15 border border-white/15 hover:border-white/30 text-white rounded-xl font-bold text-sm tracking-wide transition-all backdrop-blur-sm"
                >
                  <Phone size={16} />
                  CONTÁCTANOS
                </a>
              </div>

              {/* Mini badge inferior */}
              <div className="mt-10 inline-flex items-center gap-2 text-gray-500 text-xs font-bold tracking-widest uppercase">
                <MapPin size={12} />
                Jr. Cuarzos 1880, Lima · Envíos a todo el Perú
              </div>

            </div>
          </div>
        </div>

        {/* Indicadores móvil */}
        <div className="absolute bottom-8 left-6 md:left-20 flex gap-3 lg:hidden">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-0.5 transition-all duration-500 ${
                i === currentSlide ? 'w-12 bg-blue-500' : 'w-6 bg-white/25'
              }`}
            />
          ))}
        </div>
      </section>

      {/* ===================== STATS — REDISEÑADAS CON ICONOS ===================== */}
      <section className="relative z-10 -mt-14 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 rounded-2xl overflow-hidden shadow-2xl border border-white/10 divide-x divide-white/5">
          {statsData.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-gray-900 px-6 py-7 flex flex-col items-start gap-3 group hover:bg-gray-800 transition-colors">
                <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                  <Icon size={18} className="text-blue-400" />
                </div>
                <div>
                  <div className="text-2xl font-black text-white leading-none mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-[11px] font-bold uppercase tracking-wider leading-tight">{stat.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===================== PRODUCTOS DESTACADOS ===================== */}
      <section className="pt-32 pb-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <p className="text-blue-600 text-xs font-black tracking-[0.3em] uppercase mb-3">Selección Exclusiva</p>
            <h2 className="text-5xl font-black text-gray-900 leading-tight">
              PRODUCTOS <span className="text-gray-300">DESTACADOS</span>
            </h2>
          </div>
          <button
            onClick={() => setView('catalog')}
            className="flex items-center gap-2 text-sm font-black text-gray-900 hover:text-blue-600 transition-colors group whitespace-nowrap"
          >
            VER TODA LA TIENDA
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="relative group/carousel">
          {featuredItems.length > 3 && (
            <button
              onClick={() => scrollFeatured('left')}
              className="absolute -left-5 top-[40%] z-20 p-3 bg-white shadow-xl rounded-full text-gray-900 opacity-0 group-hover/carousel:opacity-100 -translate-x-2 group-hover/carousel:translate-x-0 transition-all hover:bg-blue-600 hover:text-white border border-gray-100"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-6"
          >
            {isLoadingData ? (
              [...Array(4)].map((_, i) => <ProductSkeleton key={i} />)
            ) : featuredItems.length > 0 ? (
              featuredItems.map(p => (
                <div
                  key={p.id}
                  onClick={() => { setSelectedProduct(p); setView('product'); }}
                  className="min-w-[85%] md:min-w-[calc(50%-0.75rem)] lg:min-w-[calc(25%-1rem)] snap-start group cursor-pointer"
                >
                  {/* Card sin border, más limpia */}
                  <div className="bg-gray-50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <OptimizedImage
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-black tracking-wider px-2.5 py-1 rounded-full uppercase">
                        Top Ventas
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-gray-400 text-[10px] font-black tracking-widest uppercase mb-1">{p.category || 'Autopartes'}</p>
                      <h4 className="font-black text-gray-900 text-base leading-tight group-hover:text-blue-600 transition-colors">{p.name}</h4>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-gray-400 font-medium">Equipamiento Original</span>
                        <div className="w-7 h-7 rounded-full bg-blue-50 group-hover:bg-blue-600 flex items-center justify-center transition-colors">
                          <ChevronRight size={14} className="text-blue-600 group-hover:text-white transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full text-center py-16 text-gray-400">
                <Package size={40} className="mx-auto mb-3 text-gray-200" />
                <p className="font-bold text-sm">No hay productos destacados aún</p>
              </div>
            )}
          </div>

          {featuredItems.length > 3 && (
            <button
              onClick={() => scrollFeatured('right')}
              className="absolute -right-5 top-[40%] z-20 p-3 bg-white shadow-xl rounded-full text-gray-900 opacity-0 group-hover/carousel:opacity-100 translate-x-2 group-hover/carousel:translate-x-0 transition-all hover:bg-blue-600 hover:text-white border border-gray-100"
            >
              <ChevronRight size={22} />
            </button>
          )}
        </div>
      </section>

      {/* ===================== CATEGORÍAS ===================== */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <p className="text-blue-600 text-xs font-black tracking-[0.3em] uppercase mb-3">Explora por tipo</p>
              <h2 className="text-5xl font-black text-gray-900">
                ENCUENTRA TU <span className="text-blue-600">REPUESTO</span>
              </h2>
            </div>
            <div className="w-16 h-0.5 bg-blue-600 hidden md:block mb-2" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categoriesData.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat.name); setView('catalog'); }}
                className="group relative bg-white rounded-2xl overflow-hidden h-60 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="absolute inset-0">
                  <OptimizedImage
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                {/* Gradiente permanente + más azul al hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent group-hover:from-blue-950/90 group-hover:via-blue-900/40 transition-all duration-500" />

                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <div className="font-black text-white text-xl leading-tight mb-0.5">
                    {cat.name}
                  </div>
                  <div className="text-blue-300 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {cat.count}
                  </div>
                </div>

                {/* Arrow esquina */}
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/0 group-hover:bg-white/15 flex items-center justify-center transition-all duration-300">
                  <ChevronRight size={14} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== POR QUÉ ELEGIRNOS — NUEVA SECCIÓN ===================== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Texto izquierda */}
            <div>
              <p className="text-blue-600 text-xs font-black tracking-[0.3em] uppercase mb-4">¿Por qué DYE IMPORT?</p>
              <h2 className="text-5xl font-black text-gray-900 leading-tight mb-6">
                MÁS QUE UN<br />
                <span className="text-blue-600">PROVEEDOR</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-md">
                Somos tu socio técnico en repuestos. No vendemos piezas — te ayudamos a mantener tu vehículo funcionando en óptimas condiciones.
              </p>
              <button
                onClick={() => setView('about')}
                className="group flex items-center gap-2 text-sm font-black text-gray-900 hover:text-blue-600 transition-colors"
              >
                CONOCER MÁS SOBRE NOSOTROS
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Grid de razones derecha */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {reasons.map((r, i) => {
                const Icon = r.icon;
                return (
                  <div
                    key={i}
                    className="group p-6 rounded-2xl bg-gray-50 hover:bg-blue-600 transition-all duration-300 cursor-default"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-100 group-hover:bg-white/20 flex items-center justify-center mb-4 transition-colors">
                      <Icon size={18} className="text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <h4 className="font-black text-gray-900 group-hover:text-white text-base mb-1.5 transition-colors">{r.title}</h4>
                    <p className="text-gray-500 group-hover:text-blue-100 text-sm leading-relaxed transition-colors">{r.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CARRUSEL VISUAL INFERIOR ===================== */}
      <section className="py-24 bg-gray-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-blue-500 text-xs font-black tracking-[0.3em] uppercase mb-3">Galería de Repuestos</p>
              <h2 className="text-5xl font-black text-white">
                PIEZAS <span className="text-blue-500">DE ALTO</span><br />RENDIMIENTO
              </h2>
            </div>
            <p className="text-gray-500 font-medium max-w-xs md:text-right text-sm leading-relaxed">
              Calidad certificada en cada componente para garantizar tu seguridad.
            </p>
          </div>
        </div>

        {/* Carrusel scroll — sin el bug del salto */}
        <div className="relative flex overflow-hidden">
          <div className="flex gap-6 carousel-scroll py-2">
            {[...highlightedProducts, ...highlightedProducts, ...highlightedProducts].map((item, index) => (
              <div key={`${item.id}-${index}`} className="w-72 md:w-96 flex-shrink-0">
                <div className="group/card relative h-[420px] rounded-3xl overflow-hidden">
                  <OptimizedImage
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover/card:scale-105 group-hover/card:opacity-50 transition-all duration-700"
                  />
                  {/* Gradiente sutil */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/95 via-gray-950/30 to-transparent" />

                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <span className="inline-block bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full w-fit mb-3">
                      {item.category}
                    </span>
                    <h4 className="text-2xl font-black text-white leading-tight uppercase mb-5">
                      {item.name}
                    </h4>
                    <button
                      onClick={() => setView('catalog')}
                      className="flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-xl font-bold text-sm w-fit opacity-0 translate-y-3 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-300"
                    >
                      VER MÁS <ChevronRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CTA FINAL — WHATSAPP ===================== */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-blue-200 text-xs font-black tracking-[0.3em] uppercase mb-4">¿Necesitas ayuda?</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            HABLAMOS POR<br />WHATSAPP
          </h2>
          <p className="text-blue-100 text-lg mb-10 max-w-md mx-auto leading-relaxed">
            Dinos el modelo de tu vehículo y te buscamos la pieza exacta. Respuesta en minutos.
          </p>
          <a
            href="https://wa.me/51974640915?text=Hola,%20necesito%20ayuda%20con%20un%20repuesto"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-xl font-black text-sm tracking-wide hover:bg-blue-50 transition-all shadow-2xl shadow-blue-900/30 hover:-translate-y-0.5"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            ESCRÍBENOS AHORA
          </a>
        </div>
      </section>

      {/* ===================== ESTILOS ===================== */}
      <style>{`
        /* Carrusel sin salto visual */
        @keyframes carousel-move {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-33.333% - 0.5rem)); }
        }
        .carousel-scroll {
          display: flex;
          width: max-content;
          animation: carousel-move 45s linear infinite;
        }
        .carousel-scroll:hover {
          animation-play-state: paused;
        }

        /* Hero title stagger */
        .hero-title {
          animation: heroIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes heroIn {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Scrollbar oculto */
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default HomePage;