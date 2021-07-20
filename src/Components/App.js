import '../Style/App.css';
import Calendar from './Calendar';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client' 

function App() {

    const client = new ApolloClient({
        cache: new InMemoryCache(),
        uri: "http://localhost:4000/graphql"
    })

    return (
        <ApolloProvider client={client} className="App">
            <Calendar/>
        </ApolloProvider>
    );
}

export default App;
