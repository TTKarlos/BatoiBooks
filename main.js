import './style.css';
import data from './src/services/datos.js'; 
import Books from './src/model/books.class.js';
import Users from './src/model/users.class.js';
import Modules from './src/model/modules.class.js';

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

const misModulos = new Modules();
misModulos.populate(data.modules);
const misUsers = new Users();
misUsers.populate(data.users);
const misBooks = new Books();
misBooks.populate(data.books);
console.log(`Devolucion de data.Books ${data.books}`);

console.log(misBooks.toString());
console.log(misBooks.booksFromModule(data.books, '5021')); 
console.log(misBooks.booksWithStatus(data.books, 'new')); 
console.log(misBooks.incrementPriceOfbooks(data.books, 0.1)); 