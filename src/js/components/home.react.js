import * as React from 'react';
import style from '../utils/styles';
import useSheet from 'react-jss';

export default React.createClass({

  mixins: [useSheet(style.home)],

  render() {
    return (
      <div>
        <h1 className={this.sheet.classes.h1}>RxJS Lab</h1>
      </div>
    );
  }

});
