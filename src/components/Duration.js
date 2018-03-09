import React, { Component } from 'react'

class Duration extends Component {
  format(seconds) {
    const date = new Date(seconds * 1000)
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = this.pad(date.getUTCSeconds())
    if (hh) {
      return `${hh}:${this.pad(mm)}:${ss}`
    }
    return `${mm}:${ss}`
  }

  pad(string) {
    return ('0' + string).slice(-2)
  }

  render() {
    return (
      <time dateTime={`P${Math.round(this.props.seconds)}S`} className={this.props.className}>
        {this.format(this.props.seconds)}
      </time>
    );
  }
}

export default Duration;