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

