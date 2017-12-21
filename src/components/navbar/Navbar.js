import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import NavElement from './NavElements/NavElement';
import Dropdown from './NavElements/Dropdown';
import AccountDropdown from './NavElements/AccountDropdown';
import ActivePopupDropdownOption from './NavElements/DropdownOption/ActivatePopupDropdownOption';
import NavigatingDropdownOption from './NavElements/DropdownOption/NavigatingDropdownOption';
import ResponsiveMenuButton from './ResponsiveMenuButton'

import { ActionCreators } from '../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
                link="/battleCraft/collectionsPanel/tournaments"
            />
            <NavElement
                key="Games"
                name="Games"
                link="/battleCraft/collectionsPanel/games"
            />
            <NavElement
                key="Users"
                name="Users"
                link="/battleCraft/collectionsPanel/users"
            />
            <NavElement
                key="Ranking"
                name="Ranking"
                link="/battleCraft/collectionsPanel/ranking"
            />
            {this.createAccountNavElement()}
        </div>
    }

    createAccountNavElement(){
        if(this.props.security.role === "" && this.props.security.token === ""){
            return <Dropdown
                key="Account"
                name="Account">
                <ActivePopupDropdownOption
                    key="1"
                    name = "Login"
                    function = {() => {this.props.showLoginPanel(true)}}
                />
                <ActivePopupDropdownOption
                    key="2"
                    name = "Forgot credentials?"
                    function = {() => {this.props.showForgotCredentialsPanel(true)}}
                />
                <ActivePopupDropdownOption
                    key="3"
                    name = "Register"
                    function = {() => {this.props.showRegisterPanel(true)}}
                />
                <ActivePopupDropdownOption
                    key="4"
                    name = "Resend verification mail"
                    function = {() => {this.props.showResendMailPanel(true)}}
                />
            </Dropdown>
        }
        else{
            return <AccountDropdown
                key="Account"
                name={this.props.security.username}>
                {this.createAccountOptionList()}
            </AccountDropdown>
        }
    }

    createAccountOptionList(){
        if (this.props.security.role === "ROLE_ACCEPTED"){
            return [<ActivePopupDropdownOption
                key="1"
                name = "Edit profile"
                function = {() => {this.props.editEntity("user",this.props.security.username)}}
            />,
                <NavigatingDropdownOption
                    key="2"
                    name = "Played tournaments"
                    link = "/battleCraft/collectionsPanel/participated"
                />,
                <ActivePopupDropdownOption
                    key="6"
                    name = "Change password"
                    function = {() => {this.props.showChangePasswordPanel(true)}}
                />,
                <ActivePopupDropdownOption
                    key="5"
                    name = "Logout"
                    function = {() => {this.props.logout()}}
                />]
        }
        else if (this.props.security.role === "ROLE_ORGANIZER"){
            return [<ActivePopupDropdownOption
                key="1"
                name = "Edit profile"
                function = {() => {this.props.editEntity("user",this.props.security.username)}}
            />,
                <NavigatingDropdownOption
                    key="2"
                    name = "Played tournaments"
                    link = "/battleCraft/collectionsPanel/participated"
                />,
                <NavigatingDropdownOption
                    key="3"
                    name = "Organized tournaments"
                    link = "/battleCraft/collectionsPanel/organized"
                />,
                <ActivePopupDropdownOption
                    key="6"
                    name = "Change password"
                    function = {() => {this.props.showChangePasswordPanel(true)}}
                />,
                <ActivePopupDropdownOption
                    key="5"
                    name = "Logout"
                    function = {() => {this.props.logout()}}
                />]
        }
        else if (this.props.security.role === "ROLE_ADMIN"){
            return [<ActivePopupDropdownOption
                key="1"
                name = "Edit profile"
                function = {() => {this.props.editEntity("user",this.props.security.username)}}
            />,
                <ActivePopupDropdownOption
                    key="2"
                    name = "Create admin"
                    function = {() => {this.props.showRegisterPanel(true)}}
                />,
                <ActivePopupDropdownOption
                    key="6"
                    name = "Change password"
                    function = {() => {this.props.showChangePasswordPanel(true)}}
                />,
                <ActivePopupDropdownOption
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
        marginBottom:'70px',
        width:'70%',
        marginLeft:'15%',
        background:'none',
    }
});
