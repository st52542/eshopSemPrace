import React, {Component} from 'react';
import AppNavbar from './AppNavbar';
import {Alert, Button, Container} from "react-bootstrap";
import '../App.css';
import BackendService from "../services/BackendService";

class AdminManageProd extends Component {

    state = {
        dopravaALL: []
    };

    constructor(props) {
        super(props);
    }

    nacteniVse = () => {
        BackendService.getDopravaList()
            .then((response) => {
                    console.log(response)
                    this.setState({dopravaALL: response.data})
                },
                (error) => {
                    console.log(error.toString())
                })
    }

    async componentDidMount() {
        this.nacteniVse()
    }

    onDeleteDop = (event, id) => {
        console.log(event.target.name)
        BackendService.deleteDoprava(id)
            .then((response) => {
                this.nacteniVse()
            })
    }
    onAddDop = (event) => {
        console.log(event.target.name)
        this.props.history.push("/doprava/AddDoprava")
    }

    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div style={{
                        marginTop: "20px"
                    }
                    }>
                        <Alert variant="primary">
                            <h2>Zde je seznam vsech doprav</h2>
                        </Alert>
                        {this.state.dopravaALL && this.state.dopravaALL.length > 0 && this.state.dopravaALL.map(dopravy =>
                            <div key={dopravy.id}>
                                ({dopravy.popis})
                                ({dopravy.cena})
                                <Button type="submit" onClick={(event) => {
                                    this.onDeleteDop(event, dopravy.id)
                                }}>smaz dopravy</Button>
                            </div>
                        )}
                        <Button type="submit" onClick={(event) => {
                            this.onAddDop(event)
                        }}>pridej novy dopravy</Button>
                    </div>
                </Container>
            </div>
        )
            ;
    }
}

export default AdminManageProd;