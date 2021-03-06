import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import {resp, styles} from '../styles'

export default class NavElementThird extends React.Component{
    render(){
        return(
            <div  onClick={()=>{this.props.setActiveTab(this.props.tabToActiveName)}}
                  style={  Object.assign({}, styles.tabButton, styles.thirdSize,
                      this.props.isTabActive(this.props.tabToActiveName) ? {borderRight:'2px solid #805D2C'} : styles.tabNotActive) }>
                {this.props.name}
            </div>
        )
    }
}
