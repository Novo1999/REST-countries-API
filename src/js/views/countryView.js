import { view } from './View';

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
  lang
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
        <p><span class="bold">Native Name:</span>${
          Object.entries(native)[0][1].official
        }</p>
        <p><span class="bold">Population:</span>${pop}</p>
        <p><span class="bold">Region:</span>${reg}</p>
        <p><span class="bold">Sub Region:</span>${sub}</p>
        <p><span class="bold">Capital:</span>${cap}</p>
      </div>
      <div class="det-2">
        <p><span class="bold">Top Level Domain:</span>${domain}</p>
        <p><span class="bold">Currencies:</span>${
          Object.entries(currency)[0][1].name
        }</p>
        <p><span class="bold">Languages:</span>${Object.values(lang).join(
          ', '
        )}</p>
      </div>
      <div>
        <p class="borders">
          <span class="bold">Border Countries:</span>
          <span class="border-country">France</span>
        </p>
      </div>
    </div>
  </div>`;
  country.style.display = 'flex';
  country.innerHTML = markup;
}

// Event listener on each country item
export function renderSelectedCountry(countryData) {
  const flagList = document.querySelectorAll('.list-div');
  flagList.forEach(list =>
    list.addEventListener('click', e => {
      const countryName =
        e.currentTarget.childNodes[3].firstElementChild.innerText;
      if (countryName.toLowerCase() === 'libya') {
        countryData.forEach(country => {
          console.log(country);
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
            country.languages
          );
        });
      }
    })
  );
}
