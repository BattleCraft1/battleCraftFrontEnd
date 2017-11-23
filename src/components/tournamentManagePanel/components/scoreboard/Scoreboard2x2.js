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
        this.updateDimensions = this.updateDimensions.bind(this);

        this.state = {
            componentWidth:this.innerWidth,
            height:window.innerHeight
        };
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        window.addEventListener("resize", this.updateDimensions.bind(this));

    }

    handleClickOutside(event) {
        if (this.scoreboardRef && !this.scoreboardRef.contains(event.target)) {
            this.props.hidePopup();
        }
    }

    setScoreboardRef(node) {
        this.scoreboardRef = node;
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        window.removeEventListener("resize", this.updateDimensions);
    }

    renderRow(firstPlayerName,secondPlayerName,points,index){
        return <Row2x2 idx={index} key={index} name1={firstPlayerName} name2={secondPlayerName} points={points}/>
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



    render(){

        let playersNamesWithPoints = this.props.playersNamesWithPoints;

        return (
            <div>
                <div style={styles.popupBackground}/>
                <div ref={this.setScoreboardRef}>
                    <div id="scoreContainer" style={Object.assign(styles.popup)} className={css(resp.popup)}>
                        <div style={styles.popupTitle}>RANKING</div>
                        <div style={Object.assign({}, styles.scoreboard, {maxHeight:this.state.height * 0.8})}>

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
