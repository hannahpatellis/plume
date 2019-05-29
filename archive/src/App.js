import React, { Component } from 'react';
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { reset, themes, AppBar, Toolbar, Window, WindowContent, Button, WindowHeader, Fieldset, NumberField, TextField } from "react95";
import API from './utils/API';

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

const Timer = () => (
  <div className="group-holder">
    <Window>
      <WindowContent>
        <Fieldset label='Timer'>
          <h1>20:00</h1>
        </Fieldset>
      </WindowContent>
    </Window>
  </div>
);

class App extends Component {

  state = {
    auth: true,
    numOfGroups: 0,
    username: '',
    password: '',
    authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYyNDksIm1pbnV0ZXNUaW1lb3V0Ijo2MCwiY3JlYXRpb25UaW1lIjoiMjAxOS0wNS0yN1QxNTo1NjowOS4wOTY5MTU2MTJaIn0.wBKQYHQHhyu1UroqO3lABnKklR-IDGi9CTe_haZ2FhQ',
    userId: '',
    courseId: '',
    courseCode: '',
    groupNames: [
      "🧠🦁 Brainy Lions",
      "🧶🐤 Yarn Chicks",
      "🕶🐸 Cool Frogs",
      "☄️🐈 Comet Cats",
      "🥍🐬 Lacrosse Dolphins",
      "⛸🌝 Ice Skating Moons",
      "🚀🦕 Rocket Dinos",
      "🦞🐝 Lobster Bees",
      "🌹🍄 Rose Mushrooms",
      "🍊🎉 Orange Partiers",
      "🌅💎 Sunrise Gems",
      "🏕🐲 Camping Dragons",
      "🍌🐛 Banana Bugs",
      "🥨📟 Pretzel Pagers",
      "🧲🧽 Magnetic Sponges"
    ],
    studentNames: []
  }

  getMe = (authToken) => {
    API.getMe(authToken).then(data => {
      console.log(data);
    }).catch(err => {
      console.log(err);
    });
  };

  getMostRecentClass = (authToken) => {
    API.getMe(authToken).then(data => {
      const mostRecentCourseId = data.data.enrollments[0].course.id;
      const courseCode = data.data.enrollments[0].course.code;
      this.setState({ courseId: mostRecentCourseId, courseCode: courseCode });
    }).catch(err => {
      console.log(err);
    });
  };

  handleLoginFormChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({ [name]: value });
  };

  handleLoginButton = () => {
    const username = this.state.username;
    const password = this.state.password;

    console.log(username);
    console.log(password);

    API.login(username, password).then(data => {
      console.log(data.data.authenticationInfo.authToken);
      // this.getMe(data.data.authenticationInfo.authToken);
      this.setState({ auth: true, authToken: data.data.authenticationInfo.authToken, userId: data.data.authenticationInfo.userId, password: '', username: '' });
    }).catch(err => {
      console.log(err);
    });
    
  };

  preformLogin = () => {
    console.log(this.state);
  };

  handleNumberChange = (e) => {
    this.setState({ numOfGroups: e });
    console.log(e);
  };

  handleMakeGroupsButton = () => {
    const numGroupsToMake = this.state.numOfGroups;
    console.log(numGroupsToMake);

    API.getAttendance(this.state.courseId, this.state.authToken).then(data => {
      console.log(data.data);
      
      // this.setState({ auth: true, authToken: data.data.authenticationInfo.authToken, userId: data.data.authenticationInfo.userId, password: '', username: '' });
    }).catch(err => {
      console.log(err);
    });
  };

  componentDidMount() {
    // this.getMe(this.state.authToken);
    this.getMostRecentClass(this.state.authToken);
  }

  render() {
    const ResetStyles = createGlobalStyle`${reset}`;

    return (
      <div className="App">
        <ResetStyles />
        <ThemeProvider theme={themes.default}>
          <div>
            {this.state.auth ? (
              <div>
                <AppBar>
                  <Toolbar style={{ justifyContent: 'space-between' }}>
                    <NumberField shadow={false} value={this.state.numOfGroups} onChange={this.handleNumberChange} />
                    <span>
                      <span className='course-code'>{this.state.courseCode}</span>
                      <Button style={{ fontWeight: 'bold' }} onClick={this.handleMakeGroupsButton}>😎 Make groups</Button>
                    </span>
                  </Toolbar>
                </AppBar>
                <div className="stage">
                  <Timer />
                  <Group studentNames={["karen walker", "sandra oh", "mother abundance", "peach patellis"]} groupName={this.state.groupNames[1]} />
                </div>
              </div>
            ) : (
              <div className="login-wrapper">
                <Window style={{ width: 400 }} className="login-window">
                  <WindowHeader>Please login using your BCS credentials</WindowHeader>
                  <WindowContent>
                    <p className="login-input-title">Email</p>
                    <TextField name='username' value={this.state.username} onChange={this.handleLoginFormChange} />
                    <p className="login-input-title">Password</p>
                    <TextField name='password' value={this.state.password} onChange={this.handleLoginFormChange} type="password" />
                    <Button fullWidth className="login-submit" onClick={this.handleLoginButton}>Authenticate</Button>
                  </WindowContent>
                </Window>
              </div>
            )}
          </div>
        </ThemeProvider>
      </div>
    )
  }
}

export default App;
