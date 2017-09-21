import React from 'react';

export default class TournamentStatus extends React.Component{
    constructor(props) {
        super(props);
    }

    changeInput(event){
        if(this.status.value!==""){
            if(this.status.value==='BANNED')
                this.props.changeSearchForm(
                "status",
                    {
                        "keys":["banned"],
                        "operation":":",
                        "value":true
                    }
                );
            else
                this.props.changeSearchForm(
                    "status",
                    {
                        "keys":["status"],
                        "operation":":",
                        "value":this.status.value
                    }
                );
        }
    }

    render(){
        return(
            <div className="input-group">
                <span className="input-group-addon">Status:</span>
                <select
                    className="form-control"
                    id="status"
                    ref={(control) => this.status = control}
                    onKeyDown={this.changeInput.bind(this)}
                    onChange={this.changeInput.bind(this)}
                >
                    {this.props.options}
                </select>
            </div>
        )
    }
}