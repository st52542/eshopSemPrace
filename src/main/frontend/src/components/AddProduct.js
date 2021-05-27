import React, {Component} from "react";
import AppNavbar from './AppNavbar';
import {Button, Form, Input} from "reactstrap";
import BackendService from "../services/BackendService";
import {Container} from "react-bootstrap";

class AddProduct extends Component {
    state = {
        produkt: {
            nazev: undefined,
            popis: undefined,
            cena: 0,
            slevaProcenta: 0,
            vNabidce: false
        }
    };

    constructor(props) {
        super(props);
    }

    onSubmitHandler = () => {
        this.state.produkt.vNabidce = true;
        BackendService.setNewProdukt(this.state.produkt)
            .then((response) => {
                console.log(response)
            })
    }

    onchangeHandler = (event) => {
        console.log(event.target.name)
        switch (event.target.name) {
            case "nazev":
                this.state.produkt.nazev = event.target.value
                break;
            case "popis":
                this.state.produkt.popis = event.target.value
                break;
            case "cena":
                this.state.produkt.cena = event.target.value
                break;
            case "slevaProcenta":
                this.state.produkt.slevaProcenta = event.target.value
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
                        <Input placeholder="nazev" name='nazev' onChange={(event) => {
                            this.onchangeHandler(event)
                        }}/>
                        <Input placeholder="popis" name='popis' onChange={(event) => {
                            this.onchangeHandler(event)
                        }}/>
                        <Input placeholder="cena" name='cena' onChange={(event) => {
                            this.onchangeHandler(event)
                        }}/>
                        <Input placeholder="slevaProcenta" name='slevaProcenta' onChange={(event) => {
                            this.onchangeHandler(event)
                        }}/>
                        <Button type="submit">Přidat</Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export default AddProduct