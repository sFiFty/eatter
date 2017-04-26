import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import range from 'lodash/range';
import faker from 'faker';
import { Link } from 'react-router';

import { start } from 'actions/appActions';

import SvgLoader from 'utils/SvgLoader';

import sound from 'assets/audio/trembling.ogg';
import image from 'assets/img/1@2x.png';


@connect(
  (state) => ({
    state,
  })
)
export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="home">
        <h1>Users Page</h1>
        <Link to="/">Home</Link>
      </div>
    );
  }
}
