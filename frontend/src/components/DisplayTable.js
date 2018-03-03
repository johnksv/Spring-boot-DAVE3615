import * as React from 'react';
import axios from "axios";
import {Button, Table, Form, FormGroup, Input, Label, FormText} from "reactstrap";
import { Building } from "./Building";

const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 1000,
  });


const validFormat = 'Please use only english characters and numbers, "-" and space is also allowed.';

export class DisplayTable extends  React.Component {

    constructor(props){
        super(props);
        this.state = {
            type: props.type,
            data: [],
            userData: {}
        };
        this.onDeleteBuilding = this.onDeleteBuilding.bind(this);
    }

    componentDidMount() {
        const type  = this.props.type;
        instance
            .get(`${type}`)
            .then( resp => {
                if(resp.status === 200){
                    this.setState({data: resp.data});
                }else {
                    this.setState({data: null});
                }
            });
    }

    render() {
        const data = this.state.data;
        return (
            <div>
                <Table responsive>
                <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Address</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
           {data.map(element => {
               return <tr key={element.id}>
                        <Building data={element} key={"B"+element.id} onDelete={this.onDeleteBuilding}/>
                   </tr>
           })}
        </tbody>
                </Table>


        <Form onSubmit={(event) => this.submitForm(event)}>
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
            </div>
        )
    }

    onDeleteBuilding(id) {
        
        const data = this.state.data.filter(element => element.id !== id);
        const type = this.state.type;
    
        instance.delete(`${type}/${id}`).then(resp => {
            this.setState({data});
            console.log("Data with id " + id +" is deleted");
        });

        
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
            .then(resp => console.log(resp));
            
    }

}