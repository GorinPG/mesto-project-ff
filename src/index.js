// @todo: Темплейт карточки


// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import './index.css';
import {createCard, deleteCard} from './cards.js';
import {openPopup, closePopup, closePopupOverlay} from './modal.js';
import {enableValidation, clearValidation} from './validation.js';
import {loadData, updateProfile, likeCardOnLine, updateProfileAvatar, addNewCardOnServer, deleteCardFromServer} from './api.js';

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const placesList = document.querySelector('.places__list');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const formElement = popupTypeEdit.querySelector('.popup__form');
const formElementName = formElement.elements["name"];
const formElementDescription = formElement.elements["description"];
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popupTypeEdit.querySelector('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
const imageEditButton = document.querySelector('.profile__edit-image');
const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const formElementPopupAvatar = popupTypeAvatar.querySelector('.popup__form');
const popupCloseAvatar = popupTypeAvatar.querySelector('.popup__close');
const formElementAvatar = formElementPopupAvatar.elements["avatar-lnk"];
const profileAddButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const formElementCard = popupNewCard.querySelector('.popup__form');
const formElementPlaceName = formElementCard.elements["place-name"];
const formElementPlaceLink = formElementCard.elements["link"];
const profileCloseButton = popupNewCard.querySelector('.popup__close');

let userDataFields = {
  name: profileTitle,
  about: profileDescription,
  avatar: profileAvatar
};

let myID;

loadData(userDataFields, showInitialCards)
  .then((result) => {
    myID = result["_id"];
  })

function showInitialCards(dataList, userData) {
  dataList.forEach(function(element) {
    placesList.append(createCard(element, {
      delete: deleteCardFromServer,
      like: likeCardOnLine,
      viewing: viewingImage
    },
    userData));
  });
}

enableValidation(validationConfig);

profileEditButton.addEventListener('click', function() {
  openPopup(popupTypeEdit);
  formElementName.value = profileTitle.textContent;
  formElementDescription.value = profileDescription.textContent;
  clearValidation(formElement, validationConfig);

});

popupTypeEdit.addEventListener('click', closePopupOverlay);

popupCloseButton.addEventListener('click', function() {
  closePopup(popupTypeEdit);
});

imageEditButton.addEventListener('click', function() {
  openPopup(popupTypeAvatar);
  clearValidation(popupTypeAvatar, validationConfig);
});

popupTypeAvatar.addEventListener('click', closePopupOverlay);

popupCloseAvatar.addEventListener('click', function() {
  closePopup(popupTypeAvatar);
});

function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  updateProfile(
    {
      name: formElementName.value,
      about: formElementDescription.value,
    },
    userDataFields
  );
  closePopup(popupTypeEdit);
}

formElementDescription.addEventListener('submit', handleFormSubmitProfile);

function handleFormSubmitAvatar(evt) {
  evt.preventDefault();
  updateProfileAvatar(
    {
      avatar: formElementAvatar.value,
    },
    userDataFields
  );
  closePopup(popupTypeAvatar);
}

formElementPopupAvatar.addEventListener('submit', handleFormSubmitAvatar);

profileAddButton.addEventListener('click', function() {
  openPopup(popupNewCard);
  clearValidation(formElementCard, validationConfig);
});

formElementCard.addEventListener('submit', handleFormSubmitAddCard);

function handleFormSubmitAddCard(evt) {
  evt.preventDefault();
  let element = {
    name: formElementPlaceName.value,
    link: formElementPlaceLink.value,
  };
  addNewCardOnServer(element, createCard, {
    delete: deleteCardFromServer,
    like: likeCardOnLine,
    viewing: viewingImage
  },
  myID)
    .then((card) => {
      placesList.prepend(card)
    });
  closePopup(popupNewCard);
}

popupNewCard.addEventListener('click', closePopupOverlay);

profileCloseButton.addEventListener('click', function() {
  closePopup(popupNewCard);
});

export const popupTypeImage = document.querySelector('.popup_type_image');
const popupTypeImageCloseButton = popupTypeImage.querySelector('.popup__close');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

function viewingImage(element, data) {
  openPopup(element);
  popupImage.src = data["link"];
  popupImage.alt = data["name"];
  popupCaption.textContent = data["name"];
}

popupTypeImage.addEventListener('click', closePopupOverlay);

popupTypeImageCloseButton.addEventListener('click', function () {
  closePopup(popupTypeImage);
});

