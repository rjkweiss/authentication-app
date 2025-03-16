
import csrfFetch from "./csrf";

const SET_SESSION_USER = 'session/setUser';
const REMOVE_SESSION_USER = 'session/removeUser';

// action creator to set user
export const setUser = (user) => ({
    type: SET_SESSION_USER,
    user
});

// action creator to remove user
export const removeUser = () => ({
    type: REMOVE_SESSION_USER
});

// thunk creator to login user
export const login = (user) => async (dispatch) => {

    // get credential, password from destructured user
    const { credential, password } = user;

    // send credentials to backend
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({ credential, password })
    });

    // if there is no errors, set user session
    if (res.ok) {
        const data = await res.json();
        dispatch(setUser(data.user));
        return res;
    }
};

// thunk creator to signup user
export const signup = (user) => async (dispatch) => {
    // get username, email, password
    const { username, email, password } = user;

    // send signup info to backend
    const res = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            username,
            email,
            password
        })
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(setUser(data.user));
        return res;
    }
};

// thunk creator to restore user
export const restoreUser = () => async (dispatch) => {
    const res = await csrfFetch('/api/session');

    if (res.ok) {
        const data = await res.json();
        dispatch(setUser(data.user));
        return res;
    }
};

// thunk creator to logout user
export const logout = () => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: 'DELETE'
    });

    if (res.ok) {
        dispatch(removeUser());
        return res;
    }
};

const initialState = { user: null };
const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SESSION_USER:
            return {
                ...state,
                user: action.user
            }
        case REMOVE_SESSION_USER:
            return {
                ...state,
                user: null
            }

        default:
            return state;
    }
};

export default sessionReducer;
