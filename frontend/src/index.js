import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';

import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Recipe from './components/Recipe'
import RecipeList from './components/RecipeList'
import NavigationBar from './components/Navbar'
import Login from './components/Login'
import AddRecipe from './components/AddRecipe'
import AddIngredient from './components/AddIngredients'

const routing = (
  <Router>
    <NavigationBar/>
    <Switch>
      <Route exact path="/" component={RecipeList}>
      </Route>
      <Route exact path="/add" component={AddRecipe}>
      </Route>
      <Route path="/recipe/:recipeID" component={Recipe}>
      </Route>
      <Route path="/login" component={Login}>
      </Route>
      <Route path="/ingredient" component={AddIngredient}>
      </Route>
    </Switch>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
