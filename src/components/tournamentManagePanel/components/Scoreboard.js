import React from 'react';
import Row1x1 from './scoreboardComponents/Row1x1';
import Row2x2 from './scoreboardComponents/Row2x2';
import Label from './commonComponents/HeadLabel'

import {resp, styles} from '../styles';
import {css} from 'aphrodite';

class Scoreboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          componentWidth:this.innerWidth,
        };
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions.bind(this));
        const w = document.getElementById('scoreContainer').clientWidth;
        this.setState({
            componentWidth:w
        })
    }


    updateDimensions()
    {
      if(document.getElementById('scoreContainer') != null){
        console.log(document.getElementById('scoreContainer'))
        this.setState({dupa:'17'})
      }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }


    render(){

        return (
            <div>
                <div onClick={ ()=>this.props.hide() } style={styles.popupBackground}/>
                <div ref={this.setPopupRef}>
                    <div id="scoreContainer" style={styles.popup} className={css(resp.popup)}>
                        <div style={styles.popupTitle}>RANKING</div>
                        <div style={Object.assign({}, styles.goldAndBrownTheme, styles.scoreboard, {paddingLeft:this.state.componentWidth * 0.03, width:''})}>

                        <div style={{float:'left'}}><div style={{display:'inline-block', width:this.state.componentWidth*0.08}}/>
                        <Label name="Player name" width={this.state.componentWidth * 0.65}/>
                        <Label name="Score" width={this.state.componentWidth * 0.2}/></div>
                        <div>
                        <Row1x1 width={this.state.componentWidth} name={"no name"} points={"10"}/>
                        <Row1x1 width={this.state.componentWidth} name={"no name"} points={"15"}/>
                        <Row1x1 width={this.state.componentWidth} name={"no name"} points={"22"}/>
                        <Row1x1 width={this.state.componentWidth} name={"no name"} points={"48"}/>
                        <Row2x2 width={this.state.componentWidth} name1={"no name"} name2={"no name"} points1={"48"} points2={"75"}/>
                        <Row2x2 width={this.state.componentWidth} name1={"no name"} name2={"no name"} points1={"48"} points2={"75"}/>

                        </div>


                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Scoreboard;
