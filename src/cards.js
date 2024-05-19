import {popupTypeImage} from './index.js';

const cardTemplate = document.querySelector('#card-template').content;

export function createCard(data, functions) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  cardImage.alt = data["name"];
  cardImage.src = data["link"];
  card.querySelector('.card__title').textContent = data["name"];
  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function() {
    functions.delete(card);
  });
  const likeButton = card.querySelector('.card__like-button');
  likeButton.addEventListener('click', function (evt) {
    functions.like(likeButton);
  });
  cardImage.addEventListener("click", function() {
    functions.viewing(popupTypeImage, data);
  });
  return card;
};

export function deleteCard(card) {
  card.remove();
}

export function likeCard(button) {
  button.classList.toggle("card__like-button_is-active");
}

const arkhyz = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg", import.meta.url);
const chelyabinskOblast = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg", import.meta.url);
const ivanovo = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg", import.meta.url);
const kamchatka = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg", import.meta.url);
const kholmogorskyRayon = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg", import.meta.url);
const baikal = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg", import.meta.url);

export const initialCards = [
  {
    name: "Архыз",
    link: arkhyz,
  },
  {
    name: "Челябинская область",
    link: chelyabinskOblast,
  },
  {
    name: "Иваново",
    link: ivanovo,
  },
  {
    name: "Камчатка",
    link: kamchatka,
  },
  {
    name: "Холмогорский район",
    link: kholmogorskyRayon,
  },
  {
    name: "Байкал",
    link: baikal,
  }
];