import AppNavbar from './AppNavbar';
import {Alert, Button, Container} from "react-bootstrap";
import '../App.css';
import BackendService from "../services/BackendService";
import React, {useState, useEffect} from 'react';

const Home = () => {
    const [item, setItems] = useState([]);

    useEffect(() => {
        BackendService.getTOPProduktList()
            .then((resp) => {
                console.log(resp)
                setItems(resp.data)
            }, (error) => {
                console.log(error.toString())
            })
    }, []);

    const onAddToCart = (id) => {
        BackendService.postCartItem(id)
    }


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
                    {item && item.length > 0 && item.map(produkt =>
                        <div key={produkt.id}>
                            {produkt.nazev} ({produkt.popis}) ({produkt.cena}) ({produkt.slevaProcenta})
                            <Button type="submit" onClick={(event) => {
                                onAddToCart(produkt.id)
                            }}>Pridej do kosiku</Button>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    )
        ;
}

export default Home;