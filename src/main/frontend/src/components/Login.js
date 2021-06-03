import React, {useState} from 'react'
import {useHistory} from "react-router-dom";
import {Button} from 'react-bootstrap'
import {Form, FormGroup} from "react-bootstrap"
import AuthenticationService from '../services/AuthenticationService'
import '../App.css';
import {Input, Label} from "reactstrap";

function SingUp() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const history = useHistory();

    const changeHandler = function (event) {
        let nam = event.target.name;
        let val = event.target.value;

        if (nam === "username") setUsername(val)
        if (nam === "password") setPassword(val)
    }

    const doLogin = async (event) => {
        event.preventDefault();

        AuthenticationService.signIn(username, password)
            .then(
                () => {
                    history.push('/home')
                    window.location.reload()
                });
    }

    return (
        <div>
            <Form onSubmit={doLogin}>
                <FormGroup>
                    <Label for="username">uzivatelske jmeno</Label>
                    <Input autoFocus type="text" name="username" id="username" value={username}
                           placeholder="uzivatelske jmeno" autoComplete="username" onChange={changeHandler}/>
                </FormGroup>
                <FormGroup>
                    <Label for="password">heslo</Label>
                    <Input type="password" name="password" id="password" value={password}
                           placeholder="heslo" autoComplete="password" onChange={changeHandler}/>
                </FormGroup>

                <Button type="submit" name="submitButton" id="submitButton" variant="primary" size="lg" block>Prihlas</Button>
            </Form>
        </div>
    )
}

export default SingUp;
