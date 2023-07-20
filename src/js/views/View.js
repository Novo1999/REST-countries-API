import { favPopUp } from './favoritesView';

export default class View {
  _parentElement = document.querySelector('.flag-items');

  renderCountries(img, name, population, region, capital) {
    const markup = `
      <ul class="flag-items">
        <li class="list-div">
            <img
                class="flag-img"
                src="${img}"
                alt="flag-image"
            />
            <div class="list-info">
            <div class="title">
            <h1 class="name">${name}</h1>
            <button class="fa fa-star-o fa-star star"></button>
            </div>
                <h4>Population: <span>${
                  population.toString().length > 6
                    ? population / 1000000 + 'M'
                    : population
                }</span></h4>
                <h4>Region: <span>${region}</span></h4>
                <h4>Capital: <span>${capital || 'N/A'}</span></h4>
            </div>
        </li>`;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
    countryResize();
    favPopUp.style.display = 'none';
  }

  renderError() {
    const markup = `
    <div class="error">
      <h1>Something went wrong ❗ Please try again 😟</h1>
    </div>`;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

export const view = new View();

// Toggle Dark Mode
const style1 = document.getElementById('styleLight');
const style2 = document.getElementById('styleDark');

function toggleDarkMode() {
  setTimeout(() => {
    if (style1.hasAttribute('disabled')) {
      style1.removeAttribute('disabled');
      style2.setAttribute('disabled', '');
    } else {
      style1.setAttribute('disabled', '');
      style2.removeAttribute('disabled');
    }
  }, 1);
}

// Dark mode emoji
const dark = document.querySelector('.dark');
const moon = document.querySelector('.moon');
dark.addEventListener('click', () => {
  toggleDarkMode();
  moon.innerHTML !== '🌞' ? (moon.innerHTML = '🌞') : (moon.innerHTML = '🌙');
});

// resizing the country divs (for those countries having large names)
function countryResize() {
  const list = document.querySelectorAll('.list-info');
  list.forEach(list => {
    const height = list.offsetHeight;
    if (height > 111) {
      list.closest('.list-div').style.height = 21 + 'rem';
    }
  });
}
