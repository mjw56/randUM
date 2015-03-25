import React from 'react';
import style from '../utils/styles';
import useSheet from 'react-jss';
import Cassette from 'react-cassette-player';
import { Promise } from 'es6-promise';
import 'whatwg-fetch';
import ShowList from './show-list.react';

export default React.createClass({

  getInitialState: function() {
    return { shows: [], audio: '', title: '', show: '' };
  },

  componentDidMount: function() {
    fetch(process.env.RANDUM_TRACK_URL)
      .then((response) => {
        return response.json().then((json) => {
          return json;
        });
      })
      .then(this._showsResponse)
      .catch((error) => {
        console.log('request failed', error)
      });
  },

  _showsResponse(shows) {
    let show = shows[Math.floor(Math.random() * shows.length)];
    let track = show.songs[Math.floor(Math.random() * show.songs.length)];

    this.setState({
      shows: shows,
      show: show,
      audio: track.link,
      track: track.title,
      showTitle: show.title
    });
  },

  _getRandUMTrack() {
    var show = this.state.shows[Math.floor(Math.random() * this.state.shows.length)];
    var track = show.songs[Math.floor(Math.random() * show.songs.length)];

    this.setState({
      show: show,
      audio: track.link,
      track: track.title,
      showTitle: show.title
    });
  },

  mixins: [useSheet(style.home)],

  render() {
    return (
      <div>
        <p className={this.sheet.classes['.track-title']}>{ this.state.showTitle }</p>
        <p className={this.sheet.classes['.track-title']}>{ this.state.track }</p>
        { this.state.audio ? <Cassette containerClass='jss-1' src={this.state.audio} /> : <div /> }
        <button onClick={this._getRandUMTrack}>Get randUM track></button>
        <ShowList shows={this.state.shows} />
      </div>
    );
  }

});
