import React from 'react';
import {css} from 'aphrodite';
import {resp, styles} from '../styles'
import Label from './commonComponents/Label'
import Battle1x1 from './turnContent/Battle1x1'
import Battle2x2 from './turnContent/Battle2x2'

class Turn extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            height:window.innerHeight
        };

        this.updateDimensions = this.updateDimensions.bind(this);
    }

    updateDimensions()
    {
        this.setState({
            height : window.innerHeight,
        })
    }

    componentWillMount(){
        this.updateDimensions();
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
        this.setState({ elementHeight: this.refs.container.clientHeight });
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    createBattles(){
        return this.props.turnData
            .sort(
                (battle1,battle2) => battle1.tableNumber - battle2.tableNumber
            )
            .map(
                (battle,index) => {
                    if(this.props.haveAlonePlayer && index === this.props.turnData.length-1 && this.props.tournamentStatus!=="FINISHED"){
                        if(this.props.currentTurnNumber<=this.props.turnNumber){
                            return;
                        }
                    }

                    if (this.props.playersOnTableCount === 2) {
                        return <Battle1x1
                            turnNumber={this.props.turnNumber}
                            key={battle.tableNumber}
                            battleData={battle}
                            showBattlePopup={this.props.showBattlePopup}
                            disabled={this.props.disabled}
                        />
                    }
                    else {
                        return <Battle2x2
                            turnNumber={this.props.turnNumber}
                            key={battle.tableNumber}
                            battleData={battle}
                            showBattlePopup={this.props.showBattlePopup}
                            disabled={this.props.disabled}
                        />
                    }
                }
            );
    }


    render(){
        return(
            <div style={Object.assign({}, styles.turnContainer)}>
                <Label active={this.props.currentTurnNumber===this.props.turnNumber}
                       name={"Turn "+(this.props.turnNumber+1) } />
                <div ref="container" style={Object.assign({}, styles.turnContent, (this.state.elementHeight*1.4 > this.state.height)?{overflowY:'scroll', maxHeight:this.state.height*0.65}:{})}>
                    {this.createBattles()}
                </div>
            </div>

        )
    }
}

export default Turn;
