import React from 'react';
import Row1x1 from './Row1x1';
import Row2x2 from './Row2x2';
import Label from '../commonComponents/HeadLabel'

import {resp, styles} from '../../styles';
import {css} from 'aphrodite';

class Scoreboard extends React.Component {
    constructor(props) {
        super(props);
        this.setScoreboardRef = this.setScoreboardRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
          componentWidth:this.innerWidth,
        };
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        window.addEventListener("resize", this.updateDimensions.bind(this));
        const w = document.getElementById('scoreContainer').clientWidth;
        this.setState({
            componentWidth:w
        })
    }

    handleClickOutside(event) {
        if (this.scoreboardRef && !this.scoreboardRef.contains(event.target)) {
            this.props.hidePopup();
        }
    }

    setScoreboardRef(node) {
        this.scoreboardRef = node;
    }

    updateDimensions()
    {
      if(document.getElementById('scoreContainer') !== null){
        console.log(document.getElementById('scoreContainer'));
        this.setState({dupa:'17'})
      }
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        window.removeEventListener("resize", this.updateDimensions);
    }

    renderRow(firstPlayerName,secondPlayerName,points,index){
        return <Row2x2 key={index} width={this.state.componentWidth} name1={firstPlayerName} name2={secondPlayerName} points={points}/>
    }

    render(){

        let playersNamesWithPoints = this.props.playersNamesWithPoints;

        return (
            <div>
                <div style={styles.popupBackground}/>
                <div ref={this.setScoreboardRef}>
                    <div id="scoreContainer" style={styles.popup} className={css(resp.popup)}>
                        <div style={styles.popupTitle}>RANKING</div>
                        <div style={Object.assign({}, styles.goldAndBrownTheme, styles.scoreboard, {paddingLeft:this.state.componentWidth * 0.03, width:''})}>

                        <div style={{float:'left'}}><div style={{display:'inline-block', width:this.state.componentWidth*0.08}}/>
                        <Label name="Player name" width={this.state.componentWidth * 0.65}/>
                        <Label name="Score" width={this.state.componentWidth * 0.2}/></div>
                        <div>
                            {
                                playersNamesWithPoints.sort((playersGroupNamesWithPoints1,playersGroupNamesWithPoints2) =>
                                    playersGroupNamesWithPoints2.points - playersGroupNamesWithPoints1.points)
                                    .map((playersGroupNamesWithPoints,index) => this.renderRow(
                                        playersGroupNamesWithPoints.playersInGroupNames[0],
                                        playersGroupNamesWithPoints.playersInGroupNames[1],
                                        playersGroupNamesWithPoints.points,index))
                            }
                        </div>


                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Scoreboard;
