'use strict'

const API = 'http://localhost:3000/'

export async function getDBUsers(){
    const response = await fetch(API+'users')
    if (!response.ok){
        throw new Error(`Error ${response.status} de la Base (Recibir All Users) => ${response.statusText}`)
    }
    return response.json();
}

export async function getDBUser(id) {
    const response = await fetch(API+'users/'+id)
    if(!response.ok){
        throw new Error(`Error ${response.status} de la Base (Recibir User) => ${response.statusText}`)
    }
    const users = await response.json();
    return users;
}


export async function  addDBUser(user) {
    const response = await fetch(API+'users/',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(user)
    })
    if(!response.ok){
        throw new Error(`Error ${response.status} de la Base (Añadir User) => ${response.statusText}`)
    }
    const usuarioEncontrado = await response.json();
    return usuarioEncontrado;
}

export async function removeDBUser(idUser) {
    const response = await fetch(API + `users/${idUser}`,{
        method:'DELETE',
        headers: {
            'Content-Type':'application/json'
        }
    }
    )
    if(!response.ok){
        throw new Error(`Error ${response.status} de la Base (ELiminar User) => ${response.statusText}`)
    }
   const removedUser = await response.json();
   return removedUser;
    
}

export async function changeDBUser(usuario) {
    const response = await fetch(API + 'users/' + usuario.id, {
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
      })
      if (!response.ok) {
        throw `Error ${response.status} de la BBDD: ${response.statusText}`
      }
      const userCambiado = await response.json()
      return userCambiado
}



export async function changeDBUserPassword(idUser, newPassword) {
    const response = await fetch(API + `users/${idUser}`,{
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({password: newPassword})
    })
    if(!response.ok){
        throw new Error(`Error ${response.status} de la Base (Actualizar Password) => ${response.statusText}`)
    }
    const changedPassword = await response.json();
    return changedPassword;
}





