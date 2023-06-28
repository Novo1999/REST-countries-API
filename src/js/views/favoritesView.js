const navigation = document.querySelector('.navigation');
export const favPopUp = navigation.firstElementChild.nextElementSibling;
let timeoutID;
export let favoriteState = [];

//! User marks as favorite(They can do it from the home screen, after searching or from the filtered countries)

export function favoriteCountryMark() {
  const favorite = document.querySelectorAll('.star');

  favorite.forEach(star => {
    star.addEventListener('click', e => {
      favPopUp.style.display = 'block';
      star.classList.toggle('fa-star-o');
      favoriteState.push(e.currentTarget.previousElementSibling.innerHTML);
      favoritePopup(star.previousElementSibling.innerHTML, e);
    });
  });
}

//! Popup - Added to favorites with the country name

function favoritePopup(country, e) {
  clearTimeout(timeoutID);
  const markup1 = `<h4>${country} marked as favorite</h4>`;
  const markup2 = `<h4>${country} unmarked from favorite</h4>`;

  if (e.currentTarget.classList.contains('fa-star')) {
    favPopUp.innerHTML = markup1;
    addToLocalStorage(country);
  }
  if (e.currentTarget.classList.contains('fa-star-o')) {
    favPopUp.innerHTML = markup2;
    const itemIndex = favoriteState.indexOf(
      e.currentTarget.previousElementSibling.innerHTML
    );
    favoriteState.splice(itemIndex);
    deleteFromLocalStorage(country);
  }
  timeoutID = setTimeout(() => (favPopUp.style.display = 'none'), 2000);
}

//! Indicator status synced everywhere

export function initFavorites(state) {
  const favorite = document.querySelectorAll('.star');
  state.forEach(fav => {
    favorite.forEach(favItem => {
      if (favItem.previousElementSibling.innerHTML === fav)
        favItem.classList.remove('fa-star-o');
    });
  });
}

//! Local storage implementation

// Logic
// ---------
// get
function addToLocalStorage(item) {
  let itemsArr = getLocalStorage();
  itemsArr.push(item);
  localStorage.setItem('country', JSON.stringify(itemsArr));
}

function deleteFromLocalStorage(item) {
  let itemsArr = getLocalStorage();
  itemsArr = itemsArr.filter(value => {
    if (value !== item) return item;
  });
  localStorage.setItem('country', JSON.stringify(itemsArr));
}

function getLocalStorage() {
  return localStorage.getItem('country')
    ? JSON.parse(localStorage.getItem('country'))
    : [];
}

export function renderLocalStorageFavorites() {
  let items = getLocalStorage();
  favoriteState = items;
  initFavorites(items);
}

// All favorites are pushed into array

// Array set as local storage

// If favorite unmarked, array item removed and set as local storage again

//

//! User views the favorites using a button
