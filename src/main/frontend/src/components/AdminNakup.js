import React, {useEffect, useState} from 'react';
import AppNavbar from './AppNavbar';
import {Alert, Button, Container} from "react-bootstrap";
import '../App.css';
import BackendService from "../services/BackendService";
import {useHistory} from "react-router-dom";

const AdminNakup = () => {
    const [item, setItems] = useState([]);
    const history = useHistory()

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
        history.push("/obj/DetailNakup/" + itemToView)
    }

    const onAccept= (id) => {
        BackendService.getPotvrdObj(id)
            .then((resp) => {
                console.log(resp)
            }, (error) => {
                console.log(error.toString())
            })
        window.location.reload();
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
                            cislo objednavky: {nakup.objednavka}, datum vytvoreni objednavky: {nakup.datumVytvoreni},
                            stav objednavky: {String(nakup.stav)}
                            <Button type="submit" onClick={(event) => {
                                onViewDetail(nakup.id)
                            }}>Zobraz detail</Button>
                            <Button type="submit" onClick={(event) => {
                                onAccept(nakup.id)
                            }}>Potvrd objednavku</Button>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    )
        ;
}

export default AdminNakup;