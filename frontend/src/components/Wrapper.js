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
            activeBuildingId: this.props.match.params.id,
            activeRoomId: -1,
            buildingHeaders: ["#", "Name", "Address", "Rooms", ""],
            buildingData: [],
            roomHeaders: ["#", "Name", "Floor", "Category", ""],
            roomData: [],
            userFormData: {},
            hasLoadedData: false,
            errorLoadningData: false
        };

        this.onDeleteEvent = this.onDeleteEvent.bind(this);
        this.onCreateSuccess = this.onCreateSuccess.bind(this);
    }

    componentDidMount() {
        instance
            .get(`"buldings"`)
            .then(resp => {
                if (resp.status === 200) {
                    this.setState(
                        {
                            buildingData: resp.data,
                            hasLoadedData: true,
                            errorLoadningData: false,
                        });
                } else {
                    this.setState(
                        {
                            data: null,
                            hasLoadedData: true,
                            errorLoadningData: true,
                        });
                }
            });
    }


    render() {
        return (
            <React.Fragment>
                <DisplayTable type={this.props.type} data={this.state.buildingData}  onDelete={this.onDeleteEvent}/>
                <CreateForm type={this.props.type} onCreateSuccess={this.onCreateSuccess}/>
            </React.Fragment>
        )
    }


    onCreateSuccess(type, newEntity){
        if(type === "building"){
            const newData = [...this.state.buildingData, newEntity];
            this.setState(
                {
                    buildingData: newData
                });
        }
    }

    onUpdateSuccess(type, newEntity){
        if(type === "building"){
            //TODO: Insert updated
            const newData = [...this.state.buildingData, newEntity];
            this.setState(
                {
                    buildingData: newData
                });
        }
    }


    onDeleteEvent(type, id) {
        let data;
        if(type === "building"){
            data = this.state.buildingData.filter(element => element.id !== id);
        }

        instance.delete(`${type}/${id}`).then(resp => {
            this.setState({data});
            console.log("Data with id " + id + " is deleted");
        });
    }

}