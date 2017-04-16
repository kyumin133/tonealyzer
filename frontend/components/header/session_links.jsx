import React from 'react';

import Modal from './modal';
import SessionFormContainer from './session_form/session_form_container';

class SessionLinks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      formType: 'Log In'
    };
    this.handleLogin= this.handleLogin.bind(this);
    this.handleDemo= this.handleDemo.bind(this);
    this.handleLoginOpen = this.handleLoginOpen.bind(this);
    this.handleSignUpOpen = this.handleSignUpOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleLoginOpen(e) {
    e.preventDefault();
    this.setState({open: true, formType: 'Log In'});
  }

  handleSignUpOpen(e) {
    e.preventDefault();
    this.setState({open: true, formType: 'Sign Up'});
  }

  handleClose() {
    this.props.clearErrors();
    this.setState({open: false});
  }

  handleLogin() {
    this.props.login();
  }

  handleDemo() {
    this.props.requestDemoUser();
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
        Log In
        </button>
        <button
          onClick={this.handleSignUpOpen}
        >
        Sign Up
        </button>
        <Modal
          isOpen={this.state.open}
          onClose={this.handleClose}
        >
          <div className='modal-contents'>
            <SessionFormContainer formType={this.state.formType}/>
          </div>

        </Modal>
    	</div>
    );
  }
}

export default SessionLinks;
