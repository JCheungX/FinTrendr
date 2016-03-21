import React from 'react';
import {Component} from 'react';
import Graph from './graph';
import {getKeyword} from '../actions/keyword';
import KeywordList from './List/keyword_list';
import NewsList from './news/news_list';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import NavBar from './nav_bar';
import TweetList from './twitter/tweet_list';
import LandingPage from './landing_page';
import TreeMapView from './List/treemap_view';

class KeywordPage extends Component {
  constructor(props) {
    super(props);
    //this.setState({keyword:this.props.params.keyword})
    this.state = {listView: true};
    console.log('In Keyword Page setting',this.state,this.props);
  }

  componentWillMount(){
    if (this.props.params.keyword!==this.state.keyword){
    this.props.getKeyword(this.props.params.keyword);
    }
  }

  switchView(){
    if (this.state.listView)
    {
        this.setState({listView: false});
    }
    else {
        this.setState({listView: true});
    }
  };

  render() {
    let keywordCorrView = {};
    if (this.state.listView) {
      keywordCorrView = <KeywordList/>;
    } else {
      keywordCorrView = <TreeMapView/>;
    }
    return (
      <div>
        Welcome to the keyword page of Trendr. Search for a term.
        <div className="container">

          <div className="row">
            <div className="col-md-8">
              <Graph/>
              TreeMapView
            </div>

            <div className="col-md-4">
              <KeywordList/>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <NewsList/>
            </div>

            <div className="col-sm-6">
              <LandingPage/>
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}
function mapStatesToProps(state) {
  return {currentKeyword: state.keyword.current};
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getKeyword
  }, dispatch);
}
export default connect(mapStatesToProps, mapDispatchToProps)(KeywordPage);
