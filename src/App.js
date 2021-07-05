// import logo from './logo.svg';
import './App.css';
import './App.scss';
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Chat from './components/Chat'
import Auth from './components/Auth'

function App() {
  return (
    <div className="App">
      <Switch>
      <Route path="/" exact>
        <Redirect to='/auth'/>
      </Route>
      <Route path="/auth">
        <Auth />
      </Route>
      <Route path="/chat">
         <Chat />
      </Route>
      </Switch>
    </div>
  );
}

export default App;
