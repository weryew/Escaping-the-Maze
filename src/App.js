import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: [
        [null, null, null, null, null, null, null],
        [null, "v", "?", "|", " ", "<", null],
        [null, "<", " ", " ", "?", " ", null],
        [null, "v", " ", "?", "|", ">", null],
        [null, "v", " ", " ", "-", " ", null],
        [null, "v", " ", "^", "?", "<", null],
        [null, null, null, null, null, null, null]
      ],
      startX: 1,
      startY: 1,
      lastX: null,
      lastY: null,
      currX: null,
      currY: null,
      ways: 0,
      finish: false
    };
    this.nextPosition = this.nextPosition.bind(this);
    this.newWay = this.newWay.bind(this);
    this.start = this.start.bind(this);
  }

  nextPosition(X, Y) {
    let currVal = this.state.map[Y][X];
    switch (currVal) {
      case "<":
        this.setState({ currX: X - 1 });
        break;
      case ">":
        this.setState({ currX: X + 1 });
        break;
      case "^":
        this.setState({ currY: Y - 1 });
        break;
      case "v":
        this.setState({ currY: Y + 1 });
        break;
      case "|":
        this.setState({ currY: Y - 1 || Y - 1 });
        break;
      case "-":
        this.setState({ currX: X + 1 || X - 1 });
        break;
      case " ":
        break;
      default:
        return;
    }
    this.setState({
      lastX: X,
      lastY: Y
    });
  }

  newWay(currX, currY) {
    return currX === 0 || currX === 6 || currY === 0 || currY === 6
      ? this.setState({
          ways: this.state.ways + 1,
          finish: true,
          currX: this.state.startX,
          currY: this.state.startY
        })
      : this.nextPosition(currX, currY);
  }

  start() {
    this.setState({
      currX: this.state.startX,
      currY: this.state.startY
    });
  }

  componentWillMount() {
    this.start();
  }

  componentDidMount() {
    setInterval(() => {
      !this.state.finish && this.newWay(this.state.currX, this.state.currY);
    }, 0);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Escape the Maze</h1>
        </header>
        <div>
          <p>X: {this.state.currX} </p>
          <p>Y: {this.state.currY} </p>
          <p>The number of ways to exit the map is: {this.state.ways} </p>
        </div>
      </div>
    );
  }
}

export default App;
