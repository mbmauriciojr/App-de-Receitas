const mealsAPI = async () => {
  const endPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  try {
    const { meals } = await (await fetch(endPoint)).json();
    return meals;
  } catch (error) {
    console.error(error);
  }
};

const cocktailsAPI = async () => {
  const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  try {
    const { drinks } = await (await fetch(endPoint)).json();
    return drinks;
  } catch (error) {
    console.error(error);
  }
};

export { mealsAPI, cocktailsAPI };
