import React from 'react';

import TextInput from './../inputs/TextInput'
import NumberInput from './../inputs/NumberInput'
import StatusInput from './../inputs/StatusInput'
import DateInput from './../inputs/DateInput'

import {resp, styles} from '../styles'
import {css} from 'aphrodite';

import {gameStatus} from '../../../../main/consts/status'
import createOptions from '../../../../main/functions/createOptions'

export default class FormInputs extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            searchFormField: {
                "name":{},
                "tournamentsNumber":{},
                "creatorName":{},
                "gameStatus":{}
            }
        }
    }

    changeSearchForm(index,value){
        let searchFormFields = this.state.searchFormField;
        searchFormFields[index] = value;
        this.setState({searchFormField:searchFormFields});
    }

    render(){
        let gamesStatusOptions = createOptions(gameStatus);

        return (
            <div>
                <div className={css(resp.optionContent)}>
                    <TextInput
                        name = "Name"
                        placeholder = "Warhammer"
                        keys = {["name"]}
                        operation = ":"
                        indexOfSearchFields = "name"
                        changeSearchForm = {this.changeSearchForm.bind(this)}
                    />
                </div>
                <div className={css(resp.optionContent)}>
                    <div className={css(resp.halfSize)}>
                    <NumberInput
                        name = "Tournaments number"
                        keys = {["tournamentsNumber"]}
                        operation = "<"
                        indexOfSearchFields = "tournamentsNumber"
                        changeSearchForm = {this.changeSearchForm.bind(this)}
                    />
                    </div>
                    <div className={css(resp.halfSize)} style={{marginLeft:'0.5%'}}>
                    <DateInput
                        name = "Creation date"
                        keys = {["dateOfCreation"]}
                        operation = "<"
                        indexOfSearchFields = "dateOfCreation"
                        changeSearchForm = {this.changeSearchForm.bind(this)}
                    />
                    </div>
                </div>
                <div className={css(resp.optionContent)}>
                <TextInput
                    name = "Creator name"
                    placeholder = "Jarek123"
                    keys = {["creatorName"]}
                    operation = ":"
                    indexOfSearchFields = "creatorName"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                </div>
                <div className={css(resp.optionContent)}>
                <StatusInput
                    options = {gamesStatusOptions}
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                </div>
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
