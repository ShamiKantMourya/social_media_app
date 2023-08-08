import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import {
  Provider as AlertProvider,
  positions,
  transitions
} from "react-alert";

import Template from "react-alert-template-basic";

import store from './state';
import App from './App';

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 3000,
  transition: transitions.SCALE,
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertProvider template={Template} {...options}>
      <App />
      </AlertProvider>
    </Provider>
  </React.StrictMode>
);

