import React, { Component } from 'react';
import LastInfo from './LastInfo.js';
import LastCover from './LastCover.js';

class LastCard extends Component {
    render() {
        return (
            <div className='card'>
                <LastCover cover={this.props.cover} />
                <LastInfo artist={this.props.artist} title={this.props.title} date={this.props.date}/>
            </div>
        )
    }
}

export default LastCard;
