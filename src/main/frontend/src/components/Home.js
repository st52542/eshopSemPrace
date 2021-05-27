import React, {Component} from 'react';
import AppNavbar from './AppNavbar';
import {Alert, Button, Container} from "react-bootstrap";
import '../App.css';
import BackendService from "../services/BackendService";

class Home extends Component {

    state = {
        produkty: []
    };
    constructor(props) {
        super(props);
    }

    nacteniVse = () =>{
        BackendService.getTOPProduktList()
            .then((response) => {
                    console.log(response)
                    this.setState({produkty : response.data})
                },
                (error) =>{console.log(error.toString())})
    }

    async componentDidMount() {
        this.nacteniVse()
    }

    onAddToCart = (event, id) => {
        console.log(event.target.name)
/*        BackendService.deleteProdukt(id)
            .then((response) => {this.nacteniVse()})*/
    }

    render() {
        const {produkty} = this.state;
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div style={{
                        marginTop: "20px"
                    }
                    }>
                        <Alert variant="primary">
                            <h2>Vitame vas v nasem eshopu</h2>
                        </Alert>
                        <h2>Zde jsou vybrane produkty s nejvetsu slevou</h2>
                            {produkty && produkty.length > 0 && produkty.map(produkt =>
                                <div key={produkt.id}>
                                    {produkt.nazev} ({produkt.popis}) ({produkt.cena}) ({produkt.slevaProcenta})
                                    <Button type="submit" onClick={(event) => {
                                        this.onAddToCart(event, produkt.id)
                                    }}>Pridej do kosiku</Button>
                                </div>
                            )}
                    </div>
                </Container>
            </div>
        )
            ;
    }
}

export default Home;