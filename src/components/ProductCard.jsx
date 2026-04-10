import { Star, Edit2, Trash2, ChevronRight } from 'lucide-react';

const ProductCard = ({ product, onClick, onEdit, onDelete, isAdmin }) => {
  return (
    <div
      className="group relative bg-gray-50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      onClick={() => !isAdmin && onClick(product)}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image || 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800'}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.featured && (
            <span className="bg-blue-600 text-white px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider uppercase flex items-center gap-1 shadow-lg">
              <Star size={10} fill="currentColor" /> Destacado
            </span>
          )}
          {!product.inStock && (
            <span className="bg-gray-900/80 text-white px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider uppercase shadow-lg backdrop-blur-sm">
              Agotado
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {product.brand && (
          <p className="text-blue-600 text-[10px] font-black tracking-widest uppercase mb-1">
            {product.brand}
          </p>
        )}

        <h3 className="font-black text-gray-900 text-base leading-tight mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {product.price && (
              <span className="text-xl font-black text-gray-900">
                {product.price}
              </span>
            )}
            <span className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide ${product.inStock ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-gray-300'}`} />
              {product.inStock ? 'En stock' : 'Agotado'}
            </span>
          </div>

          {!isAdmin && (
            <div className="w-8 h-8 rounded-full bg-blue-50 group-hover:bg-blue-600 flex items-center justify-center transition-colors flex-shrink-0">
              <ChevronRight size={15} className="text-blue-600 group-hover:text-white transition-colors" />
            </div>
          )}
        </div>

        {/* Admin Actions */}
        {isAdmin && (
          <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={(e) => { e.stopPropagation(); onEdit(product); }}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5"
            >
              <Edit2 size={14} /> Editar
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(product.id); }}
              className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-bold text-sm hover:bg-red-50 hover:text-red-600 transition-colors flex items-center justify-center gap-1.5"
            >
              <Trash2 size={14} /> Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
