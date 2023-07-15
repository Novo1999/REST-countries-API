import { pagination, showSpecificPage } from './views/paginationView';
import { view } from './views/View';
import { regionFilter } from './views/regionView';
import SearchView, { searchView } from './views/searchView';
import {
  favoriteCountryMark,
  showFavoritesState,
  renderLocalStorageFavorites,
  showFavorites,
} from './views/favoritesView';
import { renderSelectedCountry } from './views/countryView';

// if (module.hot) {
//   module.hot.accept();
// }

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
    const data = await fetchPro.json();
    getData(data);
    console.log(data);
    // FIXME
    data.forEach(item => {
      if (item.borders) {
        let newArr = item.borders;
        newArr.forEach(border => {
          const combinedArr = [...border];
          console.log(combinedArr);
        });
      }
    });

    showSpecificPage(data, state.resultsPerPage);

    pagination(data);
    regionFilter(data);
    searchView.searchByCountry(data);
    searchView.backButton(data, state.resultsPerPage);
    favoriteCountryMark();
    renderSelectedCountry(data, data, state.resultsPerPage);
    renderLocalStorageFavorites();
    showFavorites(data);
  } catch (err) {
    view.renderError();
    console.error('💥💥 Something went wrong', err);
  }
}

init('all');
