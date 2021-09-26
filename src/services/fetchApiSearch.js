const apiSearchCocktails = async (ingredient) => {
  const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const { drinks } = await (await fetch(endPoint)).json();
  return drinks;
};

const apiSearchMeals = async (ingredient) => {
  const endPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const { meals } = await (await fetch(endPoint)).json();
  return meals;
};

export { apiSearchMeals, apiSearchCocktails };
