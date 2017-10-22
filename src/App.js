import React from 'react';
// import OwlCarousel from 'react-owl-carousel2';
//import moment from 'moment';
import LastCard from './components/LastCard.js';
import TimeButton from './components/TimeButton.js';
//import DisplayButton from './components/DisplayButton.js';
import imagesLoaded from 'imagesloaded';

class App extends React.Component {
  constructor(props) {
    super(props);

    let _username = this.props.username,
      _apiKey = this.props.apiKey;

    this.url = `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${_username}&api_key=${_apiKey}&format=json`;

    this.state = { data: [], hour: 0 };
  }

  componentDidMount() {
    console.log('cdm');
    let localLast = this;

    let date = new Date();
    let hourOfDay = date.getHours();

    fetch(this.url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        localLast.setState({ data: data.toptracks.track, hour: hourOfDay });
        imagesLoaded('.card__cover', { background: true }, function() {
          document.querySelector('.loading__wrapper').classList.add('loaded');
        });
        switch (localLast.state.hour) {
          case 8:
          case 9:
          case 10:
          case 11:
            document.querySelector('.btn--morning').click();
            break;
          case 12:
          case 13:
          case 14:
          case 15:
          case 16:
          case 17:
            document.querySelector('.btn--afternoon').click();
            break;
          case 18:
          case 19:
          case 20:
            document.querySelector('.btn--evening').click();
            break;
          case 21:
          case 22:
          case 23:
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
            document.querySelector('.btn--night').click();
            break;
          default:
            document.querySelector('.btn--night').click();
            break;
        }
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
        while (i < lfm.props.tracks) {
          return (
            <LastCard
              artist={track.artist.name}
              title={track.name}
              cover={track.image[3]['#text']}
              key={i}
            />
          );
        }
      });
    }

    /*
    <div className="menu--display">
          <DisplayButton displaytype="row" text="List" />
          <DisplayButton displaytype="column" text="Mosaic" />
        </div>
    */
    return (
      <div>
        <nav className="menu">
          <TimeButton timeofday="morning" text="Morning" />
          <TimeButton timeofday="afternoon" text="Afternoon" />
          <TimeButton timeofday="evening" text="Evening" />
          <TimeButton timeofday="night" text="Night" />
        </nav>

        <section className="trackList display--column">
          {/* <OwlCarousel className="owl-theme" options={options}> */}
          {TrackNodes}
          {/* </OwlCarousel> */}
        </section>
      </div>
    );
  }
}
export default App;
