import * as React from 'react';
import {Button, Input} from "reactstrap";
import instance  from "../AxiosInstance";

export default class Room extends React.Component {

    constructor(props) {
        super(props);
        const {name, floor, category} = this.props.room;

        this.state = {
            editing: false,
            editName: name,
            editFloor: floor,
            editCategory: category.name
        }
    }

    render() {
        const {id, buildingId} = this.props.room;
        const name = this.state.editName;
        const floor = this.state.editFloor;
        const category = this.state.editCategory;

        const btnAttr = {className: "mr-2 mt-2"};
        if (this.state.editing) {
            return (
                <React.Fragment>
                    <td>{id}</td>
                    <td>
                        <Input value={name} type="text" name="name" id="name"
                               pattern="[a-zA-ZæøåÆØÅ\-\d]+\s*[a-zA-ZæøåÆØÅ\d]*"
                               onChange={(event) => this.handleInputChange(event, "editName")}/>
                    </td>
                    <td>
                        <Input value={floor} type="number" name="floor" id="floor"
                               min="-5" max="100"
                               onChange={(event) => this.handleInputChange(event, "editFloor")}/>
                    </td>
                    <td>
                        <Input value={category} type="text" name="category" id="category"
                               pattern="[a-zA-ZæøåÆØÅ\-\d]+\s*[a-zA-ZæøåÆØÅ\d]*"
                               onChange={(event) => this.handleInputChange(event, "editCategory")}/>
                    </td>
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
                    <td>{floor}</td>
                    <td>{category}</td>
                    <td>
                        <Button {...btnAttr} color="info"
                                onClick={() => this.setState({editing: true})}>
                            Edit
                        </Button>

                        <Button {...btnAttr} color="danger"
                                onClick={() => this.props.onDelete("rooms", id, buildingId)}>
                            Delete
                        </Button>
                    </td>
                </React.Fragment>
            )
        }
    }

    resetEdit() {
        const {name, floor, category} = this.props.room;
        this.setState(
            {
                editing: false,
                editName: name,
                editFloor: floor,
                editCategory: category.name
            });
    }


    handleInputChange(event, field) {
        const  val = event.target.value;
        this.setState({
            [field]: val
        });
    }

    submitChanges() {
        const {id} = this.props.room;
        const {editName, editFloor, editCategory} = this.state;

        const url = "rooms/" + id;

        const data = {
            name: editName,
            floor: editFloor,
            category: editCategory
        };

        instance
            .patch(url, data)
            .then(response => {
                this.setState({editing: false});
                this.props.onUpdateSuccess("rooms", response.data);
            })
            .catch(() => alert("Could not save to server. It may be due to invalid input. Please try again."));

    }

}