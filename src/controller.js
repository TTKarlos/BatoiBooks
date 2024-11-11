import Books from "../src/model/books.class.js";
import Vista from "./views/view.class.js";
import { getDBModules } from "./services/modules.api.js";

export default class Controller {
  constructor() {
    // Inicializa el modelo de libros y la vista
    this.book = new Books();
    this.view = new Vista();
  }

  // Método que inicializa la aplicación
  async init() {
    try {
      // Carga los datos y configura los manejadores de eventos
      await this.loadData();
      this.setupEventListeners();
    } catch (error) {
      // Muestra un mensaje de error si ocurre un problema en la inicialización
      this.view.showMessage(
        "error",
        `Error initializing the application: ${error.message}`
      );
    }
  }

  // Método que carga los módulos y libros desde las API
  async loadData() {
    try {
      const modulesPromise = getDBModules(); // Obtiene los módulos
      const booksPromise = this.book.populate(); // Carga los libros

      // Espera que ambas promesas se resuelvan
      const [modules, _] = await Promise.all([modulesPromise, booksPromise]);

      // Rellena el selector de módulos en la vista
      this.view.fillModuleSelect(modules);
      // Renderiza los libros en la vista
      this.renderBooks();
    } catch (error) {
      // Lanza un error si falla la carga de datos
      throw new Error(`Failed to load data: ${error.message}`);
    }
  }

  // Método que renderiza los libros en la vista
  renderBooks() {
    // Recorre cada libro y lo renderiza
    this.book.data.forEach(book => {
      this.view.renderBook(book);
    });
    // Muestra un mensaje si no hay libros disponibles
    if (this.book.data.length === 0) {
      this.view.showMessage("info", "No hay libros disponibles para mostrar.");
    }
  }


  // Método que configura los manejadores de eventos para la vista
  setupEventListeners() {
    // Configura el manejador para la sumisión de libros
    this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this));
    // Configura el manejador para la eliminación de libros
    this.view.setBookRemoveHandler(this.handleRemoveBook.bind(this));
  }

  async handleSubmitBook(payload) {
    try {
        const book = await this.book.addBook(payload)
        this.view.renderBook(book)
        this.view.showMessage("info", "Libro añadido con exito")
    } catch(error) {
        this.showMessage("error", `Error, No se ha podido añadir el libro: ${error}`)
    }
    
}


  // Método que maneja la eliminación de un libro
  async handleRemoveBook(bookId) {
    try {
      // Elimina el libro y actualiza la vista
      await this.book.removeBook(bookId);
      this.view.removeBook(bookId);
      this.view.showMessage("info", "Libro eliminado correctamente");
    } catch (error) {
      // Muestra un mensaje de error si falla la eliminación del libro
      this.view.showMessage(
        "error",
        `Error al eliminar el libro: ${error.message}`
      );
    }
  }
}
