const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-13",
  headers: {
    authorization: "88a39a64-894f-40a9-9e1e-eac3a5db0895",
    "Content-Type": "application/json"
  },
}

function showUserProfileInfo(userDataFields, user) {
  userDataFields.name.textContent = user.name;
  userDataFields.about.textContent = user.about;
  userDataFields.avatar.style.backgroundImage = `url(${user.avatar})`;
}

const getUser = () => {
  return fetch(`${config.baseUrl}/users/me/`, {
    method: "GET",
    headers: config.headers
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`${res.status}`);
    })
    .then((result) => {
      return result;
    });
}

const getCards = () => {
  return fetch(`${config.baseUrl}/cards/`, {
    method: "GET",
    headers: config.headers
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`${res.status}`);
    })
    .then((result) => {
      return result;
    });
}

export const loadData = (userDataFields, renderFunction) => {
  return Promise.all([
    getUser(),
    getCards()
  ])
    .then((res) => {
      let user = res[0];
      let cards = res[1];
      showUserProfileInfo(userDataFields, user);
      renderFunction(cards, user["_id"]);
      return user;
    });
}

export const updateProfile = (manualProfileData, userDataFields) => {
  return fetch(`${config.baseUrl}/users/me/`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: manualProfileData.name,
      about: manualProfileData.about,
    }),
  })
    .then((res) => {
      res.json()
    })
    .then((user) => {
      showUserProfileInfo(userDataFields, user);
    });
}

export const likeCardOnLine = (cardInfo, isActive) => {
  if (!isActive) {
    return fetch(`${config.baseUrl}/cards/likes/${cardInfo}`, {
      method: "PUT",
      headers: config.headers
    })
      .then((res) => {
        res.json()
      })
      .then((response) => {
        return response;
      });
  } else {
    return fetch(`${config.baseUrl}/cards/likes/${cardInfo}`, {
      method: "DELETE",
      headers: config.headers
    })
      .then((res) => {
        res.json()
      })
      .then((response) => {
        return response;
      });
    }
}

export const updateProfileAvatar = (manualProfileData, userDataFields) => {
  return fetch(`${config.baseUrl}/users/me/avatar/`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: manualProfileData.avatar,
    }),
  })
    .then((res) => {
      res.json()
    })
    .then((user) => {
      showUserProfileInfo(userDataFields, user);
    });
}

export const addNewCardOnServer = (newCardInformation, createCardFunction, cardOperationsFunctions, userData) => {
  return fetch(`${config.baseUrl}/users/me/cards/`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: newCardInformation.name,
      link: newCardInformation.link,
    }),
  })
    .then((res) => {
      res.json()
    })
    .then((card) => {
      return createCardFunction(card, cardOperationsFunctions, userData);
    });
}

export const deleteCardFromServer = (cardInfo) => {
  return fetch(`${config.baseUrl}/cards/${cardInfo}`, {
    method: "DELETE",
    headers: config.headers
  })
    .then((res) => {
      res.json()
    })
    .then((response) => {
      return response;
    });
}