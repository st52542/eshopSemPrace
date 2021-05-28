import React, {Component, useState} from "react";
import AppNavbar from './AppNavbar';
import {Button, Form, Input} from "reactstrap";
import BackendService from "../services/BackendService";
import {Container} from "react-bootstrap";
import {useHistory} from "react-router-dom";

const AddVyrobce = () => {
    const [newItem, setNewItem] = useState({
        adresa: undefined,
        nazev: undefined
    });

    const history = useHistory()

    const onNewItem = (event) => {
        event.preventDefault()
        BackendService.postNewVyrobce(newItem).then((resp) => {
            history.push("/vyrobce/AdminManageVyrob")
        })
    }

    const changeValue = (event) => {
        setNewItem({...newItem, [event.target.name]: event.target.value})
    }

    return (
        <div>
            <AppNavbar/>
            <div style={{
                marginTop: "20px"
            }
            }>
                <Form onSubmit={(event) => {
                    onNewItem(event)
                }}>
                    <Input placeholder="adresa" name='adresa' onChange={(event) => {
                        changeValue(event)
                    }}/>
                    <Input placeholder="nazev" name='nazev' onChange={(event) => {
                        changeValue(event)
                    }}/>
                    <Button type="submit">Přidat</Button>
                </Form>
            </div>
        </div>
    )
}

export default AddVyrobce