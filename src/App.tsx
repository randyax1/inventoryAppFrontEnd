import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch, Redirect } from "react-router-dom";

import NavContainer from './containers/NavContainer';
import HomeScreen from './screens/HomeScreen';
import InventoryScreen from './screens/InventoryScreen';
import { PageNotFoundScreen } from './screens/PageNotFoundScreen';

function App() {
  return (
    <>
    <Router>
        <>
          <NavContainer />
        </>
        <Switch>
        <Route exact path={["/"]}>
          <HomeScreen />
        </Route>
        <Route exact path={["/inventario"]}>
          <InventoryScreen />
        </Route>
        <Route>
          <PageNotFoundScreen redirectTo="/login" textButton="&nbsp;Ir a la página de login" />
        </Route>
        </Switch>
    </Router>
    </>
  );
}

export default App;
