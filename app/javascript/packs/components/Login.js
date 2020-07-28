import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import "../css/Login.css"

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: ''
     };
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const url = "/login";

    const body = {
        email: this.state.email,
        password: this.state.password
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {this.props.history.push(`/announcements`); })
      .catch(error => console.log(error.message));
  };

  render() {
    const {email, password} = this.state

    return (
      <div id="login_box">
        <h1>Iniciar sesión</h1>
        <form onSubmit={this.handleSubmit}>
          <input placeholder="email" type="text" name="email" value={email} onChange={this.handleChange} id="login_email"
          />
          <input placeholder="password" type="password" name="password" value={password} onChange={this.handleChange} id="login_password"
          />         <div class="button" onClick={this.handleSubmit}>Iniciar sesión</div>
         </form>
      </div>
    );
  }
}

export default Login;
