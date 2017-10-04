import React from 'react';
import TextInput from './../inputs/TextInput'
import NumberInput from './../inputs/NumberInput'
import StatusInput from './../inputs/StatusInput'
import DateInput from './../inputs/DateInput'
import {resp, styles} from '../styles'


export default class FormInputs extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            provincesNames:[],
            status:[],
            searchFormField: {
                "name":{},
                "tournamentsNumber":{},
                "creatorName":{},
                "gameStatus":{}
            }
        }
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.enums!==undefined && nextProps.enums !== this.props.enums) {
            this.setState({status:nextProps.enums.gamesStatus});
        }
    }

    componentDidMount(){
        this.setState({status:this.props.enums.gamesStatus});
    }

    prepareGamesStatusOptions(){
        let gamesStatusOptions = [];
        gamesStatusOptions.push(<option key="nullOption"/>);
        if(this.state.status!==undefined) {
            this.state.status.map(
                statusName => {
                    gamesStatusOptions.push(<option key={statusName}>{statusName}</option>);
                }
            );
            gamesStatusOptions.push(<option key="BANNED">BANNED</option>);
        }
        return gamesStatusOptions;
    }

    changeSearchForm(index,value){
        let searchFormFields = this.state.searchFormField;
        searchFormFields[index] = value;
        this.setState({searchFormField:searchFormFields});
    }

    render(){
        let gamesStatusOptions = this.prepareGamesStatusOptions();

        return (
            <div>
                <TextInput
                    name = "Name"
                    placeholder = "Warhammer"
                    keys = {["name"]}
                    operation = ":"
                    indexOfSearchFields = "name"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <NumberInput
                    name = "Tournaments number"
                    keys = {["tournamentsNumber"]}
                    operation = "<"
                    indexOfSearchFields = "tournamentsNumber"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <TextInput
                    name = "Creator name"
                    placeholder = "Jarek123"
                    keys = {["creatorName"]}
                    operation = ":"
                    indexOfSearchFields = "creatorName"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <StatusInput
                    options = {gamesStatusOptions}
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <DateInput
                    name = "Creation date"
                    keys = {["dateOfCreation"]}
                    operation = "<"
                    indexOfSearchFields = "dateOfCreation"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <button onClick={()=>this.props.search(this.state.searchFormField)}
                        type="button"
                        className="btn btn-default">Search</button>
            </div>
        )
    }
}
