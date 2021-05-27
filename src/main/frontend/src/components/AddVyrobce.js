import React, {Component} from "react";
import AppNavbar from './AppNavbar';
import {Button, Form, Input} from "reactstrap";
import BackendService from "../services/BackendService";
import {Container} from "react-bootstrap";

class AddVyrobce extends Component {
    state = {
        vyrobce: {
            adresa: undefined,
            nazev: undefined
        }
    };

    constructor(props) {
        super(props);
    }

    onSubmitHandler = (event) => {
        event.preventDefault()

        BackendService.postNewVyrobce(this.state.vyrobce)
            .then((response) => {
                console.log(response)
            },(error) => {console.log(error.toString())})
    }

    onchangeHandler = (event) => {
        console.log(event.target.name)
        switch (event.target.name) {
            case "adresa":
                this.state.vyrobce.adresa = event.target.value
                break;
            case "nazev":
                this.state.vyrobce.nazev = event.target.value
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
                        <Input placeholder="adresa" name='adresa' onChange={(event) => {
                            this.onchangeHandler(event)
                        }}/>
                        <Input placeholder="nazev" name='nazev' onChange={(event) => {
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