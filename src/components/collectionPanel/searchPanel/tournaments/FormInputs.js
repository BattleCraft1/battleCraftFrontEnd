import React from 'react';
import TextInput from './../inputs/TextInput'

export default class FormInputs extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            provincesNames:[],
            tournamentsGames:[],
            status:[]
        }
    }

    componentDidMount(){
        this.setState({provincesNames:this.props.enums.provincesNames});
        this.setState({tournamentsGames:this.props.enums.gamesNames});
        this.setState({status:this.props.enums.status});
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

    render(){
        let provincesOptions = this.prepareProvinceOptions(provincesOptions);
        let tournamentGamesOptions = this.prepareTournamentGamesOptions(tournamentGamesOptions);
        let tournamentStatusOptions = this.prepareTournamentStatusOptions(tournamentStatusOptions);

        return (
            <div>
                <TextInput
                    name = "Name"
                    placeholder = "Tournament 2017"
                    keys = {["name"]}
                    operation = ":"
                />
            </div>
        )
    }
}