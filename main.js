import features from "./features.js"

/* --------- Functions: HTML element selectors --------- */
const $ = element => document.querySelector(element);
const $$ = element => document.querySelectorAll(element)

/* ----------------- GENERAL FUNCTIONS ----------------- */
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
  hideElement([$("#view-categories"), $("#view-report"), $("#new-operation")])
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


/* ...... EVENT FUNCIONALITY NEW OPERATION ...... */
$("#button-new-operation").addEventListener("click", () => {
  showElement([$("#new-operation")])
  hideElement([$("#view-balance-home"), $("#view-report")])
})

/* ...... EVENT FUNCIONALITY RETURN NEW OPERATION ...... */

/* ...... button functionality add new operation ...... */
$("#form-create-new-operation").addEventListener("submit", (e) => {
  e.preventDefault()
  hideElement([ $("#new-operation")])
  showElement([$("#operations-section"), $("#view-balance-home")])

})

/* ...... button functionality cancel new operation ...... */
$("#button-cancel-new-operation").addEventListener("click", (e) => {
  e.preventDefault();
  hideElement([ $("#new-operation")])
  showElement([$("#operations-section"), $("#view-balance-home")])
});


const $filterCategories = $("#filter-categories")
const $selectCategoriesNewOperation = $("#categories-new-operation");


/* ......ELEMENTS HTML FUNCIONALITY VIEW CATEGORIES ...... */
const $containerNameCategories = $("#container-name-categories")
const $inputnameCategories = $("#name-categories")
const $buttonAddCategories = $("#add-categories")


/* 💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥 VIEW BALANCE HOME 💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥 */
/* ******************************** BALANCE ******************************* */
function calculateBalance() {//funtion for calculate de balance
  const operations = features.readLocalStorage("operations") || [];

  const { totalProfits, totalExpenses } = operations.reduce((acc, operation) => {
    if (operation.type === 'profits') {
      acc.totalProfits += operation.amount;
    } else if (operation.type === 'expenses' || operation.type === 'gasto') {
      acc.totalExpenses += operation.amount;
    }
    return acc;
  }, { totalProfits: 0, totalExpenses: 0 });

  const total = totalProfits - totalExpenses;
  $("#profits-amount").textContent = `+$${totalProfits}`;
  $("#expenses-amount").textContent = `-$${totalExpenses}`;
  $("#total-amount").textContent = `$${total}`;
}

/* 💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥 VIEW CATEGORIES 💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥 */
function clear (element) {
  element.value = ""
}

/* ******************************** ADD CATEGORY ******************************* */
function addCategory () {
  const newCategory = $inputnameCategories.value.trim().replace(/\s+/g, " ")
  const uniqueId = crypto.randomUUID(); // Generate a unique ID

  const categoryObject = {
    id: uniqueId,
    name: newCategory
  };

  $containerNameCategories.innerHTML += `
  <div class="flex justify-around p-2" id="${uniqueId}">
    <div class="min-w-12 ">
      <p class= "bg-yellow-100">${newCategory}</p>
    </div>
    <button class="text-blue-700">Editar</button>
    <button class="text-red-700">Eliminar</button>
  </div>`

  clear($inputnameCategories)

  features.arrayCategories(categoryObject)
  displayCategoriesFilters ()
  displayCategoriesNewOperation()
  calculateBalance();
}

/* ______________--- EVENT ADD CATEGORY ______________--- */
$buttonAddCategories.addEventListener("click", addCategory)

/* ................ DISPLAY ON SCREEN ................ */
function displayCategories () {
  const category = features.readLocalStorage("categoria")
  for (const flor of category) {
    $containerNameCategories.innerHTML += `
    <div class="flex justify-around p-2">
     <div class="min-w-12 ">
       <p class= "bg-yellow-100">${flor.name}</p>
     </div>
     <button class="text-blue-700">Editar</button>
     <button class="text-red-700">Eliminar</button>
    </div>`
  }
}

function displayCategoriesFilters() {
  $filterCategories.innerHTML = ""
  const category = features.readLocalStorage("categoria")
  for (const flor of category) {
    $filterCategories.innerHTML += `<option>${flor.name}</option>`
  }
}

function displayCategoriesNewOperation() {
  $selectCategoriesNewOperation.innerHTML = ""
  const category = features.readLocalStorage("categoria");
  for (const flor of category) {
    $selectCategoriesNewOperation.innerHTML += `<option>${flor.name}</option>`;
  }
}

/* ******************************** OPERATIONS ******************************** */

/* ____________________________***** form create new operation *****____________________________  */

$("#form-create-new-operation").addEventListener("submit", (e) => {

  e.preventDefault()

  const newOperationObject = {
    id : crypto.randomUUID(),
    description : e.target[0].value,
    amount :Number(e.target[1].value),
    type : e.target[2].value,
    categories : e.target[3].value,
    date : dayjs(e.target[4].value).format("DD-MM-YYYY"),
  }

  features.arrayDataOperations(newOperationObject);
  console.log("New operation added:", newOperationObject); // Debugging log

  displayOperations()
  calculateBalance();

  // Optionally, clear the form fields after submission
  e.target.reset();
});

/* show in operations section */
const $containerNewOperations = $("#container-new-operations")
function displayOperations() {
  const operations = features.readLocalStorage("operations") || [];
  console.log("Current operations:", operations); // Debugging log
  $containerNewOperations.innerHTML = ""
  operations.forEach(operation => {
    $containerNewOperations.innerHTML += `
      <div class="operation">
        <p>Description: ${operation.description}</p>
        <p>Amount: ${operation.amount}</p>
        <p>Type: ${operation.type}</p>
        <p>Categories: ${operation.categories}</p>
        <p>Date: ${operation.date}</p>

        <button class="text-blue-700">Editar</button>
        <button class="text-red-700">Eliminar</button>
      </div>
    `;
  });
}


window.onload = () => {
  const category = features.readLocalStorage("categoria")
  features.arrayNewCategories = category
  displayCategories ()
  displayCategoriesFilters()
  displayCategoriesNewOperation();
  displayOperations();
  calculateBalance();
};
