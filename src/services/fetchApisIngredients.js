const apiMealsIngredients = async () => {
  const endPoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const { meals } = await (await fetch(endPoint)).json();
  return meals;
};

const apiCocktailsIngredients = async () => {
  const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const { drinks } = await (await fetch(endPoint)).json();
  return drinks;
};

export { apiMealsIngredients, apiCocktailsIngredients };
