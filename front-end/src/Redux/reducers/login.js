import {
  REDIRECT, LOGIN_OK, LOGOUT, INPUT_LOGIN_CHANGE, NOTIFICATION, CLEAR_NOTIFICATION, REGISTER_SUCCESS, MESSAGE, UPDATE_USER, INPUT_PROFILE_CHANGE, SET_USER_PARAMS,
} from '../actions';

const initialState = {
  message: '',
  redirect: false,
  registerSuccess: false,
  userParams: false,
  isLogged: true,
  userId: -1,
  notification: '',
  userInfo: {
    firstname: '',
    lastname: '',
    age: 0,
    location: '',
    title: '',
    description: '',
    experience: '',
    portfolio: '',
    picture: '',
    bannerpicture: '',
  },
  data: {
    username: '',
    password: '',
    _username: '',
    _password: '',
  },
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    case SET_USER_PARAMS:
      return {
        ...state,
        userParams: action.payload,
      };
    case INPUT_PROFILE_CHANGE:
      return {
        ...state,
        userInfo: { ...state.userInfo, ...action.payload },
      };
    case REDIRECT:
      return {
        ...state,
        redirect: action.payload,

      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerSuccess: true,
      };
    case CLEAR_NOTIFICATION:
      return {
        ...state,
        notification: '',
      };
    case NOTIFICATION:
      return {
        ...state,
        notification: action.payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        userInfo: action.payload[0],
      };
    case LOGIN_OK:
      return {
        ...state,
        isLogged: true,
        userId: action.payload[0].id,
        userInfo: action.payload[0],
        data: {},

      };
    case LOGOUT:
      return {
        ...state,
        isLogged: false,

      };
    case INPUT_LOGIN_CHANGE:
      return {
        ...state,
        data: { ...state.data, ...action.payload },
      };
    default:
      return state;
  }
};

export default reducer;
