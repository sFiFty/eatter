/*
 *
 *  SVG loader
 *
 */

import React from 'react';


class SvgLoader {
  constructor() {
    this._svg = {
      confirm_icon: 'confirm_icon.svg',
    };

    /* eslint-disable */
    Object.keys(this._svg).forEach((item) => {
      this._svg[item] = (
        <i
          className="svg-icon-wr"
          dangerouslySetInnerHTML={{__html: require('assets/svg/' + this._svg[item])}}
        />
      );
    });
    /* eslint-enable */
  }

  get svg() {
    return this._svg;
  }
}

export default new SvgLoader().svg;
