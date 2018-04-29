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
    this.nextPosition = this.nextPosition.bind(this);
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

  nextPosition(currX, currY, currVal) {
    let newPos = [];
    switch (currVal.keyCode) {
      case 60:
        newPos.push({ y: currY, x: currX - 1 });
        break;
      case 62:
        newPos.push({ y: currY, x: currX + 1 });
        break;
      case 94:
        newPos.push({ y: currY - 1, x: currX });
        break;
      case 86:
        newPos.push({ y: currY + 1, x: currX });
        break;
      case 124:
        newPos.push({ y: currY - 1, x: currX }, { y: currY + 1, x: currX });
      case 173:
        newPos.push({ y: currY, x: currX - 1 }, { y: currY, x: currX + 1 });
      case 32:
        newPos.push(
          { y: currY, x: currX - 1 },
          { y: currY, x: currX + 1 },
          { y: currY - 1, x: currX },
          { y: currY + 1, x: currX }
        );
      default:
        return;
    }
    return newPos;
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
