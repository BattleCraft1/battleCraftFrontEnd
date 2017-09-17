import React from 'react';

import { ActionCreators } from '../../../../redux/actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {StyleSheet, css} from 'aphrodite';

import OptionPanel from '../../optionPanel/OptionPanel'
import LegendPanel from '../../legendPanel/LegendPanel'
import TournamentRow from './row/tournaments/Row'
import UserRow from './row/users/Row'
import TournamentRowHeader from './headRow/tournaments/RowHeader'
import UserRowHeader from './headRow/users/RowHeader'

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
        return this.props.pageRequest.pageRequest.property.indexOf(columnName) !== -1;
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
        else
            rowType = UserRow;

        this.props.page.content.map(
            element =>{
                key++;
                rows.push(
                    React.createElement(
                        rowType,
                        {key : key,
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

        if(this.props.page.content!==undefined)
        {
            rows = this.prepareRowsOfTable(key);
        }

        if(this.props.collectionType==="tournaments")
        {
            rowHeader = TournamentRowHeader;
        }
        else
            rowHeader = UserRowHeader;

        return (
            <div>
                <div className="row">
                    <LegendPanel collectionType = {this.props.collectionType}/>
                    <table className="" style={styles.table}>
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
        position: 'relative',
        width: '90%',
        marginLeft: '5%',
        marginBottom: '4px',
        borderCollapse: 'separate',
    }
};
