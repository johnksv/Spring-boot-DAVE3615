import * as React from 'react';
import axios from "axios";
import {Button, Table, Form, FormGroup, Input, Label, FormText} from "reactstrap";
import Building from "./Building";

const instance = axios.create({
    baseURL: 'http://localhost:8080/'
  });

export default class DisplayTable extends  React.Component {

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

    

}