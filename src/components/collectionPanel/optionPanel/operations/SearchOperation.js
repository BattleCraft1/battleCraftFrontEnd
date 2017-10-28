import React from 'react';
import OperationButton from './operationButton/OperationButton'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../../redux/actions/index';

let icons = require('glyphicons');

class SearchOperation extends React.Component {

    searchElements(){
        this.props.showSearchPanel(true);
    }

    render() {
        return (
                <OperationButton
                    name = "Search"
                    icon = {icons.magnifyingGlass}
                    operation = {this.searchElements.bind(this)}
                />
        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {};
}

export default connect( mapStateToProps, mapDispatchToProps )( SearchOperation );