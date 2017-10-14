import React from 'react';

import { ActionCreators } from '../../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {StyleSheet, css} from 'aphrodite';

import OptionPanel from '../../optionPanel/OptionPanel'
import LegendPanel from '../../legendPanel/LegendPanel'
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


class CollectionList extends React.Component{
    constructor(props) {
        super(props);
    }

    sortByColumnName(columnName){
        let pageRequest=this.props.pageRequest;
        pageRequest.pageRequest.property=columnName;
        pageRequest.pageRequest.direction=pageRequest.pageRequest.direction==='ASC'?'DESC':'ASC';
        this.props.setPageRequest(pageRequest);
        this.props.getPageRequest(this.props.collectionType);
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
        let rowType;

        if(this.props.collectionType==="tournaments")
            rowType = TournamentRow;
        else if(this.props.collectionType==="games")
            rowType = GameRow;
        else if(this.props.collectionType==="ranking")
            rowType = RankingRow;
        else
            rowType = UserRow;

        this.props.page.content.map(
            element =>{
                key++;
                rows.push(
                    React.createElement(
                        rowType,
                        {key : key,
                        number : key,
                        element : element,
                        isColumnActive : this.isColumnActive.bind(this),
                        sortByColumnName : this.sortByColumnName.bind(this),
                        getArrowGlyph : this.getArrowGlyph.bind(this)},
                        null)
                )
            }
        );
        return rows;
    }


    render(){
        let rows = [];
        let key = 0;
        let rowHeader;
        let legend = <LegendPanel collectionType = {this.props.collectionType}/>;

        if(this.props.page.content!==undefined)
        {
            rows = this.prepareRowsOfTable(key);
        }

        if(this.props.collectionType==="tournaments")
        {
            rowHeader = TournamentRowHeader;
        }
        else if(this.props.collectionType==="games")
        {
            rowHeader = GameRowHeader;
        }
        else if(this.props.collectionType==="ranking")
        {
            rowHeader = RankingRowHeader;
            legend = <RankingGameHeader gameName = {findGameName(this.props.pageRequest.searchCriteria)} />
        }
        else
            rowHeader = UserRowHeader;

        return (
            <div>
                <div className="row">
                    {legend}
                    <table style={styles.table}>
                        <thead>
                        {
                            React.createElement(
                                rowHeader,
                                {isColumnActive : this.isColumnActive.bind(this),
                                sortByColumnName : this.sortByColumnName.bind(this),
                                getArrowGlyph : this.getArrowGlyph.bind(this)},
                                null)
                        }
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
