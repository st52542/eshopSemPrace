import React, {useEffect, useState} from 'react';
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
        platba: 0,
        polozky: null
    });

    useEffect(() => {
        BackendService.getDopravaList()
            .then((resp) => {
                setItemDoprava(resp.data)
                orderSpec.doprava = resp.data[0].id
            }, (error) => {
                console.log(error.toString())
            })
        BackendService.getPlatbaList()
            .then((resp) => {
                setItemPlatba(resp.data)
                orderSpec.platba = resp.data[0].id
            }, (error) => {
                console.log(error.toString())
            })
        if (JSON.parse(localStorage.getItem('kosik')) != null) {
            setItems(JSON.parse(localStorage.getItem('kosik')))
        }
    }, [orderSpec]);

    const onAccept = () => {
        orderSpec.polozky = item
        BackendService.postCartOrderItem(orderSpec)
            .then((resp) => {
                localStorage.removeItem('kosik');
                localStorage.clear();
                history.push("/")
            }, (error) => {
                console.log(error.toString())
            })
    }

    const removeFromCart = (itemToDelete) => {
        let newItem = [...item];
        const index = newItem.findIndex((item) => item === itemToDelete);
        newItem.splice(index, 1);
        setItems(newItem)
    };

    const onDeleteItem = (itemToDelete) => {
        removeFromCart(itemToDelete)
        orderSpec.polozky = item
        localStorage.setItem('kosik', JSON.stringify(item));
    }
    const changeValuesDoprava = (event) => {
        orderSpec.doprava = event.target.value
    }
    const changeValuesPlatba = (event) => {
        orderSpec.platba = event.target.value
    }

    return (
        <div>
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
                            nazev produktu: {polozky.nazev},{"\n"}
                            <Button type="submit" onClick={(event) => {
                                onDeleteItem(polozky.id)
                            }}>Odeber</Button>
                        </div>
                    )}
                    <div>
                        Vyber dopravu
                    </div>
                    <select onChange={(event) => {
                        changeValuesDoprava(event)
                    }}>
                        {itemDoprava && itemDoprava.length > 0 && itemDoprava.map(item => (
                            <option key={item.id}
                                    value={item.id}
                            >
                                {item.popis}
                            </option>
                        ))}
                    </select>
                    <div>
                        Vyber platbu
                    </div>
                    <select onChange={(event) => {
                        changeValuesPlatba(event)
                    }}>
                        {itemPlatba && itemPlatba.length > 0 && itemPlatba.map(item => (
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