import { useState } from 'react';
import { Heart, Star, Eye, Edit2, Trash2 } from 'lucide-react';

const ProductCard = ({ product, onClick, onEdit, onDelete, isAdmin }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div
      className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => !isAdmin && onClick(product)}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <img
          src={product.image || 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlays */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.featured && (
            <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
              <Star size={12} fill="currentColor" /> DESTACADO
            </span>
          )}
          {!product.inStock && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              AGOTADO
            </span>
          )}
        </div>

        {/* Favorite Button */}
        {!isAdmin && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              isFavorite ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
            } shadow-lg backdrop-blur-sm`}
          >
            <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        )}

        {/* Quick View */}
        {!isAdmin && (
          <div className={`absolute bottom-3 left-3 right-3 flex gap-2 transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <button className="flex-1 bg-white text-gray-900 py-2 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-300 shadow-lg flex items-center justify-center gap-2">
              <Eye size={16} /> Ver Detalles
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {product.brand && (
          <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide mb-1">
            {product.brand}
          </p>
        )}
        
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors min-h-[3rem]">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          {product.price && (
            <span className="text-2xl font-bold text-blue-600">
              {product.price}
            </span>
          )}
          
          <div className={`flex items-center gap-1 text-xs font-semibold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
            <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-600' : 'bg-red-600'} animate-pulse`} />
            {product.inStock ? 'En Stock' : 'Agotado'}
          </div>
        </div>

        {/* Admin Actions */}
        {isAdmin && (
          <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(product);
              }}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Edit2 size={16} /> Editar
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(product.id);
              }}
              className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 size={16} /> Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;