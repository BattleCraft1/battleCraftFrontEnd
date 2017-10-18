import React from 'react';

import TextInput from '../../inputs/TextInput'
import DateInput from '../../inputs/DateInput'

export default class AddressTab extends React.Component{
    render(){
        return(
            <div>
                <TextInput name={"Name"}/>
                <TextInput name={"Tables count"}/>
                <TextInput name={"Max players"}/>
                <TextInput name={"Game"}/>
                <DateInput name={"Start at"}/>
                <DateInput name={"Ends at"}/>
            </div>
        )
    }
}
