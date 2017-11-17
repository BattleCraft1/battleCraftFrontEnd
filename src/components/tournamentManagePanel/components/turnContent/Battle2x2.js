import React from 'react';
import {resp, styles} from '../../styles'
import {css} from 'aphrodite';
import TextOutput from '../commonComponents/TextOutput'
import Avatar from '../commonComponents/AvatarSmall'
import Points from '../Points'
import BattleLabel from '../commonComponents/BattleLabel'


export default class TurnCell extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            height:0
        }
    }

    componentDidMount() {
        const height = document.getElementById('cell2x2').clientHeight;
        this.setState({ height });
    }

    render(){
        return(
            <div onClick={()=>{this.props.showBattlePopup(Object.assign({tourNumber: this.props.tourNumber,tableNumber: this.props.battleData.tableNumber},this.props.battleData))}}
                 id="cell2x2" style={Object.assign({}, styles.cell)}>
                <BattleLabel tableNumber={this.props.battleData.tableNumber}  height={this.state.height}/>
                <div style = {{display:'flow-root'}}>
                    <div style={Object.assign({}, styles.participantSegment2x2, {borderColor:'rgb(47, 77, 126)'})}>
                        <TextOutput title={"nick"} value={this.props.battleData.firstPlayersGroup.playersNames[0]}/>
                        <div style={e.subcontainer}>
                            <Avatar username={this.props.battleData.firstPlayersGroup.playersNames[0]} />
                            <Points title={"points"} color={'rgb(47, 77, 126)'} value={this.props.battleData.firstPlayersGroup.playersPoints}/>
                            <Avatar username={this.props.battleData.firstPlayersGroup.playersNames[1]} />
                        </div>
                        <TextOutput title={"nick"} alignment={"right"} value={this.props.battleData.firstPlayersGroup.playersNames[0]} />
                    </div>
                    <div style={Object.assign({}, styles.participantSegment2x2, {borderColor:'rgb(152, 42, 42)'})}>
                        <TextOutput title={"nick"} value={this.props.battleData.secondPlayersGroup.playersNames[0]}/>
                        <div style={e.subcontainer}>
                            <Avatar username={this.props.battleData.secondPlayersGroup.playersNames[0]} />
                            <Points title={"points"} color={'rgb(152, 42, 42)'} value={this.props.battleData.secondPlayersGroup.playersPoints}/>
                            <Avatar username={this.props.battleData.secondPlayersGroup.playersNames[1]} />
                        </div>
                        <TextOutput title={"nick"} alignment={"right"} value={this.props.battleData.secondPlayersGroup.playersNames[1]} />
                    </div>
                </div>
            </div>
        )
    }
}

const e = {
    name:{
        boxSizing:'border-box',
        display:'block',
        border:'1px solid black',
    },
    avatar1:{
        boxSizing:'border-box',
        display:'inline-block',
        border:'1px solid black',
        width:'25%',
        height:'50px',
    },
    pointsContainer:{
        boxSizing:'border-box',
        display:'inline-block',
        border:'1px solid black',
        width:'50%',
        height:'50px',
        textAlign:'center',
    },
    points:{
        boxSizing:'border-box',
        border:'1px solid black',
        display:'block',
        width:'80%',
        marginLeft:'10%',
        height:'40px',
        marginTop:'4px',
        paddingTop:'10%',
    },
    subcontainer:{
        boxSizing:'border-box',
        width:'100%',
        background:'brown',
        display:'-webkit-flex',
    },
}
