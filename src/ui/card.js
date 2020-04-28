import { UISelector, baseURL } from "../utilities";
import { myHTTP } from "../http";
import { fillModal } from "./modal";

// select card container
const cardContainer = document.querySelector(UISelector.cardContainer);

// max no of cards = 20
let numberOfCards;

// create cards
function createCards(objects) {
  numberOfCards = objects.length;
  objects.forEach((object) => {
    addCard(object);
  });
}

// add card
function addCard(object) {
  const card = document.createElement("div");
  card.id = `card${object.id}`;
  card.className = "this col-sm-12 col-lg-4 col-md-6";
  card.innerHTML = `
        <div class="card mb-3">
        <img class="card-img-top" src="${object.image}">
        <div class="card-body">
        <h5 class="card-title">${object.title}</h5>
        <p class="card-text">${object.type}</p>
        <a href="#" class="btn btn-info" data-toggle="modal" data-target="#recipeModal" id="openBtn${object.id}">Open</a>
        </div>
        </div>
        `;
  cardContainer.appendChild(card);
  document
    .querySelector(`#openBtn${object.id}`)
    .addEventListener("click", openRecipe);
}

// get clicked recipe from JSON server via id, and open in modal view
function openRecipe(e) {
  const itemId = e.target.id.slice("openBtn".length);
  document.querySelector(UISelector.modalTitle).id = itemId;
  myHTTP(baseURL.jsonServer)
    .get(`posts/${itemId}`)
    .then((obj) => {
      fillModal(obj);
    })
    .catch((err) => console.log(err));
}
export { createCards, addCard, numberOfCards };
