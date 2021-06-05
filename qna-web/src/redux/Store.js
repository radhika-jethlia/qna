import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import thunk from "redux-thunk"
import GameReducer from './reducers/GameReducer'
import ProgressReducer from './reducers/ProgressReducer.js'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      game: GameReducer,
      progress: ProgressReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};