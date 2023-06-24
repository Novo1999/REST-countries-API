import { pagBtn, pagination } from './views/paginationView';
import { view } from './views/View';
import { regionFilter } from './views/regionView';
const spinner = document.querySelector('.spinner');
export const state = {
  resultsPerPage: 10,
};

export function getData(data) {
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
}
export async function init(countries) {
  try {
    const fetchPro = await fetch(`https://restcountries.com/v3.1/${countries}`);
    if (!fetchPro.ok) throw new Error('Something went wrong!');
    // spinner.style.display = 'block';
    const data = await fetchPro.json();
    console.log(data);
    getData(data);

    // Pagination
    pagination(data);
    regionFilter(data);
  } catch (err) {
    view.renderError();
    console.error('💥💥 Something went wrong', err);
  }
}
init('all');
