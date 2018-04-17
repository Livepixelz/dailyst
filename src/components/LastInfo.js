import React, { Component } from 'react';

class LastInfo extends Component {
  render() {
    return (
      <div className="card__content">
        <a
          href={this.props.url}
          className="card__title"
          title={this.props.title}
        >
          {' '}
          {this.props.title}
        </a>
        <span className="card__artist">by {this.props.artist}</span>
      </div>
    );
  }
}

export default LastInfo;
