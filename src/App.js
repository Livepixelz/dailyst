import React from 'react';
// import OwlCarousel from 'react-owl-carousel2';
//import moment from 'moment';
import sassvariables from './styles/base/_base.scss';
import LastCard from './components/LastCard.js';
import TimeButton from './components/TimeButton.js';
//import DisplayButton from './components/DisplayButton.js';
import imagesLoaded from 'imagesloaded';

class App extends React.Component {
  constructor(props) {
    super(props);

    let _username = this.props.username,
      _apiKey = this.props.apiKey;

    this.colors = {
      morning: {
        bgc1: '37ecba',
        bgc2: '2a6384'
      },
      afternoon: {
        bgc1: '017ae4',
        bgc2: '00f2fe',
        bgc3: 'fbffe6'
      },
      evening: {
        bgc1: 'ffee8f',
        bgc2: 'f93973'
      },
      night: {
        bgc1: 'f9b4d8',
        bgc2: '2f1b61'
      }
    };

    this.url = `https://ws.audioscrobbler.com/2.0/?method=user.getlovedtracks&user=${_username}&api_key=${_apiKey}&format=json`;

    this.state = { data: [], hour: 0, colors: this.colors };
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
        localLast.setState({ data: data.lovedtracks.track, hour: hourOfDay });
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

  /**
   * Convert hex to RGB value
   *
   * return [array] (r,g,b)
   */

  hexToRgb(hex) {
    var bigint = parseInt(hex, 16),
      r = (bigint >> 16) & 255,
      g = (bigint >> 8) & 255,
      b = bigint & 255;
    return [r, g, b];
  }

  /**
   * Create Duotone Matrix Values
   *
   * return [string] (matrix values)
   */
  duotone(hexes) {
    var hex = hexes.replace('#', '').split(',');
    var matrix = document.querySelector('.color-matrix');
    var color1 = this.hexToRgb(hex[0]);
    var color2 = this.hexToRgb(hex[1]);

    var c1 = {};
    c1.red = color1[0] / 256;
    c1.green = color1[1] / 256;
    c1.blue = color1[2] / 256;

    var c2 = {};
    c2.red = color2[0] / 256;
    c2.green = color2[1] / 256;
    c2.blue = color2[2] / 256;

    var value = [];
    value = value.concat([c1.red - c2.red, 0, 0, 0, c2.red]);
    value = value.concat([c1.green - c2.green, 0, 0, 0, c2.green]);
    value = value.concat([c1.blue - c2.blue, 0, 0, 0, c2.blue]);
    value = value.concat([0, 0, 0, 1, 0]);

    return value.join(' ');
  }

  /**
   * Create Additional Color Filters
   *
   * return [bool]
   */
  createSvgFilters(hex, i) {
    var filterNum = 'duotone_' + i,
      ns = 'http://www.w3.org/2000/svg',
      svg = document.createElementNS(ns, 'svg'),
      filterEl = document.createElementNS(ns, 'filter'),
      matrix = document.createElementNS(ns, 'feColorMatrix');

    svg.setAttribute('style', 'color-interpolation-filters: sRGB');
    svg.classList.add('svg-filter');
    filterEl.setAttribute('id', 'duotone_' + i);
    matrix.setAttribute('type', 'matrix');
    matrix.setAttribute('values', this.duotone(hex));

    document
      .getElementById('svg_container')
      .appendChild(svg)
      .appendChild(filterEl)
      .appendChild(matrix);
    return;
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
      lfm.createSvgFilters(
        lfm.colors.morning.bgc1 + ',' + lfm.colors.morning.bgc2,
        'morning'
      );
      lfm.createSvgFilters(
        lfm.colors.afternoon.bgc3 + ',' + lfm.colors.afternoon.bgc1,
        'afternoon'
      );
      lfm.createSvgFilters(
        lfm.colors.evening.bgc1 + ',' + lfm.colors.evening.bgc2,
        'evening'
      );
      lfm.createSvgFilters(
        lfm.colors.night.bgc1 + ',' + lfm.colors.night.bgc2,
        'night'
      );
      //lfm.createSvgFilters("fccb90" + "," + "890c9b", "night");
      var TrackNodes = this.state.data.map(function(track, i) {
        while (i < lfm.props.tracks) {
          //data-hex="51d28b,0d1846"
          track.filterName = '#duotone_night';
          return (
            <LastCard
              artist={track.artist.name}
              title={track.name}
              url={track.url}
              cover={track.image[3]['#text']}
              filterName={track.filterName}
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
