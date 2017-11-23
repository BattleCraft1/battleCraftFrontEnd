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


    updateDimensions()
    {
        this.setState({
            height : window.innerHeight,
        })
    }

    componentWillMount(){
        this.updateDimensions();
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        window.removeEventListener("resize", this.updateDimensions);
    }

    renderRow(name,points,index){
        return <Row1x1 idx={index} key={index} width={this.state.componentWidth} name={name} points={points}/>;
    }

    render(){

        let playersNamesWithPoints = this.props.playersNamesWithPoints;

        return (
            <div>
                <div style={styles.popupBackground}/>
                <div ref={this.setScoreboardRef}>
                    <div id="scoreContainer" style={styles.popup} className={css(resp.popup)}>
                        <div style={styles.popupTitle}>RANKING</div>
                        <div style={Object.assign({}, styles.scoreboard, {maxHeight:this.state.height * 0.8})}>
                        <div>
                            {
                                Object.keys(playersNamesWithPoints)
                                    .sort((playerName1,playerName2) => playersNamesWithPoints[playerName2] - playersNamesWithPoints[playerName1])
                                    .map((playerName,index) => this.renderRow(playerName,playersNamesWithPoints[playerName],index))
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
