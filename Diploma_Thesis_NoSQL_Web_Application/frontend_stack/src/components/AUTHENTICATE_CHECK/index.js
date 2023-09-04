import React, {useEffect} from "react";
import { useDispatch } from 'redux-react-hook';
import axios from 'axios';
import * as actions from '../../constants/action_types'; 

async function authenticate(dispatch) {
    const token = JSON.parse(localStorage.getItem('authUser'))?.token; 
     console.log(token);
    if (token) {
        try {
            const requestBody = {
                query: `
                   query {
                       verifyToken(token: "${token}") {
                           _id
                           email
                       }
                   }
                `
            }

            const { data } = await axios.post('http://localhost:4000/graphql', requestBody);
            const user = await data.data.verifyToken
                        .then(result => console.log(result))
            if (user) {
                dispatch({
                    type: actions.SET_AUTH_USER,
                    authUser: {
                        _id: user._id,
                        email: user.email
                    }
                }) 
            }
            else {
                dispatch({ type: actions.SET_AUTH_USER, authUser: null });                 
                localStorage.removeItem('authUser'); 
                localStorage.removeItem('userIdentity'); 
            }
        }
        catch {
            dispatch({ type: actions.SET_AUTH_USER, authUser: null }); 
        }
    }
    else {
        dispatch({ type: actions.SET_AUTH_USER, authUser: null });
         
    } 
}

function useWithAuthenticate() {
    const dispatch = useDispatch();
    useEffect (() => { 
       authenticate(dispatch);        
    }, [dispatch])
}

export default useWithAuthenticate;