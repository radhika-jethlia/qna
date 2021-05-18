import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import thunk from "redux-thunk"
import AuthenticationReducer from './reducers/AuthenticationReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      authentication: AuthenticationReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};