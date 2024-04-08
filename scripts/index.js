// @todo: Темплейт карточки


// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const cardTemplate = document.querySelector('#card-template').content;
const content = document.querySelector('.content');
const placesList = document.querySelector('.places__list');

function createCard(element, remove) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    card.querySelector('.card__title').textContent = element.name;
    const cardImage = card.querySelector('.card__image');
    cardImage.alt = element.name;
    cardImage.src = element.link;
    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', remove)
    return card;
};

const cardDelete = function (event) {
    const card = event.target.closest('.card');
    card.remove();
};

function showInitialCards() {
    initialCards.forEach (function (cardTitle) {
      placesList.append(createCard(cardTitle, cardDelete));
    });
  }
  
  showInitialCards();