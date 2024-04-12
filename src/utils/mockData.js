import mongoose from 'mongoose';
import Product from '../data/models/Product';

export const generateMockProducts = async (count) => {
  try {
    // Eliminar todos los productos existentes en la base de datos
    await Product.deleteMany({});

    const mockProducts = [];
    for (let i = 1; i <= count; i++) {
      const product = new Product({
        title: `Mock Product ${i}`,
        photo: `https://example.com/mock-product-${i}.jpg`,
        price: Math.floor(Math.random() * 1000) + 1,
        stock: Math.floor(Math.random() * 100) + 1,
      });
      mockProducts.push(product);
    }

    // Insertar los productos mockeados en la base de datos
    await Product.insertMany(mockProducts);

    console.log('Mock products generated successfully.');
  } catch (error) {
    console.error('Error generating mock products:', error);
  } finally {
    // Cerrar la conexión a la base de datos
    mongoose.connection.close();
  }
};
