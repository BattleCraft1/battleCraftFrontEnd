import React from 'react';

import TextInput from '../../inputs/TextInput'
import TextArea from '../../inputs/TextArea'
import SelectInput from '../../inputs/SelectInput'

import {provinces} from '../../../../main/consts/provinces'

export default class AddressTab extends React.Component{
    render(){
        return(
            <div>
                <SelectInput
                    value={this.props.entity["province"]}
                    fieldName="province"
                    changeEntity={this.props.changeEntity.bind(this)}
                    name="Province"
                    options={provinces}/>
                <TextInput
                    value={this.props.entity["city"]}
                    fieldName="city"
                    changeEntity={this.props.changeEntity.bind(this)}
                    name="City"/>
                <TextInput
                    value={this.props.entity["street"]}
                    fieldName="street"
                    changeEntity={this.props.changeEntity.bind(this)}
                    name="Street"/>
                <TextInput
                    value={this.props.entity["zipCode"]}
                    fieldName="zipCode"
                    changeEntity={this.props.changeEntity.bind(this)}
                    name="ZIP code"/>
                <TextArea
                    value={this.props.entity["description"]}
                    fieldName="description"
                    changeEntity={this.props.changeEntity.bind(this)}
                    name="Description"/>
            </div>
        )
    }
}