import React from 'react';
import TextInput from './../inputs/TextInput'
import SelectInput from './../inputs/SelectInput'
import StatusInput from './../inputs/StatusInput'
import {resp, styles} from '../styles'
import {css} from 'aphrodite';

import {provinces} from "../../../../main/consts/provinces";
import {userStatus} from "../../../../main/consts/status";
import createOptions from "../../../../main/functions/createOptions";


export default class FormInputs extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            status:[],
            searchFormField: {
                "name":{},
                "firstname":{},
                "lastname":{},
                "email":{},
                "province":{},
                "city":{},
                "userType":{}
            }
        }
    }

    changeSearchForm(index,value){
        let searchFormFields = this.state.searchFormField;
        searchFormFields[index] = value;
        this.setState({searchFormField:searchFormFields});
    }


    getUserStatus(){
        let userStat = userStatus;
        if(this.props.security.role==="ROLE_ADMIN"){
            userStat["BANNED"] = "BANNED";
        }
        return userStat;
    }

    render(){
        let userTypeOptions = createOptions(this.getUserStatus());
        let provincesOptions = createOptions(provinces);

        return (
            <div>
                <div className={css(resp.optionContent)}>
                    <TextInput
                        name = "Name"
                        placeholder = "Jarek123"
                        keys = {["name"]}
                        operation = ":"
                        indexOfSearchFields = "Name"
                        changeSearchForm = {this.changeSearchForm.bind(this)}
                    />
                </div>
                <div className={css(resp.optionContent)}>
                    <div className={css(resp.halfSize)}>
                        <TextInput
                            name = "First name"
                            placeholder = "Jarek"
                            keys = {["firstname"]}
                            operation = ":"
                            indexOfSearchFields = "firstname"
                            changeSearchForm = {this.changeSearchForm.bind(this)}
                        />
                    </div>
                    <div className={css(resp.halfSize)} style={{marginLeft:'0.5%'}}>
                        <TextInput
                            name = "Last name"
                            placeholder = "Kowalski"
                            keys = {["lastname"]}
                            operation = ":"
                            indexOfSearchFields = "lastname"
                            changeSearchForm = {this.changeSearchForm.bind(this)}/>
                    </div>
                </div>
                <div className={css(resp.optionContent)}>
                    <TextInput
                        name = "E-mail"
                        placeholder = "Jarek@gmail.com"
                        keys = {["email"]}
                        operation = ":"
                        indexOfSearchFields = "email"
                        changeSearchForm = {this.changeSearchForm.bind(this)}
                    />
                </div>
                <div className={css(resp.optionContent)}>
                    <div className={css(resp.halfSize)}>
                        <TextInput
                            name = "City"
                            placeholder = "Lublin"
                            keys = {["address", "city"]}
                            operation = ":"
                            indexOfSearchFields = "city"
                            changeSearchForm = {this.changeSearchForm.bind(this)}
                        />
                    </div>
                    <div className={css(resp.halfSize)} style={{marginLeft:'0.5%'}}>
                        <SelectInput
                            name = "Province"
                            keys = {["address", "province"]}
                            operation = ":"
                            indexOfSearchFields = "province"
                            options = {provincesOptions}
                            changeSearchForm = {this.changeSearchForm.bind(this)}
                        />
                    </div>
                </div>
                {
                    this.props.entityPanelDisabled &&
                    <div className={css(resp.optionContent)}>
                        <StatusInput
                            options={userTypeOptions}
                            changeSearchForm={this.changeSearchForm.bind(this)}
                        />
                    </div>
                }
                <button onClick={()=>this.props.search(this.state.searchFormField)}
                        style={styles.button}
                        className={css(resp.button)}
                        type="button">Search</button>
                <button onClick={()=>this.props.hide()}
                        style={styles.button}
                        className={css(resp.button)}
                        type="button">Cancel</button>
            </div>
        )
    }
}