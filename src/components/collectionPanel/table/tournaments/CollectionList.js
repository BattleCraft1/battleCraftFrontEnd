import { ActionCreators } from '../../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import Checkbox from '../../../commonComponents/checkBox/Checkbox'
import MultiCheckbox from '../../../commonComponents/checkBox/MultiCheckbox'
import TextOutput from '../../../commonComponents/textOutput/TextOutput'
import OptionPanel from '../../optionPanel/tournaments/OptionPanel'
import LegendPanel from '../../legendPanel/tournaments/LegendPanel'

import dateFormat from 'dateformat';

let icons = require('glyphicons');

const NEW_COLOR =             'rgb(230, 197, 158)';
const ACCEPTED_COLOR =        'rgb(116, 152, 88)';
const IN_PROGRESS_COLOR =     'rgb(142, 108, 63)';
const FINISHED_COLOR =        'rgb(96, 146, 162)';
const BANNED_COLOR =          'rgb(156, 99, 87)';

const NEW_COLOR_ACTIVE =          'rgb(226, 203, 175)';
const ACCEPTED_COLOR_ACTIVE =     'rgb(157, 186, 134)';
const IN_PROGRESS_COLOR_ACTIVE =  'rgb(140, 115, 82)';
const FINISHED_COLOR_ACTIVE =     'rgb(120, 170, 186)';
const BANNED_COLOR_ACTIVE =       'rgb(200, 143, 131)';

