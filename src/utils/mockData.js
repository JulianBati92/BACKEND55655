export const generateMockProducts = (count) => {
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