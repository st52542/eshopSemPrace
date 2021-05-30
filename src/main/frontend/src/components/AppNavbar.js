/*
import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavbarText, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import { withRouter } from 'react-router-dom';

import AuthenticationService from '../services/AuthenticationService';

class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);

        this.state = {
            showUser: false,
            showPM: false,
            showAdmin: false,
            username: undefined,
            login: false
        };
    }

    componentDidMount() {
        const user = AuthenticationService.getCurrentUser();

        if (user) {
            const roles = [];

            user.authorities.forEach(authority => {
                roles.push(authority.authority)
            });

            this.setState({
                showUser: true,
                showPM: roles.includes("ROLE_PM") || roles.includes("ROLE_ADMIN"),
                showAdmin: roles.includes("ROLE_ADMIN"),
                login: true,
                username: user.username
            });
        }
    }

    signOut = () => {
        AuthenticationService.signOut();
        this.props.history.push('/home');
        window.location.reload();
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link} to="/#/home">Super duper eshop</NavbarBrand>
            <Nav className="mr-auto">
                <NavLink href="/#/home">Home</NavLink>
                {this.state.showUser && <NavLink href="/#/user">User</NavLink>}
                {this.state.showPM && <NavLink href="/#/pm">PM</NavLink>}
                {this.state.showAdmin && <NavLink href="/#/admin">Admin</NavLink>}
            </Nav>
            <NavbarToggler onClick={this.toggle}/>
            <Collapse isOpen={this.state.isOpen} navbar>
                {
                    this.state.login ? (
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavbarText>
                                    Signed in as: <a href="/#/profile">{this.state.username}</a>
                                </NavbarText>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#" onClick={this.signOut}>SignOut</NavLink>
                            </NavItem>
                        </Nav>
                    ) : (
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/#/signin">Login</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/#/produkt/products">Produkty</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/#/signup">SignUp</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/#/produkt/AdminManageProd">Admin produkty</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/#/doprava/AdminManageDop">Admin doprava</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/#/vyrobce/AdminManageVyrob">Admin vyrobcu</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/#/platba/AdminManagePlat">Admin plateb</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/#/obj/AdminNakup">Admin nakup</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/#/obj/kosik">Kosik</NavLink>
                            </NavItem>
                        </Nav>
                    )
                }
            </Collapse>
        </Navbar>;
    }
}

export default withRouter(AppNavbar);*/
import React, {useEffect, useState} from 'react'
import {Nav, Navbar,} from 'react-bootstrap'
import {useHistory, withRouter} from 'react-router-dom'
import AuthenticationService from '../services/AuthenticationService'

function AppNavbar() {
    const [user, setUser] = useState(false)
    const history = useHistory()

    useEffect(() => {
        const user = AuthenticationService.getCurrentUser();
        if (user) {setUser(true)}
    }, [])

    const signOut = () => {
        AuthenticationService.signOut();
        history.push("/home")
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Super duper eshop</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav.Link href="/#/signin">Login</Nav.Link>
            <Nav.Link href="/#/signup">SignUp</Nav.Link>
            <Nav.Link href="/#/produkt/products">Produkty</Nav.Link>
            <Nav.Link href="/#/obj/kosik">Kosik</Nav.Link>
            <Nav className="mr-auto">
                {user && <Nav.Link onClick={signOut} href="#" >Odhlasit</Nav.Link>}
                {user && AuthenticationService.isAdmin() && <Nav.Link href="/#/produkt/AdminManageProd">Admin produkty</Nav.Link>}
                {user && AuthenticationService.isAdmin() && <Nav.Link href="/#/doprava/AdminManageDop">Admin doprava</Nav.Link>}
                {user && AuthenticationService.isAdmin() && <Nav.Link href="/#/vyrobce/AdminManageVyrob">Admin vyrobcu</Nav.Link>}
                {user && AuthenticationService.isAdmin() && <Nav.Link href="/#/platba/AdminManagePlat">Admin plateb</Nav.Link>}
                {user && AuthenticationService.isAdmin() && <Nav.Link href="/#/obj/AdminNakup">Admin nakup</Nav.Link>}
                {user && <Nav.Link href="/#/profile">Moje udaje</Nav.Link>}
            </Nav>
        </Navbar>
    )
}

export default withRouter(AppNavbar);

