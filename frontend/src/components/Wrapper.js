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
        this.onCreateSuccess = this.onCreateSuccess.bind(this);
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
            const buildingData = this.state.buildingData.find(element => element.id + "" === id);
            const roomData = this.state.roomData.filter(value => value.buildingId === id);
            const data = {
                buildingData: buildingData === undefined ? [] : buildingData,
                roomData
            };

            if (data) {
                return (
                    <React.Fragment>
                        <h1>Building: {data.name}</h1>
                        <Link className="mr-2 mt-2" to={`/details/`}>Back to details</Link>
                        <p>Number of rooms: {roomData.length}</p>

                        <h2>Rooms</h2>
                        <DisplayTable type={"rooms"} data={data}
                                      onDelete={this.onDeleteEvent}/>
                        <hr/>
                        <CreateForm type={"rooms"} onCreateSuccess={this.onCreateSuccess}/>
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
                              onDelete={this.onDeleteEvent}/>
                <hr/>
                <CreateForm type={"buildings"} onCreateSuccess={this.onCreateSuccess}/>
            </React.Fragment>
        )
    }


    onCreateSuccess(type, newEntity) {
        if (type === "buildings") {
            const newData = [...this.state.buildingData, newEntity];
            this.setState(
                {
                    buildingData: newData
                });
        } else if (type === "rooms") {

        }
    }

    onUpdateSuccess(type, newEntity) {
        if (type === "building") {
            //TODO: Insert updated
            const newData = [...this.state.buildingData, newEntity];
            this.setState(
                {
                    buildingData: newData
                });
        }
    }


    onDeleteEvent(type, id, parentId = undefined) {
        let newState;
        let url;

        if (type === "buildings") {
            url = `buildings/${id}`;
            newState = this.state.buildingData.filter(element => element.id !== id);

        } else if (type === "rooms") {
            url = `rooms/${id}`;
            let parent = this.state.buildingData.find(element => element.id === parentId);
            let newRooms = parent.rooms.filter(element => element.id !== id);
            //TODO:Check how to remove from state
            debugger;
        }

        instance.delete(url).then(resp => {
            this.setState({
                buildingData: newState
            });
            console.log("Data with id " + id + " is deleted, of type " + type);
        });
    }

}