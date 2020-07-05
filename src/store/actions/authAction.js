import * as actionTypes from './actionTypes';
import firebase from '../../FirebaseInstance';

export const auth = (isSignUp, name, email, password) => {
    return dispatch => {
        dispatch(authStart);
        if (isSignUp) {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .catch(err => {
                    console.log(err.message);// todo:error hendel
                });
        } else {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(result => {
                    firebase.database().ref('/users/')
                        .child(result.user.uid)
                        .set({ displayName: name });

                    result.user.updateProfile({
                        displayName: name
                    }).catch(err => {
                        ///no name
                    })
                }).catch(err => {
                    console.log(err.message);
                });
        };
    };
};

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (userId) => {
    return dispatch => {
        let admin = false
        firebase.database().ref('/admin/adminUId')
            .once('value', res => {
                if (res.val() === userId) {
                    admin = true
                };
                dispatch({
                    type: actionTypes.AUTH_SUCCESS,
                    userId: userId,
                    isAdmin: admin
                });
            });
    };
};

export const authFail = () => {
    return {
        type: actionTypes.AUTH_FAIL
    };
};

export const logOut = () => {
    return dispatch => {
        firebase.auth().signOut().then(() => {
            console.log('logout');
            dispatch({ type: actionTypes.LOGOUT })
        }).catch(err => {
            console.log(err);// todo : hendel err
        });
    };
};


