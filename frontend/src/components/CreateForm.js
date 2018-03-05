import * as React from 'react';
import axios from "axios";
import {Button, Form, FormGroup, Input, Label, FormText} from "reactstrap";

const instance = axios.create({
    baseURL: 'http://localhost:8080/'
});

const validFormat = 'Allowed characters are norwegian, numbers, "-" and space.';
const validFormatNumber = 'Number must be between -5 and 100';
const errorMessage = "Could not save to server. It may be due to invalid input. Please try again.";

export default class CreateForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: {},
            errorMessage: ""
        };
    }


    render() {
        const {type} = this.props;

        let data;
        if (type === "buildings") {
            data = this.createBuilding();

        } else if (type === "rooms") {
            data = this.createRoom()
        }

        return (
            <React.Fragment>
                <h3>Add {type.slice(0, -1)}</h3>
                {data}
            </React.Fragment>
        );
    }

    createBuilding() {
        return <Form onSubmit={(event) => this.submitForm(event)} autoComplete="off">
            <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" id="name" pattern="[a-zA-ZæøåÆØÅ\-\d]+[\sa-zA-ZæøåÆØÅ\d]*"
                       onChange={(event) => this.handleInputChange(event, "name")}/>
                <FormText>{validFormat}</FormText>
            </FormGroup>

            <FormGroup>
                <Label for="address">Address</Label>
                <Input type="text" name="address" id="address" pattern="[a-zA-ZæøåÆØÅ\-\d]+[\sa-zA-ZæøåÆØÅ\d]*"
                       onChange={(event) => this.handleInputChange(event, "address")}/>
                <FormText>{validFormat}</FormText>
            </FormGroup>
            <p>{this.state.errorMessage}</p>
            <Button color="primary" type="submit">Add new</Button>
        </Form>
    }

    createRoom() {
        return <Form onSubmit={(event) => this.submitForm(event)} autoComplete="off">
            <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" id="name" pattern="[a-zA-ZæøåÆØÅ\-\d]+[\sa-zA-ZæøåÆØÅ\d]*"
                       onChange={(event) => this.handleInputChange(event, "name")}/>
                <FormText>{validFormat}</FormText>
            </FormGroup>

            <FormGroup>
                <Label for="floor">Floor</Label>
                <Input type="number" name="floor" id="floor" min="-5" max="100"
                       onChange={(event) => this.handleInputChange(event, "floor")}/>
                <FormText>{validFormatNumber}</FormText>
            </FormGroup>

            <FormGroup>
                <Label for="category">Category</Label>
                <Input type="text" name="category" id="category" pattern="[a-zA-ZæøåÆØÅ\-\d]+[\sa-zA-ZæøåÆØÅ\d]*"
                       onChange={(event) => this.handleInputChange(event, "category")}/>
                <FormText>{validFormat}</FormText>
            </FormGroup>

            <p>{this.state.errorMessage}</p>
            <Button color="primary" type="submit">Add new</Button>
        </Form>
    }

    handleInputChange(event, field) {

        const val = event.target.value;
        this.setState({
            userData: {...this.state.userData, [field]: val}
        });
    }

    submitForm(event) {
        event.preventDefault();
        const {type, buildingId} = this.props;
        let url = type;
        if (type === "rooms") {
            url = `buildings/${buildingId}/rooms`;
        }

        instance
            .post(url, this.state.userData)
            .then(resp => {
                console.log("New data added:");
                console.log(resp.data);
                this.props.onCreateSuccess(type, resp.data);
            })
            .catch(() => this.setState({
                errorMessage
            }));

    }
}