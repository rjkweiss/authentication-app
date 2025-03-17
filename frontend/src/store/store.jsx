import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import sessionReducer from './session';

const isProduction = process.env.NODE_ENV === 'production';

const middleware = [thunk];

// Only in dev
if (!isProduction) {
    const { createLogger } = require('redux-logger');
    middleware.push(createLogger());
}

const store = configureStore({
    reducer: {
        session: sessionReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
    devTools: !isProduction
});

export default store;
