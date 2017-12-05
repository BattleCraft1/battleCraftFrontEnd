import React from 'react';

import {styles, resp} from '../styles';
import {css, StyleSheet} from 'aphrodite';
import Label from '../commonElements/Label';
import Input from '../commonElements/TextInput';
import Button from '../commonElements/OptionButton';

import { ActionCreators } from '../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import axios from 'axios'
import {serverName} from "../../../main/consts/server";

import ValidationErrorMessage from "../../entityPanel/outputs/ValidationErrorMessage";

class ChangeCredentialsPanel extends React.Component {
    constructor(props) {
        super(props);
        this.setPanelRef = this.setPanelRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);

        this.state = {
            email:"",
            validationError:""
        };
    }

    resetPassword(){
        if(this.state.validationError!=="")
            this.setState({validationError:""});

        if(!this.state.email.match(new RegExp("(^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.+[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@+(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$)")))
        {
            this.setState({validationError:"Invalid email"});
            return;
        }

        this.props.startLoading("Reseting password...");
        axios.post(serverName+"auth/reset/password",{email:this.state.email})
            .then(res => {
                this.props.stopLoading();
                this.props.showSuccessMessage("Username and new password were sent to you e-mail address");
                this.hideMessageBox();
            })
            .catch(error => {
                this.props.stopLoading();
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
        this.setState({email:""});
        this.setState({validationError:""});
        this.props.showForgotCredentialsPanel(false);
    }

    setPanelRef(node) {
        this.popupRef = node;
    }

    render(){
        return (
            <div>
                {this.props.securityPanels.isForgotCredentialsPanelShown &&
                <div style = {Object.assign({}, styles.background, {display: 'block'})}>
                    <div ref={this.setPanelRef}>
                        <div style = {styles.loginPanel}  className={css(resp.loginPanel)}>
                            <Label name={"Bring back credentials"}/>
                            <div>
                                <Input
                                    onChange={(event) => {this.setState({email:event.target.value})}}
                                    value={this.state.email}
                                    disabled={false}
                                    placeholder={"type your email"}
                                    name={"email"}
                                    type={"email"}/>
                                <ValidationErrorMessage
                                    validationErrorMessage={this.state.validationError}/>
                                <Button operation={this.hideMessageBox.bind(this)} name={"Cancel"}/>
                                <Button operation={()=>{this.resetPassword()}} name={"Proceed"} additionalStyle={{float:'right'}}/>
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
        securityPanels: state.securityPanels
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( ChangeCredentialsPanel );