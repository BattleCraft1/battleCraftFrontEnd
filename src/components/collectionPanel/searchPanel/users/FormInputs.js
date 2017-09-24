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
                "name":{},
                "firstname":{},
                "lastname":{},
                "email":{},
                "province":{},
                "city":{},
                "userType":{}
            }
        }
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.enums!==undefined && nextProps.enums !== this.props.enums) {
            this.setState({provincesNames:nextProps.enums.provincesNames});
            this.setState({status:nextProps.enums.usersTypes});
        }
    }

    componentDidMount(){
        this.setState({provincesNames:this.props.enums.provincesNames});
        this.setState({status:this.props.enums.usersTypes});
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

    prepareUserTypeOptions(){
        let userTypeOptions = [];
        userTypeOptions.push(<option key="nullOption"/>);
        if(this.state.status!==undefined){
            this.state.status.map(
                statusName => {
                    userTypeOptions.push(<option key={statusName}>{statusName}</option>);
                }
            );
        }
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
                    name = "Name"
                    placeholder = "Jarek123"
                    keys = {["name"]}
                    operation = ":"
                    indexOfSearchFields = "Name"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <TextInput
                    name = "First name"
                    placeholder = "Jarek"
                    keys = {["firstname"]}
                    operation = ":"
                    indexOfSearchFields = "firstname"
                    changeSearchForm = {this.changeSearchForm.bind(this)}
                />
                <TextInput
                    name = "Last name"
                    placeholder = "Kowalski"
                    keys = {["lastname"]}
                    operation = ":"
                    indexOfSearchFields = "lastname"
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