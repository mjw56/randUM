import React from 'react';
import $ from 'jquery';
import style from '../utils/styles';
import useSheet from 'react-jss';
import Cassette from 'react-cassette-player';
import { Promise } from 'es6-promise';

export default React.createClass({

  getInitialState: function() {
    return { shows: [], audio: '', title: '', show: '' };
  },

  componentDidMount: function() {
    Promise.resolve($.ajax('http://localhost:3001/api/track'))
      .then((shows) => {

        var show = shows[Math.floor(Math.random() * shows.length)];
        var track = show.songs[Math.floor(Math.random() * show.songs.length)];

        this.setState({
          shows: shows,
          show: show,
          audio: track.link,
          track: track.title,
          showTitle: show.title
        });
      });
  },

  _getRandUMTrack() {
    var show = this.state.shows[Math.floor(Math.random() * this.state.shows.length)];
    var track = show.songs[Math.floor(Math.random() * show.songs.length)];

    console.log('shows: ', this.state.shows);

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
      </div>
    );
  }

});
