import './style.css'
import Controller from './src/controller.js';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#app').innerHTML = `
    <header>
      <h1>BatoiBooks Karlos</h1>
      <img src="/public/logoBatoi.png" class="logo" alt="Batoi logo" />
    </header>

    <nav>
      <ul>
        <li><a href="#list">Ver Libros</a></li>
        <li><a href="#form">Añadir Libro</a></li>
        <li><a href="#about">Acerca de...</a></li>
      </ul>
    </nav>

    <div id="messages"></div>

    <main>
      <div id="list"></div>

      <div id="form">
        <div>
          <label for="id-remove">Id:</label>
          <input type="number" id="id-remove">
          <button id="remove">Borrar libro</button>
        </div>
        <form id="bookForm">
           <div>
            <label for="id-module">Módulo:</label>
            <select id="id-module">
            <option>- Selecciona un módulo -</option>
             </select>
          </div>

          <div>
            <label for="publisher">Editorial:</label>
            <input type="text" id="publisher" required>
          </div>

          <div>
            <label for="price">Precio:</label>
            <input type="number" id="price" step="0.01" min="0" required>
          </div>

          <div>
            <label for="pages">Páginas:</label>
            <input type="number" id="pages" min="1" required>
          </div>

          <div>
            <label>Estado:</label>
            <input type="radio" id="new" name="state" value="new" required>
            <label for="new">Nuevo</label>
            <input type="radio" id="good" name="state" value="good">
            <label for="good">Bueno</label>
            <input type="radio" id="used" name="state" value="used">
            <label for="used">Usado</label>
          </div>

          <div>
            <label for="comments">Comentarios:</label>
            <textarea id="comments"></textarea>
          </div>

          <button type="submit">Añadir</button>
          <button type="reset">Reset</button>
        </form>
      </div>

      <div id="about">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
    </main>

    <footer>
      <p><strong>Karlos</strong></p>
    </footer>
  `;

  const myController = new Controller();
  myController.init();
});