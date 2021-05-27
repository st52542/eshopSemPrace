import React, {Component} from "react";
import AppNavbar from './AppNavbar';
import {Button, Form, Input} from "reactstrap";
import BackendService from "../services/BackendService";
import {Container} from "react-bootstrap";

class AddVyrobce extends Component {
    state = {
        vyrobce: {
            nazev: undefined,
            adresa: undefined
        }
    };

    constructor(props) {
        super(props);
    }

    onSubmitHandler = () => {
        BackendService.setNewVyrobce(this.state.vyrobce)
            .then((response) => {
                console.log(response)
            })
    }

    onchangeHandler = (event) => {
        console.log(event.target.name)
        switch (event.target.name) {
            case "nazev":
                this.state.vyrobce.popis = event.target.value
                break;
            case "adresa":
                this.state.vyrobce.cena = event.target.value
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

export default AddVyrobce