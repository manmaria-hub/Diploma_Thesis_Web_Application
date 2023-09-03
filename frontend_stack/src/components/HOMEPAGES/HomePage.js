import React, {useCallback} from "react";
import { useMappedState } from "redux-react-hook";
import AuthHomePage from "./AuthHome";
import NonAuthHomePage from "./NonAuthHome";

const HomePage = () => {
    const mapState = useCallback((state) => ({
        authUser: state.sessionState.authUser
    }), [])

    const {authUser} = useMappedState(mapState);

    return authUser ? <AuthHomePage/> : <NonAuthHomePage/>
}

export default HomePage;