export default class Cart {
    constructor() {
      this.data = [];
    }
  
    populate() {
      // Por ahora no hace nada
    }
  
    getBookById(id) {
      return this.data.find(book => book.id === id) || {};
    }
  
    addItem(book) {
      if (this.getBookById(book.id).id) {
        throw new Error('El libro ya está en el carrito');
      }
      this.data.push({...book});
    }
  
    removeItem(id) {
      const index = this.data.findIndex(book => book.id === id);
      if (index === -1) {
        throw new Error('El libro no está en el carrito');
      }
      this.data.splice(index, 1);
    }
  
    toString() {
      return this.data.map(book => `${book.id} - ${book.moduleCode} - ${book.price}€`).join('\n');
    }
  }