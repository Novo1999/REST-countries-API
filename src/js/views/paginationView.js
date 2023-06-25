import { state } from '../model';
import { view } from './View';

export const pagBtn = document.querySelector('.pagination');
let btnValue = document.querySelectorAll('.btn-value');

export let currPage = 1;
let prevBtn = document.querySelector('.btn-prev');
prevBtn.style.visibility = 'hidden';
let totalPages;

export function pagination(data) {
  let countriesPerPage = 10;
  let totalItems = data.length;
  totalPages = Math.ceil(totalItems / countriesPerPage);
  pagBtn.addEventListener('click', e => {
    if (e.target.classList.contains('btn-prev') && currPage !== 1) {
      e.stopImmediatePropagation();
      showPreviousPage();
      updateButtons(e, btnValueArray[0], btnValueArray[1], btnValueArray[2]);
    }

    if (e.target.classList.contains('btn-next') && currPage < totalPages) {
      e.stopImmediatePropagation();
      showNextPage();
      updateButtons(e, btnValueArray[0], btnValueArray[1], btnValueArray[2]);
    }

    btnValue = document.querySelectorAll('.btn-value');
    prevBtn = document.querySelector('.btn-prev');
    const nextBtn = document.querySelector('.btn-next');

    if (currPage === totalPages) nextBtn.style.display = 'none';

    if (currPage === 1) prevBtn.style.visibility = 'hidden';

    showSpecificPage(data, countriesPerPage);
  });

  function showNextPage() {
    currPage++;
    if (currPage <= totalPages) {
      showPage(data, currPage, countriesPerPage);
    }
  }
  function showPreviousPage() {
    currPage--;
    if (currPage >= 1) {
      showPage(data, currPage, countriesPerPage);
    }
  }
}

export function showPage(data, currPage, countriesPerPage) {
  const start = (currPage - 1) * countriesPerPage;
  const end = start + countriesPerPage;
  view._parentElement.innerHTML = '';
  data
    .slice(start, end)
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

export function showSpecificPage(data, countriesPerPage) {
  btnValue.forEach(btn =>
    btn.addEventListener('click', e => {
      currPage = +e.target.innerHTML;
      showPage(data, currPage, countriesPerPage);
    })
  );
}

// Update pagination buttons
export let btnValueArray = [];

btnValue.forEach(value => btnValueArray.push(+value.innerHTML));

export function updateButtons(e, btn1, btn2, btn3) {
  if (e.target.classList.contains('btn-next')) {
    if (btn3 === totalPages) return;
    btn1++;
    btn2++;
    btn3++;
    btnValueArray = [btn1, btn2, btn3];
  }
  if (e.target.classList.contains('btn-prev')) {
    if (btn3 === 3) return;
    btn1--;
    btn2--;
    btn3--;
    btnValueArray = [btn1, btn2, btn3];
  }
  const markup = `
  <button class="btn-prev">&larr;</button>
  <button class="btn-value">${btn1}</button>
  <button class="btn-value">${btn2}</button>
  <button class="btn-value">${btn3}</button>
  <button class="btn-next">&rarr;</button>`;
  pagBtn.innerHTML = markup;
}
