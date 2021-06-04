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

const AdminManageVyrob =()=> {

    const [item, setItems] = useState([]);
    const history = useHistory()

    useEffect(() => {
        BackendService.getVyrobceList()
            .then((resp) => {
                console.log(resp)
                setItems(resp.data)
            }, (error) => {
                console.log(error.toString())
            })
    }, []);

    const onDeleteItem = (itemToDelete) => {
        BackendService.deleteVyrobce(itemToDelete.id).then((resp) => {
            const filtered = item.filter(item => item.id !== itemToDelete.id)
            setItems(filtered)
        })
    }

    const onAddItem = () => {
        history.push("/vyrobce/AddVyrobce")
    }
    const actionsFormatter = (cell, row) =>
        <Button type="submit" onClick={(event) => {
            onDeleteItem(row)
        }}>Odeber vyrobce</Button>

    const paginationOption = {
        custom: true,
        totalSize: item.length
    };

    const columns = [{
        dataField: 'nazev',
        text: 'jmeno vyrobce',
        sort: true
    }, {
        dataField: 'adresa',
        text: 'adresa vyrobce',
    }, {
        dataField: 'akce',
        text: 'prace s vyrobci',
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
                            <h2>Zde je seznam vsech vyrobcu</h2>
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
                        }}>pridej novy vyrobce</Button>
                    </div>
                </Container>
            </div>
        )
            ;
}

export default AdminManageVyrob;