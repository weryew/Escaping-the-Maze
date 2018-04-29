import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: [[], [], [], [], [], [], []],
      ways: 0
    };
    this.createAMap = this.createAMap.bind(this);
  }
  createAMap() {
    let newMap = [[], [], [], [], [], [], []];
    for (let i = 1; i < 6; i++) {
      for (let j = 1; j < 6; j++) {
        newMap[i].push(
          prompt(`Enter the character at the index ( ${i}, ${j} )`)
        );
      }
    }
    this.setState({ map: newMap });
  }
  render() {
    const { countStart, ways } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Escape the Maze</h1>
        </header>
        {!countStart && (
          <div>
            <p className="App-intro">First, you should define your map!</p>
            <button onClick={this.createAMap}>Create a map</button>
            <br />
          </div>
        )}
        {countStart && (
          <div>
            <h4>The number of ways to exit the map is: {ways} </h4>
          </div>
        )}
      </div>
    );
  }
}

export default App;
