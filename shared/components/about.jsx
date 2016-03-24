import React, { Component } from 'react';

export default class About extends Component {
  render () {
    return (
      <div className="container">
        <div className="row">
          <h1>Trendr</h1>
        </div>
        <div className="row">
          <p>We leverage APIs such as GoogleTrends, IBM's Alchemy and Natural Language Processing along with our inhouse tools to identify breakout trends and the companies impacted by them.</p>
          <p>Related news articles and a heatmap of US Listed Stocks are also made avalible so that a user can further research the trend they have discovered and possible investment opportunities.</p>
          <h3>Tech Stack</h3>
          <img src="/img/TechStack.png" className="center-block" width="75%" />
        </div>
        <div className="row">
          <h3>Team</h3>
          <p>We are a team of talented full stack engineers dedicated to creating flexible modern software which solves real world problems.</p>
        </div>
        <div className="row">
          <div className="col-md-6">
            <span>Eric Mustin</span>
            <a href="https://github.com/ericmustin"> <img src="http://cdn.flaticon.com/png/256/25231.png" width="20" /> </a>
            <a href="mailto:mustin.eric@gmail.com?Subject=Trendr"><img src="https://cdn2.iconfinder.com/data/icons/freecns-cumulus/16/519948-008_Mail-128.png" width="20" /> </a>
          </div>
          <div className="col-md-6">
            <span>Zak Golding</span>
            <a href="https://github.com/zakarhino"> <img src="http://cdn.flaticon.com/png/256/25231.png" width="20" /> </a> 
            <a href="mailto:zak@0x7cf.com?Subject=Trend"> <img src="https://cdn2.iconfinder.com/data/icons/freecns-cumulus/16/519948-008_Mail-128.png" width="20" /> </a>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <span>Jason Cheung</span>
            <a href="https://github.com/JCheungX"> <img src="http://cdn.flaticon.com/png/256/25231.png" width="20" /> </a> 
            <a href="mailto:jasoncheungcf@gmail.com?Subject=Trendr"><img src="https://cdn2.iconfinder.com/data/icons/freecns-cumulus/16/519948-008_Mail-128.png" width="20" /> </a>
          </div>
          <div className="col-md-6">
            <span>Arlen Neylon</span>
            <a href="https://github.com/aneylon"> <img src="http://cdn.flaticon.com/png/256/25231.png" width="20" /> </a> 
            <a href="mailto:arlen.m.neylon@gmail.com?Subject=Trendr"><img src="https://cdn2.iconfinder.com/data/icons/freecns-cumulus/16/519948-008_Mail-128.png" width="20" /> </a>
          </div>
        </div>
      </div>
    )
  }
}