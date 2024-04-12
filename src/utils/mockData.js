<<<<<<< Updated upstream
export const generateMockProducts = (count) => {
=======
import mongoose from 'mongoose';
import Product from '../data/models/Product';

export const generateMockProducts = async (count) => {
  try {
    if (process.env.NODE_ENV !== 'development') {
      console.log('No se pueden generar productos ficticios fuera del modo de desarrollo.');
      return;
    }

    // Eliminar todos los productos existentes en la base de datos
    await Product.deleteMany({});

>>>>>>> Stashed changes
    const mockProducts = [];
    for (let i = 1; i <= count; i++) {
      mockProducts.push({
        id: `mockProductId${i}`,
        title: `Mock Product ${i}`,
        photo: `https://example.com/mock-product-${i}.jpg`,
        price: Math.floor(Math.random() * 1000) + 1,
        stock: Math.floor(Math.random() * 100) + 1,
      });
    }
    return mockProducts;
  };  