import * as React from 'react';
import {Button, Input} from "reactstrap";
import axios from "axios/index";
import {Link} from 'react-router-dom';

const instance = axios.create({
    baseURL: 'http://localhost:8080/'
});

export default class Building extends React.Component {

    constructor(props) {
        super(props);
        const {name, address} = this.props.data;

        this.state = {
            editing: false,
            editName: name,
            editAddress: address
        }
    }

    render() {
        const {id, numberOfRooms} = this.props.data;
        const name = this.state.editName;
        const address = this.state.editAddress;
        const btnAttr = {className: "mr-2 mt-2"};
        if (this.state.editing) {
            return (
                <React.Fragment>
                    <td>{id}</td>
                    <td><Input value={name} type="text" name="name" id="name"
                               pattern="[a-zA-ZæøåÆØÅ\-\d]+\s*[a-zA-ZæøåÆØÅ\d]*"
                               onChange={(event) => this.handleInputChange(event, "editName")}/></td>
                    <td><Input value={address} type="text" name="address" id="address"
                               pattern="[a-zA-ZæøåÆØÅ\-\d]+\s*[a-zA-ZæøåÆØÅ\d]*"
                               onChange={(event) => this.handleInputChange(event, "editAddress")}/></td>
                    <td>{numberOfRooms}</td>
                    <td>
                        <Button {...btnAttr} color="success"
                                onClick={() => this.submitChanges()}>Save</Button>
                        <Button {...btnAttr} color="secondary"
                                onClick={() => this.resetEdit()}>Cancel</Button>
                    </td>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{address}</td>
                    <td>{numberOfRooms}</td>
                    <td>
                        <Button {...btnAttr} color="info"
                                onClick={() => this.setState({editing: true})}>Edit</Button>

                        <Link className="btn btn-info mr-2 mt-2" to={`/building/${id}`}>Rooms</Link>

                        <Button {...btnAttr} color="danger"
                                onClick={() => this.props.onDelete("buildings", id)}>Delete</Button>
                    </td>
                </React.Fragment>
            )
        }
    }

    resetEdit() {
        const {name, address} = this.props.data;
        this.setState(
            {
                editing: false,
                editName: name,
                editAddress: address
            });
    }


    handleInputChange(event, field) {

        const val = event.target.value;
        this.setState({
            [field]: val
        });
    }

    submitChanges() {
        const {id} = this.props.data;
        const {editName, editAddress} = this.state;

        const url = "buildings/" + id;

        const data = {
            name: editName,
            address: editAddress,
        };


        instance
            .patch(url, data)
            .then(response => {
                this.setState({editing: false});
                this.props.onUpdateSuccess("buildings", response.data);
            })
            .catch(() => alert("Could not save to server. It may be due to invalid input. Please try again."));

    }

}