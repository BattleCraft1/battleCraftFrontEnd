import React from 'react';
import TextInput from './../inputs/TextInput'
import SelectInput from './../inputs/SelectInput'
import DateInput from "../inputs/DateInput";
import NumberInput from "../inputs/NumberInput";
import StatusInput from "../inputs/StatusInput";

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

    componentDidMount(){
        this.setState({provincesNames:this.props.enums.provincesNames});
        this.setState({tournamentsGames:this.props.enums.gamesNames});
        this.setState({status:this.props.enums.tournamentStatus});
    }

    prepareProvinceOptions(){
        let provincesOptions = [];
        provincesOptions.push(<option key="nullOption"/>);
        this.state.provincesNames.map(
            provincesName => {
                provincesOptions.push(<option key={provincesName}>{provincesName}</option>);
            }
        );
        return provincesOptions;
    }

    prepareTournamentGamesOptions(){
        let tournamentGamesOptions = [];
        tournamentGamesOptions.push(<option key="nullOption"/>);
        this.state.tournamentsGames.map(
            tournamentGame => {
                tournamentGamesOptions.push(<option key={tournamentGame}>{tournamentGame}</option>);
            }
        );
        return tournamentGamesOptions;
    }

    prepareTournamentStatusOptions(){
        let tournamentStatusOptions = [];
        tournamentStatusOptions.push(<option key="nullOption"/>);
        this.state.status.map(
            status => {
                tournamentStatusOptions.push(<option key={status}>{status}</option>);
            }
        );
        tournamentStatusOptions.push(<option key="BANNED">BANNED</option>);
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
                <TextInput
                    name = "Name"
                    placeholder = "Tournament 2017"
                    keys = {["name"]}
                    operation = ":"
                    indexOfSearchFields = "name"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <TextInput
                    name = "City"
                    placeholder = "Lublin"
                    keys = {["address", "city"]}
                    operation = ":"
                    indexOfSearchFields = "city"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <SelectInput
                    name = "Province"
                    keys = {["address", "province","location"]}
                    operation = ":"
                    indexOfSearchFields = "province"
                    options = {provincesOptions}
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <SelectInput
                    name = "Game"
                    keys = {["game","name"]}
                    operation = ":"
                    indexOfSearchFields = "game"
                    options = {tournamentGamesOptions}
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <DateInput
                    name = "Date from"
                    keys = {["dateOfStart"]}
                    operation = ">"
                    indexOfSearchFields = "dateOfStart"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <DateInput
                    name = "Date to"
                    keys = {["dateOfEnd"]}
                    operation = "<"
                    indexOfSearchFields = "dateOfEnd"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <NumberInput
                    name = "Max players"
                    keys = {["maxPlayers"]}
                    operation = "<"
                    indexOfSearchFields = "maxPlayers"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <NumberInput
                    name = "Free slots"
                    keys = {["freeSlots"]}
                    operation = ">"
                    indexOfSearchFields = "freeSlots"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <NumberInput
                    name = "Players number"
                    keys = {["playersNumber"]}
                    operation = "<"
                    indexOfSearchFields = "playersNumber"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <StatusInput
                    options = {tournamentStatusOptions}
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <button onClick={()=>this.props.search(this.state.searchFormField)}
                        type="button"
                        className="btn btn-default">Search</button>
            </div>
        )
    }
}