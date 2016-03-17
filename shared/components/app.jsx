import React, { Component } from 'react';
import SearchBar from './search_bar';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to Trendr. Get Trending.</h1>
        <SearchBar />
        {this.props.children}
      </div>
    );
  }
}
