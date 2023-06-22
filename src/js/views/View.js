import { init, state } from '../model';

class View {
  _parentElement = document.querySelector('.flag-items');

  renderCountries(img, name, population, region, capital) {
    const markup = `
      <ul class="flag-items">
        <li>
            <img
                class="flag-img"
                src="${img}"
                alt="flag-image"
            />
            <div class="list-info">
                <h1>${name}</h1>
                <h4>Population: <span>${population}</span></h4>
                <h4>Region: <span>${region}</span></h4>
                <h4>Capital: <span>${capital}</span></h4>
            </div>
        </li>`;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
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
  }, 100);
}

const dark = document.querySelector('.dark');

dark.addEventListener('click', toggleDarkMode);
