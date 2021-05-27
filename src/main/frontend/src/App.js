import React, { Component } from 'react';
import {BrowserRouter as Router, HashRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Profile from './components/Profile';
import UserPage from './components/UserPage';
import ProjectManagerPage from './components/ProjectManagerPage';
import SignUp from './components/SignUp';
import AdminPage from './components/AdminPage';
import Login from './components/Login';
import AddProduct from "./components/AddProduct";
import Products from "./components/Products";
import AdminManageProd from "./components/AdminManageProd";
import AdminManageDop from "./components/AdminManageDop";
import AddDoprava from "./components/AddDoprava";
import AdminManageVyrob from "./components/AdminManageVyrob";
import AdminManagePlat from "./components/AdminManagePlat";
import AddVyrobce from "./components/AddVyrobce";
import AddPlatba from "./components/AddPlatba";

class App extends Component {
  render() {
    return (
        <HashRouter>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/home' exact={true} component={Home}/>
            <Route path='/profile' exact={true} component={Profile}/>
            <Route path='/user' exact={true} component={UserPage}/>
            <Route path='/pm' exact={true} component={ProjectManagerPage}/>
            <Route path='/admin' exact={true} component={AdminPage}/>
            <Route path='/signin' exact={true} component={Login}/>
            <Route path='/signup' exact={true} component={SignUp}/>
            <Route path='/produkt/AddProduct' exact={true} component={AddProduct}/>
            <Route path='/doprava/AddDoprava' exact={true} component={AddDoprava}/>
            <Route path='/platba/AddPlatba' exact={true} component={AddPlatba}/>
            <Route path='/produkt/products' exact={true} component={Products}/>
            <Route path='/produkt/AdminManageProd' exact={true} component={AdminManageProd}/>
            <Route path='/doprava/AdminManageDop' exact={true} component={AdminManageDop}/>
            <Route path='/vyrobce/AdminManageVyrob' exact={true} component={AdminManageVyrob}/>
            <Route path='/vyrobce/AddVyrobce' exact={true} component={AddVyrobce}/>
            <Route path='/platba/AdminManagePlat' exact={true} component={AdminManagePlat}/>
          </Switch>
        </HashRouter>
    )
  }
}

export default App;
