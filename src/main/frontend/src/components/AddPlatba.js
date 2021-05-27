import React, {Component} from "react";
import AppNavbar from './AppNavbar';
import {Button, Form, Input} from "reactstrap";
import BackendService from "../services/BackendService";
import {Container} from "react-bootstrap";

class AddPlatba extends Component {
    state = {
        platba: {
            popis: undefined,
            cena: 0
        }
    };

    constructor(props) {
        super(props);
    }

    onSubmitHandler = () => {
        BackendService.setNewPlatba(this.state.platba)
            .then((response) => {
                console.log(response)
            })
    }

    onchangeHandler = (event) => {
        console.log(event.target.name)
        switch (event.target.name) {
            case "popis":
                this.state.platba.popis = event.target.value
                break;
            case "prevod":
                this.state.platba.cena = event.target.value
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
                        <Input placeholder="prevod" name='prevod' onChange={(event) => {
                            this.onchangeHandler(event)
                        }}/>
                        <Button type="submit">Přidat</Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export default AddPlatba