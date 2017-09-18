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
            usersTypes:[],
            provincesNames:[]
        };
    }

    componentDidMount(){
        this.getAllUsersEnums();
    }

    getAllUsersEnums(){
        axios.get(serverName+`get/users/enums`)
            .then(res => {
                this.setState({provincesNames:res.data.provincesNames});
                res.data.usersTypes.push("BANNED");
                this.setState({usersTypes:res.data.usersTypes});
            })
            .catch(error => {
                this.props.showNetworkErrorMessage(error);
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

        this.props.setPageRequest(pageRequest);
        this.props.getPageRequest(this.props.collectionType);
    }

    prepareUserTypeOptions(userTypeOptions){
        userTypeOptions.push(<option key="nullOption"/>);
        this.state.usersTypes.map(
            status => {
                userTypeOptions.push(<option key={status}>{status}</option>);
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
        let userTypeOptions = [];
        let provincesOptions = [];

        this.prepareProvinceOptions(provincesOptions);
        this.prepareUserTypeOptions(userTypeOptions);

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
                        <input ref={(control) => this.name = control} id="name" type="text" className="form-control" name="name"
                               placeholder="Jarek"/>
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
                        <select ref={(control) => this.status = control} className="form-control" id="status" name="status">
                            {userTypeOptions}
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

