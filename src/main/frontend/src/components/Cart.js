import React, {useEffect, useState} from 'react';
import AppNavbar from './AppNavbar';
import {Alert, Button, Container} from "react-bootstrap";
import '../App.css';
import BackendService from "../services/BackendService";
import {useHistory} from "react-router-dom";

const Products = () => {
    const [item, setItems] = useState([]);
    const [itemDoprava, setItemDoprava] = useState([])
    const [itemPlatba, setItemPlatba] = useState([])
    const history = useHistory()

    const [orderSpec] = useState({
        doprava: 0,
        platba: 0
    });

    useEffect(() => {
        BackendService.getDopravaList()
            .then((resp) => {
                setItemDoprava(resp.data)
                orderSpec.doprava =resp.data[0].id
                console.log(itemDoprava)
            }, (error) => {
                console.log(error.toString())
            })
        BackendService.getPlatbaList()
            .then((resp) => {
                setItemPlatba(resp.data)
                orderSpec.platba =resp.data[0].id
                console.log(itemPlatba)
            }, (error) => {
                console.log(error.toString())
            })
        BackendService.getCartItems()
            .then((resp) => {
                setItems(resp.data)
            }, (error) => {
                console.log(error.toString())
            })
    }, []);

    const onAccept = () => {
        console.log(orderSpec)
        BackendService.postCartOrderItem(orderSpec)
            .then((resp) => {
                console.log(resp)
                history.push("/")
            }, (error) => {
                console.log(error.toString())
            })
    }

    const onDeleteItem = (itemToDelete) => {
        BackendService.getCartDeleteItem(itemToDelete.produkt.id).then((resp) => {
            window.location.reload();
        })
    }
    const changeValuesDoprava = (event) => {
        orderSpec.doprava = event.target.value
    }
    const changeValuesPlatba = (event) => {
        orderSpec.platba = event.target.value
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
                    {item && item.length > 0 && item.map(polozky =>
                        <div key={polozky.id}>
                            ({polozky.produkt.nazev})
                            ({polozky.mnozstvi})
                            <Button type="submit" onClick={(event) => {
                                onDeleteItem(polozky)
                            }}>Odeber</Button>
                        </div>
                    )}
                    <select onChange={(event) => {
                        changeValuesDoprava(event)
                    }}>
                        {itemDoprava.map(item => (
                            <option key={item.id}
                                    value={item.id}
                            >
                                {item.popis}
                            </option>
                        ))}
                    </select>
                    <select onChange={(event) => {
                        changeValuesPlatba(event)
                    }}>
                        {itemPlatba.map(item => (
                            <option key={item.id}
                                    value={item.id}
                            >
                                {item.popis}
                            </option>
                        ))}
                    </select>
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