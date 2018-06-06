import { createStore } from 'redux'

const reducer = (state, action) => {
  if (action.type === "SUCCESSFUL_LOGIN") {
    return {
      ...state,
      loggedIn: action.product
    }
  } else if (action.type === "LOG_OUT") {
    return {
      ...state,
      loggedIn: action.product
    }
  }
};

export default createStore(reducer, { loggedIn: false });
