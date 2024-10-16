import User from "./user.class.js";
export default class users {
  constructor() {
    this.data = [];
  }

  populate(users) {
    users.forEach(user => {
      this.data.push(new User(user.id, user.nick, user.email, user.password));
    });
  }

  addUser(user) {
    let user2 = new User(user.id, user.nick, user.email, user.password);
    let max = 0;
    this.data.forEach(user => {
      if (user.id > max) {
        max = user.id;
      }
    });
    user2.id = max + 1;
    this.data.push(user2);
    return user2;
  }

  removeUser(id) {
    let cont = 0;
    let encontrado = false;
    this.data.forEach(user => {
      if (user.id === id) {
        this.data.splice(cont, 1);
        encontrado = true;
      }
      cont++;
    });
    if (!encontrado) throw "El user con este id no existe";
  }

  changeUser(userParaActualizar) {
    const userFound = this.data.find(user => user.id === userParaActualizar.id);
    if (userFound) {
      Object.assign(userFound, userParaActualizar);
      return userFound;
    } else {
      throw "El user no se ha encontrado";
    }
  }

  getUserById(userId) {
    const user = this.data.find(usuario => userId === usuario.id);
    if (user) {
      return user;
    }
    throw "No se ha encontrado ningun usuario con este Id";
  }

  getUserIndexById(userId) {
    const index = this.data.findIndex(usuario => userId === usuario.id);
    if (index !== -1) {
      return index;
    }
    throw "No se ha encontrado ningun usuario por ete index";
  }

  getUserByNickName(nick) {
    const user = this.data.find(usuario => nick === usuario.nick);
    if (user) {
      return user;
    }
    throw "No se ha encontrado ningun usuario con este nick";
  }

  toString() {
    let toStirng = "Users: ";
    this.data.forEach(user => {
      toStirng += user.toString();
    });
    return toStirng;
  }
}
