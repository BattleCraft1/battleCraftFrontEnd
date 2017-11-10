import React from 'react';

import TextInput from './../inputs/TextInput'
import SelectInput from './../inputs/SelectInput'
import SelectNumberInput from './../inputs/SelectNumberInput'
import DateInput from "../inputs/DateInput";
import NumberInput from "../inputs/NumberInput";
import StatusInput from "../inputs/StatusInput";

import {resp, styles} from '../styles'
import {css} from 'aphrodite';

import {provinces} from "../../../../main/consts/provinces";
import {tournamentStatus} from "../../../../main/consts/status";
import createOptions from '../../../../main/functions/createOptions';

import {serverName} from "../../../../main/consts/server";
import axios from 'axios'

export default class FormInputs extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            tournamentsGames:[],
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
                "playersNumber":{},
                "playersOnTableCount":{}
            }
        }
    }

    async componentDidMount(){
        await axios.get(serverName+`get/allGames/names`)
            .then(res => {
                this.setState({tournamentsGames:res.data});
            })
            .catch(error => {
                this.props.showNetworkErrorMessage(error);
            });
    }

    prepareTournamentGamesOptions(){
        let tournamentGamesOptions = [];
        tournamentGamesOptions.push(<option value={""}  key="nullOption"/>);
        if(this.state.tournamentsGames!==undefined) {
            this.state.tournamentsGames.forEach(
                tournamentGame => {
                    tournamentGamesOptions.push(<option value={tournamentGame} key={tournamentGame}>{tournamentGame}</option>);
                }
            );
        }
        return tournamentGamesOptions;
    }

    prepareTournamentTypeOptions(){
        let tournamentTypeOptions = [];
        tournamentTypeOptions.push(<option value={""}  key="nullOption"/>);
        tournamentTypeOptions.push(<option value={2} key={2}>Duel</option>);
        tournamentTypeOptions.push(<option value={4} key={4}>Group</option>);
        return tournamentTypeOptions;
    }

    changeSearchForm(index,value){
        let searchFormFields = this.state.searchFormField;
        searchFormFields[index] = value;
        this.setState({searchFormField:searchFormFields});
    }

    render(){
        let provincesOptions = createOptions(provinces);
        let tournamentGamesOptions = this.prepareTournamentGamesOptions();
        let tournamentStatusOptions = createOptions(tournamentStatus);
        let tournamentTypeOptions = this.prepareTournamentTypeOptions();

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
                  {
                      this.props.entityPanelDisabled &&
                      <div className={css(resp.optionContent)}>
                          <StatusInput
                              options = {tournamentStatusOptions}
                              changeSearchForm = {this.changeSearchForm.bind(this)}
                          />
                      </div>
                  }
              </div>
              <div className={css(resp.optionContent)}>
                  <div className={css(resp.halfSize)}>
                  <NumberInput
                      name = "Players number"
                      keys = {["playersNumber"]}
                      operation = "<"
                      indexOfSearchFields = "playersNumber"
                      changeSearchForm = {this.changeSearchForm.bind(this)}
                  />
                </div>
                <div className={css(resp.halfSize)} style={{marginLeft:'0.5%'}}>
                  <NumberInput
                      name = "Max players"
                      keys = {["maxPlayers"]}
                      operation = "<"
                      indexOfSearchFields = "maxPlayers"
                      changeSearchForm = {this.changeSearchForm.bind(this)}
                  />
                </div>
              </div>
                <div className={css(resp.optionContent)}>
                    <div className={css(resp.halfSize)}>
                        <NumberInput
                            name = "Free slots"
                            keys = {["freeSlots"]}
                            operation = ">"
                            indexOfSearchFields = "freeSlots"
                            changeSearchForm = {this.changeSearchForm.bind(this)}
                        />
                    </div>
                    <div className={css(resp.halfSize)} style={{marginLeft:'0.5%'}}>
                        <SelectNumberInput
                            name = "Type"
                            keys = {["playersOnTableCount"]}
                            operation = ":"
                            indexOfSearchFields = "playersOnTableCount"
                            options = {tournamentTypeOptions}
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
