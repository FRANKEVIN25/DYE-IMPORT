import { ArrowLeft, Star, Package, Phone, Mail, Car } from 'lucide-react';
import { companyInfo } from '../data/initialData';

const ProductPage = ({ 
  product, 
  products = [], 
  categories = [], 
  vehicles = [], 
  setView, 
  setSelectedProduct 
}) => {
  
  // Validar que tenemos el producto
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">Producto no encontrado</p>
      </div>
    );
  }

  // BUSCAR CATEGORÍA (ahora es string, no ID)
  const category = categories.find(c => c.name === product.category);

  // BUSCAR VEHÍCULO (ahora es string, no ID)
  const vehicle = vehicles.find(v => v.brand === product.vehicle_brand);

  // PRODUCTOS RELACIONADOS (misma categoría)
  const relatedProducts = products.filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <button
          onClick={() => setView('catalog')}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-8 font-bold text-lg group"
        >
          <ArrowLeft className="mr-2 transform group-hover:-translate-x-2 transition-transform" size={24} />
          Volver al Catálogo
        </button>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* IMAGEN DEL PRODUCTO */}
          <div className="relative">
            <div className="sticky top-24">
              <img
                src={product.image || 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800'}
                alt={product.name}
                className="w-full rounded-3xl shadow-2xl object-cover aspect-square"
              />
              {product.featured && (
                <div className="absolute top-6 left-6 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold shadow-xl flex items-center gap-2">
                  <Star size={16} fill="currentColor" /> DESTACADO
                </div>
              )}
            </div>
          </div>

          {/* INFORMACIÓN DEL PRODUCTO */}
          <div>
            {/* MARCA DEL VEHÍCULO */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-black bg-blue-600 text-white px-3 py-1 rounded-lg uppercase tracking-widest">
                {product.vehicle_brand || 'Repuesto Original'}
              </span>
            </div>

            {/* NOMBRE DEL PRODUCTO */}
            <h1 className="text-5xl font-black text-gray-900 mb-6 leading-tight">
              {product.name}
            </h1>

            {/* CATEGORÍA */}
            <div className="inline-flex items-center bg-gray-100 text-gray-700 rounded-2xl px-6 py-3 mb-8">
              <Package className="mr-3 text-blue-600" size={20} />
              <span className="font-bold text-lg">
                {product.category || 'Sin categoría'} 
              </span>
            </div>

            {/* ESTADO DE STOCK */}
            <div className="mb-8 flex items-center gap-3">
              {product.in_stock !== false ? (
                <span className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  Stock Disponible
                </span>
              ) : (
                <span className="inline-flex items-center bg-red-100 text-red-700 px-4 py-2 rounded-full font-bold">
                  <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                  Bajo Pedido
                </span>
              )}
            </div>

            {/* DESCRIPCIÓN */}
            <div className="prose prose-blue mb-8">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-2">
                Descripción del Producto
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                {product.description || "Este repuesto de alta calidad está diseñado para garantizar el máximo rendimiento de tu vehículo."}
              </p>
            </div>

            {/* MODELOS COMPATIBLES */}
            <div className="bg-blue-50 border-2 border-blue-100 p-6 mb-8 rounded-2xl">
              <h3 className="font-bold text-xl mb-3 text-blue-900 flex items-center gap-2">
                <Car size={20} /> Modelos Compatibles
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.compatible_models && product.compatible_models.length > 0 ? (
                  product.compatible_models.map((model, index) => (
                    <span 
                      key={`${model}-${index}`}
                      className="bg-white px-3 py-1 rounded-lg text-sm font-bold text-blue-600 border border-blue-200"
                    >
                      {product.vehicle_brand} {model}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 italic">
                    Consulte compatibilidad para su modelo específico
                  </span>
                )}
              </div>
            </div>

            {/* BOTONES DE ACCIÓN */}
            <div className="space-y-4">
              <a
                href={`https://wa.me/${companyInfo.whatsapp}?text=Hola,%20solicito%20precio%20del%20repuesto:%20${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white py-5 rounded-2xl font-black text-lg transition-all shadow-lg transform hover:-translate-y-1"
              >
                <Phone className="mr-3" size={24} />
                Solicitar Precio vía WhatsApp
              </a>
              
              <button
                onClick={() => setView('contact')}
                className="w-full flex items-center justify-center bg-gray-900 hover:bg-black text-white py-5 rounded-2xl font-black text-lg transition-all shadow-lg"
              >
                <Mail className="mr-3" size={24} />
                Enviar consulta por correo
              </button>
            </div>
          </div>
        </div>

        {/* PRODUCTOS RELACIONADOS */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-gray-100 pt-16">
            <h2 className="text-4xl font-black text-gray-900 mb-8">
              Repuestos <span className="text-blue-600">Relacionados</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCardSimple
                  key={p.id}
                  product={p}
                  onClick={(prod) => {
                    setSelectedProduct(prod);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================
// TARJETA SIMPLE PARA PRODUCTOS RELACIONADOS
// ============================================
const ProductCardSimple = ({ product, onClick }) => {
  return (
    <div 
      onClick={() => onClick(product)}
      className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden border border-gray-100 flex flex-col h-full"
    >
      <div className="relative h-56 overflow-hidden bg-gray-50">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <Package size={64} />
          </div>
        )}
        
        {product.featured && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            ⭐ Destacado
          </span>
        )}
        
        {product.in_stock === false && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold">Agotado</span>
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">
            {product.category || 'Sin categoría'}
          </p>
          <p className="text-xs font-semibold text-gray-500">
            {product.vehicle_brand}
          </p>
        </div>
        
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        
        {product.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        )}
        
        {product.compatible_models && product.compatible_models.length > 0 && (
          <p className="text-xs text-gray-500 mb-3 mt-auto">
            <span className="font-bold">Compatible:</span> {product.compatible_models.join(', ')}
          </p>
        )}
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
          <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm transition-all shadow-md active:scale-95">
            Ver detalles del repuesto
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;