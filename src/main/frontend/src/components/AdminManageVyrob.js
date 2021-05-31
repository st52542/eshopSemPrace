import React, {useEffect, useState} from 'react';
import AppNavbar from './AppNavbar';
import {Alert, Button, Container} from "react-bootstrap";
import '../App.css';
import BackendService from "../services/BackendService";
import {useHistory} from "react-router-dom";

const AdminManageVyrob =()=> {

    const [item, setItems] = useState([]);
    const history = useHistory()

    useEffect(() => {
        BackendService.getVyrobceList()
            .then((resp) => {
                console.log(resp)
                setItems(resp.data)
            }, (error) => {
                console.log(error.toString())
            })
    }, []);

    const onDeleteItem = (itemToDelete) => {
        BackendService.deleteVyrobce(itemToDelete.id).then((resp) => {
            const filtered = item.filter(item => item.id !== itemToDelete.id)
            setItems(filtered)
        })
    }

    const onAddItem = () => {
        history.push("/vyrobce/AddVyrobce")
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
                            <h2>Zde je seznam vsech vyrobcu</h2>
                        </Alert>
                        {item && item.length > 0 && item.map(vyrobce =>
                            <div key={vyrobce.id}>
                                ({vyrobce.nazev})
                                ({vyrobce.adresa})
                                <Button type="submit" onClick={(event) => {
                                    onDeleteItem(vyrobce)
                                }}>smaz vyrobce</Button>
                            </div>
                        )}
                        <Button type="submit" onClick={(event) => {
                            onAddItem()
                        }}>pridej novy vyrobce</Button>
                    </div>
                </Container>
            </div>
        )
            ;
}

export default AdminManageVyrob;