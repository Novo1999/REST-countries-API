import { view } from './View';
import View from './View';
import { pagBtn, pagination } from './paginationView';
import { init } from '../model';

// https://restcountries.com/v3.1/region/{region}

class RegionView extends View {
  constructor(region) {
    super();
    this.region = region;
  }

  async fetchRegion() {
    this._parentElement.innerHTML = '';
    try {
      const data = await fetch(
        `https://restcountries.com/v3.1/region/${this.region}`
      );

      this._dataJSON = await data.json();

      this.renderRegionCountry(this._dataJSON);
      pagination(this._dataJSON);
    } catch (err) {
      console.error('Something Went Wrong 💥💥', err);
    }
  }

  renderRegionCountry(data) {
    data
      .slice(0, 10)
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
}

//

// Getting value from dropdown menu

function renderFilteredCountries(region) {
  const regionView = new RegionView(region);
  regionView.fetchRegion();
}

const filterOption = document.getElementById('region');

// Render filtered countries

filterOption.addEventListener('change', () => {
  view._parentElement.innerHTML = '';
  if (filterOption.value) {
    renderFilteredCountries(filterOption.value);
  }
  if (filterOption.value === 'Filter by Region') {
    init('all');
  }
});
