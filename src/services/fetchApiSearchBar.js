export async function getIngCock(ingrediente) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  const res = response.json();
  return res;
}

export async function getNameCock(nome) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`);
  const res = response.json();
  return res;
}

export async function getFirstLetterCock(primeiraLetra) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`);
  const res = response.json();
  return res;
}

export async function getIngCockTail(ingrediente) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  const res = response.json();
  return res;
}

export async function getNameCockTail(nome) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`);
  const res = response.json();
  return res;
}

export async function getFirstLetterCockTail(primeiraLetra) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${primeiraLetra}`);
  const res = response.json();
  return res;
}
