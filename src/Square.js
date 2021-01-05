import React from 'react';
import randomColor from 'randomcolor'

class Square extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          color: null,
          top: null,
          left: null
        };
    }
      
    componentDidMount() {
        var randColor = randomColor();

        this.setState({color: randColor})
    }

    render(){
        var squareStyle = {
          padding:10,
          margin:20,
          display:"inline-block",
          position:'absolute',
          backgroundColor: this.state.color,
          width:this.props.size,
          height:this.props.size,
          left:this.props.left,
          top:this.props.top
        };
        return (
          <div style={squareStyle} onClick={this.props.onClick}>
          </div>
        );
      }
  }

export default Square