import { init, state } from '../model';

export default class View {
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
