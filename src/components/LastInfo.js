import React, { Component } from 'react';

class LastInfo extends Component {
  render() {
    return (
      <div className="card__content">
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

export default LastInfo;
