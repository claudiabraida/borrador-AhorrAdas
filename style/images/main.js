import features from "./features.js"

/* Functions: HTML element selectors */
const $ = element => document.querySelector(element);
const $$ = element => document.querySelectorAll(element)

const showOrHideElement = (selectors) => {
  for (const selector of selectors) {
    selector.classList.toggle("hidden");
  }
};

const hideElement = (selectors) => {
  for (const selector of selectors) {
    selector.classList.add("hidden");
  }
};

const showElement = (selectors) => {
  for (const selector of selectors) {
    selector.classList.remove("hidden");
  }
};

/* _________________ FUNCTIONALITIES OF BUTTONS WITH VIEWS _________________ */

/* ........... buttons header menu ........... */
$("#button-hamburger-menu").addEventListener("click", () => {
  showOrHideElement([$("#button-hamburger-menu")])
  showOrHideElement([$("nav"), $("#button-close-menu")])
})


$("#button-close-menu").addEventListener("click", () => {
  showOrHideElement([$("#button-close-menu"), $("nav")])
  showOrHideElement([$("#button-hamburger-menu")])
})

/* ........... buttons header nav ........... */
$("#button-view-balance").addEventListener("click", () => {
  showElement([$("#view-balance-home")])
  hideElement([$("#view-categories"), $("#view-report"),$("#new-operation") ])
})

$("#button-view-categories").addEventListener("click", () => {
  showElement([$("#view-categories")])
  hideElement([$("#view-balance-home"), $("#view-report"), $("#new-operation")])
})

$("#button-view-report").addEventListener("click", () => {
  showElement([$("#view-report")])
  hideElement([$("#view-balance-home"), $("#view-categories"), $("#new-operation")])
})

/* ...... button functionality panel-filters ...... */
$("#button-hide-panel-filters").addEventListener("click", () => {
  hideElement([$("#wrapper-panel-filters") ,$("#button-hide-panel-filters")])
  showElement([$("#button-show-panel-filters")])
})

$("#button-show-panel-filters").addEventListener("click", () => {
  showElement([$("#wrapper-panel-filters") ,$("#button-hide-panel-filters")])
  hideElement([$("#button-show-panel-filters")])
})

/* ...... button functionality new operation ...... */
$("#button-new-operation").addEventListener("click", () => {
  showElement([$("#new-operation")])
  hideElement([$("#view-balance-home"), $("#view-report")])
})


/* ...... button functionality view categories ...... */
const $inputnameCategories = $("#name-categories")
const $buttonAddCategories = $("#add-categories")
const $filterCategories = $("#filter-categories")

const $containerNameCategories = $("#container-name-categories")


function clear (element) {
  element.value = ""
}



function mostrarCategorias () {
  const category = features.readLocalStorage("categoria") 
  for (const flor of category) {
    $containerNameCategories.innerHTML += ` 
    <div class="flex justify-around p-2">
    <div class="min-w-12 ">
    <p class= "bg-yellow-100">${flor}</p>
    </div>
    <button class="text-blue-700">Editar</button>
    <button class="text-red-700">Eliminar</button>
    </div>`
  }

}


function addCategory () {
  const newCategory = $inputnameCategories.value.trim().replace(/\s+/g, " ")
  $filterCategories.innerHTML += `<option>${newCategory}</option>`
  $containerNameCategories.innerHTML += ` 
  <div class="flex justify-around p-2">
  <div class="min-w-12 ">
  <p class= "bg-yellow-100">${newCategory}</p>
  </div>
  <button class="text-blue-700">Editar</button>
  <button class="text-red-700">Eliminar</button>
  </div>`
  clear($inputnameCategories)
  
  features.arrayCategories(newCategory)
  // features.arrayCategories(newCategory)
}

// 💛💛💛💛💛💛💛💛
// mostar categorias en filtros 
// ver si se puede agregar a esta funcion las categorias de nueva operación
function mostrarCategoriasDos () {
  const category = features.readLocalStorage("categoria") 
  for (const flor of category) {
    $filterCategories.innerHTML += `<option>${flor}</option>`

  }

}

/* ______________ EVENT ADD CATEGORY ______________ */
$buttonAddCategories.addEventListener("click", addCategory)

window.onload = () => {
 const category = features.readLocalStorage("categoria") 
 features.arrayNewCategories = category
  mostrarCategorias ()
  mostrarCategoriasDos()
  
}

/* ____________________________***** new operation *****____________________________  */
// const $inputDescriptionNewOperation = $("#description-new-operation")
// const $inputAmountNewOperation = $("#amount-new-operation")
// const $selectTypeNewOperation = $("#type-new-operation")
// const $selectCategoriesNewOperation = $("#categories-new-operation")
// const $inputDateNewOperation = $("#date-new-operation")

// const $buttonAddNewOperation = $("#button-add-new-operation")

let dataOperations = []

$("#form-create-new-operation").addEventListener("submit", (e) => {
  e.preventDefault()
  // const $operationsSection = $("#operations-section")

  const newOperationObject = {
    id : crypto.randomUUID(),
    description : e.target[0].value,
    amount :Number(e.target[1].value),
    type : e.target[2].value,
    categories : e.target[3].value,
    date : dayjs(e.target[4].value).format("DD-MM-YYYY"),
  }
  
  dataOperations.push(newOperationObject)
  features.saveLocalStorage("operations", dataOperations)
})