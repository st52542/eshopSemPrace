import React, {Component} from "react";
import AppNavbar from './AppNavbar';
import {Button, Form, Input} from "reactstrap";
import BackendService from "../services/BackendService";
import {Container} from "react-bootstrap";

class AddDoprava extends Component {
    state = {
        doprava: {
            popis: undefined,
            cena: 0
        }
    };

    constructor(props) {
        super(props);
    }

    onSubmitHandler = (event) => {
        event.preventDefault()
        BackendService.postNewDoprava(this.state.doprava)
            .then((response) => {
                console.log(response)
            })
    }

    onchangeHandler = (event) => {
        console.log(event.target.name)
        switch (event.target.name) {
            case "popis":
                this.state.doprava.popis = event.target.value
                break;
            case "cena":
                this.state.doprava.cena = event.target.value
                break;
        }
    }

    render() {
        return (
            <div>
                <AppNavbar/>
                <div style={{
                    marginTop: "20px"
                }
                }>
                    <Form onSubmit={this.onSubmitHandler}>
                        <Input placeholder="popis" name='popis' onChange={(event) => {
                            this.onchangeHandler(event)
                        }}/>
                        <Input placeholder="cena" name='cena' onChange={(event) => {
                            this.onchangeHandler(event)
                        }}/>
                        <Button type="submit">Přidat</Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export default AddDoprava