const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-13",
  headers: {
    authorization: "88a39a64-894f-40a9-9e1e-eac3a5db0895",
    "Content-Type": "application/json"
  },
}

export function showUserProfileInfo(userDataFields, user) {
  userDataFields.name.textContent = user.name;
  userDataFields.about.textContent = user.about;
  userDataFields.avatar.style.backgroundImage = `url(${user.avatar})`;
}

const checkRequest = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers
  }).then((res) => checkRequest(res));
}

const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers
  }).then((res) => checkRequest(res));
}

export const loadData = () => {
  return Promise.all([getUser(), getCards()]);
}

//export const loadData = (userDataFields, renderFunction) => {
//  return Promise.all([getUser(), getCards()])
//    .then((res) => {
//      let user = res[0];
//      let cards = res[1];
//      showUserProfileInfo(userDataFields, user);
//      renderFunction(cards, user["_id"]);
//      return user;
//    });
//}

export const updateProfile = (manualProfileData, userDataFields) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: manualProfileData.name,
      about: manualProfileData.about,
    }),
  }).then((res) => checkRequest(res))
    .then((user) => {
      showUserProfileInfo(userDataFields, user);
    });
}

export const likeCardOnLine = (cardInfo, isActive) => {
  if (!isActive) {
    return fetch(`${config.baseUrl}/cards/likes/${cardInfo}`, {
      method: "PUT",
      headers: config.headers
    }).then((res) => checkRequest(res));
  } else {
    return fetch(`${config.baseUrl}/cards/likes/${cardInfo}`, {
      method: "DELETE",
      headers: config.headers
    }).then((res) => checkRequest(res));
    }
}

export const updateProfileAvatar = (manualProfileData, userDataFields) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: manualProfileData.avatar,
    }),
  }).then((res) => checkRequest(res))
    .then((user) => {
      showUserProfileInfo(userDataFields, user);
    });
}

export const addNewCardOnServer = (newCardInformation, createCardFunction, cardOperationsFunctions, userData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: newCardInformation.name,
      link: newCardInformation.link
    })
  }).then((res) => checkRequest(res))
    .then((card) => {
      return createCardFunction(card, cardOperationsFunctions, userData);
    });
}

export const deleteCardFromServer = (cardInfo) => {
  return fetch(`${config.baseUrl}/cards/${cardInfo}`, {
    method: "DELETE",
    headers: config.headers
  }).then((res) => checkRequest(res));
}