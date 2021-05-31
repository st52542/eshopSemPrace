import React, {useEffect, useState} from 'react'
import {Alert, Container} from 'reactstrap'

import AuthenticationService from '../services/AuthenticationService'
import AppNavbar from "./AppNavbar";

function Profile() {
    const [user, setUser] = useState(undefined)

    useEffect(() => {
        const user = AuthenticationService.getCurrentUser();
        setUser(user);
    }, [])

    let userInfo;

    if (user && user.accessToken) {
        let roles = "";
        user.authorities.forEach(authority => {
            roles = roles + " " + authority.authority
        });

        userInfo = (
            <div style={{marginTop: "20px"}}>
                <Alert variant="info">
                    <h2>Dobry den</h2>
                    <ul>
                        <li>Vitejte pane/pani: {user.username}</li>
                    </ul>
                </Alert>
            </div>
        );
    }

    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                {userInfo}
            </Container>
        </div>
    )
}

export default Profile;
