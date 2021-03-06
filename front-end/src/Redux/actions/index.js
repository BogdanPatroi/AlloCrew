// imports
import axios from 'axios';


// vars
const token = () => localStorage.getItem('token');
const userId = () => {
  if (token) {
    return JSON.parse(atob(token().split('.')[1])).id;
  }
};

// Actions name
export const LOADED = 'LOADED';
export const SET_USER_PARAMS = 'SET_USER_PARAMS';
export const LOGIN_OK = 'LOGIN_OK';
export const LOGOUT = 'LOGOUT';
export const UPDATE_ANNOUNCEMENT = 'UPDATE_ANNOUNCEMENT';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_PROFILES = 'UPDATE_PROFILES';
export const INPUT_LOGIN_CHANGE = 'INPUT_LOGIN_CHANGE';
export const INPUT_ANNOUNCEMENT_CHANGE = 'INPUT_ANNOUNCEMENT_CHANGE';
export const INPUT_EDITANNOUNCEMENT_CHANGE = 'INPUT_EDITANNOUNCEMENT_CHANGE';
export const INPUT_PROFILE_CHANGE = 'INPUT_PROFILE_CHANGE';
export const INPUT_EDITPROFILE_CHANGE = 'INPUT_EDITPROFILE_CHANGE';
export const RESET_DATA = 'RESET_DATA';
export const INPUT_CREATE_ANNOUNCEMENT = 'INPUT_CREATE_ANNOUNCEMENT';
export const NOTIFICATION = 'NOTIFICATION';
export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const UPDATE_DISCUSSION = 'UPDATE_DISCUSSION';
export const INPUT_MESSAGE = 'INPUT_MESSAGE';
export const REDIRECT = 'REDIRECT';
export const SOCKET = 'SOCKET';
export const RESET_SOCKET = 'RESET_SOCKET';
export const MESSAGE = 'MESSAGE';


// Reducer Actions

export const resetSocket = () => ({
  type: RESET_SOCKET,
});


export const redirect = (payload) => ({
  type: REDIRECT,
  payload,
});

export const message = (payload) => ({
  type: MESSAGE,
  payload,
});

export const setUserParams = (payload) => ({
  type: SET_USER_PARAMS,
  payload,
});

export const resetData = () => ({
  type: RESET_DATA,
});

export const notification = (payload) => ({
  type: NOTIFICATION,
  payload,
});

export const clearNotification = (payload) => ({
  type: CLEAR_NOTIFICATION,
  payload,
});

export const registerSuccess = () => ({
  type: REGISTER_SUCCESS,
});

export const loginOk = (payload) => ({
  type: LOGIN_OK,
  payload,
});
export const logout = () => ({
  type: LOGOUT,
});

export const updateAnnouncement = (payload) => ({
  type: UPDATE_ANNOUNCEMENT,
  payload,
});
export const updateUser = (payload) => ({
  type: UPDATE_USER,
  payload,
});

export const updateProfile = (payload) => ({
  type: UPDATE_PROFILE,
  payload,
});
export const updateProfiles = (payload) => ({
  type: UPDATE_PROFILES,
  payload,
});

export const inputLoginChange = (payload) => ({
  type: INPUT_LOGIN_CHANGE,
  payload,
});

export const inputAnnouncementChange = (payload) => ({
  type: INPUT_ANNOUNCEMENT_CHANGE,
  payload,
});

export const inputCreateAnnouncement = (payload) => ({
  type: INPUT_CREATE_ANNOUNCEMENT,
  payload,
});

export const inputProfileChange = (payload) => ({
  type: INPUT_PROFILE_CHANGE,
  payload,
});

export const inputMessage = (payload) => ({
  type: INPUT_MESSAGE,
  payload,
});

export const updateDiscussion = (payload) => ({
  type: UPDATE_DISCUSSION,
  payload,
});

export const dispatchSocket = (payload) => ({
  type: SOCKET,
  payload,
});

// Middleware Actions

