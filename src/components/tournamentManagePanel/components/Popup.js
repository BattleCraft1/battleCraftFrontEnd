import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../../../redux/actions/index';
import {resp, styles} from '../styles'
import {css} from 'aphrodite';
import Points from './popupComponents/PointsPopup'
import Cell_1x1 from './popupComponents/TurnCell1x1Popup'
import Cell_2x2 from './popupComponents/TurnCell2x2Popup'
import OptionButton from './optionButton/OptionButton'
import PlayerList from './PlayerList'


class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.setMessageRef = this.setMessageRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
          isShown:true,
          listVisible:false,
        };
    }

    handleClickOutside(event) {
      if(this.state.listVisible){
        this.hideList();
      }
      else{
          this.hideMessageBox();
          this.props.hidePopup();
      }
    }

    hideMessageBox(){

      if(this.state.isShown){
        this.setState({isShown:false});
        this.forceUpdate();
      }
    }

    setMessageRef(node) {
        this.messageRef = node;
    }

    toggleList()
    {
      this.setState({listVisible:!this.state.listVisible})
    }


    hideList()
    {
      this.setState({listVisible:false})
    }

    getContent()
    {
      if(this.props.type == 2){
                    return( <Cell_2x2 toggleList={this.toggleList.bind(this)}/> )
                    }
    else{
                    return( <Cell_1x1 toggleList={this.toggleList.bind(this)}/> )
                    }
    }


    render(){

        return (
            this.props.isShown && <div>

                <div onClick={()=>this.handleClickOutside()}style={styles.popupBackground}></div>
                <div ref={this.setMessageRef} style={styles.popup} className={css(resp.popup)}>
                <div style={styles.popupTitle}>BATTLE 12</div>

                {this.getContent()}

                  <div style={{marginTop:'2px'}}>
                  <OptionButton operation={()=>{}} name={"Save"}/>
                  <OptionButton operation={()=>{}} name={"Cancel"}/>
                  <OptionButton operation={()=>{}} name={"Clear"} additionalStyle={{float:'right'}}/>
                  </div>
                </div>
                <PlayerList visible={this.state.listVisible}/>
           </div>

        )
    }
}



export default Popup
