import React from 'react';

export default class NumberInput extends React.Component{
    constructor(props) {
        super(props);
    }

    changeInput(event){
        if(this.number.value!=="")
            this.props.changeSearchForm(
                this.props.indexOfSearchFields,
                {
                    "keys":this.props.keys,
                    "operation":this.props.operation,
                    "value":parseInt(this.number.value)
                }
            )
    }

    render(){
        return(
            <div className="input-group">
                <span className="input-group-addon">{this.props.name}:</span>
                <input id={this.props.indexOfSearchFields}
                       type="number"
                       className="form-control"
                       ref={(control) => this.number = control}
                       name={this.props.indexOfSearchFields}
                       onKeyDown={this.changeInput.bind(this)}
                       onChange={this.changeInput.bind(this)}
                />
            </div>
        )
    }
}