import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import Store from './redux/Store'
import {
  action_check_login,
  action_logout
} from './redux/actions/LoginAction'

const store = Store()
const token = localStorage.getItem('jsonwebtoken')
if (token) {
  store.dispatch(action_check_login(token))
} else {
  localStorage.removeItem('jsonwebtoken')
  store.dispatch(action_logout())
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
