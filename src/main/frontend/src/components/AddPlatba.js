import React, {useState} from "react";
import AppNavbar from './AppNavbar';
import {Button, Form, Input} from "reactstrap";
import BackendService from "../services/BackendService";
import {useHistory} from "react-router-dom";

const AddPlatba = () => {
    const [newItem, setNewItem] = useState({
        popis: undefined,
        prevod: 0
    });

    const history = useHistory()

    const onNewItem = (event) => {
        event.preventDefault()
        BackendService.postNewPlatba(newItem).then((resp) => {
            history.push("/platba/AdminManagePlat")
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
                    <Input placeholder="popis" name='popis' onChange={(event) => {
                        changeValue(event)
                    }}/>
                    <Input placeholder="prevod" name='prevod' onChange={(event) => {
                        changeValue(event)
                    }}/>
                    <Button type="submit">Přidat</Button>
                </Form>
            </div>
        </div>
    )
}

export default AddPlatba

