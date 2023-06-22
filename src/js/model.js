import View from './views/View.js';
import { pagination } from './views/paginationView.js';
const view = new View();

export const state = {
  country: {},
  resultsPerPage: 10,
};

export async function init(countries) {
  try {
    const fetchPro = await fetch(`https://restcountries.com/v3.1/${countries}`);
    if (!fetchPro.ok) throw new Error('Something went wrong!');

    const data = await fetchPro.json();

    state.country = data;
    data
      .slice(0, state.resultsPerPage)
      .forEach(country =>
        view.renderCountries(
          country.flags.png,
          country.name.common,
          country.population,
          country.region,
          country.capital
        )
      );
    // Pagination
    pagination(data);
  } catch (err) {
    view.renderError();
    console.error('💥💥 Could not load country', err);
  }
}

init('all');
