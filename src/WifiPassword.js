import React, { Component } from 'react';

class WifiPassword extends Component {
  constructor(props) {
    super(props);
    this.state = { password: '' };
  }

  render() {
    return (
      <div>
        <div>Please enter the password for { this.props.params.ssid }</div>
        <input type="password" value={this.state.password} onChange={this.onPasswordChange.bind(this)} />
        <input type="button" value="Continue" onClick={this.submitPassword.bind(this)}/>
      </div>
    )
  }

  onPasswordChange(event) {
    this.setState({password: event.target.value})
  }

  submitPassword(event) {
    let postData = new FormData()
    postData.append('json', JSON.stringify({
      'ssid':     this.props.params.ssid,
      'password': this.state.password
    }))
    fetch('/-/setup/wifi', { method: 'POST', body: postData })
      .then((response) => response.json())
      .then((json) => console.log(json))
    event.preventDefault()
  }
}

export default WifiPassword
