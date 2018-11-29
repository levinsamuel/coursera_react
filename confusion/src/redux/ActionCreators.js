import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});

export const fetchDishes = () => (dispatch) => {

  dispatch(dishesLoading(true));

  return fetch(baseUrl + 'dishes')
      .then(response => response.json())
      .then(dishes => dispatch(addDishes(dishes)))
};


export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (err) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: err
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
});

export const fetchComments = () => (dispatch) => {

  return fetch(baseUrl + 'comments')
      .then(response => response.json())
      .then(comments => dispatch(addComments(comments)))
};

export const commentsFailed = (err) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: err
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});

export const fetchPromos = () => (dispatch) => {

  dispatch(promosLoading());
  return fetch(baseUrl + 'promotions')
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("Failed to load promos: " + response.status);
        }
      }).then(promos => dispatch(addPromos(promos)))
      .catch(err => dispatch(promosFailed(err.toString())))
};

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (err) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: err
});

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos
});
