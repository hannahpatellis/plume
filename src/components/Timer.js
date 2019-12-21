import React from 'react';
import { Button } from 'semantic-ui-react';

const Timer = props => (
  <div className='timer-holder'>
    {props.timerInput ? (
      <input placeholder="0m" onChange={props.inputChangeTimerTime} value={props.initialInput} id="incoming-time" type="text" />
    ) : (
      <h1 onClick={props.handleTimerCountClick} style={{ fontSize: 100 }}>{props.minutes}:{props.seconds}</h1>
    )}

    <Button size='mini' fluid color={props.buttonColor} onClick={props.handleTimerButton}>
      {props.timerButton}
    </Button>
  </div>
);

export default Timer;