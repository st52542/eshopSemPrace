import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom"
import {Alert, Button, Container} from "react-bootstrap";
import '../App.css';
import BackendService from "../services/BackendService";

const AdminManageProd = () => {
    const [item, setItems] = useState([]);
    const history = useHistory()

    useEffect(() => {
        BackendService.getProduktList()
            .then((resp) => {
                console.log(resp)
                setItems(resp.data)
            }, (error) => {
                console.log(error.toString())
            })
    }, []);

    const onDeleteItem = (itemToDelete) => {
        BackendService.deleteProdukt(itemToDelete.id).then((resp) => {
            const filtered = item.filter(item => item.id !== itemToDelete.id)
            setItems(filtered)
        })
    }

    const onAddItem = () => {
        history.push("/produkt/AddProduct")
    }

    return (
        <div>
            <Container fluid>
                <div style={{
                    marginTop: "20px"
                }
                }>
                    <Alert variant="primary">
                        <h2>Zde je seznam vsech produktu</h2>
                    </Alert>
                    {item && item.length > 0 && item.map(produkt =>
                        <div key={produkt.id}>
                            nazev produktu: {produkt.nazev}, popis produktu: {produkt.popis},
                            cena produktu: {produkt.cena}, nazev produktu: {produkt.popis},
                            sleva: {produkt.slevaProcenta}, vyrobce: {produkt.vyrobce && (produkt.vyrobce.nazev)}
                            <Button type="submit" onClick={(e) => {
                                onDeleteItem(produkt)
                            }}>smaz produkt</Button>
                        </div>
                    )}
                    <Button type="submit" onClick={(event) => {
                        onAddItem()
                    }}>pridej novy produkt</Button>
                </div>
            </Container>
        </div>
    );
}

export default AdminManageProd;