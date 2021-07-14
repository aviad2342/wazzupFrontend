// import logo from './logo.svg';
import "./App.css";
import "./App.scss";
import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Chat from "./components/chat/Chat";
import Auth from "./components/Auth";
import AuthContext from "./store/auth-context";
import { ApolloClient, InMemoryCache, ApolloProvider, } from '@apollo/client';

function App() {
  const authCtx = useContext(AuthContext);

  const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql',
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
    <div className="App">
      <Switch>
        <Route path="/" exact>
        {!authCtx.isLoggedIn &&  <Redirect to="/auth"/>}
        </Route>
        {!authCtx.isLoggedIn && 
          <Route path="/auth">
            <Auth />
          </Route>}
        <Route path="/chat">
          {authCtx.isLoggedIn && <Chat />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
    </ApolloProvider>
  );
}

export default App;
