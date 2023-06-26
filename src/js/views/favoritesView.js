const navigation = document.querySelector('.navigation');
export const favPopUp = navigation.firstElementChild.nextElementSibling;
let timeoutID;
//! User marks as favorite(They can do it from the home screen, after searching or from the filter)
export function favoriteCountryMark() {
  const favorite = document.querySelectorAll('.star');
  favorite.forEach(star =>
    star.addEventListener('click', e => {
      favPopUp.style.display = 'block';
      e.currentTarget.classList.toggle('fa-star-o');
      favoritePopup(star.previousElementSibling.innerHTML, e);
    })
  );
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
  }
  timeoutID = setTimeout(() => (favPopUp.style.display = 'none'), 2000);
}

//! Indicator status synced everywhere

//! User views the favorites using a button

//! User can unmark as favorite whenever he wants to

//! Local storage implementation