export const register = () => (dispatch, getState) => {
  if (
    getState().login.data.username === getState().login.data._username
    && getState().login.data.password === getState().login.data._password
  ) {
    axios({
      method: 'post',
      url: 'http://3.86.88.23/register',
      data: {
        email: getState().login.data.username,
        password: getState().login.data.password,
      },
    })
      .then(() => {
        dispatch(notification('Votre compte ?? bien ??t?? cr????!'));
        setTimeout(() => {
          dispatch(registerSuccess());
        }, 2000);
      })
      .catch(() => {
        dispatch(notification('Veuillez saisir une adresse mail valide'));
      });
  }
  else {
    dispatch(notification('Champs non identiques'));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 2000);
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(logout());
};

export const checkAuth = () => (dispatch) => {
  axios({
    headers: {
      Authorization: `bearer ${token()}`,
    },
    method: 'post',
    url: 'http://3.86.88.23/api/token_check',
  })
    .then(() => {
      axios({
        headers: {
          Authorization: `bearer ${token()}`,
        },
        method: 'get',
        url: `http://3.86.88.23/api/users/${userId()}`,
      })
        .then((res) => {
          dispatch(message('')); dispatch(loginOk(res.data));
        });
    })
    .catch((err) => {
      console.log(err);
      dispatch(logoutUser());
      dispatch(message('Erreur authentification, veuillez vous reconnecter'));
    });
};


export const logUser = () => (dispatch, getState) => {
  dispatch(message('Connexion...'));
  axios({
    method: 'post',
    url: 'http://3.86.88.23/api/login_check',
    data: getState().login.data,
  })
    .then((res) => {
      const _token = res.data.token;
      localStorage.setItem('token', _token);
      dispatch(checkAuth());
    })
    .catch((err) => {
      console.log(err.response);
      dispatch(logoutUser());
      dispatch(message('Utilisateur ou mot de passe incorrect'));
    });
};


// For finding one announcement with id
export const fetchAnnouncement = (id, key) => (dispatch) => {
  axios({
    headers: {
      Authorization: `bearer ${token()}`,
    },
    method: 'get',
    url: `http://3.86.88.23/api/announcements/${id}`,
  })
    .then((res) => {
      const announcementData = res.data;
      dispatch(updateAnnouncement({ [key]: announcementData[0] }));
    });
};

// to re-fetch data if necessary
export const checkData = (id) => (dispatch, getState) => {
  if (!getState().data.announcements.find((one) => one.id == id)) {
    dispatch(fetchAnnouncement(id, 'announcement'));
  }
};

