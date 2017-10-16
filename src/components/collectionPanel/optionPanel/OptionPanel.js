import React from 'react';
import {StyleSheet, css} from 'aphrodite';

import AcceptOperation from './operations/AcceptOperation'
import BanOperation from './operations/BanOperation'
import CancelAcceptOperation from './operations/CancelAcceptOperation'
import DeleteOperation from './operations/DeleteOperation'
import UnclokOperation from './operations/UnlockOperation'
import AdvanceOperation from './operations/AdvanceOperation'
import DegradeOperation from './operations/DegradeOperation'
import SearchOperation from './operations/SearchOperation'
import InviteOperation from './operations/InviteOperation'
import CancelInviteOperation from './operations/CancelInviteOperation'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../redux/actions';

import {styles} from '../optionPanel/styles'

const mapOfOperations = {
    "Ban":BanOperation,
    "Cancel":CancelAcceptOperation,
    "Delete":DeleteOperation,
    "Unlock":UnclokOperation,
    "Accept":AcceptOperation,
    "Advance":AdvanceOperation,
    "Degrade":DegradeOperation,
    "Search":SearchOperation,
    "Invite":InviteOperation,
    "CancelInvite":CancelInviteOperation
};

class OptionPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let operations = [];
        this.props.possibleOperations.forEach(operation => {
            operations.push(
                React.createElement(
                    mapOfOperations[operation],
                    {
                        collectionType:this.props.collectionType,
                        key:operation
                    },
                    null
                )
            );
        });


        return (
            <div style = {styles.buttonGroup}>
                <div style = {Object.assign({}, styles.buttonGroup, styles.buttonGroupInside)}>
                    {operations}
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
        possibleOperations: state.possibleOperations
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( OptionPanel );