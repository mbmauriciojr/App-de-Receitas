export async function getAreas() {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const res = response.json();
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function getFoodsByArea(area) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    const res = response.json();
    return res;
  } catch (error) {
    console.error(error);
  }
}
