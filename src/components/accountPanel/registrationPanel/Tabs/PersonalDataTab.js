import React from 'react';

import TextInput from '../../../entityPanel/inputs/TextInput'
import PasswordInput from '../../../entityPanel/inputs/PasswordInput'
import {StyleSheet, css} from 'aphrodite';

import ValidationErrorMessage from '../../../entityPanel/outputs/ValidationErrorMessage'

export default class PersonalDataTab extends React.Component{
    render(){
        return(
            <div>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["nameChange"]}/>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["firstname"]}/>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["lastname"]}/>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["email"]}/>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["phoneNumber"]}/>

                <TextInput
                    value={this.props.entity["nameChange"]}
                    fieldName="nameChange"
                    changeEntity={this.props.changeEntity}
                    disabled = {this.props.inputsDisabled}
                    notResponsive = {true}
                    name="Username"/>
                <PasswordInput
                    value={this.props.entity["password"]}
                    fieldName="password"
                    changeEntity={this.props.changeEntity}
                    disabled = {this.props.inputsDisabled}
                    notResponsive = {true}
                    name="Password"/>
                <PasswordInput
                    value={this.props.entity["passwordConfirm"]}
                    fieldName="passwordConfirm"
                    changeEntity={this.props.changeEntity}
                    disabled = {this.props.inputsDisabled}
                    notResponsive = {true}
                    name="Password confirm"/>
                <TextInput
                    value={this.props.entity["firstname"]}
                    fieldName="firstname"
                    changeEntity={this.props.changeEntity}
                    disabled = {this.props.inputsDisabled}
                    notResponsive = {true}
                    name="First name"/>
                <TextInput
                    value={this.props.entity["lastname"]}
                    fieldName="lastname"
                    changeEntity={this.props.changeEntity}
                    disabled = {this.props.inputsDisabled}
                    notResponsive = {true}
                    name="Surname"/>
                <TextInput
                    value={this.props.entity["email"]}
                    fieldName="email"
                    changeEntity={this.props.changeEntity}
                    disabled = {this.props.inputsDisabled}
                    notResponsive = {true}
                    name="E-mail"/>
                <TextInput
                    value={this.props.entity["phoneNumber"]?this.props.entity["phoneNumber"]:""}
                    fieldName="phoneNumber"
                    changeEntity={this.props.changeEntity}
                    disabled = {this.props.inputsDisabled}
                    name="Phone number (optional)"
                    notResponsive = {true}/>
            </div>
        )
    }
}


const resp = StyleSheet.create({
  avatarContainer:{
    '@media (max-width: 720px)': {
      width:'100%',
      textAlign:'center',
    },
  },
  textContainer:
  {
    '@media (max-width: 720px)': {
      width:'100%',
      textAlign:'center',
    },
  }
});
