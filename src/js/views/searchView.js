import View from './View';
import { view } from './View';
import { pagBtn } from './paginationView';
import { getData } from '../model';
import { showPage, showSpecificPage } from './paginationView';
const submitBtn = document.querySelector('.submit-btn');
const search = document.getElementById('search');
const backBtn = document.querySelector('.back-btn');

export default class SearchView {
  searchByCountry(data) {
    submitBtn.addEventListener('click', e => {
      e.preventDefault();
      backBtn.style.display = 'block';
      if (search.value) {
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
      }
    });
  }
  backButton(data, currPage, countriesPerPage) {
    backBtn.addEventListener('click', () => {
      view._parentElement.innerHTML = '';
      getData(data);
      showPage(data, currPage, countriesPerPage);
      backBtn.style.display = 'none';
      pagBtn.style.visibility = 'visible';
    });
  }
}

export const searchView = new SearchView();
