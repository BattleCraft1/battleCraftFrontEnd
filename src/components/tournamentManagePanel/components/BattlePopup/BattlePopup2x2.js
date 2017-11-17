import React from 'react';

import {resp, styles} from '../../styles'
import {css} from 'aphrodite';
import Cell_2x2 from '../popupComponents/TurnCell2x2Popup'
import OptionButton from '../optionButton/OptionButton'
import PlayerList from '../playerList/GroupPlayerList'


class BattlePopup extends React.Component {
    constructor(props) {
        super(props);
        this.setPopupRef = this.setPopupRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            usersListVisible:false,
        };
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }


    handleClickOutside(event) {
        if (this.popupRef && !this.popupRef.contains(event.target)) {
            this.props.hidePopup();
        }
    }

    setPopupRef(node) {
        this.popupRef = node;
    }

    showUsersList(isShow)
    {
        this.setState({usersListVisible:isShow})
    }

    render(){

        return (
            <div>
                <div style={styles.popupBackground}/>
                <div ref={this.setPopupRef}>
                    <div ref={this.setMessageRef} style={styles.popup} className={css(resp.popup)}>
                        <div style={styles.popupTitle}>TABLE {this.props.battleData.tableNumber}</div>

                        <Cell_2x2
                            playersNamesWithPoints={this.props.playersNamesWithPoints}
                            battleData={this.props.battleData}
                            showUsersList={() => this.showUsersList(true)}/>

                        <div style={{marginTop:'2px'}}>
                            <OptionButton operation={()=>{}} name={"Save"}/>
                            <OptionButton operation={()=>{this.props.hidePopup()}} name={"Cancel"}/>
                            <OptionButton operation={()=>{}} name={"Clear"} additionalStyle={{float:'right'}}/>
                        </div>
                    </div>

                    {this.state.usersListVisible &&
                    <PlayerList hideList={() => this.showUsersList(false)}
                                playersWithoutBattles={this.props.playersWithoutBattles[this.props.battleData.tourNumber]}/>}
                </div>
            </div>

        )
    }
}



export default BattlePopup
