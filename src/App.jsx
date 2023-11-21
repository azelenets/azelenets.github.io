import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import HomepageDark from './pages/HomepageDark';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Homepage />
        </Route>
        <Route path="/dark" exact>
          <HomepageDark />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
