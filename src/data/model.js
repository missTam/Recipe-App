// create recipe instance
function createRecipe(recipe) {
  return {
    title: recipe.strMeal,
    type: recipe.strArea,
    ingredients: mergeIngredients(recipe),
    image: recipe.strMealThumb,
    preparation: recipe.strInstructions,
  };
}

// merge ingredients with their measures
function mergeIngredients(recipe) {
  let ingredients = "";
  for (const key in recipe) {
    if (key.includes("strIngredient") && recipe[key]) {
      const no = key.slice("strIngredient".length);
      const measure = Object.keys(recipe).find(
        (key) => key === `strMeasure${no}`
      );
      ingredients += `${recipe[key]} (${recipe[measure]}), `;
    }
  }
  ingredients = ingredients.slice(0, -2);
  return ingredients;
}

export { createRecipe };
