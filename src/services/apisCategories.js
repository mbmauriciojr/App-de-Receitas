const categoriaComida = async () => {
  const endPoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  try {
    const { meals } = await (await fetch(endPoint)).json();
    return meals;
  } catch (error) {
    console.error(error);
  }
};

const categoriaBebida = async () => {
  const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  try {
    const { drinks } = await (await fetch(endPoint)).json();
    return drinks;
  } catch (error) {
    console.error(error);
  }
};

const filterCategoriaComidas = async (param) => {
  const endPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${param}`;
  try {
    const { meals } = await (await fetch(endPoint)).json();
    return meals;
  } catch (error) {
    console.error(error);
  }
};

const filterCategoriaBebidas = async (param) => {
  const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${param}`;
  try {
    const { drinks } = await (await fetch(endPoint)).json();
    return drinks;
  } catch (error) {
    console.error(error);
  }
};

export {
  categoriaComida,
  categoriaBebida,
  filterCategoriaComidas,
  filterCategoriaBebidas,
};
