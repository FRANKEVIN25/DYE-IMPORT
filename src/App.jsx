import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from './services/supabase';
import { companyInfo } from './data/initialData';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import AdminPanel from './pages/AdminPanel';
import WhatsAppFloat from './components/WhatsAppFloat';

function App() {
  const [view, setView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [loading, setLoading] = useState(true);

  // Estados para datos de Supabase
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [lastFetch, setLastFetch] = useState(null);

  // ============================================
  // CARGAR DATOS CON CACHÉ (5 minutos)
  // ============================================
  const loadAllData = useCallback(async (forceRefresh = false) => {
    const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos
    const now = Date.now();
    
    // Si ya tenemos datos en caché y no ha pasado el tiempo, no recargar
    if (!forceRefresh && lastFetch && (now - lastFetch) < CACHE_DURATION && products.length > 0) {
      console.log('✅ Usando datos en caché');
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      console.log('🔄 Cargando datos desde Supabase...');
      
      // Cargar todo en paralelo (más rápido)
      const [productsResult, categoriesResult, vehiclesResult] = await Promise.all([
        supabase.from('products').select('*').order('created_at', { ascending: false }),
        supabase.from('categories').select('*').order('name'),
        supabase.from('vehicles').select('*').order('brand')
      ]);

      if (productsResult.error) throw productsResult.error;
      if (categoriesResult.error) throw categoriesResult.error;
      if (vehiclesResult.error) throw vehiclesResult.error;

      setProducts(productsResult.data || []);
      setCategories(categoriesResult.data || []);
      setVehicles(vehiclesResult.data || []);
      setLastFetch(now);
      
      console.log('✅ Datos cargados:', {
        productos: productsResult.data?.length || 0,
        categorías: categoriesResult.data?.length || 0,
        vehículos: vehiclesResult.data?.length || 0
      });
    } catch (error) {
      console.error('❌ Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  }, [lastFetch, products.length]);

  // Cargar datos solo una vez al inicio
  useEffect(() => {
    loadAllData();
  }, []);

  // ============================================
  // TIEMPO REAL: Suscripción a cambios
  // ============================================
  useEffect(() => {
    const productsSubscription = supabase
      .channel('products_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'products' },
        (payload) => {
          console.log('🔔 Cambio en productos detectado');
          
          if (payload.eventType === 'INSERT') {
            setProducts(prev => [payload.new, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setProducts(prev => prev.map(p => p.id === payload.new.id ? payload.new : p));
          } else if (payload.eventType === 'DELETE') {
            setProducts(prev => prev.filter(p => p.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(productsSubscription);
    };
  }, []);

  // ============================================
  // DETECTAR RUTA /admin o #admin
  // ============================================
  useEffect(() => {
    const checkAdminRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      
      if (path.includes('/admin') || hash === '#admin') {
        setView('login');
        window.history.replaceState({}, '', '/');
      }
    };
    
    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    return () => window.removeEventListener('hashchange', checkAdminRoute);
  }, []);

  // ============================================
  // REFRESH MANUAL (para después de editar en admin)
  // ============================================
  const refreshData = useCallback(() => {
    loadAllData(true);
  }, [loadAllData]);

  // ============================================
  // MEMOIZAR datos para evitar re-renders
  // ============================================
  const memoizedProducts = useMemo(() => products, [products]);
  const memoizedCategories = useMemo(() => categories, [categories]);
  const memoizedVehicles = useMemo(() => vehicles, [vehicles]);

  // ============================================
  // PANTALLA DE CARGA INICIAL
  // ============================================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center space-y-6">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 border-8 border-blue-200 rounded-full"></div>
            <div className="absolute inset-0 border-8 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-gray-900">Cargando catálogo...</h2>
            <p className="text-gray-600">Esto solo toma un momento</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {!isAdmin && <Header currentView={view} setView={setView} />}
      
      <main>
        {view === 'home' && (
          <HomePage 
            products={memoizedProducts}
            categories={memoizedCategories}
            vehicles={memoizedVehicles}
            setView={setView}
            setSelectedProduct={setSelectedProduct}
            setSelectedCategory={setSelectedCategory}
          />
        )}
        
        {view === 'catalog' && (
          <CatalogPage 
            products={memoizedProducts}
            categories={memoizedCategories}
            vehicles={memoizedVehicles}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setSelectedProduct={setSelectedProduct}
            setView={setView}
          />
        )}
        
        {view === 'product' && selectedProduct && (
          <ProductPage
            product={selectedProduct}
            products={memoizedProducts}
            categories={memoizedCategories}
            vehicles={memoizedVehicles}
            setView={setView}
            setSelectedProduct={setSelectedProduct}
          />
        )}
        
        {view === 'about' && <AboutPage />}
        
        {view === 'contact' && <ContactPage />}
        
        {view === 'login' && (
          <LoginPage 
            adminPassword={adminPassword}
            setAdminPassword={setAdminPassword}
            setIsAdmin={setIsAdmin}
            setView={setView}
          />
        )}
        
        {view === 'admin' && isAdmin && (
          <AdminPanel 
            setIsAdmin={setIsAdmin}
            setView={setView}
            onDataChange={refreshData}
          />
        )}
      </main>

      {!isAdmin && <Footer />}
      
      {/* Botón flotante de WhatsApp */}
      {!isAdmin && (
        <WhatsAppFloat 
          phoneNumber={companyInfo.whatsapp}
          message="Hola, me interesa consultar sobre sus repuestos"
        />
      )}

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animation-delay-200 { animation-delay: 0.2s; opacity: 0; }
        .animation-delay-400 { animation-delay: 0.4s; opacity: 0; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default App;