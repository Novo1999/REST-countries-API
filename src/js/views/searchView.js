import { view } from './View';
import { getData } from '../model';
import { currPage, showPage, showSpecificPage, pagBtn } from './paginationView';
import { filterOption } from './regionView';
import { favoriteCountryMark } from './View';

const submitBtn = document.querySelector('.submit-btn');
const search = document.getElementById('search');
export const backBtn = document.querySelector('.back-btn');

export default class SearchView {
  searchByCountry(data) {
    submitBtn.addEventListener('click', e => {
      e.preventDefault();
      if (search.value) {
        backBtn.style.display = 'block';
        pagBtn.style.visibility = 'hidden';
        view._parentElement.innerHTML = '';
        data.forEach(country => {
          if (
            country.name.common
              .toLowerCase()
              .includes(search.value.toLowerCase())
          ) {
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
      }
    });
  }
  backButton(data, countriesPerPage) {
    backBtn.addEventListener('click', () => {
      view._parentElement.innerHTML = '';
      getData(data);
      showPage(data, currPage, countriesPerPage);
      backBtn.style.display = 'none';
      pagBtn.style.visibility = 'visible';
      filterOption.innerHTML = this.filterMarkup;
      favoriteCountryMark();
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

export const searchView = new SearchView();
