import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, X, Save, Edit, Trash2, Package, Car, 
  Grid3x3, Loader, Upload, Image as ImageIcon, 
  CheckCircle2, LayoutDashboard, LogOut, ChevronRight,
  MoreVertical, Search, AlertCircle
} from 'lucide-react';
import { supabase } from '../services/supabase';

// ============================================
// COMPONENTES UI REUTILIZABLES
// ============================================
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-[60] animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
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
        const { error } = await supabase.from('categories').update({ name: formData.name }).eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('categories').insert([{ name: formData.name }]);
        if (error) throw error;
      }
      await loadAllData();
      setIsModalOpen(false);
      setFormData({ name: '' });
      setEditing(null);
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Categorías</h2>
          <p className="text-slate-500">Organiza tus productos por grupos</p>
        </div>
        <button 
          onClick={() => { setEditing(null); setFormData({name:''}); setIsModalOpen(true); }} 
          className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
        >
          <Plus size={18} /> Nueva Categoría
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.categories.map(cat => (
          <div key={cat.id} className="group bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex justify-between items-center">
            <div>
                <span className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Nombre</span>
                <span className="font-bold text-slate-700 text-lg">{cat.name}</span>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => { setEditing(cat); setFormData({name: cat.name}); setIsModalOpen(true); }} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
                <Edit size={18} />
              </button>
              <button onClick={async () => { if(confirm('¿Eliminar?')) { await supabase.from('categories').delete().eq('id', cat.id); loadAllData(); } }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editing ? "Editar Categoría" : "Nueva Categoría"}>
        <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-700">Nombre de la categoría</label>
            <input 
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium" 
            value={formData.name} 
            onChange={e => setFormData({name: e.target.value})} 
            placeholder="Ej: Carrocería"
            />
            <button 
            onClick={handleSave} 
            disabled={saving}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
            {saving ? <Loader className="animate-spin" size={20} /> : <><Save size={20}/> Guardar Categoría</>}
            </button>
        </div>
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
    const modelsArray = formData.models.split(',').map(m => m.trim()).filter(Boolean);
    setSaving(true);
    try {
      if (editing) {
        await supabase.from('vehicles').update({ brand: formData.brand.toUpperCase(), models: modelsArray }).eq('id', editing.id);
      } else {
        await supabase.from('vehicles').insert([{ brand: formData.brand.toUpperCase(), models: modelsArray }]);
      }
      await loadAllData();
      setIsModalOpen(false);
      setFormData({ brand: '', models: '' });
    } catch (error) {
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Vehículos</h2>
          <p className="text-slate-500">Marcas y modelos compatibles</p>
        </div>
        <button 
          onClick={() => { setEditing(null); setFormData({brand:'', models:''}); setIsModalOpen(true); }} 
          className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
        >
          <Plus size={18} /> Nueva Marca
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.vehicles.map(v => (
          <div key={v.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
                <div className="bg-indigo-50 px-4 py-1 rounded-full">
                    <h3 className="font-bold text-indigo-700">{v.brand}</h3>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => { setEditing(v); setFormData({brand: v.brand, models: v.models.join(', ')}); setIsModalOpen(true); }} className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                        <Edit size={18} />
                    </button>
                    <button onClick={async () => { if(confirm('¿Eliminar?')) { await supabase.from('vehicles').delete().eq('id', v.id); loadAllData(); } }} className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {v.models?.map((m, i) => (
                <span key={i} className="bg-slate-50 text-slate-600 px-3 py-1 rounded-lg text-xs font-semibold border border-slate-100">
                  {m}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editing ? "Editar Marca" : "Nueva Marca"}>
        <div className="space-y-5">
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Marca</label>
                <input 
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 font-bold" 
                placeholder="Ej: TOYOTA" 
                value={formData.brand} 
                onChange={e => setFormData({...formData, brand: e.target.value})}
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Modelos (Separados por coma)</label>
                <textarea 
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 min-h-[120px]" 
                placeholder="Yaris, Corolla, Hilux..." 
                value={formData.models} 
                onChange={e => setFormData({...formData, models: e.target.value})}
                />
            </div>
            <button 
            onClick={handleSave} 
            disabled={saving}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
            >
            {saving ? <Loader className="animate-spin" size={20} /> : 'Guardar Cambios'}
            </button>
        </div>
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
    name: '', category: '', vehicle_brand: '', compatible_models: [],
    image: '', description: '', in_stock: true, featured: false
  });

  const selectedVehicle = data.vehicles.find(v => v.brand === formData.vehicle_brand);

  const handleSave = async () => {
    if (!formData.name || !formData.category || !formData.vehicle_brand) return alert("Faltan campos");
    setSaving(true);
    try {
      if (editing) {
        await supabase.from('products').update(formData).eq('id', editing.id);
      } else {
        await supabase.from('products').insert([formData]);
      }
      await loadAllData();
      setIsModalOpen(false);
    } catch (error) {
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Inventario</h2>
          <p className="text-slate-500 text-sm">Gestiona {data.products.length} repuestos registrados</p>
        </div>
        <div className="flex gap-3">
            <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500" size={18}/>
                <input type="text" placeholder="Buscar..." className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 ring-indigo-500/10 focus:border-indigo-500 transition-all w-64"/>
            </div>
            <button 
                onClick={() => { setEditing(null); setFormData({name: '', category: '', vehicle_brand: '', compatible_models: [], image: '', description: '', in_stock: true, featured: false}); setIsModalOpen(true); }} 
                className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
            >
                <Plus size={18} /> Nuevo Producto
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {data.products.map(product => (
          <div key={product.id} className="group bg-white rounded-[2rem] border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
            <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
              {product.image ? (
                <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={product.name} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300"><Package size={48} /></div>
              )}
              <div className="absolute top-4 left-4 flex gap-2">
                {product.featured && <span className="bg-amber-400 text-amber-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm italic">Destacado</span>}
                <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm ${product.in_stock ? 'bg-emerald-400 text-emerald-950' : 'bg-rose-400 text-rose-950'}`}>
                    {product.in_stock ? 'En Stock' : 'Sin Stock'}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                    <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{product.category}</p>
                    <h3 className="font-bold text-slate-800 leading-tight line-clamp-1">{product.name}</h3>
                </div>
              </div>
              <p className="text-xs text-slate-400 font-medium mb-4 flex items-center gap-1">
                <Car size={12}/> {product.vehicle_brand} {product.compatible_models?.slice(0,2).join(', ')}
              </p>
              
              <div className="flex gap-2 pt-4 border-t border-slate-50">
                <button 
                  onClick={() => { setEditing(product); setFormData(product); setIsModalOpen(true); }} 
                  className="flex-1 bg-slate-900 text-white py-2.5 rounded-xl font-bold text-xs hover:bg-slate-800 transition-all"
                >
                  Editar
                </button>
                <button 
                  onClick={async () => { if(confirm('¿Borrar?')) { await supabase.from('products').delete().eq('id', product.id); loadAllData(); } }} 
                  className="p-2.5 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-100 transition-all"
                >
                  <Trash2 size={18}/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editing ? "Editar Producto" : "Nuevo Producto"}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">Información Principal</label>
              <input className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl mb-4 outline-none focus:border-indigo-500 font-semibold" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Nombre del repuesto"/>
              <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 font-semibold text-slate-600" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                <option value="">Seleccionar Categoría</option>
                {data.categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">Descripción</label>
              <textarea rows="4" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Detalles técnicos..."/>
            </div>
            <div className="flex gap-6 p-4 bg-slate-50 rounded-2xl">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={formData.in_stock} onChange={e => setFormData({...formData, in_stock: e.target.checked})} className="w-5 h-5 accent-indigo-600 rounded-lg"/>
                <span className="font-bold text-slate-700 text-sm">Disponible</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="w-5 h-5 accent-indigo-600 rounded-lg"/>
                <span className="font-bold text-slate-700 text-sm">Destacado</span>
              </label>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">Multimedia</label>
              <div onClick={() => fileInputRef.current.click()} className="h-48 w-full border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer overflow-hidden hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group">
                {formData.image ? <img src={formData.image} className="w-full h-full object-cover" /> : (
                  <div className="text-center group-hover:scale-110 transition-transform">
                    <Upload size={32} className="text-slate-300 mx-auto mb-2" />
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Subir Foto</p>
                  </div>
                )}
              </div>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onloadend = () => setFormData(prev => ({ ...prev, image: reader.result }));
                if(file) reader.readAsDataURL(file);
              }} />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">Compatibilidad</label>
              <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl mb-4 outline-none focus:border-indigo-500 font-bold text-slate-600" value={formData.vehicle_brand} onChange={e => setFormData({...formData, vehicle_brand: e.target.value, compatible_models: []})}>
                <option value="">Elegir Marca</option>
                {data.vehicles.map(v => <option key={v.id} value={v.brand}>{v.brand}</option>)}
              </select>
              {selectedVehicle && (
                <div className="flex flex-wrap gap-2 p-4 bg-slate-50 rounded-2xl max-h-32 overflow-y-auto">
                  {selectedVehicle.models.map(m => (
                    <button key={m} type="button" onClick={() => setFormData(prev => ({...prev, compatible_models: prev.compatible_models.includes(m) ? prev.compatible_models.filter(x => x !== m) : [...prev.compatible_models, m]}))} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase transition-all border ${formData.compatible_models.includes(m) ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-500'}`}>{m}</button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <button onClick={handleSave} disabled={saving} className="w-full bg-indigo-600 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest mt-8 shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center gap-3">
          {saving ? <Loader className="animate-spin" /> : <><CheckCircle2 size={20}/> Guardar Producto</>}
        </button>
      </Modal>
    </div>
  );
};

// ============================================
// COMPONENTE PRINCIPAL (DASHBOARD LAYOUT)
// ============================================
const AdminPanel = ({ setIsAdmin = () => {}, setView = () => {} }) => {
  const [data, setData] = useState({ categories: [], vehicles: [], products: [] });
  const [activeTab, setActiveTab] = useState('products');
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadAllData(); }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [p, c, v] = await Promise.all([
        supabase.from('products').select('*').order('created_at', { ascending: false }),
        supabase.from('categories').select('*').order('name'),
        supabase.from('vehicles').select('*').order('brand')
      ]);
      setData({ products: p.data || [], categories: c.data || [], vehicles: v.data || [] });
    } catch (e) { alert(e.message); }
    finally { setLoading(false); }
  };

  const menuItems = [
    { id: 'products', label: 'Inventario', icon: Package, desc: 'Repuestos' },
    { id: 'categories', label: 'Categorías', icon: Grid3x3, desc: 'Clasificación' },
    { id: 'vehicles', label: 'Vehículos', icon: Car, desc: 'Compatibilidad' },
  ];

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="font-bold text-slate-400 text-sm uppercase tracking-widest">Sincronizando...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* SIDEBAR FIXED */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col fixed h-full z-40">
        <div className="p-8">
            <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                    <LayoutDashboard size={20}/>
                </div>
                <h1 className="text-xl font-black text-slate-900 tracking-tighter uppercase">Dash<span className="text-indigo-600">DYE</span></h1>
            </div>

            <nav className="space-y-2">
                {menuItems.map(item => (
                    <button 
                        key={item.id} 
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${activeTab === item.id ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:bg-slate-50'}`}
                    >
                        <div className="flex items-center gap-3">
                            <item.icon size={20} className={activeTab === item.id ? 'text-indigo-600' : 'text-slate-300 group-hover:text-slate-500'}/>
                            <div className="text-left">
                                <p className={`text-sm font-bold leading-none ${activeTab === item.id ? 'text-indigo-600' : 'text-slate-600'}`}>{item.label}</p>
                                <p className="text-[10px] font-medium opacity-60 uppercase tracking-tighter mt-1">{item.desc}</p>
                            </div>
                        </div>
                        {activeTab === item.id && <ChevronRight size={16}/>}
                    </button>
                ))}
            </nav>
        </div>

        <div className="mt-auto p-8 border-t border-slate-100">
            <button 
                onClick={() => { setIsAdmin(false); setView('home'); }} 
                className="w-full flex items-center gap-3 p-4 text-rose-500 font-bold hover:bg-rose-50 rounded-2xl transition-all"
            >
                <LogOut size={20}/> Salir del Panel
            </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 ml-72 p-12">
        <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTab === 'products' && <ProductsPanel data={data} loadAllData={loadAllData} />}
          {activeTab === 'categories' && <CategoriesPanel data={data} loadAllData={loadAllData} />}
          {activeTab === 'vehicles' && <VehiclesPanel data={data} loadAllData={loadAllData} />}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;