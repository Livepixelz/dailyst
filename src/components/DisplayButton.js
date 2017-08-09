import React, { Component } from 'react';
import $ from 'jquery';

class DisplayButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    let $button = $(e.currentTarget);
    var displayType = $button.data('list-display');
    $('.trackList').attr('class', 'trackList');
    $('.trackList').addClass('display--' + displayType);
  }
  render() {
    return (
      <button
        onClick={this.handleClick}
        className={'btn btn-display btn-display--' + this.props.displaytype}
        data-list-display={this.props.displaytype}
      >
        {this.props.text}
      </button>
    );
  }
}

export default DisplayButton;
