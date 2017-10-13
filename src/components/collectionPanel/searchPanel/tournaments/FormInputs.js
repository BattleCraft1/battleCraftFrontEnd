import React from 'react';
import TextInput from './../inputs/TextInput'
import SelectInput from './../inputs/SelectInput'
import DateInput from "../inputs/DateInput";
import NumberInput from "../inputs/NumberInput";
import StatusInput from "../inputs/StatusInput";
import {resp, styles} from '../styles'
import {StyleSheet, css} from 'aphrodite';
import {provinces} from "../../../../main/consts/provinces";

export default class FormInputs extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            provincesNames:[],
            tournamentsGames:[],
            status:[],
            searchFormField: {
                "name":{},
                "dateOfStart":{},
                "dateOfEnd":{},
                "game":{},
                "city":{},
                "province":{},
                "status":{},
                "freeSlots":{},
                "maxPlayers":{},
                "playersNumber":{}
            }
        }
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.enums!==undefined && nextProps.enums !== this.props.enums) {
            this.setState({tournamentsGames:nextProps.enums.gamesNames});
            this.setState({status:nextProps.enums.tournamentStatus});
        }
    }

    componentDidMount(){
        this.setState({provincesNames:provinces});
        this.setState({tournamentsGames:this.props.enums.gamesNames});
        this.setState({status:this.props.enums.tournamentStatus});
    }

    prepareProvinceOptions(){
        let provincesOptions = [];
        provincesOptions.push(<option value={""} key="nullOption"/>);
        if(this.state.provincesNames!==undefined) {
            this.state.provincesNames.map(
                provincesName => {
                    provincesOptions.push(<option value={provincesName} key={provincesName}>{provincesName}</option>);
                }
            );
        }
        return provincesOptions;
    }

    prepareTournamentGamesOptions(){
        let tournamentGamesOptions = [];
        tournamentGamesOptions.push(<option value={""}  key="nullOption"/>);
        if(this.state.tournamentsGames!==undefined) {
            this.state.tournamentsGames.map(
                tournamentGame => {
                    tournamentGamesOptions.push(<option value={tournamentGame} key={tournamentGame}>{tournamentGame}</option>);
                }
            );
        }
        return tournamentGamesOptions;
    }

    prepareTournamentStatusOptions(){
        let tournamentStatusOptions = [];
        tournamentStatusOptions.push(<option value={""}  key="nullOption"/>);
        if(this.state.status!==undefined) {
            this.state.status.map(
                status => {
                    tournamentStatusOptions.push(<option value={status} key={status}>{status.replace("_"," ")}</option>);
                }
            );
        }
        tournamentStatusOptions.push(<option value="BANNED"  key="BANNED">BANNED</option>);
        return tournamentStatusOptions;
    }

    changeSearchForm(index,value){
        let searchFormFields = this.state.searchFormField;
        searchFormFields[index] = value;
        this.setState({searchFormField:searchFormFields});
    }

    render(){
        let provincesOptions = this.prepareProvinceOptions();
        let tournamentGamesOptions = this.prepareTournamentGamesOptions();
        let tournamentStatusOptions = this.prepareTournamentStatusOptions();

        return (
            <div>
              <div className={css(resp.optionContent)}>
                <TextInput
                    name = "Tournament name"
                    placeholder = "Tournament 2017"
                    keys = {["name"]}
                    operation = ":"
                    indexOfSearchFields = "name"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
              </div>
              <div>
                <div className={css(resp.optionContent)}>
                  <SelectInput
                      name = "Game genre"
                      keys = {["game","name"]}
                      operation = ":"
                      indexOfSearchFields = "game"
                      options = {tournamentGamesOptions}
                      changeSearchForm = {this.changeSearchForm.bind(this)}
                  />
                </div>
                <div className={css(resp.optionContent)}>
                  <StatusInput
                      options = {tournamentStatusOptions}
                      changeSearchForm = {this.changeSearchForm.bind(this)}
                  />
                </div>
              </div>
              <div className={css(resp.optionContent)}>
                <div className={css(resp.thirdSize)}>
                  <NumberInput
                      name = "Players number"
                      keys = {["playersNumber"]}
                      operation = "<"
                      indexOfSearchFields = "playersNumber"
                      changeSearchForm = {this.changeSearchForm.bind(this)}
                  />
                </div>
                <div className={css(resp.thirdSize)} style={styles.middleOption}>
                  <NumberInput
                      name = "Max players"
                      keys = {["maxPlayers"]}
                      operation = "<"
                      indexOfSearchFields = "maxPlayers"
                      changeSearchForm = {this.changeSearchForm.bind(this)}
                  />
                </div>
                <div className={css(resp.thirdSize)}>
                  <NumberInput
                      name = "Free slots"
                      keys = {["freeSlots"]}
                      operation = ">"
                      indexOfSearchFields = "freeSlots"
                      changeSearchForm = {this.changeSearchForm.bind(this)}
                  />
                </div>
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
              <div className={css(resp.optionContent)}>
                <div className={css(resp.halfSize)}>
                  <DateInput
                      name = "Date from"
                      keys = {["dateOfStart"]}
                      operation = ">"
                      indexOfSearchFields = "dateOfStart"
                      changeSearchForm = {this.changeSearchForm.bind(this)}
                  />
                </div>
                <div className={css(resp.halfSize)} style={{marginLeft:'0.5%'}}>
                  <DateInput
                      name = "Date to"
                      keys = {["dateOfEnd"]}
                      operation = "<"
                      indexOfSearchFields = "dateOfEnd"
                      changeSearchForm = {this.changeSearchForm.bind(this)}
                  />
                </div>
              </div>
                <button onClick={()=>this.props.search(this.state.searchFormField)}
                        style={styles.button}
                        className={css(resp.button)}
                        type="button"
                        >Search</button>
                <button onClick={()=>this.props.hide()}
                        style={styles.button}
                        className={css(resp.button)}
                        type="button">Cancel</button>
            </div>
        )
    }
}
