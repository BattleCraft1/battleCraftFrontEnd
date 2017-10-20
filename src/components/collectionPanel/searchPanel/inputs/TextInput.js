import React from 'react';
import {styles} from '../styles'


export default class TextInput extends React.Component{
    changeInput(event){
        if(this.text.value !=="")
            this.props.changeSearchForm(
                this.props.indexOfSearchFields,
                {
                    "keys":this.props.keys,
                    "operation":this.props.operation,
                    "value":[this.text.value]
                }
             )
          }

    render(){
        return(
            <div>
                <span style = {styles.optionLabel}>{this.props.name}:</span>
                <input id={this.props.indexOfSearchFields}
                       type="text"
                       style = {styles.optionInput}
                       ref={(control) => this.text = control}
                       name={this.props.indexOfSearchFields}
                       placeholder={this.props.placeholder}
                       onKeyDown={this.changeInput.bind(this)}
                       onChange={this.changeInput.bind(this)}
                />
            </div>
        )
    }
}
