import React from 'react';
// import OwlCarousel from 'react-owl-carousel2';
import moment from 'moment';
import LastCard from './components/LastCard.js';
import TimeButton from './components/TimeButton.js';
import DisplayButton from './components/DisplayButton.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    let _username = this.props.username,
      _apiKey = this.props.apiKey;

    this.url = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${_username}&api_key=${_apiKey}&format=json`;

    this.state = { data: [] };
  }

  componentDidMount() {
    console.log('cdm');
    let localLast = this;

    fetch(this.url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        localLast.setState({ data: data.recenttracks.track });
        console.log(data);
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  timeSince(date) {
    if (typeof date !== 'object') {
      date = new Date(date);
    }

    var seconds = Math.floor((new Date() - date) / 1000);
    var intervalType;

    var interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      intervalType = 'year';
    } else {
      interval = Math.floor(seconds / 2592000);
      if (interval >= 1) {
        intervalType = 'month';
      } else {
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
          intervalType = 'day';
        } else {
          interval = Math.floor(seconds / 3600);
          if (interval >= 1) {
            intervalType = 'hour';
          } else {
            interval = Math.floor(seconds / 60);
            if (interval >= 1) {
              intervalType = 'minute';
            } else {
              interval = seconds;
              intervalType = 'second';
            }
          }
        }
      }
    }

    if (interval > 1 || interval === 0) {
      intervalType += 's';
    }

    return interval + ' ' + intervalType + ' ago';
  }

  render() {
    console.log('render');
    let lfm = this;
    // const options = {
    //     loop:true,
    //     center:true,
    //     margin:10,
    //     responsiveClass:true,
    //     responsive:{
    //         0:{
    //             items:1,
    //             nav:true
    //         },
    //         600:{
    //             items:3,
    //             nav:true
    //         },
    //         1000:{
    //             items:6,
    //             nav:true,
    //         }
    //     }
    // };
    if (this.state.data.length > 0) {
      var TrackNodes = this.state.data.map(function(track, i) {
        let trackDate = new Date(track.date.uts * 1000);
        console.log(moment(trackDate).format('LT'));
        while (i < lfm.props.tracks) {
          var date = track.date
            ? lfm.timeSince(parseInt(track.date.uts, 10) * 1000)
            : 'Now Playing';
          return (
            <LastCard
              artist={track.artist['#text']}
              title={track.name}
              cover={track.image[3]['#text']}
              date={date}
              key={i}
            />
          );
        }
      });
    }

    return (
      <div>
        <nav className="menu">
          <TimeButton timeofday="morning" text="Morning" />
          <TimeButton timeofday="afternoon" text="Afternoon" />
          <TimeButton timeofday="evening" text="Evening" />
          <TimeButton timeofday="night" text="Night" />
        </nav>
        <div className="menu--display">
          <DisplayButton displaytype="row" text="List" />
          <DisplayButton displaytype="column" text="Mosaic" />
        </div>
        <section className="trackList owl-carousel owl-theme">
          {/* <OwlCarousel className="owl-theme" options={options}> */}
          {TrackNodes}
          {/* </OwlCarousel> */}
        </section>
      </div>
    );
  }
}
export default App;
