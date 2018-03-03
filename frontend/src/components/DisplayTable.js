import * as React from 'react';
import {Table} from "reactstrap";
import Building from "./Building";

export default class DisplayTable extends React.Component {

    render() {
        const {data, onDelete} = this.props;
        return (
            <div>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Rooms</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(element => {
                        return <tr key={element.id}>
                            <Building data={element} key={"B" + element.id} onDelete={onDelete}/>
                        </tr>
                    })}
                    </tbody>
                </Table>


            </div>
        )
    }




}