import React, {useEffect, useState} from 'react';
import {Alert, Container} from "react-bootstrap";
import '../App.css';
import BackendService from "../services/BackendService";
import {useParams} from "react-router-dom";

const DetailNakup = () => {
    const [item, setItems] = useState([]);
    const [itemN, setItemsN] = useState([]);
    const {id} = useParams()

    useEffect(() => {
            BackendService.getDetailNakupu(id)
                .then((resp) => {
                    console.log(resp)
                    setItems(resp.data)
                }, (error) => {
                    console.log(error.toString())
                })
            BackendService.getDetailNakupuPolozky(id).then((resps) => {
                setItemsN(resps.data)
            }, (error) => {
                console.log(error.toString())
            })
        }, [id]);


    return (
        <div>
            <Container fluid>
                <div style={{
                    marginTop: "20px"
                }
                }>
                    <Alert variant="primary">
                        <h2>Zde je detail objednavky</h2>
                    </Alert>
                    objednavka cislo:
                    {item.objednavka}{"\n"}
                    vytvorena:
                    {item.datumVytvoreni}{"\n"}
                    stav schvaleni:
                    {String(item.stav)}{"\n"}
                    {itemN && itemN.length > 0 && itemN.map(nakup =>
                        <div key={nakup.id}>
                            nazev produktu:
                            {nakup.produkt.nazev}{"\n"}
                            cena produktu:
                            {nakup.produkt.cena}{"\n"}
                        </div>
                    )}
                </div>
            </Container>
        </div>
    )
        ;
}

export default DetailNakup;