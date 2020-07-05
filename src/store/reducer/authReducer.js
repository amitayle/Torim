import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility';


const initialState = {
    userId: null,
    isAdmin: null
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        userId: action.userId,
        isAdmin: action.isAdmin
    });
};

const logout = (state) => {
    return updateObject(state, {userId: null, isAdmin: false });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.LOGOUT: return logout(state);
        default: return state;
    };
};
export default reducer;