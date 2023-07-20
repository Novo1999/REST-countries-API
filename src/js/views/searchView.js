import { view } from './View';
import { getData, state } from '../model';
import { currPage, showPage, pagBtn } from './paginationView';
import { filterOption } from './regionView';
import {
  favoriteCountryMark,
  favoriteState,
  getLocalStorage,
  initFavorites,
  renderLocalStorageFavorites,
  showFavorites,
  showFavoritesState,
} from './favoritesView';
import { renderSelectedCountry } from './countryView';

export const searchState = {
  status: false,
  text: '',
};

const submitBtn = document.querySelector('.submit-btn');
const search = document.getElementById('search');
export const backBtn = document.querySelector('.back-btn');

// TODO add a message when the search query doesn't match

export default class SearchView {
  searchByCountry(data) {
    submitBtn.addEventListener('click', e => {
      e.preventDefault();
      if (search.value) {
        searchState.status = true;
        searchState.text = search.value;
        console.log(searchState);
        renderSearch(data, search.value);
      }
    });
  }

  backButton(data, countriesPerPage) {
    backBtn.addEventListener('click', () => {
      view._parentElement.innerHTML = '';
      searchState.status = false;
      getData(data);
      showPage(data, currPage, countriesPerPage);
      backBtn.style.display = 'none';
      pagBtn.style.display = 'block';
      filterOption.innerHTML = this.filterMarkup;
      favoriteCountryMark();
      initFavorites(getLocalStorage());
      renderSelectedCountry(data, data, countriesPerPage);
      // showFavorites(data);
    });
  }

  filterMarkup = `
  <option value="default">Filter by Region</option>
  <option value="Africa">Africa</option>
  <option value="Americas">Americas</option>
  <option value="Asia">Asia</option>
  <option value="Europe">Europe</option>
  <option value="Oceania">Oceania</option>`;
}

export function renderSearch(data, query) {
  backBtn.style.display = 'block';
  pagBtn.style.display = 'none';
  view._parentElement.innerHTML = '';
  data.forEach(country => {
    if (country.name.common.toLowerCase().includes(query.toLowerCase())) {
      view.renderCountries(
        country.flags.png,
        country.name.common,
        country.population,
        country.region,
        country.capital
      );
    }
  });
  search.value = '';
  favoriteCountryMark();
  initFavorites(favoriteState);
  renderSelectedCountry(data, data, state.resultsPerPage);
}

export const searchView = new SearchView();
