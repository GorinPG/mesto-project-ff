const cardTemplate = document.querySelector('#card-template').content;

export function createCard(data, functions, currUserData) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.alt = `Фото - ${data["name"]}`;
  cardImage.src = data["link"];
  cardElement.querySelector('.card__title').textContent = data["name"];
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeAmount = cardElement.querySelector(".card__like-amount");
  const popupTypeImage = document.querySelector('.popup_type_image');

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
    })
    .catch((err) => console.log(err));
  });

  if (data.owner["_id"] === currUserData) {
    deleteButton.addEventListener('click', function () {
      functions.delete(data["_id"]).then(() => {
        cardElement.remove();
      })
      .catch((err) => console.log(err));
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