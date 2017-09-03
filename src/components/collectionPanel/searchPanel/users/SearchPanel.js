import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../../../../redux/actions/index';

import {serverName} from '../../../../main/consts/server';

import axios from 'axios';

class SearchPanel extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userTypes:[],
            provincesNames:[]
        };
    }

    componentDidMount(){
        this.getAllUsersEnums();
    }

    getAllUsersEnums(){
        axios.get(serverName+`get/users/enums`)
            .then(res => {
                res.data.userTypes.push("BANNED");
                this.setState({userTypes:res.data.userTypes});
                this.setState({provincesNames:res.data.provincesNames});
            })
            .catch(error => {
                this.props.showNetworkErrorMessageBox(error);
            });
    }

    searchUsers(){
        let pageRequest=this.props.pageRequest;
        pageRequest.searchCriteria=[];


        if(this.username.value!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["username"],
                    "operation":":",
                    "value":this.username.value
                }
            )}
        if(this.name.value!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["name"],
                    "operation":":",
                    "value":this.name.value
                }
            )}
        if(this.surname.value!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["surname"],
                    "operation":":",
                    "value":this.surname.value
                }
            )}
        if(this.email.value!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["email"],
                    "operation":":",
                    "value":this.email.value
                }
            )}
        if(this.province.value!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["address", "province", "location"],
                    "operation":":",
                    "value":this.province.value
                }
            )}
        if(this.city.value!==""){
            pageRequest.searchCriteria.push(
                {
                    "keys":["address", "city"],
                    "operation":":",
                    "value":this.city.value
                }
            )}
        if(this.phoneNumber.value!=="" && /^\d+$/.test(this.phoneNumber.value)){
            pageRequest.searchCriteria.push(
                {
                    "keys":["phoneNumber"],
                    "operation":">",
                    "value":parseInt(this.phoneNumber.value)
                }
            )}

        this.props.setPageRequest(pageRequest);
        this.props.getPageRequest();
    }

    prepareUserTypesOptions(userTypesOptions){
        userTypesOptions.push(<option key="nullOption"/>);
        this.state.userTypes.map(
            userType => {
                userTypesOptions.push(<option key={userType}>{userType}</option>);
            }
        )
    }

    prepareProvinceOptions(provincesOptions){
        provincesOptions.push(<option key="nullOption"/>);
        this.state.provincesNames.map(
            provincesName => {
                provincesOptions.push(<option key={provincesName}>{provincesName}</option>);
            }
        )
    }

    render(){
        let userTypesOptions = [];
        let provincesOptions = [];

        this.prepareProvinceOptions(provincesOptions);
        this.prepareUserTypesOptions(userTypesOptions);

        return (
            <div className="row">
                <form>
                    <div className="input-group">
                        <span className="input-group-addon">Username:</span>
                        <input ref={(control) => this.username = control} id="username" type="text" className="form-control" name="username"
                               placeholder="Jarek123"/>
                    </div>
                    <div className="input-group">
                        <span className="input-group-addon">Name:</span>
                        <select ref={(control) => this.name = control} name="name"  className="form-control" id="name">
                            {provincesOptions}
                        </select>
                    </div>
                    <div className="input-group">
                        <span className="input-group-addon">Surname:</span>
                        <input ref={(control) => this.surname = control} id="surname" type="text" className="form-control" name="surname"
                               placeholder="Bielec"/>
                    </div>
                    <div className="input-group">
                        <span className="input-group-addon">E-mail:</span>
                        <input ref={(control) => this.email = control} id="email" type="text" className="form-control" name="email"
                               placeholder="Jarek@gmail.com"/>
                    </div>
                    <div className="input-group">
                        <span className="input-group-addon">User type:</span>
                        <select ref={(control) => this.userType = control} className="form-control" id="userType" name="userType">
                            {userTypesOptions}
                        </select>
                    </div>
                    <div className="input-group">
                        <span className="input-group-addon">City:</span>
                        <input ref={(control) => this.city = control} id="city" type="text" className="form-control" name="city"
                               placeholder="Lublin"/>
                    </div>
                    <div className="input-group">
                        <span className="input-group-addon">Province:</span>
                        <select ref={(control) => this.province = control} className="form-control" id="province">
                            {provincesOptions}
                        </select>
                    </div>
                    <button onClick={()=>this.searchUsers()} type="button" className="btn btn-default">Search</button>
                </form>
            </div>
        );
    }
};

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        page: state.page,
        pageRequest: state.pageRequest
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( SearchPanel );

