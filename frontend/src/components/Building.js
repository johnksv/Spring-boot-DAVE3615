import * as React from 'react';
import {Button} from "reactstrap";


export default class Building extends  React.Component {



    render() {
        const {id, name ,address, numberOfRooms} = this.props.data;

        return (
            <React.Fragment>
                <td>{id}</td>
                <td>{name}</td>
                <td>{address}</td>
                <td>{numberOfRooms}</td>
                <td>
                    <Button className="mr-2" color="info">Edit</Button>
                    <Button className="mr-2" color="danger" onClick={() => this.props.onDelete("building", id)}>Delete</Button>
                </td>
            </React.Fragment>
        )
    }

}