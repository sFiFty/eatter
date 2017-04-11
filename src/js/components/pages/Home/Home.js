import React from 'react';
import ReactDOM from 'react-dom';

class Square extends React.Component {
  render() {
    return (
      <button className="square">
        Eatter button
      </button>
    );
  }
}

ReactDOM.render(
  <Square />,
  document.getElementById('app')
);









