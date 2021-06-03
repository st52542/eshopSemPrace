import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
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
import AdminNakup from "./components/AdminNakup";
import DetailNakup from "./components/DetailNakup";
import Cart from "./components/Cart";
import AppNavbar from "./components/AppNavbar";

function App() {
    return (
        <HashRouter>
            <AppNavbar/>
            <Switch>
                <Route path='/' exact={true} component={Home}/>
                <Route path='/home' exact={true} component={Home}/>
                <Route path='/profile' exact={true} component={Profile}/>
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
                <Route path='/obj/AdminNakup' exact={true} component={AdminNakup}/>
                <Route path='/obj/kosik' exact={true} component={Cart}/>
                <Route path='/obj/DetailNakup/:id' exact={true} component={DetailNakup}/>
            </Switch>
        </HashRouter>
    )
}

export default App;
