import * as React from 'react';
import axios from "axios";
import {Button, Table, Form, FormGroup, Input, Label, FormText} from "reactstrap";

const instance = axios.create({
    baseURL: 'http://localhost:8080/'
  });


const validFormat = 'Please use only english characters and numbers, "-" and space is also allowed.';

export default class CreateForm extends  React.Component {

    constructor(props){
        super(props);
        this.state = {
            type: props.type,
            userData: {}
        };
    }


    render(){
        return <Form onSubmit={(event) => this.submitForm(event)} autoComplete="off">
            <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" id="name" pattern="[a-zA-ZæøåÆØÅ\-\d]+\s*[a-zA-ZæøåÆØÅ\d]**" onChange={(event) => this.handleInputChange(event,"name")} />
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
        const type = this.state.type;
        const userData = this.state.userData;

        var bodyFormData = new FormData();
        bodyFormData.set("name", userData.name);
        bodyFormData.set("address", userData.address);

        console.log(bodyFormData);
        instance
            .post(type, bodyFormData)
            .then(resp => {
                console.log(resp);
                const newData = [...this.state.data, resp.data];
                this.setState(
                    {data: newData}
                );
            });
            
    }
}