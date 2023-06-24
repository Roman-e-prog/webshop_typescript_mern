import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary';
import { PersistGate } from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {BrowserRouter as Router} from 'react-router-dom';
const container = document.getElementById('root')!;
const root = createRoot(container);
let persistor = persistStore(store);
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
console.log("InitalState", store.getState());
const unsubscribe = store.subscribe(()=>console.log("updateState", store.getState()));
unsubscribe();
