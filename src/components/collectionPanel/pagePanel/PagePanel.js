import React from 'react';
import ReactScrollbar from 'react-scrollbar-js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../redux/actions';
import {StyleSheet, css} from 'aphrodite';
import './scrollbar.css';

var icons = require('glyphicons');


class PagePanel extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.pageNumberInput.value=this.props.pageRequest.pageRequest.page+1;
        this.pageSizeInput.value=this.props.pageRequest.pageRequest.size;
    }

    preparePagesButtons(){
        let pagesButtons = [];
        for(let i=0;i<this.props.page.totalPages + 50;i++)
        {
            pagesButtons.push(<button onClick={()=>this.changePage(i)} key={'pageButton'+i} type="button" className={css(resp.pageButton)}>{i+1}</button>);
        }
        return pagesButtons;
    }

    changePageSize(){
        if(this.pageSizeInput.value<=10 && this.pageSizeInput.value>=1)
        {
            let pageRequest=this.props.pageRequest;
            pageRequest.pageRequest.size=this.pageSizeInput.value;
            pageRequest.pageRequest.page = 0;
            this.pageNumberInput.value = 1;
            this.props.setPageRequest(pageRequest);
            this.props.getPageRequest();
        }
        else{
            this.props.showMessageBox({
                messageText: "Page size must be between 1 and 10",
                messageType: "alert-danger"
            });
            this.pageSizeInput.value=this.props.pageRequest.pageRequest.size;
        }
    }

    changePageByInput(){
        if(this.pageNumberInput.value-1<this.props.page.totalPages && this.pageNumberInput.value-1>=0)
        {
            let pageRequest=this.props.pageRequest;
            pageRequest.pageRequest.page=this.pageNumberInput.value-1;
            this.props.setPageRequest(pageRequest);
            this.props.getPageRequest();
        }
        else{
            this.props.showMessageBox({
                messageText: "Page "+this.pageNumberInput.value+" don't exist",
                messageType: "alert-danger"
            });
            this.pageNumberInput.value=this.props.pageRequest.pageRequest.page+1;
        }
    }

    changePage(number){
        if(number<this.props.page.totalPages && number>=0) {
            let pageRequest = this.props.pageRequest;
            pageRequest.pageRequest.page = number;
            this.pageNumberInput.value = number+1;
            this.props.setPageRequest(pageRequest);
            this.props.getPageRequest();
        }
        else{
            this.props.showMessageBox({
                messageText: "Page "+number+" don't exist",
                messageType: "alert-danger"
            });
        }
    }

    nextPage(){
        let pageRequest=this.props.pageRequest;
        if(pageRequest.pageRequest.page+1<this.props.page.totalPages){
            pageRequest.pageRequest.page+=1;
            this.pageNumberInput.value=pageRequest.pageRequest.page+1;
            this.props.setPageRequest(pageRequest);
            this.props.getPageRequest();
        }
        else{
            this.props.showMessageBox({
                messageText: "Page "+(pageRequest.pageRequest.page+2)+" don't exist",
                messageType: "alert-danger"
            });
        }
    }

    previousPage(){
        let pageRequest=this.props.pageRequest;
        if(pageRequest.pageRequest.page-1>=0){
            pageRequest.pageRequest.page-=1;
            this.pageNumberInput.value=pageRequest.pageRequest.page+1;
            this.props.setPageRequest(pageRequest);
            this.props.getPageRequest();
        }
        else{
            this.props.showMessageBox({
                messageText: "Page "+(pageRequest.pageRequest.page)+" don't exist",
                messageType: "alert-danger"
            });
        }
    }


    render(){

      const myScrollbar = {
        boxSizing:'border-box',
        width:'84%',
        border: '1px #374550 solid',
        borderTop:'0px',
        float:'left',
        background:'rgb(218, 188, 109)',
      };

        let pagesButtons = [];

        if(this.props.page.totalPages!==undefined)
        {
            pagesButtons=this.preparePagesButtons();
        }


        return (

            <div className={css(resp.navigationBar)}>
                    <form>
                        <div className={css(resp.pageOptionsBar)}>
                                <div className={css(resp.navigatorLabel) }>Page No:</div>
                            <input ref={(control) => this.pageNumberInput = control} type="text" className={css(resp.navigatorInput)}/>
                                <button onClick={() => this.changePageByInput()} type="button" className={css(resp.navigatorButton)}><span/>go</button>
                                <div className={css(resp.navigatorLabel)}>Page size:</div>
                            <input ref={(control) => this.pageSizeInput = control} type="text" className={css(resp.navigatorInput)}/>
                                <button onClick={() => this.changePageSize()} type="button" className={css(resp.navigatorButton)}><span/>ok</button>
                        </div>
                    </form>

                    <div className={css(resp.container)}>
                    <button onClick={() => this.previousPage()} type="button" className={css(resp.navigatorButtonArrow) + " " + css(resp.goldAndBrownTheme)}>{icons.arrowTriL}</button>
                    <ReactScrollbar style={myScrollbar}>
                          <div className={css(resp.pager)}>
                            {pagesButtons}
                          </div>
                    </ReactScrollbar>
                    <button onClick={() => this.nextPage()} type="button" className={css(resp.navigatorButtonArrow) + " " + css(resp.goldAndBrownTheme)}>{icons.arrowTriR}</button>
                    </div>
          </div>

        );
    }
};

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        page: state.page,
        pageRequest: state.pageRequest,
        message: state.message
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( PagePanel );


