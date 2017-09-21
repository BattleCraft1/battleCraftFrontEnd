import React from 'react';
import TextInput from './../inputs/TextInput'
import SelectInput from './../inputs/SelectInput'
import StatusInput from './../inputs/StatusInput'

export default class FormInputs extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            provincesNames:[],
            status:[],
            searchFormField: {
                "username":{},
                "name":{},
                "surname":{},
                "email":{},
                "province":{},
                "city":{},
                "userType":{}
            }
        }
    }

    componentDidMount(){
        this.setState({provincesNames:this.props.enums.provincesNames});
        this.setState({status:this.props.enums.usersTypes});
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

    prepareUserTypeOptions(){
        let userTypeOptions = [];
        userTypeOptions.push(<option key="nullOption"/>);
        this.state.status.map(
            statusName => {
                userTypeOptions.push(<option key={statusName}>{statusName}</option>);
            }
        );
        userTypeOptions.push(<option key="BANNED">BANNED</option>);
        return userTypeOptions;
    }

    changeSearchForm(index,value){
        let searchFormFields = this.state.searchFormField;
        searchFormFields[index] = value;
        this.setState({searchFormField:searchFormFields});
    }

    render(){
        let userTypeOptions = this.prepareUserTypeOptions();
        let provincesOptions = this.prepareProvinceOptions();

        return (
            <div>
                <TextInput
                    name = "Username"
                    placeholder = "Jarek123"
                    keys = {["username"]}
                    operation = ":"
                    indexOfSearchFields = "username"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <TextInput
                    name = "Name"
                    placeholder = "Kowalski"
                    keys = {["name"]}
                    operation = ":"
                    indexOfSearchFields = "name"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <TextInput
                    name = "E-mail"
                    placeholder = "Jarek@gmail.com"
                    keys = {["email"]}
                    operation = ":"
                    indexOfSearchFields = "email"
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
                <StatusInput
                    options = {userTypeOptions}
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <button onClick={()=>this.props.search(this.state.searchFormField)}
                        type="button"
                        className="btn btn-default">Search</button>
            </div>
        )
    }
}