import {closePopup, closePopupOverlay} from './modal.js';

const cardTemplate = document.querySelector('#card-template').content;
const popupTypeImage = document.querySelector('.popup_type_image');
const popupTypeImageCloseButton = popupTypeImage.querySelector('.popup__close');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

export function createCard(data, functions, currUserData) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.alt = `Фото - ${data["name"]}`;
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
}

function showLikesInformation(data, currUserData, likeButton, likeAmount) {
  if (
    data["likes"].some((value) => {
      return value["_id"] === currUserData;
    })
  ) {
    likeButton.classList.add('card__like-button_is-active');
    likeAmount.textContent = data["likes"].length;
  } else {
    likeButton.classList.remove('card__like-button_is-active');
    likeAmount.textContent = data["likes"].length;
  }
}

export function viewingImage(element, data) {
  openPopup(element);
  popupImage.alt = `Фото - ${data["name"]}`;
  popupImage.src = data["link"];
  popupCaption.textContent = data["name"];
}

popupTypeImage.addEventListener('click', closePopupOverlay);

popupTypeImageCloseButton.addEventListener('click', function () {
  closePopup(popupTypeImage);
});