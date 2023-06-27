const navigation = document.querySelector('.navigation');
export const favPopUp = navigation.firstElementChild.nextElementSibling;
let timeoutID;
export const favoriteState = [];

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
  }
  if (e.currentTarget.classList.contains('fa-star-o')) {
    favPopUp.innerHTML = markup2;
    const itemIndex = favoriteState.indexOf(
      e.currentTarget.previousElementSibling.innerHTML
    );
    favoriteState.splice(itemIndex);
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

function getLocalStorage() {
  return localStorage.getItem('country')
    ? JSON.parse(localStorage.getItem('country'))
    : [];
}

// All favorites are pushed into array

// Array set as local storage

// If favorite unmarked, array item removed and set as local storage again

//

//! User views the favorites using a button
