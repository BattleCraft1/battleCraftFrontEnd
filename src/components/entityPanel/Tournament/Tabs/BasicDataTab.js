import React from 'react';

import TextInput from '../../inputs/TextInput'
import TextArea from '../../inputs/TextArea'
import SelectInput from '../../inputs/SelectInput'

export default class BasicDataTab extends React.Component{
    render(){
        return(
            <div>
                <SelectInput name={"Province"} options={<option>option1</option>}/>
                <TextInput name={"Name"}/>
                <TextInput name={"City"}/>
                <TextInput name={"Street"}/>
                <TextInput name={"ZIP code"}/>
                <TextArea  name={"Description"}/>
            </div>
        )
    }
}
