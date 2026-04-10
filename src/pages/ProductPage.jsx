import React, { useEffect, useState } from 'react';
import { ArrowLeft, Star, Package, Phone, Mail, Car, ShieldCheck, Truck, RotateCcw, ChevronRight, ZoomIn, CheckCircle2 } from 'lucide-react';
import { companyInfo } from '../data/initialData';

// ============================================
// PÁGINA DE PRODUCTO
// ============================================
const ProductPage = ({
  product,
  products = [],
  categories = [],
  vehicles = [],
  setView,
  setSelectedProduct
}) => {
  const [imgZoomed, setImgZoomed] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product?.id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">Producto no encontrado</p>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Garantías / features fijos
  const guarantees = [
    { icon: ShieldCheck, label: 'Garantía incluida',      sub: 'Respaldo en cada compra'      },
    { icon: Truck,       label: 'Envío a todo el Perú',  sub: 'Despacho en 24 h en Lima'     },
    { icon: RotateCcw,   label: 'Soporte postventa',     sub: 'Asistencia técnica incluida'  },
  ];

  return (
    <div className="min-h-screen bg-slate-300">

      {/* ── BREADCRUMB ── */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 text-sm text-gray-400 font-medium">
          <button onClick={() => setView('home')} className="hover:text-blue-600 transition-colors">Inicio</button>
          <ChevronRight size={14} />
          <button onClick={() => setView('catalog')} className="hover:text-blue-600 transition-colors">Catálogo</button>
          <ChevronRight size={14} />
          <span className="text-gray-700 font-bold truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* Botón volver */}
        <button
          onClick={() => setView('catalog')}
          className="group flex items-center gap-2 text-gray-500 hover:text-blue-600 font-bold text-sm mb-10 transition-colors"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Volver al Catálogo
        </button>

        {/* ── GRID PRINCIPAL ── */}
        <div className="grid lg:grid-cols-2 gap-14 mb-20">

          {/* COLUMNA IMAGEN */}
          <div className="sticky top-24 self-start">
            <div
              className="relative rounded-3xl overflow-hidden bg-gray-50 aspect-square cursor-zoom-in group shadow-xl"
              onClick={() => setImgZoomed(true)}
            >
              <img
                src={product.image || 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800'}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Badges */}
              <div className="absolute top-5 left-5 flex flex-col gap-2">
                {product.featured && (
                  <span className="flex items-center gap-1.5 bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-black shadow-lg">
                    <Star size={12} fill="currentColor" /> DESTACADO
                  </span>
                )}
                <span className={`px-3 py-1.5 rounded-full text-xs font-black shadow-lg ${
                  product.in_stock !== false
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                }`}>
                  {product.in_stock !== false ? '● En Stock' : '● Bajo Pedido'}
                </span>
              </div>
              {/* Zoom hint */}
              <div className="absolute bottom-5 right-5 w-9 h-9 bg-white/80 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                <ZoomIn size={16} className="text-gray-700" />
              </div>
            </div>

            {/* Garantías debajo de imagen */}
            <div className="grid grid-cols-3 gap-3 mt-5">
              {guarantees.map((g, i) => {
                const Icon = g.icon;
                return (
                  <div key={i} className="bg-gray-50 rounded-2xl p-4 text-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Icon size={16} className="text-blue-600" />
                    </div>
                    <p className="text-gray-900 text-[11px] font-black leading-tight">{g.label}</p>
                    <p className="text-gray-400 text-[10px] mt-0.5">{g.sub}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* COLUMNA INFO */}
          <div className="flex flex-col gap-7">

            {/* Marca + categoría */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                {product.vehicle_brand || 'Autoparte'}
              </span>
              <span className="bg-gray-100 text-gray-600 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                {product.category || 'Autopartes'}
              </span>
            </div>

            {/* Nombre */}
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-3">
                {product.name}
              </h1>
              <div className="w-10 h-0.5 bg-blue-600" />
            </div>

            {/* Descripción */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">
                Descripción del Producto
              </p>
              <p className="text-gray-700 leading-relaxed">
                {product.description ||
                  'Repuesto de alta ingeniería diseñado para garantizar el máximo rendimiento y durabilidad en tu vehículo. Fabricado bajo estrictos estándares de calidad.'}
              </p>
            </div>

            {/* Características técnicas */}
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                Características
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Tipo',       value: product.category || '—'              },
                  { label: 'Marca',      value: product.vehicle_brand || '—'         },
                  { label: 'Condición',  value: 'Nuevo'                              },
                  { label: 'Calidad',    value: 'Alta calidad'                       },
                  { label: 'Stock',      value: product.in_stock !== false ? 'Disponible' : 'Bajo Pedido' },
                  { label: 'Garantía',   value: 'Sí, incluida'                      },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col bg-gray-50 rounded-xl px-4 py-3">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-0.5">{item.label}</span>
                    <span className="text-sm font-bold text-gray-800">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modelos compatibles */}
            <div className="border border-blue-100 bg-blue-50/50 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Car size={14} className="text-blue-600" />
                </div>
                <p className="font-black text-gray-900 text-sm">Modelos Compatibles</p>
              </div>
              {product.compatible_models && product.compatible_models.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {product.compatible_models.map((model, i) => (
                    <span key={i} className="flex items-center gap-1.5 bg-white border border-blue-200 text-blue-700 px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm">
                      <CheckCircle2 size={11} className="text-blue-500" />
                      {product.vehicle_brand} {model}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm italic">
                  Consulte compatibilidad para su modelo específico
                </p>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 pt-2">
              <a
                href={`https://wa.me/${companyInfo.whatsapp}?text=Hola,%20solicito%20precio%20del%20repuesto:%20${encodeURIComponent(product.name)}%20para%20${encodeURIComponent(product.vehicle_brand || '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 w-full bg-green-600 hover:bg-green-500 text-white py-4 rounded-2xl font-black text-sm tracking-wide transition-all shadow-xl shadow-green-900/20 hover:-translate-y-0.5"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                SOLICITAR PRECIO VÍA WHATSAPP
              </a>

              <button
                onClick={() => setView('contact')}
                className="group flex items-center justify-center gap-3 w-full bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-2xl font-black text-sm tracking-wide transition-all hover:-translate-y-0.5"
              >
                <Mail size={17} />
                ENVIAR CONSULTA POR CORREO
              </button>
            </div>

            {/* Nota de seguridad */}
            <p className="text-center text-gray-400 text-xs flex items-center justify-center gap-1.5">
              <ShieldCheck size={13} className="text-green-500" />
              Todos nuestros productos cuentan con garantía y soporte postventa
            </p>
          </div>
        </div>

        {/* ── PRODUCTOS RELACIONADOS ── */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-gray-100 pt-16">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-blue-600 text-xs font-black tracking-[0.3em] uppercase mb-2">De la misma categoría</p>
                <h2 className="text-4xl font-black text-gray-900">
                  Repuestos <span className="text-blue-600">Relacionados</span>
                </h2>
              </div>
              <button
                onClick={() => setView('catalog')}
                className="group flex items-center gap-1.5 text-sm font-black text-gray-500 hover:text-blue-600 transition-colors"
              >
                Ver todos <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCardSimple
                  key={p.id}
                  product={p}
                  onClick={(prod) => setSelectedProduct(prod)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── LIGHTBOX IMAGEN ── */}
      {imgZoomed && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6 cursor-zoom-out"
          onClick={() => setImgZoomed(false)}
        >
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
          />
          <button
            className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            onClick={() => setImgZoomed(false)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

// ============================================
// TARJETA PRODUCTOS RELACIONADOS
// ============================================
const ProductCardSimple = ({ product, onClick }) => (
  <div
    onClick={() => onClick(product)}
    className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
  >
    <div className="relative aspect-square overflow-hidden bg-gray-50">
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-200">
          <Package size={48} />
        </div>
      )}
      {product.featured && (
        <span className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 px-2.5 py-1 rounded-full text-[10px] font-black">
          ⭐ Destacado
        </span>
      )}
      {product.in_stock === false && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <span className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-black">Agotado</span>
        </div>
      )}
    </div>

    <div className="p-5">
      <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">{product.category}</p>
      <h3 className="font-black text-gray-900 text-base leading-tight group-hover:text-blue-600 transition-colors mb-1 line-clamp-2">
        {product.name}
      </h3>
      <p className="text-xs text-gray-400 font-medium mb-4">{product.vehicle_brand}</p>
      <div className="flex items-center gap-2 text-xs font-black text-blue-600 group-hover:gap-3 transition-all">
        Ver detalles <ChevronRight size={13} />
      </div>
    </div>
  </div>
);

export default ProductPage;