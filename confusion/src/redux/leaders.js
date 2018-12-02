import * as ActionTypes from './ActionTypes';

export const Leaders = (state = {
  leaders: [],
  err: null,
  isLoading: true
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_LEADERS:
          return {...state, leaders: action.payload, isLoading: false}
        case ActionTypes.LEADERS_LOADING:
          return {...state, isLoading: true}
        case ActionTypes.LEADERS_FAILED:
          return {...state, leaders: [], err: action.payload, isLoading: false}
        default:
          return state;
      }
};
