import React, {useState} from 'react'
import {Button, Col, Container, Form, FormGroup, Row} from 'react-bootstrap'
import {Input, Label} from "reactstrap"
import {Alert} from "react-bootstrap"
import Authentication from '../services/AuthenticationService'
import AppNavbar from "./AppNavbar";

function SingUp() {
    const [user, setUser] = useState({username: undefined, password: undefined, email: undefined})
    const [message, setMessage] = useState(undefined)


    const changeValueHandler = (name, value) => {
        setUser({...user, [name]: value})
    }

    const signUp = function (e) {
        e.preventDefault()
        Authentication.register(user)
            .then(
                response => {
                    setMessage("Registrace se povedla")
                }
            )
    }

    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <Row><Col><h1>Registrace uzivatele</h1></Col></Row>
                <Row><Col>{message && <Alert variant={'success'}>{message}</Alert>}</Col></Row>
                <Row><Col>
                    <Form onSubmit={signUp}>
                        <FormGroup style={{marginTop: "1em"}} controlId="forUsername">
                            <Label for="username">Username</Label>
                            <Input type="text" placeholder="Enter your username" name="username"
                                   id="username" value={user?.username} autoComplete="username"
                                   onChange={(e) => {
                                       changeValueHandler(e.target.name, e.target.value)
                                   }}/>
                        </FormGroup>

                        <FormGroup style={{"margin-top": "1em"}} controlId="formEmail">
                            <Label for="email">Email</Label>
                            <Input required type="text" placeholder="enter your email" name="email" id="email"
                                   value={user?.email} autoComplete="email"
                                   onChange={(e) => {
                                       changeValueHandler(e.target.name, e.target.value)
                                   }}/>
                        </FormGroup>

                        <FormGroup style={{"margin-top": "1em"}} controlId="formPassword">
                            <Label for="password">Password</Label>
                            <Input required type="password" placeholder="Enter Password" name="password"
                                   id="password" value={user?.password} autoComplete="password"
                                   onChange={(e) => {
                                       changeValueHandler(e.target.name, e.target.value)
                                   }}/>
                        </FormGroup>

                        <FormGroup style={{"margin-top": "1em"}} controlId="formAddress">
                            <Label for="ad">Address</Label>
                            <Input required type="ad" placeholder="Enter Address" name="address"
                                   id="address" value={user?.address} autoComplete="address"
                                   onChange={(e) => {
                                       changeValueHandler(e.target.name, e.target.value)
                                   }}/>
                        </FormGroup>
                        <Button style={{"margin-top": "1em"}} variant="primary" type="submit">Registruj</Button>
                    </Form>
                </Col></Row>
            </Container>
        </div>
    )
}

export default SingUp
