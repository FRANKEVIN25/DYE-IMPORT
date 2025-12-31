import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, X, Save, Edit, Trash2, Package, Car, 
  Grid3x3, Loader, Upload, Image as ImageIcon, CheckCircle2 
} from 'lucide-react';
import { supabase } from '../services/supabase';

// ============================================
// COMPONENTES UI REUTILIZABLES
// ============================================
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-black text-gray-900">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-all">
            <X size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// ============================================
// PANEL DE CATEGORÍAS
// ============================================
const CategoriesPanel = ({ data, loadAllData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ name: '' });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!formData.name.trim()) return;
    
    setSaving(true);
    try {
      if (editing) {
        // Actualizar categoría existente
        const { error } = await supabase
          .from('categories')
          .update({ name: formData.name })
          .eq('id', editing.id);
        
        if (error) throw error;
      } else {
        // Crear nueva categoría
        const { error } = await supabase
          .from('categories')
          .insert([{ name: formData.name }]);
        
        if (error) throw error;
      }
      
      await loadAllData();
      setIsModalOpen(false);
      setFormData({ name: '' });
      setEditing(null);
    } catch (error) {
      console.error('Error al guardar categoría:', error);
      alert('Error al guardar la categoría: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar esta categoría?')) return;
    
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      await loadAllData();
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('Error al eliminar: ' + error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-black text-gray-900">Categorías</h2>
        <button 
          onClick={() => { 
            setEditing(null); 
            setFormData({name:''}); 
            setIsModalOpen(true); 
          }} 
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-bold flex items-center gap-2 shadow-lg hover:bg-green-700 transition-all"
        >
          <Plus size={20} /> Nueva Categoría
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.categories.map(cat => (
          <div key={cat.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
            <span className="font-bold text-gray-700">{cat.name}</span>
            <div className="flex gap-2">
              <button 
                onClick={() => { 
                  setEditing(cat); 
                  setFormData({name: cat.name}); 
                  setIsModalOpen(true); 
                }} 
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              >
                <Edit size={18} />
              </button>
              <button 
                onClick={() => handleDelete(cat.id)} 
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editing ? "Editar Categoría" : "Nueva Categoría"}>
        <input 
          className="w-full p-4 bg-gray-50 border-2 rounded-xl outline-none font-bold focus:border-blue-500" 
          value={formData.name} 
          onChange={e => setFormData({name: e.target.value})} 
          placeholder="Nombre de la categoría"
        />
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold mt-4 hover:bg-blue-700 transition-all disabled:opacity-50"
        >
          {saving ? <Loader className="animate-spin mx-auto" size={20} /> : 'Guardar'}
        </button>
      </Modal>
    </div>
  );
};

// ============================================
// PANEL DE VEHÍCULOS
// ============================================
const VehiclesPanel = ({ data, loadAllData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ brand: '', models: '' });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!formData.brand.trim()) return;
    
    // Asegurar que models es un array limpio
    const modelsArray = formData.models
      .split(',')
      .map(m => m.trim())
      .filter(Boolean);
    
    setSaving(true);
    try {
      if (editing) {
        // Actualizar vehículo existente
        const { error } = await supabase
          .from('vehicles')
          .update({ 
            brand: formData.brand.toUpperCase(), 
            models: modelsArray 
          })
          .eq('id', editing.id);
        
        if (error) throw error;
      } else {
        // Crear nuevo vehículo
        const { error } = await supabase
          .from('vehicles')
          .insert([{ 
            brand: formData.brand.toUpperCase(), 
            models: modelsArray 
          }]);
        
        if (error) throw error;
      }
      
      await loadAllData();
      setIsModalOpen(false);
      setFormData({ brand: '', models: '' });
      setEditing(null);
    } catch (error) {
      console.error('Error al guardar vehículo:', error);
      alert('Error al guardar el vehículo: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar esta marca?')) return;
    
    try {
      const { error } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      await loadAllData();
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('Error al eliminar: ' + error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-black text-gray-900">Vehículos</h2>
        <button 
          onClick={() => { 
            setEditing(null); 
            setFormData({brand:'', models:''}); 
            setIsModalOpen(true); 
          }} 
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-bold flex items-center gap-2 shadow-lg hover:bg-green-700 transition-all"
        >
          <Plus size={20} /> Nueva Marca
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.vehicles.map(v => {
          // Asegurar que models siempre sea un array
          const models = Array.isArray(v.models) ? v.models : [];
          
          return (
            <div key={v.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-black text-xl text-blue-600 mb-3">{v.brand}</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {models.length > 0 ? (
                  models.map((m, index) => (
                    <span key={`${m}-${index}`} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                      {m}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm italic">Sin modelos</span>
                )}
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => { 
                    setEditing(v); 
                    setFormData({brand: v.brand, models: models.join(', ')}); 
                    setIsModalOpen(true); 
                  }} 
                  className="text-blue-600 font-bold hover:underline"
                >
                  Editar
                </button>
                <button 
                  onClick={() => handleDelete(v.id)} 
                  className="text-red-500 font-bold hover:underline"
                >
                  Eliminar
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editing ? "Editar Marca" : "Nueva Marca"}>
        <input 
          className="w-full p-4 bg-gray-50 border-2 rounded-xl mb-4 font-bold focus:border-blue-500" 
          placeholder="Marca (ej: TOYOTA)" 
          value={formData.brand} 
          onChange={e => setFormData({...formData, brand: e.target.value})}
        />
        <textarea 
          className="w-full p-4 bg-gray-50 border-2 rounded-xl mb-4 resize-none focus:border-blue-500" 
          rows="4"
          placeholder="Modelos separados por coma (ej: Yaris, Corolla, Hilux)" 
          value={formData.models} 
          onChange={e => setFormData({...formData, models: e.target.value})}
        />
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all disabled:opacity-50"
        >
          {saving ? <Loader className="animate-spin mx-auto" size={20} /> : 'Guardar'}
        </button>
      </Modal>
    </div>
  );
};

// ============================================
// PANEL DE PRODUCTOS
// ============================================
const ProductsPanel = ({ data, loadAllData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    vehicle_brand: '',
    compatible_models: [],
    image: '',
    description: '',
    in_stock: true,
    featured: false
  });

  const selectedVehicle = data.vehicles.find(v => v.brand === formData.vehicle_brand);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData(prev => ({ ...prev, image: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.category || !formData.vehicle_brand) {
      alert("Completa los campos obligatorios (*)");
      return;
    }

    setSaving(true);
    try {
      const productData = {
        name: formData.name,
        category: formData.category,
        vehicle_brand: formData.vehicle_brand,
        compatible_models: formData.compatible_models,
        image: formData.image,
        description: formData.description,
        in_stock: formData.in_stock,
        featured: formData.featured
      };

      if (editing) {
        // Actualizar producto existente
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editing.id);
        
        if (error) throw error;
      } else {
        // Crear nuevo producto
        const { error } = await supabase
          .from('products')
          .insert([productData]);
        
        if (error) throw error;
      }
      
      await loadAllData();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error al guardar producto:', error);
      alert('Error al guardar el producto: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este producto?')) return;
    
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      await loadAllData();
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('Error al eliminar: ' + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '', 
      category: '', 
      vehicle_brand: '', 
      compatible_models: [],
      image: '', 
      description: '', 
      in_stock: true, 
      featured: false
    });
    setEditing(null);
  };

  const toggleModel = (model) => {
    setFormData(prev => ({
      ...prev,
      compatible_models: prev.compatible_models.includes(model)
        ? prev.compatible_models.filter(m => m !== model)
        : [...prev.compatible_models, model]
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-black text-gray-900">Productos</h2>
        <button 
          onClick={() => { 
            resetForm(); 
            setIsModalOpen(true); 
          }} 
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg hover:bg-blue-700 transition-all"
        >
          <Plus size={20} /> Nuevo Producto
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.products.map(product => (
          <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="h-44 bg-gray-50 relative">
              {product.image ? (
                <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <Package size={48} />
                </div>
              )}
              {product.featured && (
                <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded">
                  ⭐
                </span>
              )}
            </div>
            <div className="p-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase">{product.vehicle_brand}</p>
              <h3 className="font-bold text-gray-800 truncate mb-1">{product.name}</h3>
              <p className="text-xs text-blue-600 font-bold mb-3">{product.category}</p>
              
              <div className="flex gap-2 mt-4">
                <button 
                  onClick={() => { 
                    setEditing(product); 
                    setFormData(product); 
                    setIsModalOpen(true); 
                  }} 
                  className="flex-1 bg-gray-50 py-2 rounded-lg font-bold text-sm hover:bg-gray-100 transition-all"
                >
                  Editar
                </button>
                <button 
                  onClick={() => handleDelete(product.id)} 
                  className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-all"
                >
                  <Trash2 size={18}/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editing ? "Editar Producto" : "Nuevo Producto"}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[70vh] overflow-y-auto px-1">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-black text-gray-700 mb-1 uppercase">Nombre del Repuesto *</label>
              <input 
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none font-bold focus:border-blue-500" 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="Ej: Puerta posterior"
              />
            </div>

            <div>
              <label className="block text-sm font-black text-gray-700 mb-1 uppercase">Categoría *</label>
              <select 
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none font-bold text-gray-600 focus:border-blue-500" 
                value={formData.category} 
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                <option value="">Elegir categoría...</option>
                {data.categories.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-black text-gray-700 mb-1 uppercase">Descripción y Detalles</label>
              <textarea 
                rows="5" 
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none resize-none font-medium focus:border-blue-500" 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Describe el repuesto, sus características, etc."
              />
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.in_stock} 
                  onChange={e => setFormData({...formData, in_stock: e.target.checked})}
                  className="w-5 h-5"
                />
                <span className="font-bold text-sm">En stock</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.featured} 
                  onChange={e => setFormData({...formData, featured: e.target.checked})}
                  className="w-5 h-5"
                />
                <span className="font-bold text-sm">⭐ Destacado</span>
              </label>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-black text-gray-700 mb-1 uppercase">Fotografía</label>
              <div 
                onClick={() => fileInputRef.current.click()} 
                className="h-48 w-full border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer overflow-hidden hover:border-blue-400 transition-all"
              >
                {formData.image ? (
                  <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <div className="text-center">
                    <Upload size={32} className="text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-400 font-bold">Subir imagen</p>
                  </div>
                )}
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageUpload} 
              />
            </div>

            <div>
              <label className="block text-sm font-black text-gray-700 mb-1 uppercase">Compatibilidad *</label>
              <select 
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl mb-3 font-bold text-gray-600 focus:border-blue-500" 
                value={formData.vehicle_brand} 
                onChange={e => setFormData({...formData, vehicle_brand: e.target.value, compatible_models: []})}
              >
                <option value="">Seleccionar Marca...</option>
                {data.vehicles.map(v => (
                  <option key={v.id} value={v.brand}>{v.brand}</option>
                ))}
              </select>
              
              {selectedVehicle && (
                <div>
                  <p className="text-xs font-bold text-gray-500 mb-2 uppercase">Modelos compatibles:</p>
                  <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    {selectedVehicle.models.map(m => (
                      <button 
                        key={m} 
                        type="button"
                        onClick={() => toggleModel(m)} 
                        className={`px-4 py-2 rounded-xl text-xs font-black border transition-all ${
                          formData.compatible_models.includes(m) 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'bg-white text-gray-500 border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="w-full bg-green-600 text-white py-4 rounded-2xl font-black uppercase mt-8 shadow-xl hover:bg-green-700 transition-all disabled:opacity-50"
        >
          {saving ? (
            <Loader className="animate-spin mx-auto" size={20}/>
          ) : (
            editing ? 'Confirmar Edición' : 'Crear Producto'
          )}
        </button>
      </Modal>
    </div>
  );
};

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
const AdminPanel = ({ setIsAdmin = () => {}, setView = () => {} }) => {
  const [data, setData] = useState({
    categories: [],
    vehicles: [],
    products: []
  });
  const [activeTab, setActiveTab] = useState('products');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      // Cargar productos
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (productsError) throw productsError;

      // Cargar categorías
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (categoriesError) throw categoriesError;

      // Cargar vehículos
      const { data: vehiclesData, error: vehiclesError } = await supabase
        .from('vehicles')
        .select('*')
        .order('brand');
      
      if (vehiclesError) throw vehiclesError;

      setData({
        products: productsData || [],
        categories: categoriesData || [],
        vehicles: vehiclesData || []
      });
    } catch (error) {
      console.error('Error al cargar datos:', error);
      alert('Error al cargar datos: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'products', label: 'Productos', icon: Package },
    { id: 'categories', label: 'Categorías', icon: Grid3x3 },
    { id: 'vehicles', label: 'Vehículos', icon: Car }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin mx-auto mb-4 text-blue-600" size={48} />
          <p className="text-xl font-bold text-gray-600">Cargando panel de administración...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pt-24 pb-12 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black tracking-tighter">Panel Admin</h1>
            <p className="text-gray-400 font-bold text-sm">Gestiona tu inventario</p>
          </div>
          <button 
            onClick={() => { 
              setIsAdmin(false); 
              setView('home'); 
            }} 
            className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-800 transition-all"
          >
            Salir
          </button>
        </div>

        <div className="flex gap-2 p-1.5 bg-gray-200/50 rounded-2xl w-fit mb-8">
          {tabs.map(tab => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)} 
              className={`flex items-center gap-2 px-6 py-3 font-black text-xs uppercase rounded-xl transition-all ${
                activeTab === tab.id 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          {activeTab === 'products' && <ProductsPanel data={data} loadAllData={loadAllData} />}
          {activeTab === 'categories' && <CategoriesPanel data={data} loadAllData={loadAllData} />}
          {activeTab === 'vehicles' && <VehiclesPanel data={data} loadAllData={loadAllData} />}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;