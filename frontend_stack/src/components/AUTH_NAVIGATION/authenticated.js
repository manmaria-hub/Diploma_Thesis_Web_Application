import React from 'react';
import { useDispatch } from 'redux-react-hook';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import * as actions from '../../constants/action_types';

function AuthenticatedNavigation() {
    const dispatch = useDispatch();

    function logout() {
        dispatch({ type: actions.SET_AUTH_USER, authUser: null });
        localStorage.removeItem('authUser');
        localStorage.removeItem('userIdentity');
        localStorage.removeItem('token');
    }

    if (dispatch({type: actions.SET_AUTH_USER, authUser : null})) {
        console.log('NULL')
    }

    return (
        <div className="navbar">
            <div className="navbar-left"><Link to={routes.HOMEPAGE}>HOME</Link></div>
            <div className="navbar-right" style={{ justifyContent: "flex-end" }}>
                <Link to={routes.HOMEPAGE} onClick={logout}>LOGOUT</Link>
            </div>
        </div>
    )
}

export default AuthenticatedNavigation;