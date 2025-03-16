import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { thunk } from 'redux-thunk';
import sessionReducer from './session';

const isProduction = process.env.NODE_ENV === 'production';

const middleware = (getDefaultMiddleware) => {
    if (isProduction) {
        return getDefaultMiddleware().concat(thunk);
    }

    return getDefaultMiddleware().concat(thunk, logger);

};

const store = configureStore({
    reducer: {
        session: sessionReducer
    },
    middleware,
    devTools: !isProduction
});

export default store;
