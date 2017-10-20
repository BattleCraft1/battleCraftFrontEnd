import React from 'react';

import TextInput from '../../inputs/TextInput'
import DateInput from '../../inputs/DateInput'
import SelectInput from '../../inputs/SelectInput'


export default class AddressTab extends React.Component{
    render(){
        return(
          <div>
              <SelectInput name={"Province"} options={<option>option1</option>}/>
              <TextInput name={"City"}/>
              <TextInput name={"Street"}/>
              <TextInput name={"ZIP code"}/>
          </div>
        )
    }
}
