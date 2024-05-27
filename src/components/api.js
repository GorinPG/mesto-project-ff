const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-13",
  headers: {
    authorization: "88a39a64-894f-40a9-9e1e-eac3a5db0895",
    "Content-Type": "application/json"
  },
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
  }).then((res) => {
    return checkRequest(res)
  });
}

const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers
  }).then((res) => {
    return checkRequest(res)
  });
}

export const loadData = () => {
  return Promise.all([getUser(), getCards()]);
}

export const updateProfile = (manualProfileData) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: manualProfileData.name,
      about: manualProfileData.about,
    }),
  }).then((res) => {
    return checkRequest(res)
  });
}

export const likeCardOnLine = (cardInfo, isActive) => {
  if (!isActive) {
    return fetch(`${config.baseUrl}/cards/likes/${cardInfo}`, {
      method: "PUT",
      headers: config.headers
    }).then((res) => {
      return checkRequest(res)
    });
  } else {
    return fetch(`${config.baseUrl}/cards/likes/${cardInfo}`, {
      method: "DELETE",
      headers: config.headers
    }).then((res) => {
      return checkRequest(res)
    });
    }
}

export const updateProfileAvatar = (manualProfileData) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: manualProfileData.avatar,
    })
  }).then((res) => {
    return checkRequest(res);
  });
}

export const addNewCardOnServer = (newCardInformation) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: newCardInformation.name,
      link: newCardInformation.link
    })
  }).then((res) => {
    return checkRequest(res)
  });
}

export const deleteCardFromServer = (cardInfo) => {
  return fetch(`${config.baseUrl}/cards/${cardInfo}`, {
    method: "DELETE",
    headers: config.headers
  }).then((res) => {
    return checkRequest(res)
  });
}