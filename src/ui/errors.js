// handle faulty input field
function notifyUser(selector, message, color) {
  document.querySelector(selector).textContent = message;
  document.querySelector(selector).style.backgroundColor = color;
  setTimeout(clearText, 3000, selector);
}

// create text
function addInfo(text, id) {
  const txt = document.createElement("p");
  txt.textContent = text;
  txt.id = id;
  return txt;
}

// clear text
function clearText(id) {
  document.querySelector(id).textContent = "";
}

// remove elements
function removeElements(elements) {
  elements.forEach((el) => el.remove());
}

export { addInfo, notifyUser, removeElements };
