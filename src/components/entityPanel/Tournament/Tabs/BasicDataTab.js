import React from 'react';

import SelectInput from '../../inputs/SelectInput'
import SelectNumberInput from '../../inputs/SelectNumberInput'
import NumberInput from '../../inputs/NumberInput'
import TextInput from '../../inputs/TextInput'
import DateInput from '../../inputs/DateInput'

import NumberOutput from '../../outputs/NumberOutput'
import TextOutput from '../../outputs/TextOutput'

import ValidationErrorMessage from '../../outputs/ValidationErrorMessage'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../redux/actions/index';

import {serverName} from '../../../../main/consts/server';
import axios from 'axios';

class BasicDataTab extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            gameNames:[]
        };
    }

    async componentDidMount(){
        await this.getGameSelectData();
    }

    async getGameSelectData(){
        await axios.get(serverName+`get/ranking/enums`)
            .then(res => {
                this.setState({gameNames:res.data.gamesNames});
            })
            .catch(error => {
                this.props.showNetworkErrorMessage(error);
            });
    }

    calculateTournamentType(maxPlayers){
        if(maxPlayers<=8){
            return "Local";
        }
        else if(maxPlayers<=16){
            return "Challenger";
        }
        else
            return "Master";
    }

    render(){
        let tournamentTypeOptions = {
            "Duel":2,
            "Group":4
        };
        let maxPlayers = this.props.entity["tablesCount"]*this.props.entity["playersOnTableCount"];

        return(
            <div>
            <ValidationErrorMessage
                validationErrorMessage={this.props.validationErrors["nameChange"]}/>
            <ValidationErrorMessage
                validationErrorMessage={this.props.validationErrors["game"]}/>
            <ValidationErrorMessage
                validationErrorMessage={this.props.validationErrors["tablesCount"]}/>
            <ValidationErrorMessage
                validationErrorMessage={this.props.validationErrors["playersOnTableCount"]}/>
            <ValidationErrorMessage
                validationErrorMessage={this.props.validationErrors["dateOfStart"]}/>
            <ValidationErrorMessage
                validationErrorMessage={this.props.validationErrors["dateOfEnd"]}/>

                <TextInput
                    value={this.props.entity["nameChange"]}
                    fieldName="nameChange"
                    changeEntity={this.props.changeEntity}
                    disabled = {this.props.inputsDisabled}
                    name="Name"/>
                {this.props.mode!=='add' &&
                <TextOutput
                    value={this.props.entity["status"]}
                    name="Tournament status"/>
                }
                <SelectInput
                    value={this.props.entity["game"]}
                    fieldName="game"
                    changeEntity={this.props.changeEntity}
                    options={this.state.gameNames}
                    disabled = {this.props.inputsDisabled}
                    name="Game"/>

                    {this.props.mode!=='add' &&
                    <TextOutput
                        value={this.props.entity["status"]}
                        name="Tournament status"/>
                    }
                <NumberInput
                    value={this.props.entity["tablesCount"]}
                    fieldName="tablesCount"
                    changeEntity={this.props.changeEntity}
                    disabled = {this.props.inputsDisabled}
                    name="Tables count"/>

                <SelectNumberInput
                    value={this.props.entity["playersOnTableCount"]}
                    fieldName="playersOnTableCount"
                    changeEntity={this.props.changeEntity}
                    options={tournamentTypeOptions}
                    disabled = {this.props.inputsDisabled}
                    name="Type"/>
                <NumberOutput
                    value={maxPlayers}
                    name="Max players"/>
                <TextOutput
                    value={this.calculateTournamentType(maxPlayers)}
                    name="Tournament class"/>
                <DateInput
                    value={this.props.entity["dateOfStart"]}
                    fieldName="dateOfStart"
                    changeEntity={this.props.changeEntity}
                    disabled = {this.props.inputsDisabled}
                    name="Start at"/>
                <DateInput
                    value={this.props.entity["dateOfEnd"]}
                    fieldName="dateOfEnd"
                    changeEntity={this.props.changeEntity}
                    disabled = {this.props.inputsDisabled}
                    name="Ends at"/>
            </div>
        )
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        message: state.message
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( BasicDataTab );
