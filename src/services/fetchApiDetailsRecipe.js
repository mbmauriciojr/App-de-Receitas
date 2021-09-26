export async function getFoodByID(id) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const res = response.json();
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function getDrinkByID(id) {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const res = response.json();
    return res;
  } catch (error) {
    console.error(error);
  }
}
