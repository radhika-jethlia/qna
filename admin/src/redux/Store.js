import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import thunk from "redux-thunk"
import AuthenticationReducer from './reducers/AuthenticationReducer'
import ProgressReducer from './reducers/ProgressReducer'
import SnackbarReducer from './reducers/SnackbarReducer'
import ProfileReducer from './reducers/ProfileReducer'
import ModalReducer from './reducers/ModalReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      authentication: AuthenticationReducer,
      progress: ProgressReducer,
      snackbar: SnackbarReducer,
      profile: ProfileReducer,
      modal: ModalReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};