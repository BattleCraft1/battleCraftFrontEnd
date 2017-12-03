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
            <Dropdown
                key="Tournaments"
                name="Tournaments"
            >{this.createTournamentOptionList()}</Dropdown>
            <Dropdown
                key="Games"
                name="Games"
            >{this.createGamesOptionList()}</Dropdown>
            <Dropdown
                key="Users"
                name="Users"
            >{this.createUsersOptionList()}</Dropdown>
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

    createTournamentOptionList(){
        return [<ActivingPopupDropdownOption
                key="1"
                name = "Add tournament"
                function = {() => {this.props.addEntity(entityPanelTypes.tournament)}}
            />,
            <NavigatingDropdownOption
                key="2"
                name = "All tournaments"
                link = "/collectionsPanel/tournaments"

            />]
    }

    createGamesOptionList(){
        return [<ActivingPopupDropdownOption
                key="1"
                name = "Add game"
                function = {() => {this.props.addEntity(entityPanelTypes.game)}}
            />,
            <NavigatingDropdownOption
                key="2"
                name = "All games"
                link = "/collectionsPanel/games"
            />]
    }

    createUsersOptionList(){
        return <NavigatingDropdownOption
                name = "All users"
                link = "/collectionsPanel/users"
            />
    }

    createAccountOptionList(){
        return [<ActivingPopupDropdownOption
            key="1"
            name = "Login"
            function = {() => {this.props.showLoginPanel(true)}}
            />,
            <ActivingPopupDropdownOption
                key="2"
                name = "Forgot credentials?"
                function = {() => {this.props.showCredentialsPanel(true)}}
            />,]
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
    return {};
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
