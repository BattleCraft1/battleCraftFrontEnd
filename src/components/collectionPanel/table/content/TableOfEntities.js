import React from 'react';

import { ActionCreators } from '../../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import OptionPanel from './../../optionPanel/OptionPanel'
import LegendPanel from './../../legendPanel/LegendPanel'
import RankingGameHeader from '../../legendPanel/RankingGameHeader'
import TournamentRow from './row/tournaments/Row'
import RankingRowHeader from './headRow/ranking/RowHeader'
import RankingRow from './row/ranking/Row'
import UserRow from './row/users/Row'
import TournamentRowHeader from './headRow/tournaments/RowHeader'
import UserRowHeader from './headRow/users/RowHeader'
import GameRow from './row/games/Row'
import GameRowHeader from './headRow/games/RowHeader'

import findGameName from '../../../../main/functions/findGameName'


let icons = require('glyphicons');

const rowTypeMap = {
    "tournaments":TournamentRow,
    "participated":TournamentRow,
    "organized":TournamentRow,
    "games":GameRow,
    "ranking":RankingRow,
    "users":UserRow
};

const rowHeaderTypeMap = {
    "tournaments":TournamentRowHeader,
    "participated":TournamentRowHeader,
    "organized":TournamentRowHeader,
    "games":GameRowHeader,
    "ranking":RankingRowHeader,
    "users":UserRowHeader
};

class TableOfEntities extends React.Component{

    sortByColumnName(columnName){
        let pageRequest=this.props.pageRequest;
        pageRequest.pageRequest.property=columnName;
        pageRequest.pageRequest.direction=pageRequest.pageRequest.direction==='ASC'?'DESC':'ASC';
        this.props.setPageRequest(pageRequest);
        this.props.getPage(this.props.collectionType);
    }

    isColumnActive(columnName){
        return this.props.pageRequest.pageRequest.property === columnName;
    }

    getArrowGlyph(columnName){
        if(this.isColumnActive(columnName)){
            if(this.props.pageRequest.pageRequest.direction === 'ASC'){
                return icons.arrowTriD
            }
            else{
                return icons.arrowTriU
            }
        }
    }

    prepareRowsOfTable(key){
        let rows = [];
        console.log(this.props.collectionType);
        if(rowTypeMap[this.props.collectionType]!==undefined){
            let typeOfRow = rowTypeMap[this.props.collectionType];

            this.props.page.content.forEach(
                element =>{
                    key++;
                    rows.push(
                        React.createElement(
                            typeOfRow,
                            {key : key,
                                number : key,
                                element : element,
                                isColumnActive : this.isColumnActive.bind(this),
                                sortByColumnName : this.sortByColumnName.bind(this),
                                getArrowGlyph : this.getArrowGlyph.bind(this)},
                            null));
                }
            );
        }
        return rows;
    }


    render(){
        let rows = [];
        let key = 0;
        let legend = <div/>;
        let rowHeader = <tr/>;

        console.log(this.props.collectionType);
        if(this.props.collectionType!=="")
            rowHeader = React.createElement(
                rowHeaderTypeMap[this.props.collectionType],
                {
                    isColumnActive : this.isColumnActive.bind(this),
                    sortByColumnName : this.sortByColumnName.bind(this),
                    getArrowGlyph : this.getArrowGlyph.bind(this)
                },
                null);

        if(this.props.collectionType==="ranking")
        {
            legend = <RankingGameHeader gameName = {findGameName(this.props.pageRequest.searchCriteria)} />
        }
        else{
            legend = <LegendPanel collectionType = {this.props.collectionType}/>;
        }

        if(this.props.page.content!==undefined && this.props.page.content.length>0)
        {
            rows = this.prepareRowsOfTable(key);
        }

        return (
            <div>
                <div className="row">
                    {legend}
                    <table style={styles.table}>
                        <thead>
                        {rowHeader}
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
        pageRequest: state.pageRequest
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( TableOfEntities );

const styles = {
    table: {
      boxSizing:'border-box',
        position: 'relative',
        width: '90%',
        marginLeft: '5%',
        marginBottom: '4px',
        borderCollapse: 'separate',
        borderSpacing: '0px',
    }
};
