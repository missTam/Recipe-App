import { UISelector, baseURL, color } from "../utilities";
import { list } from "./pagination";
import { createRecipe } from "../data/model";
import { myHTTP } from "../http";
import { notifyUser } from "./errors";
import { addCard, numberOfCards } from "./card";

let modalState = "static";
let object;

// select elements
const dismissBtn = document.querySelector(UISelector.dismissBtn);
const modalTitle = document.querySelector(UISelector.modalTitle);
const deleteBtn = document.querySelector(UISelector.deleteBtn);
const editBtn = document.querySelector(UISelector.editBtn);
const mealType = document.querySelector(UISelector.mealType);
const modalImg = document.querySelector(UISelector.modalImg);
// ingr el
const ingredients = document.querySelector(UISelector.ingredients);
const ingrContent = document.querySelector(UISelector.ingredientsContent);
const ingredientsForm = document.querySelector(UISelector.editIngredients);
const ingrTextarea = document.querySelector(UISelector.ingrTextarea);
// prep el
const preparation = document.querySelector(UISelector.preparation);
const prepContent = document.querySelector(UISelector.preparationContent);
const preparationForm = document.querySelector(UISelector.editPreparation);
const prepTextarea = document.querySelector(UISelector.prepTextarea);

// listen for delete, edit and close
deleteBtn.addEventListener("click", deleteRecipe);
editBtn.addEventListener("click", editRecipe);
dismissBtn.addEventListener("click", (e) => {
  bringToStatic();
  e.preventDefault();
});

// selected list item opens modal on click
function initModal(results) {
  list.addEventListener("click", (e) => {
    const item = results.find((meal) => meal.strMeal === e.target.textContent);
    // create recipe instance
    object = createRecipe(item);
    // populate modal with recipe data
    fillModal(object, true);
    e.preventDefault();
  });
}

function fillModal(object, fromList = null) {
  // fill modal with data
  modalTitle.textContent = object.title;
  mealType.textContent = object.type;
  ingrContent.textContent = object.ingredients;
  modalImg.src = object.image;
  prepContent.textContent = object.preparation;

  // handle buttons
  if (fromList) {
    // show save, hide edit/ delete buttons
    document.querySelector(UISelector.saveBtn).style.display = "block";
    document.querySelector(UISelector.editBtn).style.display = "none";
    deleteBtn.style.display = "none";
  } else {
    // hide save, show edit/ delete buttons
    document.querySelector(UISelector.saveBtn).style.display = "none";
    document.querySelector(UISelector.editBtn).style.display = "block";
    deleteBtn.style.display = "block";
  }
}

// POST recipe to JSON server & create a card on save
document.querySelector(UISelector.saveBtn).addEventListener("click", () => {
  if (numberOfCards < 20) {
    numberOfCards++;
    myHTTP(baseURL.jsonServer)
      .post("posts", object)
      .then((data) => {
        addCard(data);
        notifyUser(UISelector.notification, "Recipe saved", color.green);
        console.log(numberOfCards);
      })
      .catch((err) => handleErr(err));
  } else {
    notifyUser(
      UISelector.notification,
      "Maximum number of recipes is 20",
      color.red
    );
  }
});

// delete recipe
function deleteRecipe() {
  myHTTP(baseURL.jsonServer)
    // delete from server
    .delete(`posts/${modalTitle.id}`)
    // remove card
    .then(() => {
      document.querySelector(`#card${modalTitle.id}`).remove();
      // close modal
      $(UISelector.modal).modal("hide");
      // return to static view
      modalState = "static";
      bringToStatic();
      // substract one card
      numberOfCards--;
    })
    .catch((err) => handleErr(err));
}

// edit recipe
function editRecipe() {
  console.log(modalState);
  if (modalState === "static") {
    // change state
    modalState = "edit";
    // hide static elements
    ingredients.style.display = "none";
    preparation.style.display = "none";
    // show form elements
    ingredientsForm.style.display = "block";
    preparationForm.style.display = "block";
    // inject text into forms
    ingrTextarea.value = ingrContent.textContent;
    prepTextarea.value = prepContent.textContent;
    // change btn text
    editBtn.textContent = "Save changes";
  } else {
    // update recipe on the server
    myHTTP(baseURL.jsonServer)
      .put(`posts/${modalTitle.id}`, updateObject())
      .then((data) => {
        // update static modal
        fillModal(data);
        // return to static view
        bringToStatic();
      })
      .catch((err) => handleErr(err));
  }
}

// set modal back to static state
function bringToStatic() {
  modalState = "static";
  // hide form elements
  ingredientsForm.style.display = "none";
  preparationForm.style.display = "none";
  // show modal elements
  ingredients.style.display = "block";
  preparation.style.display = "block";
  // reset btn text
  editBtn.textContent = "Edit";
}

// create updated object
function updateObject() {
  return {
    title: modalTitle.textContent,
    type: mealType.textContent,
    ingredients: ingrTextarea.value,
    image: modalImg.src,
    preparation: prepTextarea.value,
    id: modalTitle.id,
  };
}

// handle err
function handleErr(err) {
  console.log(err);
  notifyUser(
    UISelector.notification,
    `Something went wrong: ${err}`,
    color.red
  );
}

export { initModal, fillModal };
