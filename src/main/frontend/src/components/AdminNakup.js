import React, {useEffect, useState} from 'react';
import {Alert, Button, Container} from "react-bootstrap";
import '../App.css';
import BackendService from "../services/BackendService";
import {useHistory} from "react-router-dom";
import paginationFactory, {
    PaginationListStandalone,
    PaginationProvider,
    PaginationTotalStandalone,
    SizePerPageDropdownStandalone
} from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";

const AdminNakup = () => {
    const [item, setItems] = useState([]);
    const history = useHistory()

    useEffect(() => {
        BackendService.getNakupy()
            .then((resp) => {
                console.log(resp)
                setItems(resp.data)
            }, (error) => {
                console.log(error.toString())
            })
    }, []);

    const onViewDetail= (itemToView) => {
        history.push("/obj/DetailNakup/" + itemToView)
    }

    const onAccept= (id) => {
        BackendService.getPotvrdObj(id)
            .then((resp) => {
                console.log(resp)
            }, (error) => {
                console.log(error.toString())
            })
        window.location.reload();
    }

    const actionsFormatter = (cell, row) =>
        <Button type="submit" onClick={(event) => {
            onAccept(row.id)
        }}>Potvrd objednavku</Button>

    const actionsFormatters = (cell, row) =>
        <Button type="submit" onClick={(event) => {
            onViewDetail(row.id)
        }}>Zobraz detail</Button>


    const paginationOption = {
        custom: true,
        totalSize: item.length
    };

    const columns = [{
        dataField: 'objednavka',
        text: 'cislo objednavky',
        sort: true
    }, {
        dataField: 'datumVytvoreni',
        text: 'datum vytvoreni objednavky',
        sort: true,
    }, {
        dataField: 'stav',
        text: 'stav objednavky',
        sort: true
    }, {
        dataField: 'detail',
        text: 'Zobraz deatily',
        isDummyField: true,
        csvExport: false,
        formatter: actionsFormatter
    }, {
        dataField: 'potvrzeni',
        text: 'Potvrzeni objednavky',
        isDummyField: true,
        csvExport: false,
        formatter: actionsFormatters
    }];


    return (
        <div>
            <Container fluid>
                <div style={{
                    marginTop: "20px"
                }
                }>
                    <Alert variant="primary">
                        <h2>Zde je seznam vsech objednavek</h2>
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
                </div>
            </Container>
        </div>
    )
        ;
}

export default AdminNakup;