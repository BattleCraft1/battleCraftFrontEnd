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

import Cookies from 'universal-cookie';

const cookies = new Cookies('auth');

class LoginPanel extends React.Component {
    constructor(props) {
        super(props);
        this.setPanelRef = this.setPanelRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);

        this.state = {
            username:"",
            usernameError:"",
            password:"",
            passwordError:""
        }
    }

    login(){
        this.setState({usernameError:""});
        this.setState({passwordError:""});

        let usernameError = "";
        let passwordError = "";

        if(!this.state.username.match(new RegExp("^[A-ZĄĆĘŁŃÓŚŹŻa-zzżźćńółęąś0-9]{3,30}$")))
            usernameError = "Name must have between 3 to 30 chars";
        if(this.state.password.length<8 || this.state.password.length>32)
            passwordError = "Password should have more than 8 characters and less than 32";

        if(usernameError!=="" || passwordError!==""){
            this.setState({usernameError:usernameError});
            this.setState({passwordError:passwordError});
            return;
        }

        let authDTO = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.startLoading("Login...");
        axios.post(serverName+"auth",authDTO)
            .then(res => {
                let role = res.data.role.replace("ROLE_","");
                role = role.toLocaleLowerCase();
                if(role === 'accepted'){
                    role = 'player'
                }
                else if(role === 'new'){
                    role = 'new user'
                }
                let date = new Date();
                console.log(res.data.username);
                this.props.setTokenAndRole(res.data.token,res.data.role,res.data.username);

                cookies.set('token', res.data.token, { path: '/' ,expires: new Date(+new Date + 12096e5)});
                cookies.set('role', res.data.role, { path: '/' ,expires: new Date(+new Date + 12096e5)});
                cookies.set('username', res.data.username, { path: '/' ,expires: new Date(+new Date + 12096e5)});

                this.props.stopLoading();
                this.props.showSuccessMessage("You successfully log in with "+role+" permissions");

                this.setState({username:""});
                this.setState({password:""});
                this.setState({usernameError:""});
                this.setState({passwordError:""});

                this.props.showLoginPanel(false);
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
        this.setState({username:""});
        this.setState({password:""});
        this.setState({usernameError:""});
        this.setState({passwordError:""});
        this.props.showLoginPanel(false);
    }

    setPanelRef(node) {
        this.popupRef = node;
    }

    render(){
        return (
            <div>
                {this.props.securityPanels.isLoginPanelShown &&

                <div style = {Object.assign({}, styles.background, {display: 'block'})}>
                    <div ref={this.setPanelRef}>
                        <div style = {styles.loginPanel}  className={css(resp.loginPanel)}>
                            <Label name={"Login"}/>
                            <div ref={this.setPanelRef}>
                                <Input
                                    onChange={(event) => {this.setState({username:event.target.value})}}
                                    value={this.state.username}
                                    placeholder={"type your username"}
                                    disabled={false}
                                    name={"username"}/>
                                <ValidationErrorMessage
                                    validationErrorMessage={this.state.usernameError}/>
                                <Input
                                    onChange={(event) => {this.setState({password:event.target.value})}}
                                    value={this.state.password}
                                    type={"password"}
                                    placeholder={"password"}
                                    disabled={false}
                                    name={"password"}/>
                                <ValidationErrorMessage
                                    validationErrorMessage={this.state.passwordError}/>
                                <Button operation={this.hideMessageBox.bind(this)} name={"Cancel"}/>
                                <Button operation={()=>{this.login()}} name={"Login"} additionalStyle={{float:'right'}}/>
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

export default connect( mapStateToProps, mapDispatchToProps )( LoginPanel );



