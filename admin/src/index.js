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
import {
  show_error
} from './redux/actions/SnackbarActions'
import './pages/styles/_global.scss'

const store = Store()
const token = localStorage.getItem('jsonwebtoken')
if (token) {
  store.dispatch(action_check_login(token))
} else {
  localStorage.removeItem('jsonwebtoken')
  store.dispatch(show_error('Session expired! Please login again to continue.'))
  store.dispatch(action_logout())
}

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
