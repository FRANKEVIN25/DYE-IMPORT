import { supabase } from './supabase'

export const storageService = {
  // Obtener todos los productos
  async getProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error al obtener productos:', error)
      return []
    }
  },

  // Agregar un nuevo producto
  async addProduct(product) {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
      
      if (error) throw error
      return data[0]
    } catch (error) {
      console.error('Error al agregar producto:', error)
      throw error
    }
  },

  // Actualizar un producto existente
  async updateProduct(id, updates) {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
      
      if (error) throw error
      return data[0]
    } catch (error) {
      console.error('Error al actualizar producto:', error)
      throw error
    }
  },

  // Eliminar un producto
  async deleteProduct(id) {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    } catch (error) {
      console.error('Error al eliminar producto:', error)
      throw error
    }
  },

  // Buscar productos
  async searchProducts(query) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%,brand.ilike.%${query}%`)
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error al buscar productos:', error)
      return []
    }
  },

  // Filtrar productos por marca y categoría
  async filterProducts(brand = null, category = null) {
    try {
      let query = supabase.from('products').select('*')
      
      if (brand && brand !== 'all') {
        query = query.eq('brand', brand)
      }
      
      if (category && category !== 'all') {
        query = query.eq('category', category)
      }
      
      const { data, error } = await query
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error al filtrar productos:', error)
      return []
    }
  }
}