import React from 'react';

import TextInput from '../../inputs/TextInput'
import AvatarInput from '../../inputs/Avatar'

import ValidationErrorMessage from '../../outputs/ValidationErrorMessage'

import TextOutput from '../../outputs/TextOutput'

export default class PersonalDataTab extends React.Component{
    render(){
        let inputsDisabled = this.props.mode === 'get';
        return(
            <div>
                <div style={{display:'inline-block', width:'100%'}}>
                    <div style={{position:'relative', display:'inline-block', float:'left', width:'20%',}}>
                        <AvatarInput
                            disabled = {this.props.inputsDisabled}
                            username={this.props.entity["name"]}
                        />
                    </div>
                    <div style={{position:'relative', display:'inline-block', width:'70%', float:'right'}}>
                        <TextInput
                            value={this.props.entity["nameChange"]}
                            fieldName="nameChange"
                            changeEntity={this.props.changeEntity}
                            disabled = {this.props.inputsDisabled}
                            name="Username"/>
                        <ValidationErrorMessage
                            validationErrorMessage={this.props.validationErrors["nameChange"]}/>
                        <TextInput
                            value={this.props.entity["firstname"]}
                            fieldName="firstname"
                            changeEntity={this.props.changeEntity}
                            disabled = {this.props.inputsDisabled}
                            name="First name"/>
                        <ValidationErrorMessage
                            validationErrorMessage={this.props.validationErrors["firstname"]}/>
                        <TextInput
                            value={this.props.entity["lastname"]}
                            fieldName="lastname"
                            changeEntity={this.props.changeEntity}
                            disabled = {this.props.inputsDisabled}
                            name="Surname"/>
                        <ValidationErrorMessage
                            validationErrorMessage={this.props.validationErrors["surname"]}/>
                    </div>
                </div>
                <TextInput
                    value={this.props.entity["email"]}
                    fieldName="email"
                    changeEntity={this.props.changeEntity}
                    disabled = {inputsDisabled}
                    name="E-mail"/>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["email"]}/>
                <TextInput
                    value={this.props.entity["phoneNumber"]}
                    fieldName="phoneNumber"
                    changeEntity={this.props.changeEntity}
                    disabled = {inputsDisabled}
                    name="Phone number"/>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["phoneNumber"]}/>
                <TextOutput
                    value={this.props.entity["status"]}
                    name="User role"/>
            </div>
        )
    }
}