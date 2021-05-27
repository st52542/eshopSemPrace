import React, {Component} from 'react';
import AppNavbar from './AppNavbar';
import {Alert, Button, Container} from "react-bootstrap";
import '../App.css';
import BackendService from "../services/BackendService";

class AdminManageProd extends Component {

    state = {
        produktyALL: []
    };

    constructor(props) {
        super(props);
    }

    nacteniVse = () => {
        BackendService.getProduktList()
            .then((response) => {
                    console.log(response)
                    this.setState({produktyALL: response.data})
                },
                (error) => {
                    console.log(error.toString())
                })
    }

    async componentDidMount() {
        this.nacteniVse()
    }

    onDeleteProd = (event, id) => {
        console.log(event.target.name)
        BackendService.deleteProdukt(id)
            .then((response) => {
                this.nacteniVse()
            })
    }
    onAddProd = (event) => {
        console.log(event.target.name)
        this.props.history.push("/produkt/AddProduct")
    }

    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div style={{
                        marginTop: "20px"
                    }
                    }>
                        <Alert variant="primary">
                            <h2>Zde je seznam vsech produktu</h2>
                        </Alert>
                        {this.state.produktyALL && this.state.produktyALL.length > 0 && this.state.produktyALL.map(produkt =>
                            <div key={produkt.id}>
                                {produkt.nazev} ({produkt.popis})
                                ({produkt.cena}) {produkt.vyrobce && (produkt.vyrobce.nazev)}
                                <Button type="submit" onClick={(event) => {
                                    this.onDeleteProd(event, produkt.id)
                                }}>smaz produkt</Button>
                            </div>
                        )}
                        <Button type="submit" onClick={(event) => {
                            this.onAddProd(event)
                        }}>pridej novy produkt</Button>
                    </div>
                </Container>
            </div>
        )
            ;
    }
}

export default AdminManageProd;