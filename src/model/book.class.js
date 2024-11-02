export default class Book {
    static lastId = 0;
    constructor({ id, userId, moduleCode, title, author, edition, publisher, price, pages, status, photo = '', comments = '', soldDate = '' }) {
        Book.lastId += 1; 
        if (Book.lastId > 9999) {
            throw new Error("No se pueden asignar más de 9999 IDs"); 
        }
        this.id = Book.lastId;
        this.userId = userId;
        this.moduleCode = moduleCode;
        this.title = title;
        this.author = author;
        this.edition = edition;
        this.publisher = publisher;
        this.price = price;
        this.pages = pages;
        this.status = status;
        this.photo = photo;
        this.comments = comments;
        this.soldDate = soldDate;
    }

    toString() {
        return `Id: ${this.id}, Usuario: ${this.userId}, Título: ${this.title}, Autor: ${this.author}, Edición: ${this.edition}, Editor: ${this.publisher}, Precio: ${this.price}, Páginas: ${this.pages}, Estado: ${this.status}, Foto: ${this.photo}, Comentarios: ${this.comments}, Fecha venta: ${this.soldDate}`;
    }
}