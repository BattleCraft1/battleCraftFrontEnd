import React from 'react';

import TextInput from '../../inputs/TextInput'
import TextArea from '../../inputs/TextArea'
import SelectInput from '../../inputs/SelectInput'

import ValidationErrorMessage from "../../outputs/ValidationErrorMessage";

import {provinces} from '../../../../main/consts/provinces'

export default class AddressTab extends React.Component{
    render(){
        let inputsDisabled = this.props.mode === 'get';
        return(
            <div>
            <ValidationErrorMessage
                validationErrorMessage={this.props.validationErrors["province"]}/>
            <ValidationErrorMessage
                validationErrorMessage={this.props.validationErrors["city"]}/>
            <ValidationErrorMessage
                validationErrorMessage={this.props.validationErrors["street"]}/>
            <ValidationErrorMessage
                validationErrorMessage={this.props.validationErrors["zipCode"]}/>
            <ValidationErrorMessage
                validationErrorMessage={this.props.validationErrors["description"]}/>
            
                <SelectInput
                    value={this.props.entity["province"]}
                    fieldName="province"
                    changeEntity={this.props.changeEntity.bind(this)}
                    name="Province"
                    disabled = {inputsDisabled}
                    options={provinces}/>
                <TextInput
                    value={this.props.entity["city"]}
                    fieldName="city"
                    changeEntity={this.props.changeEntity.bind(this)}
                    disabled = {inputsDisabled}
                    name="City"/>
                <TextInput
                    value={this.props.entity["street"]}
                    fieldName="street"
                    changeEntity={this.props.changeEntity.bind(this)}
                    disabled = {inputsDisabled}
                    name="Street"/>
                <TextInput
                    value={this.props.entity["zipCode"]}
                    fieldName="zipCode"
                    changeEntity={this.props.changeEntity.bind(this)}
                    disabled = {inputsDisabled}
                    name="ZIP code"/>
                <TextArea
                    value={this.props.entity["description"]}
                    fieldName="description"
                    changeEntity={this.props.changeEntity.bind(this)}
                    disabled = {inputsDisabled}
                    name="Description"/>
            </div>
        )
    }
}
