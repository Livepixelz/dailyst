import React, { Component } from 'react';
import $ from 'jquery';

class TimeButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isActive : false
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        e.preventDefault();
        let $button = $(e.currentTarget);
        let timeOfDay = $button.data('timeofday');
        $('.body_background').removeClass('active');
        $('body').attr('class','');
        $('.body--' + timeOfDay).addClass('active');
        $('body').addClass(timeOfDay);
    }
    render() {
        return (
            <button onClick={this.handleClick} className={ 'btn btn-daytime btn--' + this.props.timeofday } data-timeofday={this.props.timeofday}>{this.props.text}</button>
        )
    }
}

export default TimeButton;
