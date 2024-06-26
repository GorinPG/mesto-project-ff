export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  popup.classList.add('popup_is-animated');
  //popup.addEventListener('click', closePopupOverlay);
  document.addEventListener('keydown', closePopupEsc);
}

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  popup.classList.remove('popup_is-animated');
  //popup.removeEventListener('click', closePopupOverlay);
  document.removeEventListener('keydown', closePopupEsc);
}

export function closePopupOverlay(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
    closePopup(evt.target);
  }
}

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpen = document.querySelector('.popup_is-opened');
    closePopup(popupOpen);
  }
}