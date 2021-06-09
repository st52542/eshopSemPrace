import {Alert, Button, Container} from "react-bootstrap";
import '../App.css';
import BackendService from "../services/BackendService";
import React, {useState, useEffect} from 'react';

const Home = () => {
    const [item, setItems] = useState([]);
    const [cart,setCart] = useState([]);

    useEffect(() => {
        BackendService.getTOPProduktList()
            .then((resp) => {
                console.log(resp)
                setItems(resp.data)
            }, (error) => {
                console.log(error.toString())
            })
        if (JSON.parse(localStorage.getItem('kosik'))!=null) {
            setCart(JSON.parse(localStorage.getItem('kosik')))
        }
    }, []);

    const onAddToCart = (prod) => {
        const kos = [...cart,prod]
        setCart(kos)
        localStorage.setItem('kosik', JSON.stringify(kos));
    }

    return (
        <div>
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
                            Nazev produktu: {produkt.nazev}, cena: {produkt.cena}, sleva: {produkt.slevaProcenta}
                            <Button type="submit" onClick={(event) => {
                                onAddToCart(produkt)
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