import React from 'react';
import {resp, styles} from '../../styles'
import {css} from 'aphrodite';
import TextOutput from '../commonComponents/TextOutput'
import Avatar from '../commonComponents/Avatar'
import BattleLabel from '../commonComponents/BattleLabel'



export default class TurnCell extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            height:0
        }
    }

    componentDidMount() {
        const height = document.getElementById('cell1x1').clientHeight;
        this.setState({ height });
    }

    onClick(){
        if(!this.props.disabled)
        this.props.showBattlePopup(Object.assign({tourNumber: this.props.tourNumber,tableNumber: this.props.battleData.tableNumber},
            this.props.battleData))
    }

    render(){
        return(
            <div>
                <div onClick={()=>{this.onClick()}}
                     id='cell1x1' style={Object.assign({}, styles.cell,
                    {backgroundColor:(this.props.battleData.finished?'rgb(67, 40, 14)':'rgb(142, 133, 96)')})}>
                    <BattleLabel tableNumber={this.props.battleData.tableNumber} height={this.state.height}/>
                    <div style={Object.assign({}, styles.participantSegment, {borderColor:'rgb(47, 77, 126)'})}>
                        <Avatar username={this.props.battleData.firstPlayer.name} border={"rgb(20, 37, 65)"} />
                        <div style={styles.textOutputContainer}>
                            <TextOutput title={"nick"} alignment={"center"} value={this.props.battleData.firstPlayer.name} />
                            <TextOutput title={"points"} alignment={'center'} value={this.props.battleData.firstPlayer.points} />
                        </div>
                    </div>
                    <div style={Object.assign({}, styles.participantSegment, {borderColor:'rgb(152, 42, 42)'})}>
                        <div style={Object.assign({},styles.textOutputContainer)}>
                            <TextOutput title={"nick"} alignment={"center"} value={this.props.battleData.secondPlayer.name} />
                            <TextOutput title={"points"} alignment={'center'} value={this.props.battleData.secondPlayer.points} />
                        </div>
                        <Avatar username={this.props.battleData.secondPlayer.name} border={'rgb(74, 24, 24)'}/>
                    </div>
                </div>
            </div>
        )
    }
}
