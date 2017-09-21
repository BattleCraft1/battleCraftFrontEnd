import React from 'react';

export default class TextInput extends React.Component{
    constructor(props) {
        super(props);
    }

    changeInput(event){
        if(this.text.value !=="")
            this.props.changeSearchForm(
                this.props.indexOfSearchFields,
                {
                    "keys":this.props.keys,
                    "operation":this.props.operation,
                    "value":this.text.value
                }
            )
    }

    render(){
        return(
            <div className="input-group">
                <span className="input-group-addon">{this.props.name}:</span>
                <input id={this.props.indexOfSearchFields}
                       type="text"
                       className="form-control"
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