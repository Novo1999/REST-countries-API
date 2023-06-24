import { view } from './View';
import { currPage, pagBtn } from './paginationView';
import { getData } from '../model';
import { showPage } from './paginationView';
import { state } from '../model';

export function regionFilter(data) {
  const filterOption = document.getElementById('region');
  filterOption.addEventListener('change', () => {
    if (filterOption.value === 'default') {
      view._parentElement.innerHTML = '';
      getData(data);
      showPage(data, currPage, state.resultsPerPage);
      pagBtn.style.visibility = 'visible';
    } else {
      view._parentElement.innerHTML = '';
      filterCountries(data, filterOption.value);
    }
  });
}

function filterCountries(data, region) {
  view._parentElement.innerHTML = '';
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
  pagBtn.style.visibility = 'hidden';
}