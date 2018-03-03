import * as React from 'react';
import {Button} from "reactstrap";


export default class Building extends  React.Component {

    constructor(props){
        super(props);
        this.state = {
            "id": props.data.id,
            "name": props.data.name,
            "address": props.data.address
        };
    }

    componentDidMount() {

    }

    render() {
        const {id, name ,address } = this.state;

        return (
            <React.Fragment>
                <td>{id}</td>
                <td>{name}</td>
                <td>{address}</td>
                <td>
                    <Button className="mr-2" color="info">Edit</Button>
                    <Button className="mr-2" color="danger" onClick={() => this.props.onDelete(id)}>Delete</Button>
                </td>
            </React.Fragment>
        )
    }

}