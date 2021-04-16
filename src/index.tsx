import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';
//store
import store from './redux/store';
//actions
import { loadFromCookies } from './redux/slices/auth-credentials.slice';
import { saveUser } from './redux/slices/user.slice';
import { loadTheme } from './redux/slices/theme.slice';
//styles
import 'normalize.css';
import './index.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-image-lightbox/style.css';
import 'rsuite-color-picker/lib/styles.css';

//load theme
store.dispatch(loadTheme());
//save token in redux
store.dispatch(loadFromCookies());
// if token exists decode and save user in redux
store.dispatch(saveUser());

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