class CollectionList extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            activeColumn: ""
        };
    }

    handleTheadClick(activeColumn)
    {
        this.setState({activeColumn:activeColumn});
        console.log("clicked on: " + this.state.activeColumn);
    }

    sortByColumnName(columnName){
        let pageRequest=this.props.pageRequest;
        pageRequest.pageRequest.property=columnName;
        pageRequest.pageRequest.direction=pageRequest.pageRequest.direction==='ASC'?'DESC':'ASC';
        this.setState({direction:pageRequest.pageRequest.direction});
        this.props.setPageRequest(pageRequest);
        this.props.getPageRequest();
        this.handleTheadClick();
    }

    getArrowGlyph(columnName){
        if(this.state.activeColumn === columnName){
            if(this.state.direction === 'ASC'){
                return icons.arrowTriD
            }
            else{
                return icons.arrowTriU
            }
        }
    }

    getColor(columnName, tournament){
        if(this.state.activeColumn !== columnName){
            if(tournament.banned)
                return BANNED_COLOR;
            else if(tournament.tournamentStatus === "ACCEPTED")
                return ACCEPTED_COLOR;
            else if(tournament.tournamentStatus === "FINISHED")
                return FINISHED_COLOR;
            else if(tournament.tournamentStatus === "IN_PROGRESS")
                return IN_PROGRESS_COLOR;
            return NEW_COLOR
        }
        else{
            if(tournament.banned)
                return BANNED_COLOR_ACTIVE;
            else if(tournament.tournamentStatus === "ACCEPTED")
                return ACCEPTED_COLOR_ACTIVE;
            else if(tournament.tournamentStatus === "FINISHED")
                return FINISHED_COLOR_ACTIVE;
            else if(tournament.tournamentStatus === "IN_PROGRESS")
                return IN_PROGRESS_COLOR_ACTIVE;
            return NEW_COLOR_ACTIVE
        }
    }

    static addNewElement(){
        console.log("TO DO ADD");
    }

    static editCheckedElements(){
        console.log("TO DO EDIT");
    }

    prepareRowsOfTable(rows,key){
        this.props.page.content.map(
            tournament =>{
                key++;
                rows.push(
                    <tr key={"tr:"+key} className={css(resp.tableRow)}>

                        <th key={"th:"+key}
                            scope="row"
                            className = {css(resp.rowContent, resp.smallCheckbox)}
                            style = {Object.assign({}, styles.checkbox, styles.thead, {borderRadius: '0px'})}>
                            <Checkbox name={tournament.name}/></th>

                        <th onClick={()=>{this.sortByColumnName("name"); this.handleTheadClick("name")}}
                            key="name"
                            style={(this.state.activeColumn === "name") ?  styles.theadActive : styles.thead}
                            className = {css(resp.rowContent)+" "+css(resp.nameLabel)}>
                            name{this.getArrowGlyph("name")}</th>

                        <td key={"td:name:"+key}
                            className = {css(resp.rowContent)}
                            style={Object.assign({}, styles.thead, styles.rowContent,  {backgroundColor: this.getColor("name", tournament)})}
                            onClick={() => {this.editCheckedElements()}}>
                            <TextOutput text={tournament.name} limit={17}/></td>

                        <th onClick={()=>{this.sortByColumnName("province.location");this.handleTheadClick("province")}}
                            key="province"
                            style={(this.state.activeColumn === "province") ? styles.theadActive : styles.thead }
                            className = {css(resp.rowContent)+" "+css(resp.rowLabel)}>
                            province{this.getArrowGlyph("province")}</th>

                        <td key={"td:province"+key}
                            className = {css(resp.rowContent)}
                            style={Object.assign({}, styles.thead, styles.rowContent,  {backgroundColor: this.getColor("province", tournament)} )}>
                            <TextOutput text={tournament.province} limit={17}/></td>

                        <th onClick={()=>{this.sortByColumnName("address.city"); this.handleTheadClick("city")}}
                            key="city"
                            style={(this.state.activeColumn === "city") ? styles.theadActive : styles.thead }
                            className = {css(resp.rowContent)+" "+css(resp.rowLabel)}>
                            city{this.getArrowGlyph("city")}</th>

                        <td key={"td:city"+key}
                            className = {css(resp.rowContent)}
                            style={Object.assign({}, styles.thead, styles.rowContent,  {backgroundColor: this.getColor("city", tournament)} )}>
                            <TextOutput text={tournament.city} limit={17}/></td>

                        <th onClick={()=>{this.sortByColumnName("game.name"); this.handleTheadClick("game")}}
                            key="game"
                            style={(this.state.activeColumn === "game") ? styles.theadActive : styles.thead }
                            className = {css(resp.rowContent)+" "+css(resp.rowLabel)}>
                            game{this.getArrowGlyph("game")}</th>

                        <td key={"td:game"+key}
                            className = {css(resp.rowContent)}
                            style={Object.assign({}, styles.thead, styles.rowContent,  {backgroundColor: this.getColor("game", tournament)} )}>
                            <TextOutput text={tournament.game} limit={17}/></td>

                        <th onClick={()=>{this.sortByColumnName("freeSlots"); this.handleTheadClick("players")}}
                            key="players"
                            style={(this.state.activeColumn === "players") ? styles.theadActive : styles.thead }
                            className = {css(resp.rowContent)+" "+css(resp.rowLabel)}>
                            players{this.getArrowGlyph("players")}</th>

                        <td key={"td:players"+key}    className = {css(resp.rowContent)}  style={Object.assign({}, styles.thead, styles.rowContent,  {backgroundColor: this.getColor("players", tournament)} )}>
                            {tournament.playersNumber}/{tournament.maxPlayers}</td>

                        <th onClick={()=>{this.sortByColumnName("dateOfStart"); this.handleTheadClick("date")}}
                            key="date"
                            style={(this.state.activeColumn === "date") ? styles.theadActive : styles.thead }
                            className = {css(resp.rowContent)+" "+css(resp.rowLabel)}>
                            date{this.getArrowGlyph("date")}</th>

                        <td key={"td:date"+key}
                            className = {css(resp.rowContent)}
                            style={Object.assign({}, styles.thead, styles.rowContent,  {backgroundColor: this.getColor("date", tournament)} )}>
                            {dateFormat((new Date(tournament.dateOfStart)),"dd-MM-yyyy hh:mm")}</td>
                    </tr>
                )
            }
        );
    }


    render(){
        let rows = [];
        let key = 0;

        if(this.props.page.content!==undefined)
        {
            this.prepareRowsOfTable(rows,key);
        }

        return (
            <div>
                <div className="row">
                    <LegendPanel/>
                    <table className="" style={styles.table}>
                        <thead>
                        <tr>
                            <th key="all" style={styles.thead} className = {css(resp.theadElement)}>
                                <MultiCheckbox /></th>
                            <th onClick={()=>{this.sortByColumnName("name"); this.handleTheadClick("name")}}
                                key="name"
                                style={Object.assign({}, styles.thead, (this.state.activeColumn === "name") ?  styles.theadActive : styles.thead)}
                                className = {css(resp.theadElement)}>
                                name {this.getArrowGlyph("name")}</th>
                            <th onClick={()=>{this.sortByColumnName("province.location"); this.handleTheadClick("province")}}
                                key="province"
                                style={Object.assign({},styles.thead, (this.state.activeColumn === "province") ? styles.theadActive : styles.thead)}
                                className={css(resp.theadElement)}>
                                province {this.getArrowGlyph("province")}</th>
                            <th onClick={()=>{this.sortByColumnName("address.city"); this.handleTheadClick("city")}}
                                key="city"
                                style={Object.assign({},styles.thead, (this.state.activeColumn === "city") ? styles.theadActive : styles.thead)}
                                className={css(resp.theadElement)}>
                                city {this.getArrowGlyph("city")}</th>
                            <th onClick={()=>{this.sortByColumnName("game.name"); this.handleTheadClick("game")}}
                                key="game"
                                style={Object.assign({},styles.thead, (this.state.activeColumn === "game") ? styles.theadActive : styles.thead)}
                                className={css(resp.theadElement)}>
                                game {this.getArrowGlyph("game")}</th>
                            <th onClick={()=>{this.sortByColumnName("freeSlots"); this.handleTheadClick("players")}}
                                key="players"
                                style={Object.assign({},styles.thead, (this.state.activeColumn === "players") ? styles.theadActive : styles.thead)}
                                className={css(resp.theadElement)}>players {this.getArrowGlyph("players")}</th>
                            <th onClick={()=>{this.sortByColumnName("dateOfStart"); this.handleTheadClick("date")}}
                                key="date"
                                style={Object.assign({},styles.thead, (this.state.activeColumn === "date") ? styles.theadActive : styles.thead)}
                                className={css(resp.theadElement)}>
                                date {this.getArrowGlyph("date")}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rows}
                        </tbody>
                    </table>
                    <OptionPanel collectionType={this.props.collectionType}/>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        page: state.page,
        pageRequest: state.pageRequest,
        confirmation: state.confirmation,
        message: state.message,
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( CollectionList );

const styles = {

    rowContent: {
        borderRadius: '0',
        background: '#c6a57d',
        border: '1px solid',
        padding: '8px',
        paddingLeft: '8px',
        textAlign: 'none',
        backgroundImage: '',
        WebkitBorderImage: '',
        color: 'black',
        borderTopColor: '#dfd19e',
        borderBottomColor: '#886e4b',
        borderLeftColor: '#dfd19e',
        borderRightColor: '#886e4b',
        textShadow: ' ',
    },
    rowContentActive: {
        background: '#906a3d'
    },
    thead: {
        borderCollapse: 'separate',
        borderRadius: '4px 4px 0 0',
        border: '1px solid',
        color: 'white',
        //
        borderTopColor: '#E0BA51',
        borderBottomColor: '#E0BA51',
        borderRightColor: '#805D2C',
        borderLeftColor: '#e3ca86',
        //borderColor:'#4e3e28',
        background: '#735630',

        // backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#b48443), to(#654a25))',
        // WebkitBorderImage: '-webkit-linear-gradient(left, #FE2EF7, #4AC0F2) 0 0 20px',
        backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#735327), to(#473419))',
    },
    theadActive: {
        borderCollapse: 'separate',
        borderRadius: '4px 4px 0 0',
        border: '1px solid',

        color: 'lightGrey',
        borderTopColor: 'rgb(204, 126, 69)',
        borderBottomColor: 'rgb(249, 249, 249)',
        background: '#735630',

        backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#473419), to(#735327))',
    },
    table: {
        position: 'relative',
        background: 'black',
        width: '90%',
        marginLeft: '5%',
        marginBottom: '4px',
        borderCollapse: 'separate',
    },
    checkbox: {
        padding: '8px',
        paddingLeft: '4px',
        paddingRight: '4px',
        borderRight: '0px',
        //backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#d19c55), to(#906b3a))',
        borderBottomColor: '#775930',
        textAlign: 'center',
    },
    name: {
        width: '90%',
    }
};

const resp = StyleSheet.create({
    theadElement:{
        boxShadow:'inset 0 2px 2px #9c7239',
        fontFamily:'arial, helvetica, sans-serif',
        textShadow:'-1px -1px 0 rgba(0,0,0,0.3)',
        padding: '8px',
        paddingLeft:'4px',
        paddingRight:'4px',
        textAlign: 'center',

        '@media (max-width: 600px)': {
            display:'none',
        },

        ':hover':{
            borderTopColor: 'rgb(249, 249, 249)',
            borderBottomColor: 'rgb(204, 126, 69)',
        },
        ':focus':{
            borderTopColor: 'rgb(249, 249, 249)',
            borderBottomColor: 'rgb(204, 161, 130)',
        },
        ':active':{
            color:'lightGrey',
            borderTopColor: 'rgb(204, 126, 69)',
            borderBottomColor: 'rgb(249, 249, 249)',
        },

    },

    tableRow:{
        '@media (max-width: 600px)': {
            display:'block',
            position:'relative',
            marginBottom:'4px',
        },
    },

    rowContent:{
        position:'relative',
        textAlign:'center',
        '@media (max-width: 599px)': {
            width:'70%',
            display: 'inline-block',
            borderRadius:'0'
        }
    },
    rowLabel:{
        paddingTop:'8px',
        paddingBottom:'8px',
        width:'30%',
        '@media (min-width: 600px)': {
            display:'none',
        }
    },
    rowContainer:{
        position:'static',
        padding:'10px',
        background:'white',
        '@media (max-width: 600px)': {
            marginBottom:'10px',
        }
    },
    nameLabel:{
        paddingTop:'8px',
        paddingBottom:'8px',
        width:'20%',
        '@media (min-width: 600px)': {
            display:'none',
        },
    },

    smallCheckbox:{
        '@media (max-width: 599px)': {
            width:'10%',
            margin:'0',
            paddingTop:'7px',
            paddingBottom:'7px',
        }
    },
});
