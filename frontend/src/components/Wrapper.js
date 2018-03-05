import * as React from 'react';
import CreateForm from "./CreateForm";
import DisplayTable from "./DisplayTable"
import axios from "axios";
import {Link} from 'react-router-dom';

const instance = axios.create({
    baseURL: 'http://localhost:8080/'
});


export default class Wrapper extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeRoomId: -1,
            buildingData: [],
            roomData: [],
            hasLoadedData: false,
            errorLoadningData: false
        };

        this.onDeleteEvent = this.onDeleteEvent.bind(this);
        this.editedEntity = this.editedEntity.bind(this);
    }

    componentDidMount() {
        instance
            .get("buildings")
            .then(resp => {
                this.loadRoomData();
                this.setState({buildingData: resp.data});
            }).catch(error => this.setState(
            {
                buildingData: [],
                hasLoadedData: true,
                errorLoadningData: true,
            }));
    }

    loadRoomData() {
        instance
            .get("rooms")
            .then(resp => {
                this.setState(
                    {
                        roomData: resp.data,
                        hasLoadedData: true,
                        errorLoadningData: false,
                    });
            }).catch(error => this.setState(
            {
                roomData: [],
                hasLoadedData: true,
                errorLoadningData: true,
            }));
    }


    render() {
        if (this.props.match.params.buildingId) {
            const id = this.props.match.params.buildingId;
            const buildingData = this.state.buildingData.find(element => element.id === Number(id));
            const roomData = this.state.roomData.filter(value => value.buildingId === Number(id));
            const data = {
                buildingData: buildingData === undefined ? [] : buildingData,
                roomData
            };

            if (buildingData !== undefined) {
                return (
                    <React.Fragment>
                        <h1>Building: {data.name}</h1>
                        <Link className="mr-2 mt-2" to={`/details/`}>Back to details</Link>
                        <p>Number of rooms: {roomData.length}</p>

                        <h2>Rooms</h2>
                        <DisplayTable type={"rooms"} data={data}
                                      onUpdateSuccess={this.editedEntity}
                                      onDelete={this.onDeleteEvent}/>
                        <hr/>
                        <CreateForm type={"rooms"} buildingId={buildingData.id} onCreateSuccess={this.editedEntity}/>
                    </React.Fragment>
                )
            } else {
                return <React.Fragment>
                    <p>Invalid ID. No buildings with id {id}</p>
                    <Link className="mr-2 mt-2" to={`/details/`}>Back to details</Link>
                </React.Fragment>
            }
        }

        const data = {
            buildingData: this.state.buildingData,
            roomData: this.state.roomData
        };

        return (
            <React.Fragment>
                <h1>Buildings:</h1>
                <DisplayTable type={"buildings"} data={data}
                              onUpdateSuccess={this.editedEntity}
                              onDelete={this.onDeleteEvent}/>
                <hr/>
                <CreateForm type={"buildings"} onCreateSuccess={this.editedEntity}/>
            </React.Fragment>
        )
    }


    editedEntity(type, newEntity) {
        if (type === "buildings") {
            const buildingData = this.state.buildingData.map(element => element.id === newEntity.id ? newEntity : element);
            this.setState(
                {
                    buildingData
                });
        } else if (type === "rooms") {
            const roomData = this.state.roomData.map(element => element.id === newEntity.id ? newEntity : element);
            this.setState({roomData});
        }
    }


    onDeleteEvent(type, id, buildingId = undefined) {
        let newState;
        let url;
        let field;

        if (type === "buildings") {
            url = `buildings/${id}`;
            field = "buildingData";
            newState = this.state.buildingData.filter(element => element.id !== id);

        } else if (type === "rooms") {
            url = `/buildings/${buildingId}/rooms/${id}`;
            field = "roomData";
            newState = this.state.roomData.filter(element => element.id !== id);
        }

        instance.delete(url).then(resp => {
            this.setState({
                [field]: newState
            });
            console.log("Data with id " + id + " is deleted, of type " + type);
        });
    }

}