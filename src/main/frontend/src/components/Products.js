import React, {useEffect, useState} from 'react';
import AppNavbar from './AppNavbar';
import {Alert, Button, Container} from "react-bootstrap";
import '../App.css';
import BackendService from "../services/BackendService";

const Products = () => {
    const [item, setItems] = useState([]);

    const [newItem] = useState({
        min: 0,
        max: 0
    });

    useEffect(() => {
        BackendService.getProduktList()
            .then((resp) => {
                console.log(resp)
                setItems(resp.data)
            }, (error) => {
                console.log(error.toString())
            })
    }, []);

    const nastavOdNejmensiho = () => {
        BackendService.getProduktASC().then((resp) => {
            setItems(resp.data)
        }, (error) => {
            console.log(error.toString())
        })
    }

    const nastavOdNejvetsiho = () => {
        BackendService.getProduktDESC().then((resp) => {
            setItems(resp.data)
        }, (error) => {
            console.log(error.toString())
        })
    }

    const nastavFiltrNjelevnejsi = () => {
        BackendService.getProductsLow().then((resp) => {
            setItems(resp.data)
        }, (error) => {
            console.log(error.toString())
        })
    }

    const nastavFiltrStred = () => {
        BackendService.getProductsMiddle().then((resp) => {
            setItems(resp.data)
        }, (error) => {
            console.log(error.toString())
        })
    }

    const nastavFiltrNejdrazsi = () => {
        BackendService.getProductsHigh().then((resp) => {
            setItems(resp.data)
        }, (error) => {
            console.log(error.toString())
        })
    }

    const nastavStankovani = () => {
        newItem.max=newItem.max+5
        BackendService.getStrankovani(newItem)
            .then((resp) => {
                setItems(resp.data.content)
            }, (error) => {
                console.log(error.toString())
            })
    }

    const onAddToCart = (id) => {
        BackendService.getCartAddItem(id).then()
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
                        <h2>Zde je seznam vsech produktu</h2>
                    </Alert>
                    <h2>Filtrovani produktu dle ceny</h2>
                    <Button type="submit" onClick={nastavOdNejmensiho}>Serad od nejmensi ceny</Button>
                    <Button type="submit" onClick={nastavOdNejvetsiho}>Serad od nejvetsi ceny</Button>
                    <Button type="submit" onClick={nastavFiltrNjelevnejsi}>Vyfiltruj nejlevnejsi</Button>
                    <Button type="submit" onClick={nastavFiltrStred}>Vyfiltruj stred</Button>
                    <Button type="submit" onClick={nastavFiltrNejdrazsi}>Vyfiltruj nejdrazsi</Button>
                    <Button type="submit" onClick={nastavStankovani}>Strankuj a nacti dalsi</Button>
                    {item && item.length > 0 && item.map(produkt =>
                        <div key={produkt.id}>
                            nazev produktu: {produkt.nazev}, popis produktu: {produkt.popis},
                            cena produktu: {produkt.cena}, nazev produktu: {produkt.popis},
                            sleva: {produkt.slevaProcenta}, vyrobce: {produkt.vyrobce && (produkt.vyrobce.nazev)}
                            <Button type="submit" onClick={(event) => {
                                onAddToCart(produkt.id)
                            }}>Pridej do kosiku</Button>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    )
        ;
}

export default Products;