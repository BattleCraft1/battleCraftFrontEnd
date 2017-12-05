import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import NavElement from './NavElements/NavElement';
import Dropdown from './NavElements/Dropdown';
import ActivingPopupDropdownOption from './NavElements/DropdownOption/ActivingPopupDropdownOption';
import NavigatingDropdownOption from './NavElements/DropdownOption/NavigatingDropdownOption';
import ResponsiveMenuButton from './ResponsiveMenuButton'

import { ActionCreators } from '../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {entityPanelTypes} from '../../main/consts/entityPanelTypes'

class Navbar extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            responsive:false,
            isMenuToggle:true
        }
    }

    componentDidMount(){
        this.checkViewDimensions();
        window.addEventListener('resize', this.checkViewDimensions.bind(this));
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.checkViewDimensions.bind(this));
    }

    checkViewDimensions(){
        if(window.innerWidth < 800){
            this.setState({responsive:true});
            this.setState({isMenuToggle:false});
        }
        else{
            this.setState({responsive:false});
            this.setState({isMenuToggle:true});
        }
    }

    createResponsiveMenuButton(){
        if(this.state.responsive)
            return <ResponsiveMenuButton toggleResponsiveList = {this.toggleResponsiveList.bind(this)}/>;
        else
            return <div/>
    }

    toggleResponsiveList(){
        let responsiveMenuIsToggle = this.state.isMenuToggle;
        this.setState({isMenuToggle:!responsiveMenuIsToggle});
    }

    createOptions(){
        return <div>
            <NavElement
                key="Tournaments"
                name="Tournaments"
                link="/collectionsPanel/tournaments"
            />
            <NavElement
                key="Games"
                name="Games"
                link="/collectionsPanel/games"
            />
            <NavElement
                key="Users"
                name="Users"
                link="/collectionsPanel/users"
            />
            <NavElement
                key="Ranking"
                name="Ranking"
                link="/collectionsPanel/ranking"
            />
            <Dropdown
                key="Account"
                name="Account"
            >{this.createAccountOptionList()}</Dropdown>
        </div>
    }

    createAccountOptionList(){
        if(this.props.security.role === "" && this.props.security.token === ""){
            return [<ActivingPopupDropdownOption
                key="1"
                name = "Login"
                function = {() => {this.props.showLoginPanel(true)}}
            />,
                <ActivingPopupDropdownOption
                    key="2"
                    name = "Forgot credentials?"
                    function = {() => {this.props.showForgotCredentialsPanel(true)}}
                />,
                <ActivingPopupDropdownOption
                    key="3"
                    name = "Register"
                    function = {() => {this.props.showRegisterPanel(true)}}
                />,
                <ActivingPopupDropdownOption
                    key="4"
                    name = "Resend verification mail"
                    function = {() => {this.props.showResendMailPanel(true)}}
                />]
        }
        else if (this.props.security.role === "ROLE_ACCEPTED"){
            return [<ActivingPopupDropdownOption
                key="1"
                name = "Edit profile"
                function = {() => {this.props.editEntity("user",this.props.security.username)}}
            />,
                <NavigatingDropdownOption
                    key="2"
                    name = "Played tournaments"
                    link = "/collectionsPanel/participated"
                />,
                <ActivingPopupDropdownOption
                    key="6"
                    name = "Change password"
                    function = {() => {this.props.showChangePasswordPanel(true)}}
                />,
                <ActivingPopupDropdownOption
                    key="5"
                    name = "Logout"
                    function = {() => {this.props.logout()}}
                />]
        }
        else if (this.props.security.role === "ROLE_ORGANIZER"){
            return [<ActivingPopupDropdownOption
                key="1"
                name = "Edit profile"
                function = {() => {this.props.editEntity("user",this.props.security.username)}}
            />,
                <NavigatingDropdownOption
                    key="2"
                    name = "Played tournaments"
                    link = "/collectionsPanel/participated"
                />,
                <NavigatingDropdownOption
                    key="3"
                    name = "Organized tournaments"
                    link = "/collectionsPanel/organized"
                />,
                <ActivingPopupDropdownOption
                    key="6"
                    name = "Change password"
                    function = {() => {this.props.showChangePasswordPanel(true)}}
                />,
                <ActivingPopupDropdownOption
                    key="5"
                    name = "Logout"
                    function = {() => {this.props.logout()}}
                />]
        }
        else if (this.props.security.role === "ROLE_ADMIN"){
            return [<ActivingPopupDropdownOption
                key="1"
                name = "Edit profile"
                function = {() => {this.props.editEntity("user",this.props.security.username)}}
            />,
                <ActivingPopupDropdownOption
                    key="2"
                    name = "Create admin"
                    function = {() => {this.props.showRegisterPanel(true)}}
                />,
                <ActivingPopupDropdownOption
                    key="6"
                    name = "Change password"
                    function = {() => {this.props.showChangePasswordPanel(true)}}
                />,
                <ActivingPopupDropdownOption
                    key="3"
                    name = "Logout"
                    function = {() => {this.props.logout()}}
                />]
        }

    }

    render(){
        let responsiveMenuButton = this.createResponsiveMenuButton();
        let options = this.createOptions();
        return(
            <div className={css(resp.navbar)}>
                {responsiveMenuButton}
                <div >
                    {this.state.isMenuToggle && options}
                </div>
            </div>
        )
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        security:state.security
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( Navbar );


const resp = StyleSheet.create({
    navbar:{
        position:'relative',
        marginBottom:'20px',
        width:'70%',
        marginLeft:'15%',
        background:'none',
    }
});
