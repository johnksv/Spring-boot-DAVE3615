import * as React from 'react';
import axios from "axios";
import {Button, Form, FormGroup, Input, Label, FormText} from "reactstrap";

const instance = axios.create({
    baseURL: 'http://localhost:8080/'
});

const validFormat = 'Allowed characters are norwegian, numbers, "-" and space.';
const validFormatNumber = 'Number must be between -5 and 100';
const errorMessage = "Could not save to server. It may be due to invalid input. Please try again.";

const buildingFields = [
    "name",
    "address"
];

const roomFields = [
    "name",
    "floor"
];

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

        if (type === "building") {
            return this.createBuilding()
        } else if (type === "room") {
            return this.createRoom()
        } else if (type === "category") {
            return this.createBuilding()
        }

    }

    createBuilding() {
        return <Form onSubmit={(event) => this.submitForm(event)} autoComplete="off">
            <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" id="name" pattern="[a-zA-ZæøåÆØÅ\-\d]+\s*[a-zA-ZæøåÆØÅ\d]*"
                       onChange={(event) => this.handleInputChange(event, "name")}/>
                <FormText>{validFormat}</FormText>
            </FormGroup>

            <FormGroup>
                <Label for="address">Address</Label>
                <Input type="text" name="address" id="address" pattern="[a-zA-ZæøåÆØÅ\-\d]+\s*[a-zA-ZæøåÆØÅ\d]*"
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
                <Input type="text" name="name" id="name" pattern="[a-zA-ZæøåÆØÅ\-\d]+\s*[a-zA-ZæøåÆØÅ\d]*"
                       onChange={(event) => this.handleInputChange(event, "name")}/>
                <FormText>{validFormat}</FormText>
            </FormGroup>

            <FormGroup>
                <Label for="floor">Floor</Label>
                <Input type="number" name="floor" id="floor" min="-5" max="100"
                       onChange={(event) => this.handleInputChange(event, "address")}/>
                <FormText>{validFormatNumber}</FormText>
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

        const entires = Object.entries(this.state.userData);

        let bodyFormData = new FormData();
        for (let i = 0; i < entires.length; i++) {
            let entry = entires[i];
            bodyFormData.set(entry[0], entry[1]);
        }

        console.log(bodyFormData);
        //TODO: Map url so it fit all
        instance
            .post("buildings", bodyFormData)
            .then(resp => {
                console.log(resp);
                this.props.onCreateSuccess("building", resp.data);
            })
            .catch(err => this.setState({
                errorMessage
            }));

    }
}