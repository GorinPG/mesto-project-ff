import {popupTypeImage} from './index.js';

const cardTemplate = document.querySelector('#card-template').content;

export function createCard(data, functions, currUserData) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.alt = data["name"];
  cardImage.src = data["link"];
  cardElement.querySelector('.card__title').textContent = data["name"];
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeAmount = cardElement.querySelector(".card__like-amount");

  showLikesInformation(data, currUserData, likeButton, likeAmount);

  cardImage.addEventListener("click", function() {
    functions.viewing(popupTypeImage, data);
  });

  likeButton.addEventListener('click', function() {
    functions.like(
        data["_id"],
        likeButton.classList.contains("card__like-button_is-active")
    )
    .then((response) => {
      showLikesInformation(response, currUserData, likeButton, likeAmount);
    });
  });

  if (data.owner["_id"] === currUserData) {
    deleteButton.addEventListener('click', function () {
      functions.delete(data["_id"]).then(() => {
        cardElement.remove();
      });
    });
  } else {
    deleteButton.style.visibility = "hidden";
  }
  return cardElement;
};

function showLikesInformation(data, currUserData, likeButton, likeAmount) {
  if (
    data["likes"].some((value) => {
      return value["_id"] === currUserData;
    })
  ) {
    likeButton.classList.add("card__like-button_is-active");
    likeAmount.textContent = data["likes"].length;
  } else {
    likeButton.classList.remove("card__like-button_is-active");
    likeAmount.textContent = data["likes"].length;
  }
}

const arkhyz = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg", import.meta.url);
const chelyabinskOblast = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg", import.meta.url);
const ivanovo = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg", import.meta.url);
const kamchatka = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg", import.meta.url);
const kholmogorskyRayon = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg", import.meta.url);
const baikal = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg", import.meta.url);

export const OldInitialCards = [
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