import React from 'react';
import {styles} from '../styles'

export default class NavElement extends React.Component{
    render(){
        return(
            <div  onClick={()=>{this.props.setActiveTab(this.props.tabToActiveName)}}
                  style={  Object.assign({}, styles.tabButton,
                      this.props.isTabActive(this.props.tabToActiveName) ? {borderRight:'2px solid #805D2C'} : styles.tabNotActive) }>
                {this.props.name}
            </div>
        )
    }
}
