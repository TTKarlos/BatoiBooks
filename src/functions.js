//object
function getBookById(books, bookId) {
    const book = books.find(book => book.id === bookId);
    if (!book) {
        throw new Error(`Libro con ID: ${bookId} no encontrado.`);
    }

    return book;
}
//number
function getBookIndexById(books, bookId){
    const bookIndex = books.findIndex(book => book.id === bookId);
    if (bookIndex === -1){
        throw new Error(`Indice del libro con ID:  ${bookId} no encontrado`);
    }
    return bookIndex;
}

//boolean
function bookExists(books, userId, moduleCode) {
    return books.some(book => book.userId === userId && book.moduleCode === moduleCode);
}

//array
function booksFromUser(books, userId) {
    const booksUser = books.filter(book => book.userId === userId);
    return booksUser.length >= 0 ? booksUser : 'Este usuario no tiene libros';
}


//array
function booksFromModule(books, moduleCode){
    const booksUser = books.filter(book => book.moduleCode === moduleCode);
    return booksUser.length >= 0 ? booksUser : 'Este usuario no tiene libros de dicho modulo';
}

//array
function booksCheeperThan(books, price) {
    return books.filter(book => book.price <= price);
}

//array
function booksWithStatus(books, status){
    return books.filter(book => book.status === status);
}


//string
function averagePriceOfBooks(books) {
    if (books.length === 0) {
        return '0.00 €';
    }

    const total = books.reduce((sum, book) => sum + book.price, 0);
    const avrg = total / books.length;

    if (isNaN(avrg)) {
        return '0.00 €';
    }

    return `${avrg.toFixed(2)} €`;
}



//array
function booksOfTypeNote(books){
    return books.filter(book => book.publisher === 'Apunts');
}

//array
function booksNotSold(books) {
    return books.filter(book => !book.soldDate);
}

//
function  incrementPriceOfbooks(books, percentage) {
    return books.map(book => ({
        ...book,
        price: Number((book.price * (1 + percentage)).toFixed(2))
    }));
}



//
function getUserById(users, userId) {
    const user = users.find(user => user.id === userId);
    if (!user) {
        throw new Error(`User con ID:${userId} no encontrado`);
    }
    return user;
}

//
function getUserIndexById(users, userId) {
    const index = users.findIndex(user => user.id === userId);
    if (index === -1) {
        throw new Error(`User con ID:${userId} no encontrado`);
    }
    return index;
}

//
function getUserByNickName(users, nick) {
    const user = users.find(user => user.nick === nick);
    if (!user) {
        throw new Error(`User con nickname:${nick} no encontrado`);
    }
    return user;
}

//
function getModuleByCode(modules, moduleCode) {
    const module = modules.find(mod => mod.code === moduleCode);
    if (!module) {
        throw new Error(`Module con ID:${moduleCode} no encontrado`);
    }
    return module;
}



export {
    getBookById,
    getBookIndexById,
    bookExists,
    booksFromUser,
    booksFromModule,
    booksCheeperThan,
    booksWithStatus,
    averagePriceOfBooks,
    booksOfTypeNote,
    booksNotSold,
    incrementPriceOfbooks,
    getUserById,
    getUserIndexById,
    getUserByNickName,
    getModuleByCode
}