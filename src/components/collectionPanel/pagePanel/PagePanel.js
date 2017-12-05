import React from 'react';
import ReactScrollbar from 'react-scrollbar-js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../redux/actions';
import {css} from 'aphrodite';
import './scrollbar.css';
import {resp, styles} from '../pagePanel/styles';


const icons = require('glyphicons');


class PagePanel extends React.Component{

    componentDidMount(){
        this.pageNumberInput.value=isNaN(this.props.page.number+1)?0:this.props.page.number+1;
        this.pageSizeInput.value=this.props.page.numberOfElements;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.page !== undefined &&
            nextProps.page !== this.props.page) {
            this.pageNumberInput.value=isNaN(nextProps.page.number+1)?0:nextProps.page.number+1;
            this.pageSizeInput.value=nextProps.page.numberOfElements;
        }
    }

    preparePagesButtons(){
        let pagesButtons = [];
        for(let i=0;i<this.props.page.totalPages;i++)
        {
            pagesButtons.push(<button onClick={()=>this.changePage(i)} key={'pageButton'+i} type="button" style = {styles.pageButton}>{i+1}</button>);
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
            this.props.getPage(this.props.collectionType);
        }
        else{
            this.props.showFailureMessage("Page size must be between 1 and 10");
            this.pageSizeInput.value=this.props.pageRequest.pageRequest.size;
        }
    }

    changePageByInput(){
        if(this.pageNumberInput.value-1<this.props.page.totalPages && this.pageNumberInput.value-1>=0)
        {
            let pageRequest=this.props.pageRequest;
            pageRequest.pageRequest.page=this.pageNumberInput.value-1;
            this.props.setPageRequest(pageRequest);
            this.props.getPage(this.props.collectionType);
        }
        else{
            this.props.showFailureMessage("Page "+this.pageNumberInput.value+" don't exist");
            this.pageNumberInput.value=this.props.pageRequest.pageRequest.page+1;
        }
    }

    changePage(number){
        if(number<this.props.page.totalPages && number>=0) {
            let pageRequest = this.props.pageRequest;
            pageRequest.pageRequest.page = number;
            this.pageNumberInput.value = number+1;
            this.props.setPageRequest(pageRequest);
            this.props.getPage(this.props.collectionType);
        }
        else{
            this.props.showFailureMessage("Page "+number+" don't exist");
        }
    }

    nextPage(){
        let pageRequest=this.props.pageRequest;
        if(pageRequest.pageRequest.page+1<this.props.page.totalPages){
            pageRequest.pageRequest.page+=1;
            this.pageNumberInput.value=pageRequest.pageRequest.page+1;
            this.props.setPageRequest(pageRequest);
            this.props.getPage(this.props.collectionType);
        }
        else{
            this.props.showFailureMessage("Page "+(pageRequest.pageRequest.page+2)+" don't exist");
        }
    }

    previousPage(){
        let pageRequest=this.props.pageRequest;
        if(pageRequest.pageRequest.page-1>=0){
            pageRequest.pageRequest.page-=1;
            this.pageNumberInput.value=pageRequest.pageRequest.page+1;
            this.props.setPageRequest(pageRequest);
            this.props.getPage(this.props.collectionType);
        }
        else{
            this.props.showFailureMessage("Page "+(pageRequest.pageRequest.page)+" don't exist");
        }
    }


    render(){

      const myScrollbar = {
        boxSizing:'border-box',
        width:'84%',
        border: '1px #374550 solid',
        borderTop:'0px',
        float:'left',
        background:'rgb(36, 27, 14)',
      };

        let pagesButtons = [];

        if(this.props.page.totalPages!==undefined)
        {
            pagesButtons=this.preparePagesButtons();
        }


        return (

            <div style={styles.navigationBar}>
                    <form>
                        <div style={styles.pageOptionsBar}>
                                <div style = {styles.navigatorLabel}>Page No:</div>
                            <input ref={(control) => this.pageNumberInput = control} type="text" style= {styles.navigatorInput}/>
                                <button onClick={() => this.changePageByInput()} type="button" style = {styles.navigatorButton} className={css(resp.navigatorButton)}><span/>go</button>
                                <div style = {styles.navigatorLabel}>Page size:</div>
                            <input ref={(control) => this.pageSizeInput = control} type="text" style= {styles.navigatorInput}/>
                                <button onClick={() => this.changePageSize()} type="button" style = {styles.navigatorButton} className={css(resp.navigatorButton)}><span/>ok</button>
                        </div>
                    </form>

                    <div style = {styles.container}>
                    <button onClick={() => this.previousPage()} type="button" style = {Object.assign(styles.navigatorButtonArrow, styles.goldAndBrownTheme)} className={css(resp.navigatorButtonArrow)}>{icons.arrowTriL}</button>
                    <ReactScrollbar style={myScrollbar}>
                          <div style={styles.pager}>
                            {pagesButtons}
                          </div>
                    </ReactScrollbar>
                    <button onClick={() => this.nextPage()} type="button" style = {Object.assign(styles.navigatorButtonArrow, styles.goldAndBrownTheme)} className={css(resp.navigatorButtonArrow)}>{icons.arrowTriR}</button>
                    </div>
          </div>

        );
    }
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( ActionCreators, dispatch );
}

function mapStateToProps( state ) {
    return {
        page: state.page,
        pageRequest: state.pageRequest
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( PagePanel );
