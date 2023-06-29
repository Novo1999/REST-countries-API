import { view } from './View';
import { pagBtn } from './paginationView';
import {
  filterOption,
  regionFilter,
  filterCountries,
  regionState,
} from './regionView';
import { getData } from '../model';
import { showPage, currPage, showSpecificPage } from './paginationView';
import {
  favoriteCountryMark,
  initFavorites,
  favoriteState,
  getLocalStorage,
  favBtn,
} from './favoritesView';
import { backBtn, searchState, searchView, renderSearch } from './searchView';
const country = document.querySelector('.grid-items');

export function countryView(
  img,
  name,
  native,
  pop,
  reg,
  sub,
  cap,
  domain,
  currency,
  lang,
  border
) {
  view._parentElement.innerHTML = '';
  const markup = `
    <div class="country-view">
    <div>
      <button class="back">&larr; Back</button>
      <img src="${img}" alt="flag" />
    </div>
    <div class="country-details">
      <div>
        <h1 class="country-name">${name}</h1>
        <p class=" native"><span class="bold">Native Name:</span>${
          native ? Object.entries(native)[0][1].official : 'N/A'
        }</p>
        <p><span class="bold">Population:</span>${
          pop.toString().length > 6 ? pop / 1000000 + 'M' : pop
        }</p>
        <p><span class="bold">Region:</span>${reg}</p>
        <p><span class="bold">Sub Region:</span>${sub ? sub : 'N/A'}</p>
        <p><span class="bold">Capital:</span>${cap ? cap : 'N/A'}</p>
      </div>
      <div class="det-2">
        <p><span class="bold">Top Level Domain:</span>${domain[0]}</p>
        <p><span class="bold">Currencies:</span>${
          currency ? Object.entries(currency)[0][1].name : 'N/A'
        }</p>
        <p class="language"><span class="bold">Languages:</span>${
          lang ? Object.values(lang).join(', ') : 'N/A'
        }</p>
      </div>
      <div class="border-div">
      <span class="bold">Border Countries:</span>
        <div class="borders">
       
        </div>
      </div>
    </div>
  </div>`;

  country.style.display = 'flex';
  country.innerHTML = markup;
  pagBtn.style.display = 'none';
  filterOption.style.display = 'none';

  `<span class="border-country">${
    border ? borderCountries(border) : 'N/A'
  }</span>`;
}

function borderCountries(border) {
  const borderCountry = document.querySelector('.borders');
  border.forEach(border => {
    const newBorder = document.createElement('span');
    newBorder.className = 'border-country';
    const borderContent = document.createTextNode(border);

    newBorder.appendChild(borderContent);
    borderCountry.appendChild(newBorder);
  });
}

// Event listener on each country item
export function renderSelectedCountry(countryData, data, countriesPerPage) {
  const flagList = document.querySelectorAll('.list-div');
  flagList.forEach(list =>
    list.addEventListener('click', e => {
      favBtn.style.display = 'none';
      if (e.target.classList.contains('fa')) return;
      backBtn.style.display = 'none';

      const countryName =
        e.currentTarget.childNodes[3].firstElementChild.innerText;
      countryData.forEach(country => {
        if (countryName.toLowerCase() === country.name.common.toLowerCase()) {
          countryView(
            country.flags.png,
            country.name.common,
            country.name.nativeName,
            country.population,
            country.region,
            country.subregion,
            country.capital,
            country.tld,
            country.currencies,
            country.languages,
            country.borders
          );
          const back = document.querySelector('.back');
          const countryViews = document.querySelector('.country-view');

          // back button
          back.addEventListener('click', () => {
            favBtn.style.display = 'block';
            console.log('searchState', searchState.status);
            countryViews.innerHTML = '';
            countryViews.style.display = 'none';
            // getData(data);
            showSpecificPage(data, countriesPerPage);
            showPage(data, currPage, countriesPerPage);
            renderSelectedCountry(countryData, data, countriesPerPage);
            // regionFilter(data);
            filterCountries(data, filterOption.value);
            initFavorites(getLocalStorage());
            // favoriteCountryMark();

            filterOption.style.display = 'block';

            filterOption.style.display === 'block'
              ? (backBtn.style.display = 'none')
              : (backBtn.style.display = 'block');

            if (filterOption.value === 'default') {
              backBtn.style.display = 'block';
              pagBtn.style.display = 'block';
            } else {
              backBtn.style.display = 'block';
              searchState.status = false;
            }
            if (searchState.status && regionState.status) {
              renderSearch(data, searchState.text);
            }
          });
        }
      });
    })
  );
}

const belgium = {
  name: 'Belgium',
  topLevelDomain: ['.be'],
  alpha2Code: 'BE',
  alpha3Code: 'BEL',
  callingCodes: ['32'],
  capital: 'Brussels',
  altSpellings: [
    'BE',
    'België',
    'Belgie',
    'Belgien',
    'Belgique',
    'Kingdom of Belgium',
    'Koninkrijk België',
    'Royaume de Belgique',
    'Königreich Belgien',
  ],
  subregion: 'Western Europe',
  region: 'Europe',
  population: 11555997,
  latlng: [50.83333333, 4],
  demonym: 'Belgian',
  area: 30528,
  gini: 27.2,
  timezones: ['UTC+01:00'],
  borders: ['FRA', 'DEU', 'LUX', 'NLD'],
  nativeName: 'België',
  numericCode: '056',
  flags: {
    svg: 'https://flagcdn.com/be.svg',
    png: 'https://flagcdn.com/w320/be.png',
  },
  currencies: [
    {
      code: 'EUR',
      name: 'Euro',
      symbol: '€',
    },
  ],
  languages: [
    {
      iso639_1: 'nl',
      iso639_2: 'nld',
      name: 'Dutch',
      nativeName: 'Nederlands',
    },
    {
      iso639_1: 'fr',
      iso639_2: 'fra',
      name: 'French',
      nativeName: 'français',
    },
    {
      iso639_1: 'de',
      iso639_2: 'deu',
      name: 'German',
      nativeName: 'Deutsch',
    },
  ],
  translations: {
    br: 'Belgia',
    pt: 'Bélgica',
    nl: 'België',
    hr: 'Belgija',
    fa: 'بلژیک',
    de: 'Belgien',
    es: 'Bélgica',
    fr: 'Belgique',
    ja: 'ベルギー',
    it: 'Belgio',
    hu: 'Belgium',
  },
  flag: 'https://flagcdn.com/be.svg',
  regionalBlocs: [
    {
      acronym: 'EU',
      name: 'European Union',
    },
  ],
  cioc: 'BEL',
  independent: true,
};
