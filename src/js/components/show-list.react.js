import React from 'react';

export default React.createClass({

  _mapShow(show) {
    return <li>{show.title}</li>;
  },

  render() {

    let shows = this.props.shows.map((show) => {
      return this._mapShow(show);
    });

    return (
      <ul>
        {shows}
      </ul>
    );
  }

});
