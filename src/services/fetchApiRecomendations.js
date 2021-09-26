export async function getFoodRecomendation() {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const res = response.json();
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function getDrinkRecomendation() {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const res = response.json();
    return res;
  } catch (error) {
    console.error(error);
  }
}
