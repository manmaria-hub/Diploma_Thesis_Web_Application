// In this file we implement a navigation bar on the top of our page 
// and put all the links there. With this, we would like the user to 
// be able to access these links by clicking from the homepage

import React, { useCallback } from 'react';
import { useMappedState } from 'redux-react-hook';
import AuthenticatedNavigation from './authenticated';
import NonAuthenticatedNavigation from './nonAuthenticated';

const AuthNavigation = () => {
    const mapState = useCallback((state) => ({
        authUser: state.sessionState.authUser
    }), [])

    const { authUser } = useMappedState(mapState); 
    return authUser ? <AuthenticatedNavigation /> : <NonAuthenticatedNavigation />
}

export default AuthNavigation;