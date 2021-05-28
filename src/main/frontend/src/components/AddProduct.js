import React, {useState} from "react";
import AppNavbar from './AppNavbar';
import {Button, Form, Input} from "reactstrap";
import BackendService from "../services/BackendService";
import {useHistory} from "react-router-dom";

const AddProduct = () => {

    const [newItem, setNewItem] = useState({
            nazev: undefined,
            popis: undefined,
            cena: 0,
            slevaProcenta: 0,
            vNabidce: false
    });
    const history = useHistory()

    const onNewItem = (event) => {
        event.preventDefault()
        newItem.vNabidce = true
        BackendService.postNewProdukt(newItem).then((resp) => {
            history.push("/produkt/AdminManageProd")
        })
    }

    const changeValue = (event) => {
        setNewItem({...newItem, [event.target.name] : event.target.value})
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
                    <Input placeholder="nazev" name='nazev' onChange={(event) => {
                        changeValue(event)
                    }}/>
                    <Input placeholder="popis" name='popis' onChange={(event) => {
                        changeValue(event)
                    }}/>
                    <Input placeholder="cena" name='cena' onChange={(event) => {
                        changeValue(event)
                    }}/>
                    <Input placeholder="slevaProcenta" name='slevaProcenta' onChange={(event) => {
                        changeValue(event)
                    }}/>
                    <Button type="submit">Přidat</Button>
                </Form>
            </div>
        </div>
    );
}

export default AddProduct