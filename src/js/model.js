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
    console.log(state.country);

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

init('bd,in,de,us,it,co,br,ar');

// setTimeout(() => console.log(state.country[0]), 1000);
// setTimeout(() => console.log(state.country[7].population), 1000);
// setTimeout(() => console.log(state.country[7].name.common), 1000);
// setTimeout(() => console.log(state.country[7].flags.png), 1000);
// setTimeout(() => console.log(state.country[7].region), 1000);
