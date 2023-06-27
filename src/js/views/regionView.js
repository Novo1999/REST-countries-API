import { view } from './View';
import { currPage, pagBtn } from './paginationView';
import { getData } from '../model';
import { showPage } from './paginationView';
import { state } from '../model';
import { backBtn } from './searchView';
import {
  favoriteCountryMark,
  favoriteState,
  initFavorites,
} from './favoritesView';
import { renderSelectedCountry } from './countryView';

export const filterOption = document.getElementById('region');
export function regionFilter(data) {
  filterOption.addEventListener('change', () => {
    backBtn.style.display = 'block';
    if (filterOption.value === 'default') {
      backBtn.style.display = 'none';
      view._parentElement.innerHTML = '';
      getData(data);
      showPage(data, currPage, state.resultsPerPage);
      pagBtn.style.visibility = 'visible';
      favoriteCountryMark();
      initFavorites(favoriteState);
    } else {
      view._parentElement.innerHTML = '';
      setTimeout(() => filterCountries(data, filterOption.value), 500);
    }
  });
}

export function filterCountries(data, region) {
  // view._parentElement.innerHTML = '';
  data
    .filter(country => region === country.region)
    .forEach(country =>
      view.renderCountries(
        country.flags.png,
        country.name.common,
        country.population,
        country.region,
        country.capital
      )
    );
  pagBtn.style.display = 'none';
  favoriteCountryMark();
  initFavorites(favoriteState);
  renderSelectedCountry(data, data, state.resultsPerPage);
}
