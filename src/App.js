import React, { Component } from 'react';
import { Button, Input, Icon, Card, Modal, Checkbox } from 'semantic-ui-react';

import Group from './components/Group';
import Timer from './components/Timer';
import GroupField from './components/GroupField';
import StudentPicker from './components/StudentPicker';



class App extends Component {

  state = {
    numInGroups: 4,
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
    originalStudentNames: [
      {
        name: 'Alex',
        present: true
      },
      {
        name: 'Alyssa',
        present: true
      },
      {
        name: 'Caleb',
        present: true
      },
      {
        name: 'Charlie',
        present: true
      },
      {
        name: 'Chase',
        present: true
      },
      {
        name: 'Chris',
        present: true
      },
      {
        name: 'Colin',
        present: true
      },
      {
        name: 'Dennis',
        present: true
      },
      {
        name: 'Di\'Nasia',
        present: true
      },
      {
        name: 'Jake',
        present: true
      },
      {
        name: 'Jason',
        present: true
      },
      {
        name: 'Jessica',
        present: true
      },
      {
        name: 'John',
        present: true
      },
      {
        name: 'Kanchan',
        present: true
      },
      {
        name: 'Katherine',
        present: true
      },
      {
        name: 'Kayla',
        present: true
      },
      {
        name: 'Kristin',
        present: true
      },
      {
        name: 'Lavet',
        present: true
      },
      {
        name: 'Leon',
        present: true
      },
      {
        name: 'Libby',
        present: true
      },
      {
        name: 'Meg',
        present: true
      },
      {
        name: 'Melanie',
        present: true
      },
      {
        name: 'Parisa',
        present: true
      },
      {
        name: 'Shelby',
        present: true
      },
      {
        name: 'Stirling',
        present: true
      },
      {
        name: 'Tara',
        present: true
      },
      {
        name: 'Taylor',
        present: true
      },
      {
        name: 'Thao',
        present: true
      }
    ],
    studentNames: [
      'Alex',
      'Alyssa',
      'Caleb',
      'Charlie',
      'Chase',
      'Chris',
      'Colin',
      'Dennis',
      'Di\'Nasia',
      'Jake',
      'Jason',
      'Jessica',
      'John',
      'Kanchan',
      'Katherine',
      'Kayla',
      'Kristin',
      'Lavet',
      'Leon',
      'Libby',
      'Meg',
      'Melanie',
      'Parisa',
      'Shelby',
      'Stirling',
      'Tara',
      'Taylor',
      'Thao'
    ],
    process: [],
    minutes: '0',
    seconds: '00',
    initialMin: '11',
    initialSec: '00',
    initialInput: '',
    timerButton: 'Start timer',
    buttonColor: 'green',
    timerInput: false,
    modalOpen: false
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
    const randomArr = this.shuffle(this.state.studentNames);
    const randomGroupNames = this.shuffle(this.state.groupNames);

    const numInGroups = parseInt(this.state.numInGroups);
      
    let processArr = [];
    let count = 0;
    let totalRemaining = randomArr.length;
    let tempArr = [];
    let remainderArr = [];

    console.log(`randomArr.length is ${randomArr.length}`);

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

    console.log(`We have remainders`, remainderArr);
    console.log(`Process array`, processArr);

    // if(remainderArr.length === 1) {
    //   processArr[0].push(remainderArr[0]);
    // } else if (remainderArr.length > 1){
    //   processArr.push(remainderArr);
    // }

    this.setState({ process: processArr, groupNames: randomGroupNames });
  };

  handleTimerCountClick = () => {
    this.setState({ timerInput: true });
  }

  inputChangeTimerTime = (e) => {
    let inputTime = e.target.value;
    this.setState({ initialInput: inputTime });
  }

  modalShow = () => this.setState({ modalOpen: true });
  modalClose = () => this.setState({ modalOpen: false });
  
  // Used by <StudentPicker>
  handleCheckboxToggle = (i) => {
    let newStudentNames = this.state.originalStudentNames;
    newStudentNames[i].present = !newStudentNames[i].present;
    this.setState({ originalStudentNames: newStudentNames });
  }

  render() {

    return (
      <div className='app'>
        <StudentPicker 
          modalShow={this.modalShow}
          modalClose={this.modalClose}
          modalOpen={this.state.modalOpen}
          handleCheckboxToggle={this.handleCheckboxToggle}
          originalStudentNames={this.state.originalStudentNames} />
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
          {this.state.process.map((val, i) => (
            <Group studentNames={val} groupName={this.state.groupNames[i]} />
          ))}
        </div>
      </div>
    )
  }
}

export default App;
