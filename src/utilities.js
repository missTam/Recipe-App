const UISelector = {
  searchBtn: "#find_recipes",
  surpriseBtn: "#surprise_button",
  inputField: "#meal_name",
  searchOutcome: "#search_outcome",
  cardContainer: "#recipes",
  notification: "#notification",
  modalTitle: ".modal-title",
  mealType: "#meal_type",
  ingredients: "#ingredients",
  ingredientsContent: "#ingredients_content",
  preparation: "#preparation",
  preparationContent: "#preparation_content",
  editIngredients: "#edit_ingredients",
  editPreparation: "#edit_preparation",
  modalImg: "#modal_img",
  saveBtn: "#saveBtn",
  modalContent: ".modal-content",
  modalFooter: ".modal-footer",
  recipes: "#recipe_list",
  pagination: ".pagination",
  pagNav: "#pagination",
  pagInfo: "#pag_info",
  recipesContainer: "#recipesContainer",
  modal: "#recipeModal",
  randomMealP: "#random_meal_p",
  editBtn: "#editBtn",
  deleteBtn: "#deleteBtn",
  ingrTextarea: "#ingr_textarea",
  prepTextarea: "#prep_textarea",
  dismissBtn: "#dismissBtn",
};

const baseURL = {
  searchRecipes: "https://www.themealdb.com/api/json/v1/1/search.php?s=",
  randomRecipe: "https://www.themealdb.com/api/json/v1/1/",
  jsonServer: "http://localhost:3000/",
};

const color = {
  green: "#1de9b6",
  red: "#E17373",
};

export { UISelector, baseURL, color };
