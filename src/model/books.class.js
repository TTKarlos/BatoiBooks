import Book from "./book.class.js";

export default class Books {
  constructor() {
    this.data = [];
  }

  populate(dataInicial) {
    dataInicial.forEach(book => {
      this.data.push(new Book(book));
    });
  }

  addBook(newBook) {
    let book = new Book(newBook);
    let max = 0;
    // Busca el ID máximo entre los libros existentes
    this.data.forEach(existingBook => {
      if (existingBook.id > max) {
        max = existingBook.id;
      }
    });
    // Asigna un nuevo ID al libro
    book.id = max + 1;
    // Añade el libro al array
    this.data.push(book);
    // Devuelve el libro añadido
    return book;
  }

  removeBook(bookId) {
    let indice = 0; // Contador para el índice
    let hayId = false; // Bandera para verificar si se encontró el ID

    this.data.forEach(book => {
      if (book.id === bookId) {
        this.data.splice(indice, 1); // Elimina el libro del array
        hayId = true; // Marca que se encontró el ID
      }
      indice++; // Incrementa el contador
    });

    if (!hayId) {
      throw "El libro con " + bookId + " no existe"; // Lanza un error si no se encontró
    }
  }

  changeBook(updatedBook) {
    const existingBook = this.data.find(book => book.id === updatedBook.id); // Busca el libro por ID

    if (existingBook) {
      // Verifica si el libro fue encontrado
      Object.assign(existingBook, updatedBook); // Actualiza las propiedades del libro
      return existingBook; // Devuelve el libro actualizado
    } else {
      throw `El libro con ID ${updatedBook.id} no se ha encontrado`; // Lanza un error si no se encuentra
    }
  }

  toString(books) {
    let toString = "Libros: ";
    this.data.forEach(books => {
      toString += books.toString();
    });
    return toString;
  }

  getBookById(bookId) {
    const book = this.data.find(libro => bookId === libro.id);
    if (book) {
      return book;
    }
    throw "No se ha encontrado ningun libro por el id";
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

  incrementPriceOfbooks(percentage) {
    return this.data.map(libro => {
      libro.price = libro.price + libro.price * percentage;
      return libro;
    });
  }
}
