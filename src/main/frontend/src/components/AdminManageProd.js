import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom"
import {Alert, Button, Container} from "react-bootstrap";
import '../App.css';
import BackendService from "../services/BackendService";
import paginationFactory, {
    PaginationListStandalone,
    PaginationProvider,
    PaginationTotalStandalone,
    SizePerPageDropdownStandalone
} from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";

const AdminManageProd = () => {
    const [item, setItems] = useState([]);
    const history = useHistory()

    useEffect(() => {
        BackendService.getProduktList()
            .then((resp) => {
                console.log(resp)
                setItems(resp.data)
            }, (error) => {
                console.log(error.toString())
            })
    }, []);

    const onDeleteItem = (itemToDelete) => {
        BackendService.deleteProdukt(itemToDelete.id).then((resp) => {
            const filtered = item.filter(item => item.id !== itemToDelete.id)
            setItems(filtered)
        })
    }

    const onAddItem = () => {
        history.push("/produkt/AddProduct")
    }

    const actionsFormatter = (cell, row) =>
        <Button type="submit" onClick={(event) => {
            onDeleteItem(row)
        }}>smaz produkt</Button>

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
    }, {
        dataField: 'slevaProcenta',
        text: 'Sleva produktu',
        sort: true
    }, {
        dataField: 'popis',
        text: 'Popis produktu',
    }, {
        dataField: 'vyrobce.nazev',
        text: 'Vyrobce',
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
                                        {...paginationTableProps}
                                    />
                                    <PaginationListStandalone
                                        {...paginationProps}
                                    />
                                </div>
                            )
                        }
                    </PaginationProvider>}
                    <Button type="submit" onClick={(event) => {
                        onAddItem()
                    }}>pridej novy produkt</Button>
                </div>
            </Container>
        </div>
    );
}

export default AdminManageProd;