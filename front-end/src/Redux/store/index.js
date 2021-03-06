import {
  createStore, applyMiddleware, compose, combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import login from '../reducers/login';
import data from '../reducers/data';
import messagerie from '../reducers/messagerie';

// creation du store

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(thunk),
);

const rootReducer = combineReducers({ login, data, messagerie });

const store = createStore(rootReducer, enhancers);

export default store;
