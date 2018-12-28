
import {createStore, combineReducers, applyMiddleware} from 'redux';

import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {createForms} from 'react-redux-form';
import {InitialFeedback, InitialComment} from './forms';
import * as ActionTypes from './ActionTypes';

const Contact = (state = {submitDisabled: false}, action) => {
  switch (action.type) {
    case ActionTypes.FEEDBACK_BUTTON_DISABLE:
      return {...state, submitDisabled: true};
      break;
    case ActionTypes.FEEDBACK_BUTTON_ENABLE:
      return {...state, submitDisabled: false};
      break;
    default:
      return state;
  }
}

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      dishes: Dishes,
      comments: Comments,
      promotions: Promotions,
      leaders: Leaders,
      contact: Contact,
      ...createForms({
        feedback: InitialFeedback,
        addComment: InitialComment
      })
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
}
