import React, { Component } from 'react';

import Group from './components/Group';
import Timer from './components/Timer';
import GroupField from './components/GroupField';
import StudentPicker from './components/StudentPicker';

const roster = require('./students.json');

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
      '🥨📟',
      '🌵🦈',
      '🌮🥯'
    ],
    studentsMaster: [],
    presentStudents: [],
    process: [],
    minutes: '0',
    seconds: '00',
    initialMin: '10',
    initialSec: '00',
    initialInput: '',
    timerButton: 'Start timer',
    buttonColor: 'green',
    timerInput: false,
    modalOpen: false
  }

  // Timer
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

  handleStartTimer = () => {
    this.intervalHandle = setInterval(this.tick, 1000);
    let time = this.state.initialInput;
    this.secondsRemaining = time * 60;
    this.setState({ initialMin: time })
  }

  handleStopTimer = () => {
    clearInterval(this.intervalHandle);
    this.setState({ minutes: this.state.initialMin, seconds: this.state.initialSec })
  }

  handleTimerInputChange = e => {
    this.setState({ minutes: e.target.value });
  }

  handleTimerCountClick = () => {
    this.setState({ timerInput: true });
  }

  inputChangeTimerTime = e => {
    let inputTime = e.target.value;
    this.setState({ initialInput: inputTime });
  }

  // Student array shuffle
  shuffle = array => {
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

  // Group generation
  handleNumberChange = e => {
    const newVal = e.target.value;
    this.setState({ numInGroups: newVal });
  };

  handleMakeGroupsButton = () => {
    const randomArr = this.shuffle(this.state.presentStudents);
    const randomGroupNames = this.shuffle(this.state.groupNames);

    const numInGroups = parseInt(this.state.numInGroups);
      
    let processArr = [];
    let count = 0;
    let totalRemaining = randomArr.length;
    let tempArr = [];
    let remainderArr = [];

    for (let i = 0; i < randomArr.length; i++) {
      /* If the current count is less than the size of each group
         push that name into the tempArr array, increase the count,
         decrease the totalRemaining */ 
      // -Works-
      if(count < numInGroups) {
        tempArr.push(randomArr[i]);
        count++;
        totalRemaining--;
      }
      /* If the count is equal to the size of each grop
         push the tempArr array into the processArr array
         because the tempArr array is full. Then push the name
         into the tempArr after clearing it and reset the count 
         to 1 because 1 name is in the tempArr array. Decrease
         the totalRemaining */ 
      // -Works-
      else if (count === numInGroups) { 
        processArr.push(tempArr);
        tempArr = [];
        tempArr.push(randomArr[i]);
        count = 1;
        totalRemaining--;
      }

      // If the total remaining to be sorted is less than the number in groups minus count, and the name isn't already in the process array
      // push the remaining name into the remainderArr array
      // -Works-
      if (totalRemaining < numInGroups-count && !processArr.includes(randomArr[i])) {
        remainderArr.push(randomArr[i]);
      }
    }

    /* If the processArr array doesn't include
       the last tempArr array (because the last 
       even array will not trigger the else if
       (count === numInGroups)) then push
       the last tempArr into the processArr */
    // Hack fix
    if(!processArr.includes(tempArr[0])) {
      processArr.push(tempArr);
    }

    /* If there are elements in the remainder array
       cycle through the remainders and add one to each
       of the existing process arrays.

       Then remove the last array in the process array
       since it is incomplete and holds the remainders */
    // There has to be a better way to do this
    // This does dumb stuff like make groups of five instead of one group of 3 when there are supposed to be groups of four. This needs fixing.
    if(remainderArr.length >= 1) {
      remainderArr.forEach((element, i) => {
        processArr[i].push(remainderArr[i]);
      });
      processArr.splice(processArr.length-1, 1);
    }

    this.setState({ process: processArr, groupNames: randomGroupNames });
  };

  // Student picker modal
  modalShow = () => this.setState({ modalOpen: true });
  modalClose = () => this.setState({ modalOpen: false });
  
  syncAvailableStudents = studentsMasterUpdated => {
    let presentStudentsUpdated = [];
    studentsMasterUpdated.forEach(student => {
      if(student.present) {
        presentStudentsUpdated.push(student.name);
      }
    });
    this.setState({ presentStudents: presentStudentsUpdated, studentsMaster: studentsMasterUpdated });
  }

  handleCheckboxToggle = i => {
    let studentsMasterUpdated = this.state.studentsMaster;
    studentsMasterUpdated[i].present = !studentsMasterUpdated[i].present;
    this.syncAvailableStudents(studentsMasterUpdated);
  }

  componentDidMount() {
    let studentsMasterProcess = [];
    roster.forEach((element, i) => {
      let processObj = {
        name: element,
        present: true
      };
      studentsMasterProcess.push(processObj);
    });
    this.syncAvailableStudents(studentsMasterProcess);
  }

  render() {
    return (
      <div className='app'>
        <StudentPicker 
          modalShow={this.modalShow}
          modalClose={this.modalClose}
          modalOpen={this.state.modalOpen}
          handleCheckboxToggle={this.handleCheckboxToggle}
          studentsMaster={this.state.studentsMaster} />

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
          <GroupField 
            handleMakeGroupsButton={this.handleMakeGroupsButton}
            numInGroups={this.state.numInGroups}
            handleNumberChange={this.handleNumberChange}
            modalShow={this.modalShow} />
        </div>
        
        <div className='groupsWrap'>
          {this.state.process.map((group, i) => (
            <Group group={group} key={i} groupName={this.state.groupNames[i]} />
          ))}
        </div>
      </div>
    )
  }
}

export default App;
