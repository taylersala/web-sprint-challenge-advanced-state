import React from 'react';
import { connect } from 'react-redux';
import { moveClockwise, moveCounterClockwise } from '../state/action-creators';



function Wheel(props) {

  const { wheelValue, moveClockwise, moveCounterClockwise } = props;

  const handleClockwiseClick = () => {
    moveClockwise();
    console.log('clock', wheelValue)
  };

  const handleCounterClockwiseClick = () => {
    moveCounterClockwise();
    console.log('counter', wheelValue)
  };

  return (
    <div id="wrapper">
      <div id="wheel">
      <div className={`cog ${wheelValue === 0 ? 'active' : ''}`} style={{ "--i": 0 }}>
      {wheelValue === 0 ? 'B' : ''}
      </div>
      <div className={`cog ${wheelValue === 1 ? 'active' : ''}`} style={{ "--i": 1 }}>
      {wheelValue === 1 ? 'B' : ''}
      </div>
      <div className={`cog ${wheelValue === 2 ? 'active' : ''}`} style={{ "--i": 2 }}>
      {wheelValue === 2 ? 'B' : ''}
      </div>
      <div className={`cog ${wheelValue === 3 ? 'active' : ''}`} style={{ "--i": 3 }}>
      {wheelValue === 3 ? 'B' : ''}
      </div>
      <div className={`cog ${wheelValue === 4 ? 'active' : ''}`} style={{ "--i": 4 }}>
      {wheelValue === 4 ? 'B' : ''}
      </div>
      <div className={`cog ${wheelValue === 5 ? 'active' : ''}`} style={{ "--i": 5 }}>
      {wheelValue === 5 ? 'B' : ''}</div>{/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={ handleCounterClockwiseClick } >Counter clockwise</button>
        <button id="clockwiseBtn" onClick={handleClockwiseClick}>Clockwise</button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  wheelValue: state.wheel
});

const mapDispatchToProps = {
  moveClockwise, 
  moveCounterClockwise
};

export default connect(mapStateToProps, mapDispatchToProps)(Wheel);