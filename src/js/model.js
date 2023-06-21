import View from './views/View.js';

const view = new View();

export const state = {
  country: {},
};

export async function init(countries) {
  try {
    const fetchPro = await fetch(
      `https://restcountries.com/v3.1/alpha?codes=${countries}`
    );
    const data = await fetchPro.json();
    state.country = data;

    data.forEach(country =>
      view.renderCountries(
        country.flags.png,
        country.name.common,
        country.population,
        country.region,
        country.capital
      )
    );
  } catch (err) {
    console.error('💥💥', err);
  }
}

init('bd');
