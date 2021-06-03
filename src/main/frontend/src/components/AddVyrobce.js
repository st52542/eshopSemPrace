import React, {useState} from "react";
import {Button, Form, Input} from "reactstrap";
import BackendService from "../services/BackendService";
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