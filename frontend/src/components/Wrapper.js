import * as React from 'react';
import CreateForm from "./CreateForm";
import DisplayTable from "./DisplayTable"
import {Link} from 'react-router-dom';
import instance  from "../AxiosInstance";


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
        this.onNewEntity = this.onNewEntity.bind(this);
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
                        <h1>Building: {buildingData.name}</h1>
                        <Link to={`/building/`}>Back to all buildings</Link>

                        <p className="mt-3">
                            Address: {buildingData.address} <br/>
                            Number of rooms: {roomData.length}
                        </p>

                        <h2>Rooms</h2>
                        <DisplayTable type={"rooms"} data={data}
                                      onUpdateSuccess={this.editedEntity}
                                      onDelete={this.onDeleteEvent}/>
                        <hr/>
                        <CreateForm type={"rooms"} buildingId={buildingData.id} onCreateSuccess={this.onNewEntity}/>
                    </React.Fragment>
                )
            } else {
                return <React.Fragment>
                    <p>Invalid ID. No buildings with id {id}</p>
                    <Link className="mr-2 mt-2" to={`/building/`}>Back to buildings</Link>
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
                <CreateForm type={"buildings"} onCreateSuccess={this.onNewEntity}/>
            </React.Fragment>
        )
    }


    onNewEntity(type, newEntity) {
        if (type === "buildings") {
            const buildingData = [...this.state.buildingData, newEntity];
            this.setState(
                {
                    buildingData
                });
        } else if (type === "rooms") {
            const roomData = [...this.state.roomData, newEntity];
            this.setState({roomData});
        }
    }

    editedEntity(type, editedEntity) {
        if (type === "buildings") {
            const buildingData = this.state.buildingData.map(element => element.id === editedEntity.id ? editedEntity : element);
            this.setState(
                {
                    buildingData
                });
        } else if (type === "rooms") {
            const roomData = this.state.roomData.map(element => element.id === editedEntity.id ? editedEntity : element);
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

        instance.delete(url).then(() => {
            this.setState({
                [field]: newState
            });
            console.log("Data with id " + id + " is deleted, of type " + type);
        });
    }

}