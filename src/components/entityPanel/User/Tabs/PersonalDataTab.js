import React from 'react';

import TextInput from '../../inputs/TextInput'
import AvatarInput from '../../inputs/Avatar'
import {StyleSheet, css} from 'aphrodite';

import ValidationErrorMessage from '../../outputs/ValidationErrorMessage'

import TextOutput from '../../outputs/TextOutput'

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
                <div style={{display:'inline-block', width:'100%'}}>
                    <div style={{position:'relative', display:'inline-block', float:'left', width:'40%', marginRight:'10%'}}
                          className = {css(resp.avatarContainer)}>
                        <AvatarInput
                            disabled = {this.props.inputsDisabled}
                            username={this.props.entity["name"]}
                        />
                    </div>
                    <div style={{position:'relative', display:'inline-block', width:'50%'}}
                    className={css(resp.textContainer)}>
                        <TextInput
                            value={this.props.entity["nameChange"]}
                            fieldName="nameChange"
                            changeEntity={this.props.changeEntity}
                            disabled = {this.props.inputsDisabled}
                            notResponsive = {true}
                            name="Username"/>
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
                    </div>
                </div>
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
                <TextOutput
                    value={this.props.entity["status"]}
                    notResponsive = {true}
                    name="User role"/>
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
})
