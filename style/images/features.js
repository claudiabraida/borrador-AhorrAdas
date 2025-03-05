const arrayNewCategories = []

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
// console.log(arrayNewCategories)


export default {
  readLocalStorage,
  saveLocalStorage,
  arrayCategories,
  arrayNewCategories
  
}