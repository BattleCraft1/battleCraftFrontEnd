import React from 'react';

import SelectInput from '../../inputs/SelectInput'
import NumberInput from '../../inputs/NumberInput'
import TextInput from '../../inputs/TextInput'
import DateInput from '../../inputs/DateInput'

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

    render(){
        return(
            <div>
                <TextInput
                    value={this.props.entity["nameChange"]}
                    fieldName="nameChange"
                    changeEntity={this.props.changeEntity.bind(this)}
                    name="Name"/>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["nameChange"]}/>
                <NumberInput
                    value={this.props.entity["tablesCount"]}
                    fieldName="tablesCount"
                    changeEntity={this.props.changeEntity.bind(this)}
                    name="Tables count"/>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["tablesCount"]}/>
                <NumberInput
                    value={this.props.entity["maxPlayers"]}
                    fieldName="maxPlayers"
                    changeEntity={this.props.changeEntity.bind(this)}
                    name="Max players"/>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["maxPlayers"]}/>
                <SelectInput
                    value={this.props.entity["game"]}
                    fieldName="game"
                    changeEntity={this.props.changeEntity.bind(this)}
                    options={this.state.gameNames}
                    name="Game"/>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["game"]}/>
                <DateInput
                    value={this.props.entity["dateOfStart"]}
                    fieldName="dateOfStart"
                    changeEntity={this.props.changeEntity.bind(this)}
                    name="Start at"/>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["dateOfStart"]}/>
                <DateInput
                    value={this.props.entity["dateOfEnd"]}
                    fieldName="dateOfEnd"
                    changeEntity={this.props.changeEntity.bind(this)}
                    name="Ends at"/>
                <ValidationErrorMessage
                    validationErrorMessage={this.props.validationErrors["dateOfEnd"]}/>
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