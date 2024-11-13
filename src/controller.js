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
      this.view.showMessage("error", `Error initializing the application: ${error.message}`);
    }
  }

  // Método que carga los módulos y libros desde las API
  async loadData() {
    try {
      const modulesPromise = getDBModules(); // Obtiene los módulos
      const booksPromise = this.book.populate(); // Carga los libros
      const [modules, _] = await Promise.all([modulesPromise, booksPromise]);

      this.view.fillModuleSelect(modules);
      this.renderBooks();
    } catch (error) {
      throw new Error(`Failed to load data: ${error.message}`);
    }
  }

  // Método que renderiza los libros en la vista
  renderBooks() {
    this.book.data.forEach(book => {
      this.view.renderBook(book);
    });
    if (this.book.data.length === 0) {
      this.view.showMessage("info", "No hay libros disponibles para mostrar.");
    }
  }

  setupEventListeners() {
    this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this));
    this.view.setBookActionHandler(this.handleActionBook.bind(this));
    document.getElementById("cancelEditButton").addEventListener("click", this.cancelEditing.bind(this));
  }
  async handleSubmitBook(payload) {
    try {
        const editingId = this.view.form.dataset.editingId;  // Obtén el ID del libro que estamos editando
        
        if (editingId) {
            // Crear un objeto con solo los campos que el usuario modificó
            const updatedPayload = {
                id: editingId,  // Solo necesitamos enviar el ID y los campos que se modificaron
                moduleCode: payload.moduleCode,
                publisher: payload.publisher,
                price: payload.price,
                pages: payload.pages,
                status: payload.status,
                comments: payload.comments  // Enviar los campos modificados
            };

            // Llamamos a la función para actualizar el libro
            const updatedBook = await this.book.changeBook(editingId, updatedPayload);
            
            this.view.showMessage("info", "Libro editado con éxito");
            this.cancelEditing();  // Limpiar el formulario después de la edición
        } else {
            // Si no hay un ID, significa que estamos añadiendo un libro nuevo
            const newBook = await this.book.addBook(payload);
            this.view.renderBook(newBook);
            this.view.showMessage("info", "Libro añadido con éxito");
        }
    } catch (error) {
        this.view.showMessage("error", `Error al procesar el libro: ${error.message}`);
    }
}


  async handleActionBook(action, bookId) {
    switch (action) {
      case 'carrito':
        this.view.showMessage("info", `Libro ${bookId} añadido al carrito`);
        break;
      case 'edit':
        const bookToEdit = this.book.getBookById(bookId);
        this.view.setFormForEditing(bookToEdit);
        break;
      case 'delete':
        await this.handleRemoveBook(bookId);
        break;
    }
  }

  async handleRemoveBook(bookId) {
    if (!confirm(`¿Estás seguro de que deseas eliminar este libro con ID: ${bookId}?`)) return;
   
      await this.book.removeBook(bookId);
      this.view.removeBook(bookId);
      this.view.showMessage("info", "Libro eliminado correctamente");
   
  }

  cancelEditing() {
    this.view.resetForm();
  }



  
}
