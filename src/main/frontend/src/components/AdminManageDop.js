import React, {useEffect, useState} from 'react';
import AppNavbar from './AppNavbar';
import {Alert, Button, Container} from "react-bootstrap";
import '../App.css';
import BackendService from "../services/BackendService";
import {useHistory} from "react-router-dom";


const AdminManageDop =()=> {
    const [item, setItems] = useState([]);
    const history = useHistory()

    useEffect(() => {
        BackendService.getDopravaList()
            .then((resp) => {
                console.log(resp)
                setItems(resp.data)
            }, (error) => {
                console.log(error.toString())
            })
    }, []);

    const onDeleteItem = (itemToDelete) => {
        BackendService.deleteDoprava(itemToDelete.id).then((resp) => {
            const filtered = item.filter(item => item.id !== itemToDelete.id)
            setItems(filtered)
        })
    }

    const onAddItem = () => {
        history.push("/doprava/AddDoprava")
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
                            <h2>Zde je seznam vsech doprav</h2>
                        </Alert>
                        {item && item.length > 0 && item.map(dopravy =>
                            <div key={dopravy.id}>
                                ({dopravy.popis})
                                ({dopravy.cena})
                                <Button type="submit" onClick={(event) => {
                                    onDeleteItem(dopravy)
                                }}>smaz dopravy</Button>
                            </div>
                        )}
                        <Button type="submit" onClick={(event) => {
                            onAddItem()
                        }}>pridej novy dopravy</Button>
                    </div>
                </Container>
            </div>
        )
            ;
}

export default AdminManageDop;