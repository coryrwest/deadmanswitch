import React, { Component, PropTypes } from 'react';

class Login extends Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this);
        this.createLogin = this.createLogin.bind(this);
    }
    
    onChange(e) {
        this.props.updateEmail(e.target.value);
    }
    
    createLogin() {
        this.props.createLogin(this.props.email);
    }
    
    render() {
        return <form>
            <label className="textfield">
                <input type="text" id="email" onChange={this.onChange} value={this.props.email} />
                <span className="textfield__label">Your Email</span>
            </label>
            <button type="button" onClick={this.createLogin} disabled={this.props.sendingLoginRequest}>{this.props.sendingLoginRequest ? "Sending" : "Send login link"}</button>
        </form>;
    }
};

Login.propTypes = {
  updateEmail: React.PropTypes.func.isRequired,
  createLogin: React.PropTypes.func.isRequired,
  sendingLoginRequest: React.PropTypes.bool.isRequired
};

export default Login;