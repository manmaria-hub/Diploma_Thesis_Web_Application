import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DndProvider, TouchTransition, MouseTransition} from 'react-dnd-multi-backend';
import {HTML5Backend} from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

// Set up Apollo Client 
import {apolloClient} from './ApolloClient/apolloClient';
import {ApolloProvider} from '@apollo/client';  

// Import our store
import { StoreContext } from 'redux-react-hook'; 
import store from './store';
 
const root = ReactDOM.createRoot(document.getElementById('root'));

// Create a custom pipeline to specify a list of backends for the DndProvider
const HTML5toTouch = {
  backends : [
    {
      id : 'htm15',
      backend : HTML5Backend,
      transition : MouseTransition,
    },
    {
      id : 'touch', 
      backend : TouchBackend,
      options : {enableMouseEvents : true},
      preview : true,
      transition : TouchTransition,
    },
  ],
}

root.render(
  // Wrap the entire app with the StoreContext provider to be able to retrieve 
  // data from our Redux store and dispatch actions anywhere inside our App component
  // After, connect our Apollo Client to React with ApolloProvider component
  // (ApolloProvider wraps our React app and places Apollo Client on the context, 
  //  enabling you to access it from anywhere in your component tree)
  <StoreContext.Provider value = {store} > 
  <DndProvider options={HTML5toTouch}>
    <ApolloProvider client={apolloClient}>    
        <App /> 
    </ApolloProvider>  
    </DndProvider>
  </StoreContext.Provider> 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
