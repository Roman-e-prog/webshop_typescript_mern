import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import {BrowserRouter as Router} from 'react-router-dom'
import {persistStore} from 'redux-persist';
import ErrorBoundary from './components/ErrorBoundary';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
let persistor = persistStore(store)
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router>
              <App />
            </Router>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);


