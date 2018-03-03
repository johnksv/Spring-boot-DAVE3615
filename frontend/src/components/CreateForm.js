import * as React from 'react';
import axios from "axios";
import {Button , Form, FormGroup, Input, Label, FormText} from "reactstrap";

const instance = axios.create({
    baseURL: 'http://localhost:8080/'
  });

const validFormat = 'Allowed characters are norwegian, numbers, "-" and space.';

export default class CreateForm extends  React.Component {

    constructor(props){
        super(props);
        this.state = {
            userData: {}
        };
    }


    render(){
        return <Form onSubmit={(event) => this.submitForm(event)} autoComplete="off">
            <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" id="name" pattern="[a-zA-ZæøåÆØÅ\-\d]+\s*[a-zA-ZæøåÆØÅ\d]*" onChange={(event) => this.handleInputChange(event,"name")} />
                <FormText>{validFormat}</FormText>
            </FormGroup>

            <FormGroup>
                <Label for="address">Address</Label>
                <Input type="text" name="address" id="address" pattern="[a-zA-ZæøåÆØÅ\-\d]+\s*[a-zA-ZæøåÆØÅ\d]*" onChange={(event) => this.handleInputChange(event, "address")}/>
                <FormText>{validFormat}</FormText>
            </FormGroup>
            <Button color="primary" type="submit">Add new</Button>
        </Form> 
    }

    handleInputChange(event, field){
        
        const val = event.target.value;
        this.setState({
            userData: {...this.state.userData, [field]: val }
        });
    }

    submitForm(event) {
        event.preventDefault();

        const userData = this.state.userData;

        let bodyFormData = new FormData();
        bodyFormData.set("name", userData.name);
        bodyFormData.set("address", userData.address);

        console.log(bodyFormData);
        instance
            .post("buildings", bodyFormData)
            .then(resp => {
                console.log(resp);
                this.props.onCreateSuccess("building", resp.data);
            });
            
    }
}