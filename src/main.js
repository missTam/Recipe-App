import { UISelector, baseURL } from "./utilities";
import { displayList, setPagination } from "./ui/pagination";
import { myHTTP } from "./http";
import { notifyUser } from "./ui/errors";
import { initModal } from "./ui/modal";
import { createCards } from "./ui/card";

// GET recipes on DOM load
document.addEventListener("DOMContentLoaded", loadCollection);

// get recipes
function loadCollection() {
  myHTTP(baseURL.jsonServer)
    .get("posts")
    .then((data) => createCards(data))
    .catch((err) => console.log(err));
}

// find recipes on btn click
document.querySelector(UISelector.searchBtn).addEventListener("click", (e) => {
  if (document.querySelector(UISelector.inputField).value !== "") {
    myHTTP(baseURL.searchRecipes)
      .get(document.querySelector(UISelector.inputField).value)
      .then((resData) => {
        if (resData.meals) {
          showResults(resData.meals);
        } else {
          // handle no results found
          notifyUser(
            UISelector.searchOutcome,
            "No results found. Please try again with a different input."
          );
        }
      })
      .catch((error) => console.log(error));
    e.preventDefault();
    // handle empty input field
  } else {
    notifyUser(UISelector.searchOutcome, "Please provide a meal name.");
  }
});

// fetch surprise recipe on btn click
document
  .querySelector(UISelector.surpriseBtn)
  .addEventListener("click", (e) => {
    myHTTP(baseURL.randomRecipe)
      .get("random.php")
      .then((resData) => {
        showResults(resData.meals);
      })
      .catch((error) => console.log(error));
    e.preventDefault();
  });

// show results on ui and set listener for modal window
function showResults(results) {
  setPagination(results);
  displayList(results, true);
  initModal(results);
}
