import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

const SignUpLegacy = lazy(() => import('./pages/SignUpLegacy/SignUpLegacy'));
const SignUp = lazy(() => import('./pages/SignUp/SignUp'));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <BrowserRouter>
        <Suspense fallback={<></>}>
        <Switch>
        <Route exact path="/sign-up-legacy" component={SignUpLegacy} />
        <Route exact path="/sign-up" component={SignUp} />
        </Switch>
          </Suspense>
          </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
