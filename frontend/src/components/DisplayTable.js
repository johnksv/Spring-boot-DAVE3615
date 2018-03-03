import * as React from 'react';
import {Table} from "reactstrap";
import Building from "./Building";

export default class DisplayTable extends React.Component {

    render() {
        const {thead, data, onDelete, onUpdateSuccess} = this.props;
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
                    {data.map(element => {
                        return <tr key={element.id}>
                            <Building data={element} key={"B" + element.id} onDelete={onDelete}
                                      onUpdateSuccess={onUpdateSuccess}/>
                        </tr>
                    })}
                    </tbody>
                </Table>


            </div>
        )
    }


}