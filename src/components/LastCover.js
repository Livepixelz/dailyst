import React, { Component } from 'react';

class LastCover extends Component {
  render() {
    return (
      <div className="card__cover-wrapper">
        <div
          className="card__cover"
          style={{ backgroundImage: 'url(' + this.props.cover + ')' }}
        />
      </div>
    );
  }
}

export default LastCover;
