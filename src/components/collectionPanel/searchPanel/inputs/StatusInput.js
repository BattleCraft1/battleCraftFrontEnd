import React from 'react';
import {styles} from '../styles'

export default class StatusInput extends React.Component{

    changeInput(event){
        if(this.status.value!==""){
            if(this.status.value==='BANNED')
                this.props.changeSearchForm(
                "status",
                    {
                        "keys":["banned"],
                        "operation":":",
                        "value":[true]
                    }
                );
            else
                this.props.changeSearchForm(
                    "status",
                    {
                        "keys":["status"],
                        "operation":":",
                        "value":[this.status.value]
                    }
                );
        }
    }

    render(){
        return(
            <div>
                <span style = {styles.optionLabel}>Status:</span>
                <select
                    style={styles.optionInput}
                    id="status"
                    ref={(control) => this.status = control}
                    onKeyDown={this.changeInput.bind(this)}
                    onChange={this.changeInput.bind(this)}>
                    {this.props.options}
                </select>
            </div>
        )
    }
}