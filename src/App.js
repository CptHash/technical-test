import './App.css';
import Square from './Square';
import React from 'react';


class App extends React.Component {

  intervalID = 0;

  constructor(props) {
    super(props);
    this.state = {
      squares: [],
      squareSize: 100,
      crazyMode: false,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    };
  }

  handleResize = (e) => {
    this.setState({ windowWidth: window.innerWidth });
    this.setState({ windowHeight: window.innerHeight });
  };

  onClickHandler = event => {
    if (event.detail === 2) {
      this.setState({ crazyMode: this.state.crazyMode ?  false : true})
      if (this.state.crazyMode === false)
        this.intervalID = setInterval(this.updatePos.bind(this), 2000);
    }
  }

  componentDidMount()
  {
    var squares = []

    window.addEventListener("resize", this.handleResize);
    squares.push({
      'size': this.state.squareSize,
      'left': Math.random() * ((this.state.windowWidth - this.state.squareSize* 3) - 5) + 5,
      'top': Math.random() * ((this.state.windowHeight - this.state.squareSize* 3) - 5) + 5,
    });
    this.setState({squares: squares})
  }

  triggerDelete(square, i) 
  {
    let squares = [...this.state.squares]
    squares.splice(i, 1);
    for (var j = 0; j < 4; j++)
      squares.push({
        'size': square.size/2,
        'left': Math.random() * ((this.state.windowWidth - square.size * 3) - 5) + 5,
        'top': Math.random() * ((this.state.windowHeight - square.size* 3) - 5) + 5,
      });
    this.setState({squares: squares})

  }

  updatePos(){
      let squares = [...this.state.squares]
      this.state.squares.forEach(element => {
        element.top = Math.random() * ((this.state.windowHeight - element.size* 3) - 5) + 5
        element.left = Math.random() * ((this.state.windowWidth - element.size* 3) - 5) + 5
      });
      this.setState({squares: squares})
  }

  componentWillUnmount() {
        clearInterval(this.intervalID);
  }

  componentDidUpdate() {
    if (this.state.crazyMode === false) {
      clearInterval(this.intervalID);
    }
  }

  render(){
    return (
      <div className="App">
        <header className="App-header" onClick={this.onClickHandler}>
          <p>Crazy mode: {this.state.crazyMode ? "ON" : "OFF"}</p>
          {this.state.squares.map((square, i) => {
           return ( <Square size={square.size} key={i} left={square.left} top={square.top} onClick={(e)=>{
            e.stopPropagation();
            e.preventDefault();
            this.triggerDelete(square, i);
           }}/>) 
        })}
        </header>
      </div>
    );
  }
}

export default App;
