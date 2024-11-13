export default class Vista {
    constructor() {
      // Selecciona los elementos del DOM que se usarán en la vista
      this.booksList = document.querySelector('#list');
      this.about = document.querySelector('#about');
      this.form = document.querySelector('#form');
      this.remove = document.querySelector('#remove');
      this.bookForm = document.querySelector('#bookForm');
      this.messages = document.querySelector('#messages');
    }
  
    // Método que llena el selector de módulos con opciones
    fillModuleSelect(modules) {
      const select = document.querySelector('#id-module');
      modules.forEach(module => {
        const option = document.createElement('option');
        option.value = module.code;
        option.textContent = module.cliteral;
        select.appendChild(option);
      });
    }
  
    // Método que renderiza un libro en la vista
    renderBook(book) {
    console.log(book); // Verifica el contenido del libro
      const bookElement = document.createElement('div');
      bookElement.className = 'card';
      bookElement.innerHTML = `
        <img src="${book.photo}" alt="Libro: ${book.id}">
        <div>
          <h3>${book.moduleCode} (${book.id})</h3>
          <h4>${book.publisher}</h4>
          <p>${book.pages} páginas</p>
          <p>Estado: ${book.status}</p>
          <p>${book.soldDate ? `Vendido el ${book.soldDate}` : 'En venta'}</p>
          <p>${book.comments}</p>
          <h4>${book.price} €</h4>
          <button class="carrito" data-id="${book.id}">
          <span class="material-icons">add_shopping_cart</span>
          </button>
          <button class="edit" data-id="${book.id}">
          <span class="material-icons">edit</span>
          </button>
           <button class="delete" data-id="${book.id}">
          <span class="material-icons">delete</span>
          </button>
        </div>
      `;
      this.booksList.appendChild(bookElement); // Añade el libro a la lista de libros
    }


  
    // Método que elimina un libro de la vista por su ID
    removeBook(id) {
      const bookElement = this.booksList.querySelector(`[alt="Libro: ${id}"]`).closest('.card');
      if (bookElement) {
        bookElement.remove(); // Elimina el elemento del DOM
      }
    }
  
    // Método que muestra un mensaje en la vista
    showMessage(type, message) {
      const messageElement = document.createElement('div');
      messageElement.className = `${type} alert alert-${type === 'error' ? 'danger' : 'info'} alert-dismissible`;
      messageElement.setAttribute('role', 'alert');
      messageElement.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="this.parentElement.remove()">x</button>
      `;
      this.messages.appendChild(messageElement); // Añade el mensaje al contenedor de mensajes
  
      // Elimina el mensaje después de 3 segundos si no es un error
      if (type !== 'error') {
        setTimeout(() => {
          messageElement.remove();
        }, 3000);
      }
    }
  
    setBookSubmitHandler(callback) {
      this.bookForm.addEventListener('submit', (event) => {
          event.preventDefault()

          const payload = {
              moduleCode: document.getElementById("id-module").value,
              publisher: document.getElementById("publisher").value,
              price: document.getElementById("price").value,
              pages: document.getElementById("pages").value,
              status: document.querySelector('input[name="state"]:checked')?.value || "No seleccionado",
              comments: document.getElementById("comments").value
          }
          // a continuación recoge los datos del formulario y los guarda en un objeto // por último llama a la función recibida pasándole dicho objeto
          callback(payload)
      })
  }
    // Método que configura el manejador para la eliminación de un libro
    setBookRemoveHandler(callback) {
      this.remove.addEventListener('click', () => {
        const idToRemove = document.querySelector('#id-remove').value; // Obtiene el ID a eliminar
        callback(idToRemove); // Llama al callback con el ID
      });
    }

    setBookActionHandler(callback) {
      this.booksList.addEventListener('click', (event) => {
        const target = event.target.closest('button');
        if (!target) return; // Salir si no es un botón
    
        // Detectar acción y obtener ID del libro
        const action = target.classList.contains('carrito') ? 'carrito' :
                       target.classList.contains('edit') ? 'edit' :
                       target.classList.contains('delete') ? 'delete' : null;
        if (!action) return; // Salir si no hay acción
    
        const bookId = target.dataset.id; // Obtener ID del libro
        callback(action, bookId); // Llamar al callback con acción e ID
      });
    }

    setFormForEditing(book) {
      // Selecciona el segundo <h2> dentro del formulario y lo cambia a "Editar Libro"
      const header = this.form.querySelector("h2");
   
        header.textContent = "Editar Libro";
      
    
      // Rellena los campos del formulario con los datos del libro a editar
      document.getElementById("id-module").value = book.moduleCode;
      document.getElementById("publisher").value = book.publisher;
      document.getElementById("price").value = book.price;
      document.getElementById("pages").value = book.pages;
      document.getElementById("comments").value = book.comments;
      
      // Selecciona el estado correspondiente
      const stateRadio = document.querySelector(`input[name="state"][value="${book.status}"]`);
      if (stateRadio) {
        stateRadio.checked = true;
      }

      const submitButton = this.form.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.textContent = "Guardar Edición";
      }
    
      // Mostrar el botón de "Cancelar Edición"
      const cancelEditButton = document.getElementById("cancelEditButton");
      if (cancelEditButton) {
        cancelEditButton.style.display = "inline";
      }
    

      // Indica que estamos en modo de edición añadiendo un atributo data
      this.form.dataset.editingId = book.id;

    }

    cancelEditing() {
      // Cambiar el título del formulario a "Añadir Libro"
      const header = this.form.querySelector("h2");
        header.textContent = "Añadir Libro";
      
    
      // Cambiar el botón de "Guardar Edición" a "Añadir"
      const submitButton = this.form.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.textContent = "Añadir";
      }
    
      // Ocultar el botón de "Cancelar Edición"
      const cancelEditButton = document.getElementById("cancelEditButton");
      if (cancelEditButton) {
        cancelEditButton.style.display = "none";
      }
    
      // Limpiar el formulario y eliminar el atributo `data-editing-id`
      this.bookForm.reset();
      delete this.bookForm.dataset.editingId;
    }
    

    resetForm() {

      document.getElementById("id-module").value = "";
      document.getElementById("publisher").value = "";
      document.getElementById("price").value = "";
      document.getElementById("pages").value = "";
      document.getElementById("comments").value = "";

  
  
      delete this.form.dataset.editingId;
      window.location.reload();

      this.form.querySelector('h2').textContent = 'Añadir Libro';
  
      const cancelEditButton = document.getElementById("cancelEditButton");
      if (cancelEditButton) {
        cancelEditButton.style.display = "none";
      }
  
      const editButton = this.form.querySelector('button[type="submit"]');
      editButton.textContent = 'Añadir'; 
    

    }
  
    

  }
  