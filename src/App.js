import React, { Component } from 'react';
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { reset, themes, AppBar, Toolbar, Window, WindowContent, Button, WindowHeader, Fieldset, NumberField, TextField } from "react95";

const Group = props => (
  <div className="group-holder">
    <Window>
      <WindowContent>
        <Fieldset label={props.groupName}>
          {props.studentNames.map(name => <p>{name}</p>)}
        </Fieldset>
      </WindowContent>
    </Window>
  </div>
);

const Timer = (props) => (
  <div className="group-holder">
    <Window>
      <WindowContent>
        <Fieldset label='Timer'>
          <input type="number" minutes={props.minutes} onChange={props.handleTimerInputChange} required />
          <h1 style={{ fontSize: 100 }}>{props.minutes}:{props.seconds}</h1>
          <button onClick={props.startCountDown}>Start</button>
        </Fieldset>
      </WindowContent>
    </Window>
  </div>
);

class App extends Component {

  state = {
    numInGroups: 2,
    groupNames: [
      "🧠🦁 Brainy Lions",
      "🕶🐸 Cool Frogs",
      "☄️🐈 Comet Cats",
      "⛸🌝 Ice Skating Moons",
      "🚀🦕 Rocket Dinos",
      "🦞🐝 Lobster Bees",
      "🌹🍄 Rose Mushrooms",
      "🍊🎉 Orange Partiers",
      "🌅💎 Sunrise Gems",
      "🏕🐲 Camping Dragons",
      "🍌🐛 Banana Bugs",
      "🥨📟 Pretzel Pagers"
    ],
    studentNames: [
      "Alda",
      "Allison",
      "Asante",
      "Asha",
      "Cindy",
      "Courtney",
      "Keiron",
      "Emery",
      "Haley",
      "Charlie",
      "Ji Hu",
      "Ji Li",
      "Jonathan",
      "Khadijah",
      "Mel",
      "Michele",
      "Nada",
      "Nathaniel",
      "Nile",
      "Ruthie",
      "Tae yun"
    ],
    process: [],
    minutes: '',
    seconds: '00'
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
        seconds: "0" + this.state.seconds,
      })
    }
    if (min < 10) {
      this.setState({
        value: "0" + min,
      })
    }
    if (min === 0 & sec === 0) {
      clearInterval(this.intervalHandle);
    }
    this.secondsRemaining--;
  }

  startCountDown = () => {
    this.intervalHandle = setInterval(this.tick, 1000);
    let time = this.state.minutes;
    this.secondsRemaining = time * 60;
  }
  handleTimerInputChange = e => {
    this.setState({ minutes: e.target.value });
  };


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
  if (e < 1) e = 2;
  this.setState({ numInGroups: e });
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

componentDidMount() {
}

render() {
  const ResetStyles = createGlobalStyle`${reset}`;

  return (
    <div className="App">
      <ResetStyles />
      <ThemeProvider theme={themes.default}>
        <div>
          <div>
            <AppBar>
              <Toolbar style={{ justifyContent: 'space-between' }}>
                <NumberField shadow={false} value={this.state.numInGroups} onChange={this.handleNumberChange} />
                <span>
                  <span className='course-code'>Georgia Tech UX/UI Bootcamp</span>
                  <Button style={{ fontWeight: 'bold' }} onClick={this.handleMakeGroupsButton}>😎 Make groups</Button>
                </span>
              </Toolbar>
            </AppBar>
            <div className="stage">
              <Timer 
                minutes={this.state.minutes} 
                seconds={this.state.seconds} 
                handleTimerInputChange={this.handleTimerInputChange} 
                startCountDown={this.startCountDown} />
              {this.state.process.map((val, i) => (
                <Group studentNames={val} groupName={this.state.groupNames[i]} />
              ))}
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  )
}
}

export default App;
