import * as ActionTypes from './ActionTypes';


export const Promotions = (state = {
    promotions: [],
    err: null,
    isLoading: true
}, action) => {
    switch (action.type) {
        case ActionTypes.PROMOS_LOADING:
          return {...state, isLoading: true, err: null, promotions: []};
        case ActionTypes.PROMOS_FAILED:
          return {...state, isLoading: false, err: action.payload};
        case ActionTypes.ADD_PROMOS:
          return {...state, isLoading: false, err: null, promotions: action.payload};
        default:
          return state;
      }
};
