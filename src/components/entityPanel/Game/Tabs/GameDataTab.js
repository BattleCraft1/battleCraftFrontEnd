import React from 'react';

import TextInput from '../../inputs/TextInput'
import GameRulesInput from '../../inputs/GameRulesInput'

import TextOutput from '../../outputs/TextOutput'
import NumberOutput from '../../outputs/NumberOutput'

import ValidationErrorMessage from "../../outputs/ValidationErrorMessage";

import setDate from './../../../../main/functions/setDateFunction'

export default class GameDataTab extends React.Component{
    render(){
        return(
            <div>
                <ValidationErrorMessage validationErrorMessage={this.props.validationErrors["nameChange"]}/>
                <TextInput
                    value={this.props.entity["nameChange"]}
                    fieldName="nameChange"
                    changeEntity={this.props.changeEntity}
                    disabled = {this.props.inputsDisabled}
                    name="Game name"/>
                <NumberOutput
                    value={this.props.entity["tournamentsNumber"]}
                    name="Tournaments count"/>
                <TextOutput
                    value={this.props.entity["status"]}
                    name="Status"/>
                <TextOutput
                    value={this.props.entity["creatorName"]}
                    name="Creator username"/>
                <TextOutput
                    value={setDate(this.props.entity["dateOfCreation"])}
                    name="Creation date"/>
                <GameRulesInput
                    disabled = {this.props.inputsDisabled}
                    name={this.props.entity["name"]}/>
            </div>
        )
    }
}
