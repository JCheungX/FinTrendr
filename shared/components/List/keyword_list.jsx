import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCorrelationInfo} from '../../actions/keyword';
import {bindActionCreators} from 'redux';
// import { getValidationInfo } from '../../actions/keyword';
import {getHotTrends} from '../../actions/hotTrends';
import {saveKeywordInfo} from '../../actions/saveKeyword';
import {putToGraph,removeGraph} from '../../actions/linegraph';
import Loading from '../loading';

class KeywordList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addedKeyword: ''
    };
    this.fetchKeyword = this.fetchKeyword.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }
  componentWillMount() {
    if (this.props.keyword&&this.props.list.items.length===0) {
      this.props.getCorrelationInfo(this.props.keyword);
      this.setState({addedKeyword: ''});
      // {this.saveNewKeywordInfo('america')}
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.keyword !== this.props.keyword) {
      if (nextProps.keyword) {
        this.props.getCorrelationInfo(nextProps.keyword);
        this.setState({addedKeyword: ''});
      }
    }
  }
  // getValidation(keyword, listItem) {
  //   this.props.getValidationInfo(keyword, listItem);
  // }
  fetchKeyword(event) {
      event.preventDefault();
      this.props.saveKeywordInfo(this.state.addedKeyword, this.props.keyword);
  }

  onInputChange(event) {
    event.preventDefault();
    this.setState({addedKeyword: event.target.value});
  }

  putToGraph(item)
  {
    if ((this.props.lineGraph.length>0) && (this.props.lineGraph[0].key  === item.Keyword))
    {
      this.props.removeGraph();
    }
    else {
      this.props.putToGraph(item);
    }
  }

  renderList() {
    return this.props.list.items.map((listItem) => {
      let color = 'black';
      let picLink = "/img/NoBlack.png";

      if (listItem.rel) {
        color = 'green';
        picLink = "/img/YesGreen.png";
        };
      let divStyle = {
          color: color
        };
        return (
          <tr style={divStyle} key={`keyword-${listItem.Keyword}`} onClick={this.putToGraph.bind(this,listItem)}>
            <td>{listItem.Keyword}</td>
            <td>{listItem.corr.toFixed(2)}</td>
            <td><img className="veriImage" src={picLink} width="20" height="20"/></td>
          </tr>
        );
        //<td><img className="veriImage" src={picLink}/></td>
      // onClick={this.getValidation.bind(this,this.props.keyword.Keyword,listItem.Keyword)}
    });
  }
  // renderStocks() {
  //   if(this.props.stocks.length > 0) {
  //   return this.props.stocks.map((stockItem) => {
  //       return (
  //         <li className="list-group-item" key={stockItem.Keyword}>
  //           <span className="pull-xs-left">{stockItem.Keyword}</span>
  //           <strong>{listItem.corr}</strong>
  //         </li>
  //       );
  //     });
  //   }
  // }
  render() {
    const {list} = this.props;
    if (!list || !list.items || list.items.length === 0) {
      return (
        <div className="text-xs-center drop-shadow spacer">
          <Loading />
        </div>
      );
    }
    return (
      <div className="drop-shadow container spacer">
        <img src="/img/Graph.png" width="40" className="pull-xs-left iconPadding" />
        <h5>  Suggested Ideas</h5>
        <div className="input-group" >
            <input id="newKeywordBox" className="form-controler" placeholder="input a keyword" value={this.state.addedKeyword} onChange={this.onInputChange}/>
            <div className="input-group-btn">
              <button className="btn btn-default btn-sm" type="button" onClick={this.fetchKeyword} >Add new Keyword</button>
            </div>
          </div>
          <table className="table table-hover">
          <thead>
            <tr>
                <th>Keyword</th>
                <th>Correlation</th>
                <th>Verified</th>
              </tr>
            </thead>
            <tbody>
              {this.renderList()}
            </tbody>
          </table>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {list: state.list, keyword: state.keyword.current, lineGraph : state.linegraph.linegraph};
}
function mapDispatchToProps(dispatch) {
  let obj = {
    getCorrelationInfo: getCorrelationInfo,
    getHotTrends: getHotTrends,
    saveKeywordInfo: saveKeywordInfo,
    putToGraph : putToGraph,
    removeGraph : removeGraph
  };
  return bindActionCreators(obj, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(KeywordList);
