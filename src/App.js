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

class App extends Component {

  state = {
    auth: true,
    numOfGroups: 0,
    username: '',
    password: '',
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

  componentDidMount() {
  }

  handleChange = (e) => {
    this.setState({ numOfGroups: e });
  }

  generateGroups = () => {
    console.log("make groups");
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
                    <NumberField shadow={false} value={this.state.numOfGroups} onChange={this.handleChange} />
                    <Button style={{ fontWeight: 'bold' }} onClick={this.generateGroups}>😎 Make groups</Button>
                  </Toolbar>
                </AppBar>
                <div className="stage">
                  <Group studentNames={["karen walker", "sandra oh", "mother abundance", "peach patellis"]} groupName={this.state.groupNames[1]} />
                </div>
              </div>
            ) : (
              <Window style={{ width: 400 }}>
                <WindowHeader>Please login using your BCS credentials</WindowHeader>
                <WindowContent>
                  <p className="login-input-title">Username</p>
                  <TextField value={this.state.username} />
                  <p className="login-input-title">Password</p>
                  <TextField value={this.state.password} type="password" />
                  <Button fullWidth className="login-submit">Authenticate</Button>
                </WindowContent>
              </Window>
            )}
          </div>
        </ThemeProvider>
      </div>
    )
  }
}

export default App;
