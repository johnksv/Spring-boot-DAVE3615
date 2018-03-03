import * as React from 'react';
import CreateForm from "./CreateForm";
import DisplayTable from "./DisplayTable"
import axios from "axios";


const instance = axios.create({
    baseURL: 'http://localhost:8080/'
});


export default class Wrapper extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeRoomId: -1,
            buildingData: [],
            userFormData: {},
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

                this.setState(
                    {
                        buildingData: resp.data,
                        hasLoadedData: true,
                        errorLoadningData: false,
                    });
            }).catch(error => this.setState(
            {
                data: null,
                hasLoadedData: true,
                errorLoadningData: true,
            }));
    }


    render() {
        if (this.props.match.params.buildingId) {
            const id = this.props.match.params.buildingId;
            const data = this.state.buildingData.find(element => element.id + "" === id);

            if (data) {
                return (
                    <React.Fragment>
                        <h1>Building: {data.name}</h1>
                        <p>Number of rooms: {data.numberOfRooms}</p>

                        <h2>Rooms</h2>
                        <DisplayTable type={"rooms"} thead={this.state.roomHeaders} data={data}
                                      onDelete={this.onDeleteEvent}/>
                        <CreateForm type={"rooms"} onCreateSuccess={this.onCreateSuccess}/>
                    </React.Fragment>
                )
            } else {
                return <p>Invalid ID. No buildings with id {id}</p>
            }
        }

        return (
            <React.Fragment>
                <h1>Buildings:</h1>
                <DisplayTable type={"buildings"} thead={this.state.buildingHeaders} data={this.state.buildingData}
                              onDelete={this.onDeleteEvent}/>
                <CreateForm type={"buildings"} onCreateSuccess={this.onCreateSuccess}/>
            </React.Fragment>
        )
    }


    onCreateSuccess(type, newEntity) {
        if (type === "building") {
            const newData = [...this.state.buildingData, newEntity];
            this.setState(
                {
                    buildingData: newData
                });
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
            let newRooms= parent.rooms.filter(element => element.id !== id);
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