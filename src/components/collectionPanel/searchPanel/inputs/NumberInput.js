import React from 'react';
import {styles} from '../styles'

export default class NumberInput extends React.Component{

    changeInput(event){
        if(this.number.value!=="")
            this.props.changeSearchForm(
                this.props.indexOfSearchFields,
                {
                    "keys":this.props.keys,
                    "operation":this.props.operation,
                    "value":[parseInt(this.number.value, 10)]
                }
            )
    }

    render(){
        return(
            <div>
                <span style={styles.optionLabel}>{this.props.name}:</span>
                <input id={this.props.indexOfSearchFields}
                       type="number"
                       style={styles.optionInput}
                       ref={(control) => this.number = control}
                       name={this.props.indexOfSearchFields}
                       onKeyDown={this.changeInput.bind(this)}
                       onChange={this.changeInput.bind(this)}
                />
            </div>
        )
    }
}
