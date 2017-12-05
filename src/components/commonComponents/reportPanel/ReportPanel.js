import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../../../redux/actions/index';
import {resp, styles} from '../../commonComponents/styles';
import {css} from 'aphrodite';


import {serverName} from "../../../main/consts/server";
import axios from "axios";


class ReportPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reportContent:""
        }
    }

    sendReport(){
        console.log("elements");
        console.log(this.props.reportPanel.objectNames);
        let reportDTO = {
            objectNames: this.props.reportPanel.objectNames,
            objectType:this.props.reportPanel.objectType,
            reportMessage:this.state.reportContent
        };
        axios.post(serverName+`report`,reportDTO,
            {
                headers: {
                    "X-Auth-Token":this.props.security.token
                }
            })
            .then(res => {
                this.props.showReportPanel(false,"",[]);
                this.props.showSuccessMessage(this.getSuccessMessage(this.props.reportPanel.objectNames));
            })
            .catch(error => {
                this.props.showReportPanel(false,"",[]);
                this.props.showNetworkErrorMessage(error);
            });
    }

    getSuccessMessage(reportedElementsNames){
        return "Elements "+reportedElementsNames.join(", ")+" are reported to ban";
    }

    render(){
        return (
            <div>
                {this.props.reportPanel.isShown &&
                <div style={styles.background}>
                    <div style={Object.assign({}, styles.modalDialog)} ref={this.setWrapperRef}>
                        <div style = {Object.assign({}, styles.goldAndBrownTheme, styles.modalContent)}>
                            <div style = {styles.modalHeader}>
                                <h4 style = {styles.panelTitle}>Report elements</h4>
                            </div>
                            <div style = {Object.assign({}, styles.modalBody)}>
                                <textarea
                                    style = {Object.assign({},styles.optionInput, styles.textArea)}
                                    maxLength="100"
                                    value = {this.props.reportContent}
                                    onChange={(event)=>{this.setState({reportContent:event.target.value})}}
                                />
                            </div>
                            <div style = {styles.modalFooter}>
                                <button type="button" style = {styles.button} className={css(resp.button)} data-dismiss="modal"
                                        onClick={this.sendReport.bind(this)}>Ok</button>
                                <button type="button" style = {styles.button}className={css(resp.button)}
                                        onClick={() => {
                                            this.props.showReportPanel(false,"",[]);
                                        }}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        )
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        reportPanel: state.reportPanel,
        security: state.security,
        dimension: state.dimension
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( ReportPanel );