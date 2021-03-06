import React, {useEffect, useState} from 'react';
import {Alert, Button, Container} from "react-bootstrap";
import '../App.css';
import BackendService from "../services/BackendService";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
    PaginationProvider, PaginationListStandalone, PaginationTotalStandalone, SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';

import filterFactory, {numberFilter} from 'react-bootstrap-table2-filter';

const Products = () => {
    const [item, setItems] = useState([]);
    const [Cart, setCart] = useState([]);

    useEffect(() => {
        BackendService.getProduktList()
            .then((resp) => {
                console.log(resp)
                setItems(resp.data)
            }, (error) => {
                console.log(error.toString())
            })
        if (JSON.parse(localStorage.getItem('kosik')) != null) {
            setCart(JSON.parse(localStorage.getItem('kosik')))
        }
    }, []);

    const OnAddToCart = async (id) => {
        const blel = [...Cart, id]
        /*        useEffect(() => {
                    setCart(Blel)
                    localStorage.setItem('kosik', JSON.stringify(Blel));
                }, [Cart]);*/
        await setCart(blel)
        await localStorage.setItem('kosik', JSON.stringify(blel));
    }

    const actionsFormatter = (cell, row) =>
        <Button type="submit" onClick={(event) => {
            OnAddToCart(row)
        }}>Pridej do kosiku</Button>

    const paginationOption = {
        custom: true,
        totalSize: item.length
    };

    const columns = [{
        dataField: 'nazev',
        text: 'Nazev',
        sort: true
    }, {
        dataField: 'cena',
        text: 'Cena',
        sort: true,
        filter: numberFilter()
    }, {
        dataField: 'slevaProcenta',
        text: 'Sleva produktu',
        sort: true
    }, {
        dataField: 'popis',
        text: 'Popis produktu',
    }, {
        dataField: 'akce',
        text: 'Pridej si me do kosiku',
        isDummyField: true,
        csvExport: false,
        formatter: actionsFormatter
    }];


    return (
        <div>
            <Container fluid>
                <div style={{
                    marginTop: "20px"
                }
                }>
                    <Alert variant="primary">
                        <h2>Zde je seznam vsech produktu</h2>
                    </Alert>
                    {item && <PaginationProvider
                        pagination={paginationFactory(paginationOption)}
                    >
                        {
                            ({
                                 paginationProps,
                                 paginationTableProps
                             }) => (
                                <div>
                                    <SizePerPageDropdownStandalone
                                        {...paginationProps}
                                    />
                                    <PaginationTotalStandalone
                                        {...paginationProps}
                                    />
                                    <BootstrapTable
                                        keyField="id"
                                        data={item}
                                        columns={columns}
                                        filter={filterFactory()}
                                        {...paginationTableProps}
                                    />
                                    <PaginationListStandalone
                                        {...paginationProps}
                                    />
                                </div>
                            )
                        }
                    </PaginationProvider>}
                </div>
            </Container>
        </div>
    )
        ;
}

export default Products;