import React, { Component } from 'react';

class LastCover extends Component {
  render() {
    return (
      <div className="card__cover-wrapper">
        <div
          className="card__cover"
          style={{
            backgroundImage:
              'url(' +
              this.props.cover +
              ')' /*, filter: 'url(' + this.props.filterName + ')' */
          }}
        />
      </div>
    );
  }
}

export default LastCover;
