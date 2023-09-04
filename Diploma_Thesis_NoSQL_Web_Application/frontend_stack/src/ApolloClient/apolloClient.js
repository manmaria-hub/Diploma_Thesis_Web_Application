// In this file we initialize an Apollo Client instance

// Let's first import some symbols-stuff we need from the corresponding package
import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import {onError} from '@apollo/client/link/error';   

// Next we will initialize Apollo Client, passing its constructor a configuration 
// object with the uri and cache fields

// Create an error link, because if there is any error (graphql catches any errors)
// we tell it how we want to respond
const errorLink = onError(({graphqlErrors , networkError}) => {
    if (graphqlErrors) {
        graphqlErrors.map(({message,location, path}) => {
            return(
                alert(`GraphQL error ${message}`)
            )
        })
    }
    if (networkError) {
        // Check if error response is JSON
        try {
            JSON.parse(networkError.bodyText);
        } catch (err) {
            // If not replacing parsing error message with real one
            networkError.message = networkError.bodyText;
        }
    }
});
 
// Create the uri field as a http link
const httpLink = from([
    errorLink,
    new HttpLink({uri: 'http://localhost:4000/graphql'}),
]);

// 'uri' or 'link' specifies the URL of our GraphQL server
// 'cache' is an instance of InMemoryCache, which Apollo Client uses to cache query results after fetching them
export const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache({
        addTypename: false
    }), 
    cors: {
        origin: '*',
        credentials: true
    },
    fetchOptions: {
        mode: 'no-cors'
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all'
    },
    mutate: {
        fetchPolicy:'no-cache',
        errorPolicy:'all'
    }
})

// Now, our client is ready to start fetching data! 