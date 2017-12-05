import React from 'react';

import {styles, resp} from '../styles';
import {css, StyleSheet} from 'aphrodite';

import ValidationErrorMessage from "../../entityPanel/outputs/ValidationErrorMessage";

import Label from '../commonElements/Label';
import Input from '../commonElements/TextInput';
import Button from '../commonElements/OptionButton';

import { ActionCreators } from '../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import axios from 'axios'
import {serverName} from "../../../main/consts/server";

class ChangePasswordPopup extends React.Component {
    constructor(props) {
        super(props);
        this.setPanelRef = this.setPanelRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);

        this.state = {
            oldPassword:"",
            password:"",
            passwordConfirm:"",
            validationError:"",
        }
    }

    changePassword(){
        if(this.state.validationError!=="")
            this.setState({validationError:""});

        if(this.state.password.length<8 || this.state.password.length>32)
        {
            this.setState({validationError:"Password should have more than 8 characters and less than 32"});
            return;
        }

        if(this.state.password!==this.state.passwordConfirm){
            this.setState({validationError:"Password confirmation and password are not the same"});
            return;
        }

        axios.post(serverName+"auth/change/password",
            {
                oldPassword:this.state.oldPassword,
                password:this.state.password,
                passwordConfirm: this.state.passwordConfirm
            },
            {
                headers: {
                    "X-Auth-Token":this.props.security.token
                }
            })
            .then(res => {
                this.props.showSuccessMessage("Password changed");
                this.hideMessageBox();
            })
            .catch(error => {
                this.props.showNetworkErrorMessage(error);
            });
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.popupRef && !this.popupRef.contains(event.target)) {
            this.hideMessageBox();
        }
    }

    hideMessageBox(){
        this.setState({oldPassword:"",
            password:"",
            passwordConfirm:"",
            validationError:"",});
        this.props.showChangePasswordPanel(false);
    }

    setPanelRef(node) {
        this.popupRef = node;
    }

    render(){
        return (
            <div>
                {this.props.securityPanels.isChangePasswordPanelShown &&

                <div style = {Object.assign({}, styles.background, {display: 'block'})}>
                    <div ref={this.setPanelRef}>
                        <div style = {styles.loginPanel}  className={css(resp.loginPanel)}>
                            <Label name={"Change password"}/>
                            <div ref={this.setPanelRef}>
                                <Input
                                    onChange={(event) => {this.setState({oldPassword:event.target.value})}}
                                    value={this.state.oldPassword}
                                    type={"password"}
                                    placeholder={"Old password"}
                                    disabled={false}
                                    name={"Old password"}/>
                                <Input
                                    onChange={(event) => {this.setState({password:event.target.value})}}
                                    value={this.state.password}
                                    type={"password"}
                                    placeholder={"New password"}
                                    disabled={false}
                                    name={"New password"}/>
                                <Input
                                    onChange={(event) => {this.setState({passwordConfirm:event.target.value})}}
                                    value={this.state.passwordConfirm}
                                    type={"password"}
                                    placeholder={"Confirm new password"}
                                    disabled={false}
                                    name={"Confirm password"}/>
                                <ValidationErrorMessage
                                    validationErrorMessage={this.state.validationError}/>
                                <Button operation={this.hideMessageBox.bind(this)} name={"Cancel"}/>
                                <Button operation={()=>{this.changePassword()}} name={"Change"} additionalStyle={{float:'right'}}/>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>

        )
    }
}


function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        securityPanels: state.securityPanels,
        security: state.security
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( ChangePasswordPopup );