import User from "./user.class.js";
import { getDBUsers, addDBUser, removeDBUser, changeDBUser, changeDBUserPassword} from '../services/users.api.js';
export default class users {
  constructor() {
    this.data = [];
  }

  async populate() {
    const users = await getDBUsers();
    users.forEach(user => {
      this.data.push(new User(user.id, user.nick, user.email, user.password));
    });
  }

  async addUser(user) {
    const usuario = await addDBUser(user);
    let user2 = new User(usuario.id, usuario.nick, usuario.email, usuario.password)
    this.data.push(user2)
    return user2
}

  async removeUser(id) {
    await removeDBUser(id);
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

  async changeUser(userParaActualizar) {
    await changeDBUser(userParaActualizar);
    const userFound = this.data.find(user => user.id === userParaActualizar.id)
    if(userFound) {
        Object.assign(userFound, userParaActualizar)
        return userFound
    } else {
        throw "El user no se ha encontrado"
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

  async changeUserPassword(id, password) {
    await changeDBUserPassword(id, password);
    const user = this.data.find(user => user.id === id);
    if (user) {
      user.password = password;
      return user;
    } else {
      throw "El user no se ha encontrado";
    }
  }
}
