import React, {useEffect, useState} from 'react';
import AppNavbar from './AppNavbar';
import {Alert, Button, Container} from "react-bootstrap";
import '../App.css';
import BackendService from "../services/BackendService";
import {useHistory} from "react-router-dom";

const Products = () => {
    const [item, setItems] = useState([]);
    const history = useHistory()

    useEffect(() => {
        BackendService.getCartItems()
            .then((resp) => {
                console.log(resp)
                console.log(resp.data)
                setItems(resp.data)
                console.log(item)
                debugger
            }, (error) => {
                console.log(error.toString())
            })
    }, []);

    const onAccept= () => {
        BackendService.getCartOrderItem(50,96,98)
            .then((resp) => {
                console.log(resp)
            }, (error) => {
                console.log(error.toString())
            })
        history.push("/")
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
                        <h2>Zde je vas nakoupeny kosik</h2>
                    </Alert>
                    {item && item.length > 0 && item.map(produkt =>
                        <div>
                            {produkt} ({produkt.value()})
                            <Button type="submit" onClick={(event) => {

                            }}>Odeber</Button>
                        </div>
                    )}
                    <Button type="submit" onClick={(event) => {
                        onAccept()
                    }}>Potvrd objednavku</Button>
                </div>
            </Container>
        </div>
    )
        ;
}

export default Products;