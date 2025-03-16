import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.jsx';
import csrfFetch from './store/csrf.jsx';
import * as sessionActions from './store/session.jsx';
import { ModalContextProvider } from './context/Modal.jsx';
import App from './App.jsx';

import './index.css';

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}

const Root = () => {
  return (
    <StrictMode>
      <Provider store={store}>
        <ModalContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ModalContextProvider>
      </Provider>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<Root />);
