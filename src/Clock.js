import React from "react";

export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { current: new Date() };
    this.timer = null;
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ current: new Date() });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    return <div>{this.state.current.toLocaleString()}</div>;
  }
}
