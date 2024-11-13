import Book from "./book.class.js";
import { getDBBooks, addDBBook, removeDBBook, changeDBBook } from '../services/books.api.js'
export default class Books {
  constructor() {
    this.data = [];
  }

  async populate() {
    const libros = await getDBBooks();
    libros.forEach(libro => {
      this.data.push(new Book(libro));
    });
  }

  async addBook(libro) {
    const nuevoLibro = await addDBBook(libro);
    let book = new Book(nuevoLibro);
    this.data.push(book);
    return book;
  }

  
  async removeBook(id) {
    // Realiza la eliminación del libro en la base de datos usando la API
    const libro = await removeDBBook(id);  // Llamada a la API para eliminar el libro
    if (!libro) throw new Error("El libro con este id no existe"); // Verifica si el libro fue encontrado

    // Elimina el libro de la lista local de libros
    let cont = 0;
    let encontrado = false;

    // Aquí estamos buscando el libro en base a su ID (que ahora es un string)
    this.data.forEach((libro, index) => {
        if (libro.id === id) {  // Comparación del ID como string
            this.data.splice(index, 1);  // Elimina el libro del array
            encontrado = true;
        }
        cont++;
    });

    // Si no se encuentra el libro en la lista local, lanzamos un error
    if (!encontrado) {
        throw new Error("El libro con este id no se encuentra en la lista local");
    }
}
async changeBook(bookId, updatedData) {
  // Primero actualizamos el libro en la base de datos
  const updatedBook = await changeDBBook(bookId, updatedData);
  
  // Luego buscamos el libro localmente por su ID
  const bookIndex = this.data.findIndex(book => book.id === bookId);
  if (bookIndex !== -1) {
    // Actualizamos el libro localmente
    this.data[bookIndex] = new Book(updatedBook); // Usamos el constructor de Book para crear una nueva instancia con los datos actualizados
    return this.data[bookIndex]; // Retornamos el libro actualizado
  } else {
    throw new Error("El libro no se ha encontrado");
  }
}


  toString(books) {
    let toString = "Libros: ";
    this.data.forEach(books => {
      toString += books.toString();
    });
    return toString;
  }

  getBookById(id) {
    return this.data.find(book => book.id === id);
  }
  

  getBookIndexById(bookId) {
    const book = this.data.findIndex(libro => bookId === libro.id);
    if (book !== -1) {
      return book;
    }
    throw "No se ha encontrado ningun libro por el index";
  }

  bookExists(userId, moduleCode) {
    return this.data.some(
      libro => userId === libro.userId && moduleCode === libro.moduleCode
    );
  }

  booksFromUser(userId) {
    return this.data.filter(libro => libro.userId === userId);
  }

  booksFromModule(moduleCode) {
    return this.data.filter(libro => libro.moduleCode === moduleCode);
  }

  booksCheeperThan(price) {
    return this.data.filter(libro => libro.price <= price);
  }

  booksWithStatus(status) {
    return this.data.filter(libro => libro.status === status);
  }

  averagePriceOfBooks() {
    if (this.data.length === 0) return "0.00 €";

    const total = this.data.reduce((acc, book) => acc + book.price, 0);
    const average = total / this.data.length;
    return `${average.toFixed(2)} €`;
  }

  booksOfTypeNotes() {
    return this.data.filter(libro => libro.publisher == "Apunts");
  }

  booksNotSold() {
    return this.data.filter(libro => libro.soldDate === "");
  }
}
