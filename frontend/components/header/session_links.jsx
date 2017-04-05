import React from 'react';

import Modal from './modal';

class SessionLinks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      formType: 'login'
    };
    this.handleLogin= this.handleLogin.bind(this);
    this.handleDemo= this.handleDemo.bind(this);
    this.handleLoginOpen = this.handleLoginOpen.bind(this);
    this.handleSignUpOpen = this.handleSignUpOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleLoginOpen(e) {
    e.preventDefault();
    this.setState({open: true, formType: 'login'});
  }
  handleSignUpOpen(e) {
    e.preventDefault();
    this.setState({open: true, formType: 'signUp'});
  }

  handleClose() {
    this.setState({open: false});
  }

  handleLogin() {
    // this.props.login();
  }

  handleDemo() {
    // this.props.login({user: {username: "Jane Doe", password: "123456"}});
  }


  render() {

    return (
    	<div className='session-links'>
        <button
          onClick={this.handleDemo}
        >
        Demo Login
        </button>
        <button
          onClick={this.handleLoginOpen}
        >
        Login!
        </button>
        <button
          onClick={this.handleSignUpOpen}
        >
        Sign Up!
        </button>
        <Modal
          isOpen={this.state.open}
          onClose={this.handleClose}
          formType={this.state.formType}
        >
          <h1>Modal title</h1>
          <p>hello</p>
          <p><button onClick={() => this.handleClose()}>Close</button></p>

        </Modal>

    	</div>

    );
  }
}

export default SessionLinks;
