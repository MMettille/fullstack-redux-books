import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'; 
import logger from 'redux-logger';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';


const bookList = (state = [], action) => {
  if(action.type === 'SET_BOOKS'){
    return action.payload;
  }
  return state;
}

const bookToEdit = (state = {}, action) => {
  if(action.type === 'SET_EDIT_BOOK'){
    return action.payload
  } else if(action.type === 'EDIT_ONCHANGE') {
    return {
        // spread: give me all of the object (...state)
        ...state,
        // change this one in particular
        [action.payload.property]: action.payload.value,
    }
  } else if(action.type === 'EDIT_CLEAR') {
    return { title: '' };
  }
  return state;
}

const reduxStore = createStore(
  combineReducers({
    bookList, bookToEdit
  }),
  applyMiddleware(logger)
);


ReactDOM.render(<Provider store={reduxStore}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
