import React, { Component } from 'react';
import { Button, Input, Icon, Card } from 'semantic-ui-react';

const Group = props => (
  <div className='group-holder'>
    <Card>
      <Card.Content header={props.groupName} />
      <Card.Content description={props.studentNames.map(name => <p>{name}</p>)} />
    </Card>
  </div>
);

const Timer = (props) => (
  <div className='timer-holder'>
    {props.timerInput ? (
      <input placeholder="0m" onChange={props.inputChangeTimerTime} value={props.initialInput} id="incoming-time" type="text" />
    ) : (
      <h1 onClick={props.handleTimerCountClick} style={{ fontSize: 100 }}>{props.minutes}:{props.seconds}</h1>
    )}
    {/* <input type='number' minutes={props.minutes} onChange={props.handleTimerInputChange} required /> */}
    
    {/* <button >Start</button> */}
    <Button fluid color={props.buttonColor} onClick={props.handleTimerButton}>
      {props.timerButton}
    </Button>
  </div>
);

const SortBuddy = (props) => (
  <div className='sortbuddy-holder'>
    <Input 
      icon={<Icon name='refresh' inverted circular link onClick={props.handleMakeGroupsButton} />}
      onChange={props.handleNumberChange}
      value={props.numInGroups}
      placeholder='Number in each group' />
  </div>
);

class App extends Component {

  state = {
    numInGroups: 2,
    groupNames: [
      '🧠🦁',
      '🕶🐸',
      '☄️🐈',
      '⛸🌝',
      '🚀🦕',
      '🦞🐝',
      '🌹🍄',
      '🍊🎉',
      '🌅💎',
      '🏕🐲',
      '🍌🐛',
      '🥨📟'
    ],
    studentNames: [
      'Alda',
      'Allison',
      'Asante',
      'Asha',
      'Cindy',
      'Courtney',
      'Keiron',
      'Emery',
      'Haley',
      'Charlie',
      'Ji Hu',
      'Ji Li',
      'Jonathan',
      'Khadijah',
      'Mel',
      'Michele',
      'Nada',
      'Nathaniel',
      'Nile',
      'Ruthie',
      'Tae yun'
    ],
    process: [],
    minutes: '10',
    seconds: '00',
    initialMin: '11',
    initialSec: '00',
    initialInput: '',
    timerButton: 'Start timer',
    buttonColor: 'green',
    timerInput: false
  }

  secondsRemaining;
  intervalHandle;

  tick = () => {
    var min = Math.floor(this.secondsRemaining / 60);
    var sec = this.secondsRemaining - (min * 60);
    this.setState({
      minutes: min,
      seconds: sec
    })
    if (sec < 10) {
      this.setState({
        seconds: '0' + this.state.seconds,
      })
    }
    if (min < 10) {
      this.setState({
        value: '0' + min,
      })
    }
    if (min === 0 & sec === 0) {
      clearInterval(this.intervalHandle);
    }
    this.secondsRemaining--;
  }

  handleTimerButton = () => {
    if(this.state.timerButton === 'Start timer') {
      this.handleStartTimer();
      this.setState({ timerButton: 'Stop and reset timer', buttonColor: 'red', timerInput: false });
    } else {
      this.handleStopTimer();
      this.setState({ timerButton: 'Start timer', buttonColor: 'green' });
    }
  }

  handleStopTimer = () => {
    clearInterval(this.intervalHandle);
    this.setState({ minutes: this.state.initialMin, seconds: this.state.initialSec })
  }

  handleStartTimer = () => {
    this.intervalHandle = setInterval(this.tick, 1000);
    let time = this.state.initialInput;
    this.secondsRemaining = time * 60;
    this.setState({ initialMin: time })
  }


  handleTimerInputChange = e => {
    this.setState({ minutes: e.target.value });
  }

  shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  handleNumberChange = (e) => {
    let newVal = e.target.value;
    this.setState({ numInGroups: newVal });
  };

  handleMakeGroupsButton = () => {
    let randomArr = this.shuffle(this.state.studentNames);
    let randomGroupNames = this.shuffle(this.state.groupNames);

    let processArr = [];
    let i, j, tempArr, chunk = this.state.numInGroups;

    for (i = 0, j = randomArr.length; i < j; i += chunk) {
      tempArr = randomArr.slice(i, i + chunk);
      processArr.push(tempArr);
    }

    processArr.forEach((val, i) => {
      if (val.length <= this.state.numInGroups / 2) {
        processArr[processArr.length - 2].push(val);
      }
    });

    console.log(processArr);

    this.setState({ process: processArr, groupNames: randomGroupNames });
  };

  handleTimerCountClick = () => {
    this.setState({ timerInput: true });
  }

  inputChangeTimerTime = (e) => {
    let inputTime = e.target.value;
    this.setState({ initialInput: inputTime });
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className='app'>
        <div className='topWrap'>
          <Timer
              minutes={this.state.minutes}
              seconds={this.state.seconds}
              handleTimerInputChange={this.handleTimerInputChange}
              handleTimerButton={this.handleTimerButton} 
              timerButton={this.state.timerButton} 
              buttonColor={this.state.buttonColor} 
              timerInput={this.state.timerInput} 
              handleTimerCountClick={this.handleTimerCountClick} 
              inputChangeTimerTime={this.inputChangeTimerTime}
              initialInput={this.state.initialInput} />
          <div className='myhr'></div>
          <SortBuddy 
            handleMakeGroupsButton={this.handleMakeGroupsButton}
            numInGroups={this.state.numInGroups}
            handleNumberChange={this.handleNumberChange} />
        </div>
        <div className='groupsWrap'>
          {this.state.process.map((val, i) => (
            <Group studentNames={val} groupName={this.state.groupNames[i]} />
          ))}
        </div>
      </div>
    )
  }
}

export default App;
