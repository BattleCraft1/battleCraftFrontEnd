import React from 'react';
import TextInput from './../inputs/TextInput'
import SelectInput from './../inputs/SelectInput'
import NumberInput from './../inputs/NumberInput'
import DateInput from './../inputs/DateInput'

export default class FormInputs extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            provincesNames:[],
            tournamentsGames:[],
            searchFormField: {
                "name":{},
                "province":{},
                "city":{},
                "numberOfBattles":{},
                "numberOfTournaments":{},
                "points":{}
            }
        }
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.enums!==undefined && nextProps.enums !== this.props.enums) {
            this.setState({provincesNames:nextProps.enums.provincesNames});
            this.setState({tournamentsGames:nextProps.enums.gamesNames});
        }
    }

    componentDidMount(){
        this.setState({provincesNames:this.props.enums.provincesNames});
        this.setState({tournamentsGames:this.props.enums.gamesNames});
    }

    prepareProvinceOptions(){
        let provincesOptions = [];
        provincesOptions.push(<option key="nullOption"/>);
        if(this.state.provincesNames!==undefined){
            this.state.provincesNames.map(
                provincesName => {
                    provincesOptions.push(<option key={provincesName}>{provincesName}</option>);
                }
            );
        }
        return provincesOptions;
    }

    prepareTournamentGamesOptions(){
        let tournamentGamesOptions = [];
        tournamentGamesOptions.push(<option key="nullOption"/>);
        if(this.state.tournamentsGames!==undefined) {
            this.state.tournamentsGames.map(
                tournamentGame => {
                    tournamentGamesOptions.push(<option key={tournamentGame}>{tournamentGame}</option>);
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
                <TextInput
                    name = "Name"
                    placeholder = "Jarek123"
                    keys = {["player","name"]}
                    operation = ":"
                    indexOfSearchFields = "Name"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <TextInput
                    name = "City"
                    placeholder = "Lublin"
                    keys = {["tour","tournament","address", "city"]}
                    operation = ":"
                    indexOfSearchFields = "city"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <SelectInput
                    name = "Province"
                    keys = {["player","address", "province","location"]}
                    operation = ":"
                    indexOfSearchFields = "province"
                    options = {provincesOptions}
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <SelectInput
                    name = "Game"
                    keys = {["tour","tournament","game","name"]}
                    operation = ":"
                    indexOfSearchFields = "game"
                    options = {tournamentGamesOptions}
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <NumberInput
                    name = "Points"
                    keys = {["players","points"]}
                    operation = "<"
                    indexOfSearchFields = "points"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <DateInput
                    name = "Date from"
                    keys = {["tour","tournament","dateOfStart"]}
                    operation = ">"
                    indexOfSearchFields = "dateOfStart"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <DateInput
                    name = "Date to"
                    keys = {["tour","tournament","dateOfEnd"]}
                    operation = "<"
                    indexOfSearchFields = "dateOfEnd"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <button onClick={()=>this.props.search(this.state.searchFormField)}
                        type="button"
                        className="btn btn-default">Search</button>
            </div>
        );
    }
}