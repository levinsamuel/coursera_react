import * as ActionTypes from './ActionTypes';
import BASEURL from '../shared/baseUrl';

// COMMENTS

export const fetchComments = () => (dispatch) => {
    return fetch(BASEURL + 'comments')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const postComment = comment => dispatch => {
    return fetch(BASEURL + 'comments', {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => {

        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(rescomm => dispatch(addComment(rescomm)));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const addComment = comment => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const toggleCommentModal = () => ({
    type: ActionTypes.COMMENT_MODAL
});

export const closeCommentModal = () => ({
    type: ActionTypes.DISABLE_CMODAL
});

// DISHES`

export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading());

    return fetch(BASEURL + 'dishes')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
          var errmess = new Error(error.message);
          throw errmess;
      })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));
};

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

// PROMOS

export const fetchPromos = () => (dispatch) => {

    dispatch(promosLoading());

    return fetch(BASEURL + 'promotions')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
};

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

// LEADERS`

export const fetchLeaders = () => dispatch => {

    dispatch(leadersLoading());

    return fetch(BASEURL + 'leaders')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            console.error(response)
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
      },
      error => {
          console.log(error)
          var errmess = new Error(error.message);
          throw errmess;
      })
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)));
};

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

// FAVORITES

export const postFavorite = dishId => dispatch => {

  dispatch(actionAddFavorite(dishId));
}

const actionPostFavorite = (dishId) => ({
  type: ActionTypes.POST_FAVORITE,
  payload: dishId
})

const actionAddFavorite = (dishId) => ({
  type: ActionTypes.ADD_FAVORITE,
  payload: dishId
})
