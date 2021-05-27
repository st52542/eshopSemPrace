import React, {Component} from 'react';
import AppNavbar from './AppNavbar';
import {Alert, Button, Container} from "react-bootstrap";
import '../App.css';
import BackendService from "../services/BackendService";

class AdminManagePlat extends Component {

    state = {
        platbaALL: []
    };

    constructor(props) {
        super(props);
    }

    nacteniVse = () => {
        BackendService.getPlatbaList()
            .then((response) => {
                    console.log(response)
                    this.setState({platbaALL: response.data})
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
        BackendService.deletePlatba(id)
            .then((response) => {
                this.nacteniVse()
            })
    }
    onAddDop = (event) => {
        console.log(event.target.name)
        this.props.history.push("/platba/AddPlatba")
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
                            <h2>Zde je seznam vsech plateb</h2>
                        </Alert>
                        {this.state.platbaALL && this.state.platbaALL.length > 0 && this.state.platbaALL.map(platba =>
                            <div key={platba.id}>
                                ({platba.popis})
                                ({platba.prevod})
                                <Button type="submit" onClick={(event) => {
                                    this.onDeleteDop(event, platba.id)
                                }}>smaz platba</Button>
                            </div>
                        )}
                        <Button type="submit" onClick={(event) => {
                            this.onAddDop(event)
                        }}>pridej novy platba</Button>
                    </div>
                </Container>
            </div>
        )
            ;
    }
}

export default AdminManagePlat;