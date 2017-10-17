import React from 'react';

export default class ValidationErrorMessage extends React.Component{

    render(){
        return(
            <div style={{color:'red'}}>{this.props.validationErrorMessage}</div>
        )
    }
}
