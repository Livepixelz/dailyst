import React, { Component } from 'react';

class LastInfo extends Component {
  render() {
    return (
      <div className="content">
        <span className="title" title={this.props.title}>
          {' '}{this.props.title}
        </span>
        <span className="artist">
          by {this.props.artist}
        </span>
        <span className="date">
          {this.props.date}
        </span>
      </div>
    );
  }
}

export default LastInfo;
