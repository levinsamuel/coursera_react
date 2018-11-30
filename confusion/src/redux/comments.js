import * as ActionTypes from './ActionTypes';

export const Comments = (state = {
  comments: [],
  err: null
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, err: null, comments: action.payload};
        case ActionTypes.COMMENTS_FAILED:
            return {...state, err: action.payload};
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            return {...state, comments: state.comments.concat(comment)};
        case ActionTypes.DELETE_COMMENT:
            var cid = action.payload;
            return {...state,
              comments: state.comments.filter(comm => comm.id !== cid)
            };
        case ActionTypes.GRAY_COMMENT:
            var cid = action.payload;
            return {...state,
              comments: state.comments.map(comm => {
                if (comm.id === cid) {
                  comm.grayed = true;
                }
                return comm;
              })
            };

        default:
          return state;
      }
};
