import './style.css'
import {
    booksFromUser,
    booksFromModule,
    incrementPriceOfbooks,
    booksWithStatus
} from './src/functions.js';
import books from './src/services/datos'
document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="public/logoBatoi.png" class="logo" alt="Vite logo" />
    </a>
    <h1>BatoiBooks Karlos</h1>
   
    <p class="read-the-docs">
      Abre la consola para ver el resultado
    </p>
  </div>
`

console.log(booksFromUser(books.books, 4));
console.log(booksFromModule(books.books, '5021'));
console.log(booksWithStatus(books.books, "good"));
console.log(incrementPriceOfbooks(books.books, 0.1));