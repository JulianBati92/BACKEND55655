class UserManager {
    constructor() {
      this.users = [];
    }
  
    create(data) {
      const user = { id: this.users.length + 1, ...data };
      this.users.push(user);
      return user;
    }
  
    read() {
      return this.users.length
        ? { success: true, response: this.users }
        : { success: false, message: 'No encontrado!' };
    }
  
    readOne(id) {
        const product = this.products.find((p) => p.id === id);
        console.log(`Resultado:`, product);
        return product
          ? { success: true, response: product }
          : { success: false, message: 'No encontrado!' };
    }
  
    destroy(id) {
      this.users = this.users.filter((u) => u.id !== id);
    }
  }
  
  module.exports = UserManager;
  