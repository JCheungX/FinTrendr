import React from 'react';
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getKeyword } from '../actions/keyword';
import { Link } from 'react-router';

class SearchBar extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = { term: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  onInputChange(event) {
    this.setState({term: event.target.value});
  }

  onFormSubmit() {
    return `/k/${this.state.term}`;
  }

  handleKeyPress(e) {
    if(e.key === 'Enter') {
      document.getElementById('search-button').click();
    }
  }

  render(){
    return (
      <div>
        <input
          placeholder = "input a keyword"
          id="inputBox"
          value={this.state.term}
          onChange={this.onInputChange}
          onKeyPress={this.handleKeyPress} />
        <button>
        <a id="search-button" href={this.onFormSubmit()}>
            Search
        </a></button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getKeyword }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
