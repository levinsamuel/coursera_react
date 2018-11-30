import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';

function constructError(response, rsrc) {
  return new Error("Status: " + response.status +
      "; Failed to load " + rsrc + ": " + response.statusText);
}

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => dispatch => {
    const newComment = {
      dishId, rating, author, comment
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + "comments", {
      method: 'POST',
      body: JSON.stringify(newComment),
      headers: {
        "content-type": "application/json"
      },
      credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
          console.debug("create comment response: ", response)
          return response.json();
        } else {
          throw constructError(response, "new comment");
        }
      },
      error => {throw new Error(error.message)}
    )
    .then(response => dispatch(addComment(response)))
    .catch(error => {
      console.error("Failed to post comment", error);
      alert("Failed to post comment");
    });
};

export const fetchDishes = () => (dispatch) => {

  dispatch(dishesLoading(true));

  return fetch(baseUrl + 'dishes')
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          var err = constructError(response, 'dishes');
          throw err;
        }
      },
      error => {
        throw new Error(error.message);
      })
      .then(dishes => dispatch(addDishes(dishes)))
      .catch(error => dispatch(dishesFailed(error.message)))
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
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          var err = constructError(response, 'comments');
          throw err;
        }
      },
      error => {
        throw new Error(error.message);
      })
      .then(comments => dispatch(addComments(comments)))
      .catch(err => dispatch(commentsFailed(err.message)));
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
          var err = constructError(response, 'promotions');
          throw err;
        }
      })
      .then(promos => dispatch(addPromos(promos)))
      .catch(err => dispatch(promosFailed(err.message)))
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
