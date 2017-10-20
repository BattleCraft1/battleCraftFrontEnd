import React from 'react';
import TextInput from './../inputs/TextInput'
import SelectInput from './../inputs/SelectInput'
import NumberInput from './../inputs/NumberInput'
import DateInput from './../inputs/DateInput'
import GameInputForRanking from './../inputs/GameInputForRanking'
import {resp, styles} from '../styles'
import {css} from 'aphrodite';
import findGameName from '../../../../main/functions/findGameName'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../redux/actions';
import {provinces} from "../../../../main/consts/provinces";

class FormInputs extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            gameName:findGameName(this.props.pageRequest.searchCriteria),
            provincesNames:[],
            tournamentsGames:[],
            searchFormField: {
                "name":{},
                "playerCity":{},
                "playerProvince":{},
                "province":{},
                "city":{},
                "game":{},
                "numberOfBattles":{},
                "numberOfTournaments":{},
                "pointsGe":{},
                "pointsLe":{},
                "dateOfStart":{},
                "dateOfEnd":{},
            }
        }
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.enums!==undefined && nextProps.enums !== this.props.enums) {
            this.setState({tournamentsGames:nextProps.enums.gamesNames});
            this.setDefaultGameSearchCriteria();
        }
    }

    componentDidMount(){
        this.setState({provincesNames:provinces});
        this.setState({tournamentsGames:this.props.enums.gamesNames});
        this.setDefaultGameSearchCriteria();
    }

    setDefaultGameSearchCriteria(){
        this.changeSearchForm(
            "game",
            {
                "keys":["tour","tournament","game","name"],
                "operation":":",
                "value":[this.state.gameName]
            }
        );
    }

    prepareProvinceOptions(){
        let provincesOptions = [];
        provincesOptions.push(<option value={""} key="nullOption"/>);
        if(this.state.provincesNames!==undefined){
            this.state.provincesNames.forEach(
                provincesName => {
                    provincesOptions.push(<option value={provincesName} key={provincesName}>{provincesName}</option>);
                }
            );
        }
        return provincesOptions;
    }

    prepareTournamentGamesOptions(){
        let tournamentGamesOptions = [];
        if(this.state.tournamentsGames!==undefined) {
            this.state.tournamentsGames.forEach(
                tournamentGame => {
                    tournamentGamesOptions.push(<option value={tournamentGame} key={tournamentGame}>{tournamentGame}</option>);
                }
            );
        }
        return tournamentGamesOptions;
    }

    changeSearchForm(index,value){
        let searchFormFields = this.state.searchFormField;
        searchFormFields[index] = value;
        this.setState({searchFormField:searchFormFields});
    }

    render(){
        let provincesOptions = this.prepareProvinceOptions();
        let tournamentGamesOptions = this.prepareTournamentGamesOptions();

        return(
            <div>
                <div className={css(resp.optionContent)}>
                    <TextInput
                        name = "Name"
                        placeholder = "Jarek123"
                        keys = {["players","player","name"]}
                        operation = ":"
                        indexOfSearchFields = "Name"
                        changeSearchForm = {this.changeSearchForm.bind(this)}
                    />
                </div>
                <div className={css(resp.optionContent)}>
                    <div className={css(resp.halfSize)}>
                        <TextInput
                            name = "Tournaments city"
                            placeholder = "Lublin"
                            keys = {["tour","tournament","address", "city"]}
                            operation = ":"
                            indexOfSearchFields = "city"
                            changeSearchForm = {this.changeSearchForm.bind(this)}
                        />
                    </div>
                    <div className={css(resp.halfSize)} style={{marginLeft:'0.5%'}}>
                        <SelectInput
                            name = "Tournaments province"
                            keys = {["tour","tournament","address", "province"]}
                            operation = ":"
                            indexOfSearchFields = "province"
                            options = {provincesOptions}
                            changeSearchForm = {this.changeSearchForm.bind(this)}
                        />
                    </div>
                </div>
                <div className={css(resp.optionContent)}>
                    <GameInputForRanking
                        value = {this.state.gameName}
                        name = "Game"
                        keys = {["tour","tournament","game","name"]}
                        operation = ":"
                        indexOfSearchFields = "game"
                        options = {tournamentGamesOptions}
                        changeSearchForm = {this.changeSearchForm.bind(this)}
                    />
                </div>
                <div className={css(resp.optionContent)}>
                    <div className={css(resp.halfSize)}>
                        <DateInput
                            name = "Date from"
                            keys = {["tour","tournament","dateOfStart"]}
                            operation = ">"
                            indexOfSearchFields = "dateOfStart"
                            changeSearchForm = {this.changeSearchForm.bind(this)}
                        />
                    </div>
                    <div className={css(resp.halfSize)} style={{marginLeft:'0.5%'}}>
                        <DateInput
                            name = "Date to"
                            keys = {["tour","tournament","dateOfEnd"]}
                            operation = "<"
                            indexOfSearchFields = "dateOfEnd"
                            changeSearchForm = {this.changeSearchForm.bind(this)}
                        />
                    </div>
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
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        pageRequest: state.pageRequest
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( FormInputs );