// For finding one profile with id
export const fetchProfile = (id) => (dispatch, getState) => {
  axios({
    headers: {
      Authorization: `bearer ${token()}`,
    },
    method: 'get',
    url: id ? `http://3.86.88.23/api/users/${id}` : `http://3.86.88.23/api/users/${getState().login.userId}`,
  })
    .then((res) => {
      res.data.id == getState().login.userId
        ? dispatch(updateUser(res.data))
        : dispatch(updateProfile(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};


// For finding an announcement List
export const fetchAnnouncementList = () => (dispatch) => {
  axios({
    headers: {
      Authorization: `bearer ${token()}`,
    },
    method: 'get',
    url: 'http://3.86.88.23/api/announcements/',
  })
    .then((res) => {
      const announcementListData = res.data;
      dispatch(resetData());
      dispatch(updateAnnouncement({ announcements: announcementListData }));
    })
    .catch((err) => {
      if (err.response.status == 401) {
        dispatch(logout());
      }
    });
};

// For finding a profile List
export const fetchProfileList = () => (dispatch) => {
  axios({
    headers: {
      Authorization: `bearer ${token()}`,
    },
    method: 'get',
    url: 'http://3.86.88.23/api/users/',
  })
    .then((res) => {
      const profilesListData = res.data;
      dispatch(resetData());
      dispatch(updateProfiles({ profiles: profilesListData }));
    });
};

export const patchEditProfile = (id) => (dispatch, getState) => {
  const { id, ...data } = getState().login.userInfo;
  axios({
    headers: {
      Authorization: `bearer ${token()}`,
    },
    method: 'patch',
    url: `http://3.86.88.23/api/users/${id}`,
    data,
  })
    .then(() => {
      dispatch(redirect(true));
    })
    .catch((err) => console.log(err));
};

export const patchEditAnnouncement = (id) => (dispatch, getState) => {
  const {
    id, createdAt, updatedAt, user, dateStart: date_start, dateEnd: date_end, ...data
  } = getState().data.create;
  axios({
    headers: {
      Authorization: `bearer ${token()}`,
    },
    method: 'patch',
    url: `http://3.86.88.23/api/announcements/${id}`,
    data: {
      date_end,
      date_start,
      ...data,
    },
  })
    .then(() => {
      dispatch(redirect('announcement'));
    })
    .catch((err) => console.log(err.response));
};

export const postCreateAnnouncement = () => (dispatch, getState) => {
  const { user, ...data } = getState().data.create;
  axios({
    headers: {
      Authorization: `bearer ${token()}`,
    },
    method: 'post',
    url: 'http://3.86.88.23/api/announcements/',
    data: {
      user: getState().login.userId,
      ...data,
    },
  })
    .then(() => {
      dispatch(redirect('announcement'));
    })
    .catch((err) => console.log(err.response));
};


// Middleware pour passer l'id ?? mapDispatchToProps
export const passId = (func) => (dispatch, getState) => {
  dispatch(func(getState().login.userId));
};


export const fetchDiscussionList = () => (dispatch) => {
  axios({
    headers: {
      Authorization: `bearer ${token()}`,
    },
    method: 'get',
    url: `http://3.86.88.23/api/discussions/${userId()}`,
  })
    .then((res) => {
      const discussionListData = res.data;
      dispatch(updateDiscussion(discussionListData));
    })
    .catch((err) => console.log('fetchDiscussionList', err));
};


export const postMessage = (id) => (dispatch, getState) => {
  axios({
    headers: {
      Authorization: `bearer ${token()}`,
    },
    method: 'post',
    url: 'http://3.86.88.23/api/messages/',
    data:
    {
      discussion: id,
      user: getState().login.userId,
      content: getState().messagerie.message.content,
    },
  })
    .catch((err) => console.log('postMessage', err));
};


export const postDiscussion = ({ announcement_id, user_id }) => (dispatch, getState) => {
  axios({
    headers: {
      Authorization: `bearer ${token()}`,
    },
    method: 'post',
    url: 'http://3.86.88.23/api/discussions/',
    data:
    {
      announcement: announcement_id,
      receiver: user_id,
      creator: getState().login.userId,
    },
  })
  // <Redirect to={`/tchat-room/${getState().login.userId}`} />
    .then(() => {
      dispatch(redirect('tchat'));
    })
    .catch((err) => console.log('postDiscussion', err.response));
};


export const deleteDiscussion = (id) => (dispatch) => {
  axios({
    headers: {
      Authorization: `bearer ${token()}`,
    },
    method: 'delete',
    url: `http://3.86.88.23/api/discussions/${id}`,
  })
    .then(() => dispatch(fetchDiscussionList(userId())))
    .catch((err) => console.log(err.response));
};


export const deleteAnnouncement = (id) => (dispatch) => {
  axios({
    headers: {
      Authorization: `bearer ${token()}`,
    },
    method: 'delete',
    url: `http://3.86.88.23/api/announcements/${id}`,
  })

    .then(() => {
      dispatch(redirect('myannouncement'));
    })
    .catch((err) => console.log(err.response));
};

export const changeEmail = () => (dispatch, getState) => {
  axios({
    headers: {
      Authorization: `bearer ${token()}`,
    },
    method: 'patch',
    url: `http://3.86.88.23/api/users/account/${getState().login.userId}`,
    data: {
      email: getState().data.email,
    },
  })
    .then(() => dispatch(notification(true)))
    .catch((err) => console.log(err));
};

export const changePassword = () => (dispatch, getState) => {
  axios({
    headers: {
      Authorization: `bearer ${token()}`,
    },
    method: 'patch',
    url: `http://3.86.88.23/api/users/password/${getState().login.userId}`,
    data: {
      password: getState().data.password,
    },
  })
    .then(() => dispatch(notification(true)))
    .catch((err) => console.log(err));
};
