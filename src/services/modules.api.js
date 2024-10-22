'use strict'

const API = 'http://localhost:3000/'

export async function getDBModules(){
    const response = await fetch(API+"modules");
    if(!response.ok){
        throw new Error(`Error ${response.status} de la Base (Recibir All Modules) => ${response.statusText}`)
    }
    const modules = await response.json();
    return modules;
}