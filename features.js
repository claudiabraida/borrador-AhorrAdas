const arrayNewCategories = []
const dataOperations = []

function readLocalStorage (key) {
  const datos = JSON.parse(localStorage.getItem(key))
  return datos ? datos : [];
}

function saveLocalStorage (key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

function arrayCategories (array) {
 const cosa = readLocalStorage("categoria")
  cosa.push(array)
  saveLocalStorage("categoria", cosa)
}

function arrayDataOperations (array) {
  const cosa = readLocalStorage("operations")
   cosa.push(array)
   saveLocalStorage("operations", cosa)
 }

// console.log(arrayNewCategories)
// const objetoCategoria = {
  
//   id: crypto.randomUUID(),

// }

export default {
  readLocalStorage,
  saveLocalStorage,
  arrayCategories,
  arrayNewCategories,
  arrayDataOperations,
  dataOperations
}