import * as ActionTypes from './ActionTypes';

export const comments = (state = {
   errMess: null,
   comments: [],
   showModal: false
 }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return {...state, errMess: null, comments: action.payload};

    case ActionTypes.ADD_COMMENT:
      return {...state, errMess: null, comments: state.comments.concat(action.payload)};

    case ActionTypes.COMMENTS_FAILED:
      return {...state, errMess: action.payload};

    case ActionTypes.COMMENT_MODAL:
      return {...state, showModal: !state.showModal};

    case ActionTypes.DISABLE_CMODAL:
      return {...state, showModal: false};

    default:
      return state;
  }
};
