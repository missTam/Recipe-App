import { UISelector } from "../utilities";
import { addInfo, removeElements } from "./errors";

let list;

// initially 1
let currentPage = 1;

// show 5 results per page
const rows = 5;

// no. of pages required - dependent on results
let pageCount;

// display search results
function displayList(results, fromMain = null) {
  // re-create list if called from main
  if (fromMain) {
    if (list) {
      list.remove();
    }
    createList();
    // otherwise empty out the list
  } else {
    list.innerHTML = "";
  }

  // fetch data for the corresponding page
  const end = rows * currentPage;
  const start = end - rows;
  const paginatedItems = results.slice(start, end);

  for (let i = 0; i < paginatedItems.length; i++) {
    const item_element = document.createElement("div");
    item_element.innerHTML = `
      <a href="#" class="list-group-item list-group-item-action" data-toggle="modal" data-target="#recipeModal">${paginatedItems[i].strMeal}</a>
    `;
    list.appendChild(item_element);
  }
}

// create pagination
function setPagination(results) {
  cleanUp();

  // calculate required no of pages
  pageCount = Math.ceil(results.length / rows);

  const parent = document.querySelector(UISelector.recipesContainer);
  const sybling = document.querySelector(UISelector.randomMealP);

  // set pagination only for 2 or more pages
  if (pageCount > 1) {
    // create pagination wrapper
    const pagination = document.createElement("nav");
    pagination.id = "pagination";
    pagination.classList.add("mt-3");
    pagination.innerHTML = `<ul class="pagination"></ul>`;

    // insert pagination into DOM
    parent.insertBefore(pagination, sybling);

    // select ul from pagination
    let ul = document.querySelector(UISelector.pagination);

    // create prev btn and add to ul
    createBtn("Previous", ul);

    // create as many btns as necessary
    for (let i = 1; i < pageCount + 1; i++) {
      const li = createLi(i);
      ul.appendChild(li);
    }

    // create next btn and add to ul
    createBtn("Next", ul);

    // insert instruction into DOM
    parent.insertBefore(
      addInfo("Click on a recipe to open", "pag_info"),
      pagination
    );

    // add clear btn
    ul.appendChild(clearBtn());

    // add event listener to pagination and update currentPage on click
    pagination.addEventListener("click", (e) => {
      // press same page or area outside btns - exit function
      if (currentPage == e.target.textContent || e.target.tagName === "UL") {
        return;
      }
      const c = e.target.parentNode.className;
      const re = /\d/;
      // current page cannot be less than 1
      if (c.includes("Previous") && currentPage >= 2) {
        currentPage--;
        // current page cannot be more than page count
      } else if (c.includes("Next") && currentPage <= pageCount - 1) {
        currentPage++;
        // current page updates to the nummber clicked
      } else if (e.target.textContent.match(re)) {
        currentPage = e.target.textContent;
        // remove search results on clear
      } else if (e.target.id === "clear_recipes") {
        list.remove();
        removeElements([
          pagination,
          document.querySelector(UISelector.pagInfo),
        ]);
        currentPage = 1;
        return;
      } else {
        return;
      }
      e.preventDefault();
      displayList(results);
    });
  } else {
    parent.insertBefore(
      addInfo("Click on a recipe to open", "pag_info"),
      sybling
    );
  }
}

// create list
function createList() {
  list = document.createElement("div");
  list.className = "list-group mb-1";
  list.id = "recipe_list";
  document
    .querySelector(UISelector.recipesContainer)
    .insertBefore(list, document.querySelector(UISelector.modal));
}

// li = enumerated page btn
function createLi(page) {
  let li = document.createElement("li");
  li.classList.add("page-item");

  let a = document.createElement("a");
  a.classList.add("page-link");
  a.href = "#";
  a.textContent = page;

  li.appendChild(a);

  return li;
}

// previous and next buttons
function createBtn(direction, ul) {
  let letter;
  direction == "Previous" ? (letter = "l") : (letter = "r");
  let li = document.createElement("li");
  li.className = `page-item ${direction}`;
  li.innerHTML = `
    <a class="page-link ${direction}" href="#">
      <span aria-hidden="true">&${letter}aquo;</span>
      <span class="sr-only">${direction}</span>
    </a>`;
  ul.appendChild(li);
}

// clear btn
function clearBtn() {
  const btn = document.createElement("button");
  btn.className = "btn btn-outline-info btn-block-xs-only ml-auto";
  btn.id = "clear_recipes";
  btn.textContent = "Clear";
  return btn;
}

// clear residue from previous search(es)
function cleanUp() {
  if (document.querySelector(UISelector.pagNav)) {
    document.querySelector(UISelector.pagNav).remove();
  }
  if (document.querySelector(UISelector.pagInfo)) {
    document.querySelector(UISelector.pagInfo).remove();
  }
  currentPage = 1;
}

export { list, setPagination, displayList };
