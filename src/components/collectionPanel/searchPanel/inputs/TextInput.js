import React from 'react';

export default class TextInput extends React.Component{

    render(){
        return(
            <div className="input-group">
                <span className="input-group-addon">{this.props.name}:</span>
                <input ref={(control) => this.name = control}
                       id={this.props.name}
                       type="text"
                       className="form-control"
                       name={this.props.name}
                       placeholder={this.props.placeholder}/>
            </div>
        )
    }
}