import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './styles.css';
import { EfoghlamApp } from './EfoghlamApp.jsx';
import { store } from './store/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <EfoghlamApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