const resp = StyleSheet.create({
  navigationBar:{
    margin:'0',
    marginTop:'20px',
    position:'relative',
    width:'90%',
    marginLeft:'5%',
    paddingBottom:'10px',
  },
  pageOptionsBar:{
    position:'relative',
    display:'inline-block',
    width:'100%',
    height:'auto',
    textAlign:'center',
  },
  navigatorButtonArrow:{
    width:'8%',
    minHeight:'32px',
    position:'relative',
    float:'left',
    background:'#473419',
    color:'rgb(189, 185, 189)',
    border:'1px solid rgb(64, 62, 63)',
    boxShadow:'inset 0 0 4px #9c7239',
    outline:'none',
    ':hover':{
        borderTopColor: 'rgb(249, 249, 249)',
        borderBottomColor: 'rgb(204, 126, 69)',
    },
    ':active':{
        color:'lightGrey',
        borderTopColor: 'rgb(204, 126, 69)',
        borderBottomColor: 'rgb(249, 249, 249)',
      },
  },
  // navigatorButtonRight:{
  //   width:'8%',
  //   minHeight:'26px',
  //   position:'relative',
  //   float:'right',
  //   background:'#473419',
  //   color:'rgb(189, 185, 189)',
  //   border:'1px solid rgb(64, 62, 63)',
  // },
  navigatorInput:{
  boxSizing:'border-box',
  position:'relative',
  width:'8%',
  height:'100%',
  height:'auto',
  paddingTop:"5px",
  paddingBottom:'5px',
  background:'white',
  display:'inline-block',
  backgroundColor:'lightgrey',
  textAlign:'center',
  border:'1px solid grey',
  },

  navigatorLabel:{
  boxSizing:'border-box',
  position:'relative',
  width:'16%',
  height:'100%',
  paddingTop:"3px",
  paddingBottom:'3px',
  background:'white',
  display:'inline-block',
  marginLeft:'1%',
  border:'1px solid',
  color:'rgb(218, 188, 109)',
  borderTopColor: '#E0BA51',
  borderBottomColor: '#614722',
  borderRightColor: '#805D2C',
  borderLeftColor: '#e3ca86',
  background:'#473419',
  boxShadow:'inset 0 0 4px #9c7239',
},
  navigatorButton:{
    boxSizing:'border-box',
    marginRight:'1%',
    position:'relative',
    display:'inline-block',
    border:'1px solid',
    color:'rgb(218, 188, 109)',
    borderTopColor: '#E0BA51',
    borderBottomColor: '#614722',
    borderRightColor: '#805D2C',
    borderLeftColor: '#e3ca86',
    background:'#473419',
    paddingTop:"5px",
    paddingBottom:'5px',
    outline:'none',
    boxShadow:'inset 0 0 4px #9c7239',
    ':hover':{
        borderTopColor: 'rgb(249, 249, 249)',
        borderBottomColor: 'rgb(204, 126, 69)',
    },
    ':active':{
        color:'lightGrey',
        borderTopColor: 'rgb(204, 126, 69)',
        borderBottomColor: 'rgb(249, 249, 249)',
      },

  },
  pager:{
    boxSizing:'border-box',
    position:'relative',
    display:'inline-block',
    background: '#EEE',
    minWidth: '10px',
    whiteSpace:'nowrap',
    paddingBottom:"6px",
    background:'rgb(218, 188, 109)',
  },
  container:{
    boxSizing:'border-box',
    marginTop:'1px',
    textAlign:'center',
    position:'relative',
    display:'inline-block',
    width:'100%',
    textAlign:'center',
    overflow:'hidden',
    float:'left',
},

  pageButton:{
    boxSizing:'border-box',
    background:'#473419',
    color:'rgb(189, 185, 189)',
    border:'1px solid rgb(64, 62, 63)',
    height:'24px',
  },

  goldAndBrownTheme:{
    boxSizing:'border-box',
    border:'1px solid',
    color:'rgb(218, 188, 109)',
    borderTopColor: '#E0BA51',
    borderBottomColor: '#614722',
    borderRightColor: '#805D2C',
    borderLeftColor: '#e3ca86',
  },
})
