import React from 'react';
import {resp, styles} from '../styles'

export default class DateInput extends React.Component{
    constructor(props) {
        super(props);
    }

    changeInput(event){
        if(this.date.value !=="")
            this.props.changeSearchForm(
                this.props.indexOfSearchFields,
                {
                    "keys":this.props.keys,
                    "operation":this.props.operation,
                    "value":[this.date.value]
                }
            )
    }

    render(){
        return(
            <div>
                <span style={styles.optionLabel}>{this.props.name}:</span>
                <input id={this.props.indexOfSearchFields}
                       type="date"
                       style={styles.optionInput}
                       ref={(control) => this.date = control}
                       name={this.props.indexOfSearchFields}
                       onKeyDown={this.changeInput.bind(this)}
                       onChange={this.changeInput.bind(this)}
                       />
            </div>
        )
    }
}
