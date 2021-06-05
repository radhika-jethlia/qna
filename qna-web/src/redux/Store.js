import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import thunk from "redux-thunk"
import GameReducer from './reducers/GameReducer'
import ProgressReducer from './reducers/ProgressReducer.js'
import ModalReducer from './reducers/ModalReducer.js'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      game: GameReducer,
      progress: ProgressReducer,
      modal: ModalReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};