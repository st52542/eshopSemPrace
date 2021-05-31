import React, {useEffect, useState} from 'react';
import AppNavbar from './AppNavbar';
import {Alert, Button, Container} from "react-bootstrap";
import '../App.css';
import BackendService from "../services/BackendService";
import {useHistory} from "react-router-dom";

const AdminManagePlat =()=> {
    const [item, setItems] = useState([]);
    const history = useHistory()

    useEffect(() => {
        BackendService.getPlatbaList()
            .then((resp) => {
                console.log(resp)
                setItems(resp.data)
            }, (error) => {
                console.log(error.toString())
            })
    }, []);

    const onDeleteItem = (itemToDelete) => {
        BackendService.deletePlatba(itemToDelete.id).then((resp) => {
            const filtered = item.filter(item => item.id !== itemToDelete.id)
            setItems(filtered)
        })
    }

    const onAddItem = () => {
        history.push("/platba/AddPlatba")
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
                            <h2>Zde je seznam vsech plateb</h2>
                        </Alert>
                        {item && item.length > 0 && item.map(platba =>
                            <div key={platba.id}>
                                jmeno platby: {platba.popis},
                                prevod vuci CZK: {platba.prevod}
                                <Button type="submit" onClick={(event) => {
                                    onDeleteItem(platba)
                                }}>smaz platba</Button>
                            </div>
                        )}
                        <Button type="submit" onClick={(event) => {
                            onAddItem()
                        }}>pridej novy platba</Button>
                    </div>
                </Container>
            </div>
        )
            ;
}

export default AdminManagePlat;