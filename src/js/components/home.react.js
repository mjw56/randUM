import * as React from 'react';
import $ from 'jquery';
import style from '../utils/styles';
import useSheet from 'react-jss';
import Cassette from 'react-cassette-player';
import { Promise } from 'es6-promise';

export default React.createClass({

  getInitialState: function() {
    return { audio: '' };
  },

  componentDidMount: function() {
    Promise.resolve($.ajax('http://localhost:3001/api/track'))
      .then((track) => {
        this.setState( { audio: track });
      });
  },

  mixins: [useSheet(style.home)],

  render() {
    return (
      <div>
        { this.state.audio ? <Cassette src={this.state.audio} /> : <div /> }
      </div>
    );
  }

});
