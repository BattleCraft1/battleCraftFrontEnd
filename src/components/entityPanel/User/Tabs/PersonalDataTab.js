import React from 'react';

import TextInput from '../../inputs/TextInput'
import TextArea from '../../inputs/TextArea'
import SelectInput from '../../inputs/SelectInput'
import PasswordInput from '../../inputs/PasswordInput'
import AvatarInput from '../../inputs/Avatar'


export default class PersonalDataTab extends React.Component{
    render(){
        return(
            <div>
                <div style={{display:'inline-block', width:'100%'}}>
                  <div style={{position:'relative', display:'inline-block', float:'left', width:'20%', float:'left'}}><AvatarInput/></div>
                  <div style={{position:'relative', display:'inline-block', width:'70%', float:'right'}}>
                    <TextInput name={"Username"}/>
                    <TextInput name={"First name"}/>
                    <TextInput name={"Surname"}/>
                  </div>
                </div>
                <TextInput name={"Email"}/>
                <PasswordInput name={"Password"}/>
                <PasswordInput name={"Repeat password"}/>
            </div>
        )
    }
}
