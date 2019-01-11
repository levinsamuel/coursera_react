import * as ActionTypes from './ActionTypes';

export const favorites = (state = {
  err: null,
  favorites: []
}, action) => {

  var retState;
  switch(action.type) {
    case ActionTypes.ADD_FAVORITE:
      if (state.favorites.every(f => f !== action.payload)) {
        console.log("id: ", action.payload)
        retState = {...state, favorites: state.favorites.concat(action.payload)};
      } else {
        retState = state;
      }
      break;
    // case ActionTypes.REMOVE_FAVORITE:
    //
    //   retState = {...state, favorites: state.favorites.filter(
    //     f => f !== action.payload
    //   )};

    default:
      retState = state;
  }

  return retState;
}
