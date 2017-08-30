import React from 'react';

import ReactScrollbar from 'react-scrollbar-js';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../../../redux/actions';
import {StyleSheet, css} from 'aphrodite';

import './scrollbar.css';

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
        for(let i=0;i<this.props.page.totalPages;i++)
        {
            pagesButtons.push(<button onClick={()=>this.changePage(i)} key={'pageButton'+i} type="button" className="">{i+1}</button>);
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

        let pagesButtons = [];

        if(this.props.page.totalPages!==undefined)
        {
            pagesButtons=this.preparePagesButtons();
        }


        return (

            <div className={css(resp.navigationBar)}>
                    <form className="form-inline">

                        <div className={css(resp.pageOptionsBar)}>
                                <span className="">Page number:</span>
                            <input ref={(control) => this.pageNumberInput = control} type="text" className="" placeholder="Page number"/>
                                <button onClick={() => this.changePageByInput()} type="button" className=""><span className="glyphicon glyphicon-share-alt"/></button>
                                <span className="">Page size:</span>
                            <input ref={(control) => this.pageSizeInput = control} type="text" className="" placeholder="Page size"/>
                                <button onClick={() => this.changePageSize()} type="button" className=""><span className="glyphicon glyphicon-ok"/></button>
                        </div>
                    </form>


                    <div className={css(resp.container)}>
                    <button onClick={() => this.previousPage()}  type="button" className={css(resp.navigatorButtonLeft)}><span className="glyphicon glyphicon-chevron-left"/></button>
                    <span className={css(resp.temp)}>
                    <ReactScrollbar >
                    <div className={css(resp.pager)}>
                        {pagesButtons}
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    </div>
                    </ReactScrollbar>
                    </span>
                    <button onClick={() => this.nextPage()} type="button" className={css(resp.navigatorButtonRight)}><span className="glyphicon glyphicon-chevron-right"/></button>
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
    position:'relative',
    width:'90%',
    marginLeft:'5%',
    paddingBottom:'10px',
  },
  pageOptionsBar:{
    background:'blue',
    position:'relative',
    display:'block',
    width:'100%',
  },
  navigatorButtonLeft:{
    position:'relative',
    background:'green',
    float:'left',
  },
  navigatorButtonRight:{
    position:'relative',
    background:'green',
    float:'right',
  },
  navigatorInput:{

  },
  pager:{
    background:'red',
    position:'relative',
    display:'inline-block',
    paddingBottom:'0px',
    width:'100%',
    background:'pink',
  },
  container:{
    background:'pink',
    textAlign:'center',
    position:'relative',
    display:'inline-block',
    width:'100%',
    textAlign:'center',
    overflow:'hidden',
},

  temp:{
    textAlign:'center',
    position:'relative',
    display:'inline-block',
    textAlign:'center',


  },
})
