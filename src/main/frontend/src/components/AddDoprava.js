import React, {useState} from "react";
import {Button, Form, Input} from "reactstrap";
import BackendService from "../services/BackendService";
import {useHistory} from "react-router-dom";

const AddDoprava = () => {
    const [newItem, setNewItem] = useState({
        cena: 0,
        popis: undefined
    });

    const history = useHistory()

    const onNewItem = (event) => {
        event.preventDefault()
        BackendService.postNewDoprava(newItem).then((resp) => {
            history.push("/doprava/AdminManageDop")
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
                    <Input placeholder="popis" name='popis' onChange={(event) => {
                        changeValue(event)
                    }}/>
                    <Input placeholder="cena" name='cena' onChange={(event) => {
                        changeValue(event)
                    }}/>
                    <Button name="submitButton" id="submitButton" type="submit">Přidat</Button>
                </Form>
            </div>
        </div>
    )
}

export default AddDoprava