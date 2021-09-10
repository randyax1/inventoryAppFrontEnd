import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from "react-router-dom";

import NavContainer from './containers/NavContainer';
import { CategoryScreen } from './screens/CategoryScreen';
import HomeScreen from './screens/HomeScreen';
import InventoryScreen from './screens/InventoryScreen';
import { PageNotFoundScreen } from './screens/PageNotFoundScreen';
import { SupplierScreen } from './screens/SupplierScreen';

function App() {
  return (
    <div style={{backgroundColor:'#E7E9ED'}}>
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
        <Route exact path={["/proveedores"]}>
          <SupplierScreen />
        </Route>
        <Route exact path={["/categorias"]}>
          <CategoryScreen />
        </Route>
        <Route>
          <PageNotFoundScreen redirectTo="/login" textButton="&nbsp;Ir a la página de login" />
        </Route>
        </Switch>
    </Router>
    </div>
  );
}

export default App;
