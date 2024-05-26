// @todo: Темплейт карточки


// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import './index.css';
import {createCard} from './components/card.js';
import {openPopup, closePopup, closePopupOverlay} from './components/modal.js';
import {enableValidation, clearValidation} from './components/validation.js';
import {loadData, updateProfile, likeCardOnLine, updateProfileAvatar, addNewCardOnServer, deleteCardFromServer} from './components/api.js';

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
const formElementButton = formElement.querySelector('.popup__button');

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
const formAvatarButton = formElementPopupAvatar.querySelector('.popup__button');

const popupCloseAvatar = popupTypeAvatar.querySelector('.popup__close');
const formElementAvatar = formElementPopupAvatar.elements["avatar-lnk"];
const profileAddButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const formElementCard = popupNewCard.querySelector('.popup__form');
const popupNewCardButton = formElementCard.querySelector('.popup__button');

const formElementPlaceName = formElementCard.elements["place-name"];
const formElementPlaceLink = formElementCard.elements["link"];
const profileCloseButton = popupNewCard.querySelector('.popup__close');

export const popupTypeImage = document.querySelector('.popup_type_image');
const popupTypeImageCloseButton = popupTypeImage.querySelector('.popup__close');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');


function showUserProfileInfo(userDataFields, user) {
  userDataFields.name.textContent = user.name;
  userDataFields.about.textContent = user.about;
  userDataFields.avatar.style.backgroundImage = `url(${user.avatar})`;
}

let userDataFields = {
  name: profileTitle,
  about: profileDescription,
  avatar: profileAvatar
};

let myID;

loadData()
  .then(([user, cards]) => {
    showUserProfileInfo(userDataFields, user);
    showInitialCards(cards, user["_id"]);
    myID = user["_id"];
  })
  .catch((err) => console.log(err));

function showInitialCards(dataList, userData) {
  dataList.forEach((element) => {
    placesList.append(createCard(element, {
      delete: deleteCardFromServer,
      like: likeCardOnLine,
      viewing: openImagePopup
    },
    userData));
  });
}

enableValidation(validationConfig);

profileEditButton.addEventListener('click', function() {
  openPopup(popupTypeEdit);
  formElement.reset();
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
  formElementPopupAvatar.reset();
  clearValidation(popupTypeAvatar, validationConfig);
});

popupTypeAvatar.addEventListener('click', closePopupOverlay);

popupCloseAvatar.addEventListener('click', function() {
  closePopup(popupTypeAvatar);
});

function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  formElementButton.textContent = 'Сохранение...';
  updateProfile(
    {
      name: formElementName.value,
      about: formElementDescription.value,
    },
    userDataFields)
    .then((user) => {
      showUserProfileInfo(userDataFields, user);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      formElementButton.textContent = 'Сохранить';
      closePopup(popupTypeEdit);
    })
}

formElement.addEventListener('submit', handleFormSubmitProfile);

function handleFormSubmitAvatar(evt) {
  evt.preventDefault();
  formAvatarButton.textContent = 'Сохранение...';
  updateProfileAvatar(
    {
      avatar: formElementAvatar.value,
    },
    userDataFields)
    .then((user) => {
      showUserProfileInfo(userDataFields, user);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      formAvatarButton.textContent = 'Сохранить';
      closePopup(popupTypeAvatar);
    })
}

formElementPopupAvatar.addEventListener('submit', handleFormSubmitAvatar);

profileAddButton.addEventListener('click', function() {
  openPopup(popupNewCard);
  formElementCard.reset();
  clearValidation(formElementCard, validationConfig);
});

formElementCard.addEventListener('submit', handleFormSubmitAddCard);

function handleFormSubmitAddCard(evt) {
  evt.preventDefault();
  popupNewCardButton.textContent = 'Сохранение...';
  const element = {
    name: formElementPlaceName.value,
    link: formElementPlaceLink.value,
  };
  addNewCardOnServer(element).then((card) => {
    placesList.prepend(createCard(
      card,
      {
        delete: deleteCardFromServer,
        like: likeCardOnLine,
        viewing: openImagePopup
      },
  myID));
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupNewCardButton.textContent = 'Сохранить';
      closePopup(popupNewCard);
    });  
}

popupNewCard.addEventListener('click', closePopupOverlay);

profileCloseButton.addEventListener('click', function() {
  closePopup(popupNewCard);
});

function openImagePopup(element, data) {
  openPopup(element);
  popupImage.alt = `Фото - ${data["name"]}`;
  popupImage.src = data["link"];
  popupCaption.textContent = data["name"];
}

popupTypeImage.addEventListener('click', closePopupOverlay);

popupTypeImageCloseButton.addEventListener('click', function () {
  closePopup(popupTypeImage);
});