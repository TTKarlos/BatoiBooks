'use strict';

const API = 'http://localhost:3000/';

// Obtiene todos los libros
export async function getDBBooks() {
    const response = await fetch(API + "books");
    if (!response.ok) {
        throw new Error(`Error ${response.status} de la Base (Recibi All Books) => ${response.statusText}`);
    }
    const books = await response.json();
    return books;
}

// Obtiene un libro por ID
export async function getDBBook(id) {
    const response = await fetch(API + 'books/' + id);
    if (!response.ok) {
        throw new Error(`Error ${response.status} de la Base (Recibir Book) => ${response.statusText}`);
    }
    const book = await response.json();
    return book;
}

// Añade un nuevo libro
export async function addDBBook(book) {
    const response = await fetch(API + 'books/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    });
    if (!response.ok) {
        throw new Error(`Error ${response.status} de la Base (Añadir Book) => ${response.statusText}`);
    }
    const addedBook = await response.json();
    return addedBook;
}

// Elimina un libro por ID
export async function removeDBBook(idBook) {
    const response = await fetch(API + `books/${idBook}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error(`Error ${response.status} de la Base (Eliminar Book) => ${response.statusText}`);
    }
    const removedBook = await response.json();
    return removedBook;
}

// Cambia un libro existente por ID
export async function changeDBBook(idBook, updateBook) {
    console.log("ID del libro a actualizar:", idBook);  
    const response = await fetch(API + `books/${idBook}`, { 
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateBook)
    });
    if (!response.ok) {
        throw new Error(`Error ${response.status} de la Base (Actualizar Book) => ${response.statusText}`);
    }
    const changedBook = await response.json();
    return changedBook;
}
