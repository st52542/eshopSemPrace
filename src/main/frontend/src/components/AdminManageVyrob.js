import React, {Component} from 'react';
import AppNavbar from './AppNavbar';
import {Alert, Button, Container} from "react-bootstrap";
import '../App.css';
import BackendService from "../services/BackendService";

class AdminManageVyrob extends Component {

    stateAll = {
        vyrobALL: []
    };

    constructor(props) {
        super(props);
    }

    nacteniVse = () => {
        BackendService.getVyrobceList()
            .then((response) => {
                    console.log(response)
                    this.setState({vyrobALL: response.data})
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
        BackendService.deleteVyrobce(id)
            .then((response) => {
                this.nacteniVse()
            })
    }
    onAddDop = (event) => {
        console.log(event.target.name)
        this.props.history.push("/AddVyrobce")
    }

    render() {
        const {vyrobALL} = this.state;
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div style={{
                        marginTop: "20px"
                    }
                    }>
                        <Alert variant="primary">
                            <h2>Zde je seznam vsech vyrobcu</h2>
                        </Alert>
                        {vyrobALL && vyrobALL.length > 0 && vyrobALL.map(vyrobce =>
                            <div key={vyrobce.id}>
                                ({vyrobce.nazev})
                                ({vyrobce.adresa})
                                <Button type="submit" onClick={(event) => {
                                    this.onDeleteDop(event, vyrobce.id)
                                }}>smaz vyrobce</Button>
                            </div>
                        )}
                        <Button type="submit" onClick={(event) => {
                            this.onAddDop(event)
                        }}>pridej novy vyrobce</Button>
                    </div>
                </Container>
            </div>
        )
            ;
    }
}

export default AdminManageVyrob;