// @todo: Темплейт карточки


// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import './index.css';
import {placesList, createCard, initialCards} from './cards.js';
import {openPopup, closePopup} from './modal.js';

function showInitialCards() {
    initialCards.forEach (function ({name, link}) {
      placesList.append(createCard(link, name));
    });
  }

showInitialCards();

const popupTypeEdit = document.querySelector('.popup_type_edit');
const formElement = popupTypeEdit.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popupTypeEdit.querySelector('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function handleFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const descValue = jobInput.value;
  profileTitle.textContent = nameValue;
  profileDescription.textContent = descValue;
  closePopup(popupTypeEdit);
}

function openEditPopup() {
nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;
openPopup(popupTypeEdit);
}

profileEditButton.addEventListener('click', openEditPopup);
popupCloseButton.addEventListener('click', function () {
closePopup(popupTypeEdit);
});  
formElement.addEventListener('submit', handleFormSubmit);

//

const popupNewCard = document.querySelector('.popup_type_new-card');
const profileAddButton = document.querySelector('.profile__add-button');
const profileCloseButton = popupNewCard.querySelector('.popup__close');
const formElementCard = popupNewCard.querySelector('.popup__form');
const inputTypeName = document.querySelector('.popup__input_type_card-name');
const inputTypeUrl = document.querySelector('.popup__input_type_url');

function handleAddCard (evt) {
  evt.preventDefault();
  const inputTypeNameValue = inputTypeName.value;
  const inputTypeUrlValue = inputTypeUrl.value;
  createNewCard(inputTypeNameValue, inputTypeUrlValue);
  formElementCard.reset();
  closePopup(popupNewCard);
}

profileAddButton.addEventListener('click', function () {
  openPopup(popupNewCard);
});

profileCloseButton.addEventListener('click', function () {
  closePopup(popupNewCard);
});

formElementCard.addEventListener('submit', handleAddCard);

function createNewCard (inputTypeNameValue, inputTypeUrlValue) {
  const newCard = createCard(inputTypeUrlValue, inputTypeNameValue);
  elements.prepend(newCard);
}

initialCards.forEach(function (card) {
  createNewCard(card.name, card.link);
})

//

export const popupTypeImage = document.querySelector('.popup_type_image');
const popupTypeImageCloseButton = popupTypeImage.querySelector('.popup__close');

export const popupImage = document.querySelector('.popup__image');
export const popupCaption = document.querySelector('.popup__caption');

popupTypeImageCloseButton.addEventListener('click', function () {
  closePopup(popupTypeImage);
});