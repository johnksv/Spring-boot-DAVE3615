import * as React from 'react';
import {Table} from "reactstrap";
import Building from "./Building";
import Room from "./Room";

const buildingHeaders = ["#", "Name", "Address", "Rooms", ""];
const roomHeaders = ["#", "Name", "Floor", ""];

export default class DisplayTable extends React.Component {

    render() {
        const {type, data} = this.props;

        let thead;
        if (type === "buildings") {
            thead = buildingHeaders;
        } else if (type === "rooms") {
            thead = roomHeaders;
        }

        return (
            <div>
                <Table responsive striped>
                    <thead>
                    <tr>
                        {thead.map((element, i) => {
                            if (element !== "") {
                                return <th key={i}>{element}</th>
                            } else {
                                return <th key={i}/>;
                            }

                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {type === "buildings" ? this.buildingTable(data) : this.roomTable(data)}
                    </tbody>
                </Table>


            </div>
        )
    }

    buildingTable(data) {
        const {onDelete, onUpdateSuccess} = this.props;
        return data.buildingData.map(element => {
            const numberOfRooms = data.roomData.filter(val => val.buildingId === element.id).length;
            return <tr key={element.id}>
                <Building data={{...element, numberOfRooms}} key={"B" + element.id} onDelete={onDelete}
                          onUpdateSuccess={onUpdateSuccess}/>
            </tr>
        })
    }

    roomTable(data) {
        const {onDelete, onUpdateSuccess} = this.props;
        return data.roomData.map(element => {
            return <tr key={element.id}>
                <Room room={element} key={"R" + element.id} onDelete={onDelete}
                          onUpdateSuccess={onUpdateSuccess}/>
            </tr>
        })
    }


}