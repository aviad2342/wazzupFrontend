// import logo from './logo.svg';
import "./App.css";
import "./App.scss";
import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Chat from "./components/Chat";
import Auth from "./components/Auth";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Redirect to="/chat" />
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path="/auth">
            <Auth />
          </Route>
        )}
        <Route path="/chat">
          {authCtx.isLoggedIn && <Chat />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
