import React, {useEffect, useState} from 'react';
import AppNavbar from './AppNavbar';
import {Alert, Button, Container} from "react-bootstrap";
import '../App.css';
import BackendService from "../services/BackendService";

const Products = () => {
    const [item, setItems] = useState([]);

    useEffect(() => {
        BackendService.getNakupy()
            .then((resp) => {
                console.log(resp)
                setItems(resp.data)
            }, (error) => {
                console.log(error.toString())
            })
    }, []);

    const onViewDetail= (itemToView) => {

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
                        <h2>Zde je seznam vsech objednavek</h2>
                    </Alert>
                    {item && item.length > 0 && item.map(nakup =>
                        <div key={nakup.id}>
                            {nakup.objednavka} ({nakup.datumVytvoreni})
                            ({nakup.stav})
                            <Button type="submit" onClick={(event) => {
                                onViewDetail(nakup)
                            }}>Zobraz detail</Button>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    )
        ;
}

export default Products;