import { useState, useEffect, useMemo } from 'react';
import { Search, SlidersHorizontal, X, Car, Package } from 'lucide-react';

// ============================================
// SKELETON LOADER PARA PRODUCTOS
// ============================================
const ProductSkeleton = () => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 animate-pulse">
    <div className="h-56 bg-gray-200"></div>
    <div className="p-5 space-y-3">
      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
      <div className="h-5 bg-gray-300 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-full"></div>
      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      <div className="h-10 bg-gray-200 rounded mt-4"></div>
    </div>
  </div>
);

// ============================================
// COMPONENTE TARJETA DE PRODUCTO OPTIMIZADA
// ============================================
const ProductCard = ({ product, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div 
      onClick={() => onClick(product)}
      className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden border border-gray-100 flex flex-col h-full"
    >
      <div className="relative h-56 overflow-hidden bg-gray-50">
        {product.image && !imageError ? (
          <>
            {/* Skeleton mientras carga la imagen */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
            )}
            <img 
              src={product.image} 
              alt={product.name}
              loading="lazy" // ✅ Lazy loading nativo
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <Package size={64} />
          </div>
        )}
        
        {product.featured && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            Destacado
          </span>
        )}
        
        {!product.in_stock && (
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

// ============================================
// COMPONENTE PRINCIPAL - CATÁLOGO OPTIMIZADO
// ============================================
const CatalogPage = ({ 
  products = [],
  categories = [],
  vehicles = [],
  isLoadingData = false,
  selectedCategory: propSelectedCategory = '',
  setSelectedCategory: propSetSelectedCategory = () => {},
  searchQuery: propSearchQuery = '',
  setSearchQuery: propSetSearchQuery = () => {},
  setSelectedProduct = () => {},
  setView = () => {}
}) => {
  // Estados locales para filtros - Normalizamos 'all' a cadena vacía
  const [searchQuery, setSearchQueryLocal] = useState(propSearchQuery);
  const [selectedCategory, setSelectedCategoryLocal] = useState(
    propSelectedCategory === 'all' ? '' : (propSelectedCategory || '')
  );
  const [selectedVehicleBrand, setSelectedVehicleBrand] = useState('');
  const [selectedVehicleModel, setSelectedVehicleModel] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  // Sincronizar con props si vienen del HomePage
  useEffect(() => {
    if (propSearchQuery) setSearchQueryLocal(propSearchQuery);
  }, [propSearchQuery]);

  useEffect(() => {
    if (propSelectedCategory) {
      // Normalizar 'all' a cadena vacía
      setSelectedCategoryLocal(propSelectedCategory === 'all' ? '' : propSelectedCategory);
    }
  }, [propSelectedCategory]);

  // Resetear modelo cuando cambia la marca
  useEffect(() => {
    setSelectedVehicleModel('');
  }, [selectedVehicleBrand]);

  // Obtener modelos disponibles para la marca seleccionada
  const selectedVehicle = vehicles.find(v => v.brand === selectedVehicleBrand);
  const availableModels = selectedVehicle?.models || [];

  // ============================================
  // FILTRAR Y ORDENAR PRODUCTOS (MEMOIZADO)
  // ============================================
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchLower) ||
        product.description?.toLowerCase().includes(searchLower);
      
      // Si selectedCategory está vacío (''), mostrar TODOS los productos
      const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
      const matchesVehicleBrand = !selectedVehicleBrand || product.vehicle_brand === selectedVehicleBrand;
      const matchesVehicleModel = !selectedVehicleModel || 
        (product.compatible_models && product.compatible_models.includes(selectedVehicleModel));
      
      return matchesSearch && matchesCategory && matchesVehicleBrand && matchesVehicleModel;
    });
  }, [products, searchQuery, selectedCategory, selectedVehicleBrand, selectedVehicleModel]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch(sortBy) {
        case 'featured':
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        case 'name':
          return a.name.localeCompare(b.name);
        default: 
          return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  const clearAllFilters = () => {
    setSearchQueryLocal('');
    setSelectedCategoryLocal('');
    setSelectedVehicleBrand('');
    setSelectedVehicleModel('');
    setSortBy('featured');
    propSetSearchQuery('');
    propSetSelectedCategory('');
  };

  const activeFiltersCount = 
    (selectedCategory !== '' ? 1 : 0) + 
    (selectedVehicleBrand ? 1 : 0) + 
    (selectedVehicleModel ? 1 : 0);

  // ============================================
  // DEBUG TEMPORAL - ELIMINAR DESPUÉS
  // ============================================
  console.log('🔍 DEBUG CatalogPage:', {
    totalProducts: products.length,
    selectedCategory,
    filteredCount: filteredProducts.length,
    sortedCount: sortedProducts.length,
    isLoadingData,
    categories: categories.length
  });

  // ============================================
  // RENDER PRINCIPAL (SIN LOADING BLOQUEANTE)
  // ============================================
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-black mb-4 tracking-tighter">Catálogo de Repuestos</h1>
          <p className="text-xl text-blue-200">Busca compatibilidad por marca y modelo</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* BARRA DE BÚSQUEDA */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por nombre o descripción..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQueryLocal(e.target.value);
                propSetSearchQuery(e.target.value);
              }}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-xl font-bold"
          >
            <SlidersHorizontal size={20} /> Filtros
            {activeFiltersCount > 0 && (
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">{activeFiltersCount}</span>
            )}
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border-2 border-gray-200 rounded-xl outline-none font-bold bg-white"
          >
            <option value="featured">Destacados</option>
            <option value="name">Nombre A-Z</option>
          </select>
        </div>

        <div className="flex gap-8">
          {/* SIDEBAR DE FILTROS */}
          <aside className={`${showFilters ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden'} md:block md:static md:w-80 flex-shrink-0`}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-gray-900">Filtros</h2>
                {activeFiltersCount > 0 && (
                  <button onClick={clearAllFilters} className="text-sm text-blue-600 font-bold hover:underline">
                    Limpiar
                  </button>
                )}
                <button 
                  onClick={() => setShowFilters(false)} 
                  className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={24} />
                </button>
              </div>

              {/* FILTRO DE VEHÍCULO */}
              <div className="mb-8 pb-8 border-b border-gray-100">
                <h3 className="font-black text-gray-900 mb-4 flex items-center gap-2 text-lg">
                  <Car className="text-blue-600" size={20} /> Tu Vehículo
                </h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-500 mb-2 uppercase">Marca</label>
                  <select
                    value={selectedVehicleBrand}
                    onChange={(e) => setSelectedVehicleBrand(e.target.value)}
                    className="w-full px-3 py-3 border-2 border-gray-100 rounded-xl font-semibold bg-gray-50 focus:border-blue-400 outline-none"
                  >
                    <option value="">Todas las marcas</option>
                    {vehicles.map(v => (
                      <option key={v.id} value={v.brand}>{v.brand}</option>
                    ))}
                  </select>
                </div>

                {selectedVehicleBrand && availableModels.length > 0 && (
                  <div className="animate-fade-in">
                    <label className="block text-sm font-bold text-gray-500 mb-2 uppercase">Modelo</label>
                    <select
                      value={selectedVehicleModel}
                      onChange={(e) => setSelectedVehicleModel(e.target.value)}
                      className="w-full px-3 py-3 border-2 border-blue-100 rounded-xl font-semibold bg-blue-50/50 focus:border-blue-400 outline-none"
                    >
                      <option value="">Todos los modelos</option>
                      {availableModels.map(model => (
                        <option key={model} value={model}>{model}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* FILTRO DE CATEGORÍA */}
              <div>
                <h3 className="font-black text-gray-900 mb-4 flex items-center gap-2 text-lg">
                  <Package className="text-blue-600" size={20} /> Categoría
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer p-2 hover:bg-blue-50 rounded-xl transition-all">
                    <input 
                      type="radio" 
                      name="category" 
                      checked={selectedCategory === ''} 
                      onChange={() => {
                        setSelectedCategoryLocal('');
                        propSetSelectedCategory('');
                      }}
                      className="w-4 h-4 text-blue-600" 
                    />
                    <span className="ml-3 text-gray-700 font-bold text-sm">Todas</span>
                  </label>
                  
                  {categories.map(category => (
                    <label key={category.id} className="flex items-center cursor-pointer p-2 hover:bg-blue-50 rounded-xl transition-all">
                      <input 
                        type="radio" 
                        name="category" 
                        checked={selectedCategory === category.name} 
                        onChange={() => {
                          setSelectedCategoryLocal(category.name);
                          propSetSelectedCategory(category.name);
                        }}
                        className="w-4 h-4 text-blue-600" 
                      />
                      <span className="ml-3 text-gray-700 font-bold text-sm">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setShowFilters(false)} 
                className="md:hidden w-full mt-8 bg-blue-600 text-white py-4 rounded-xl font-black uppercase text-xs tracking-widest shadow-lg"
              >
                Aplicar
              </button>
            </div>
          </aside>

          {/* LISTA DE PRODUCTOS */}
          <main className="flex-1">
            <div className="mb-6">
              <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">
                {isLoadingData ? 'Cargando...' : `${sortedProducts.length} Repuestos encontrados`}
              </p>
            </div>

            {/* SKELETON LOADERS mientras carga */}
            {isLoadingData ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                <Package size={48} className="text-gray-200 mx-auto mb-4" />
                <h3 className="text-xl font-black text-gray-400">Inventario vacío</h3>
                <p className="text-gray-400 mt-2">Aún no hay productos en el catálogo</p>
              </div>
            ) : sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={(p) => {
                      setSelectedProduct(p);
                      setView('product');
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <Search size={40} className="text-gray-200 mx-auto mb-4" />
                <p className="font-bold text-gray-400">No hay coincidencias con los filtros</p>
                <button 
                  onClick={clearAllFilters}
                  className="mt-4 text-blue-600 font-bold hover:underline"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in { 
          from { opacity: 0; transform: translateY(-5px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        .animate-fade-in { 
          animation: fade-in 0.3s ease-out; 
        }
      `}</style>
    </div>
  );
};

export default CatalogPage;