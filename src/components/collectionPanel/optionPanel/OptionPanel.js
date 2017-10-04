import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import {possibleOperations} from '../../../main/consts/possibleOperations'
import AcceptOperation from './operations/AcceptOperation'
import AddOperation from './operations/AddOperation'
import BanOperation from './operations/BanOperation'
import CancelAcceptOperation from './operations/CancelAcceptOperation'
import DeleteOperation from './operations/DeleteOperation'
import EditOperation from './operations/EditOperation'
import UnclokOperation from './operations/UnlockOperation'
import AdvanceOperation from './operations/AdvanceOperation'
import DegradeOperation from './operations/DegradeOperation'
import SearchOperation from './operations/SearchOperation'
import {styles} from '../optionPanel/styles'

export default class OptionPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const mapOfOperations = {
            "Ban":BanOperation,
            "Cancel":CancelAcceptOperation,
            "Delete":DeleteOperation,
            "Edit":EditOperation,
            "Unlock":UnclokOperation,
            "Accept":AcceptOperation,
            "Advance":AdvanceOperation,
            "Degrade":DegradeOperation,
            "Search":SearchOperation,
        };

        let operations = [];
        for(let possibleOperation in possibleOperations[this.props.collectionType])
        {
            operations.push(
                React.createElement(
                    mapOfOperations[possibleOperations[this.props.collectionType][possibleOperation]],
                    {collectionType:this.props.collectionType,
                    key:possibleOperation},
                    null
                )
            );
        }

        return (
            <div style = {styles.buttonGroup}>
                <div style = {Object.assign({}, styles.buttonGroup, styles.buttonGroupInside)}>
                    {operations}
                </div>
            </div>
        );
    }
}
