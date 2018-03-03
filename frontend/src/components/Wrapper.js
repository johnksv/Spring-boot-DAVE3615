import * as React from 'react';
import CreateForm from "./CreateForm";
import DisplayTable  from "./DisplayTable"

export default class Wrapper extends React.Component {
    render() {
        return(
            <React.Fragment>
                <DisplayTable type={this.props.type}/>
                <CreateForm type={this.props.type}/>
            </React.Fragment>
        )
    }
}