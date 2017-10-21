import React, { Component } from 'react';

class LastStat extends Component {
  render() {
    return (
      <div className="card__stat">
        <span className="card__title" title={this.props.title}>
          {' '}{this.props.title}
        </span>
        <span className="card__artist">
          by {this.props.artist}
        </span>
      </div>
    );
  }
}

export default LastStat;
