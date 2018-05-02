import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: [
        [null, null, null, null, null, null, null],
        [null, "v", "?", "|", " ", "<", null],
        [null, "-", " ", "v", "?", " ", null],
        [null, "<", "<", "<", "|", ">", null],
        [null, "v", "", " ", "-", " ", null],
        [null, "v", " ", "^", "?", "<", null],
        [null, null, null, null, null, null, null]
      ],
      startPos: [[1, 1]],
      currPos: null,
      lastX: null,
      lastY: null,
      ways: 0,
      finish: false
    };
    this.nextPosition = this.nextPosition.bind(this);
    this.newWay = this.newWay.bind(this);
    this.start = this.start.bind(this);
  }
  start() {
    this.setState({
      currPos: this.state.startPos
    });
  }
  nextPosition(X, Y) {
    let newMap;
    let currVal = this.state.map[Y][X];
    let arrPos = [];
    switch (currVal) {
      case "<":
        arrPos.push([X - 1, Y]);
        this.setState({ currPos: arrPos.slice(0) });
        break;
      case ">":
        arrPos.push([X + 1, Y]);
        this.setState({ currPos: arrPos.slice(0) });
        break;
      case "^":
        arrPos.push([X, Y - 1]);
        this.setState({ currPos: arrPos.slice(0) });
        break;
      case "v":
        arrPos.push([X, Y + 1]);
        this.setState({ currPos: arrPos.slice(0) });
        break;
      case " ":
        newMap = this.state.map.slice();
        newMap[Y][X] = newMap[this.state.lastY][this.state.lastX];
        break;
      case "|":
        arrPos.push([X, Y + 1], [X, Y - 1]);
        this.setState({ currPos: arrPos.slice(0) });
        break;
      case "-":
        arrPos.push([X + 1, Y], [X - 1, Y]);
        this.setState({ currPos: arrPos.slice(0) });
        break;
      case "?":
        arrPos.push([X + 1, Y], [X - 1, Y], [X, Y + 1], [X, Y - 1]);
        this.setState({ currPos: arrPos.slice(0) });
        break;
      default:
        return;
    }
    this.setState({
      lastX: X,
      lastY: Y
    });
  }
  newWay(X, Y) {
    return X === 0 || X === 6 || Y === 0 || Y === 6
      ? this.setState({
          ways: this.state.ways + 1,
          finish: true
        })
      : this.nextPosition(X, Y);
  }
  componentWillMount() {
    this.start();
  }
  componentDidMount() {
    setInterval(() => {
      !this.state.finish &&
        this.newWay(this.state.currPos[0][0], this.state.currPos[0][1]);
    }, 500);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Escape the Maze</h1>
        </header>
        <div>
          <p>X: {this.state.currPos[0][0]} </p>
          <p>Y: {this.state.currPos[0][1]} </p>
          <p>The number of ways to exit the map is: {this.state.ways} </p>
        </div>
      </div>
    );
  }
}

export default App;
