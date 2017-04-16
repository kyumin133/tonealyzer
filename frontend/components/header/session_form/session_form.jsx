import React from 'react';
import { Link, hashHistory } from 'react-router';


class SessionForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			formType: this.props.formType
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.updateFormType = this.updateFormType.bind(this);
	}

	componentDidUpdate() {
		this.redirectIfLoggedIn();
	}

	redirectIfLoggedIn() {
		if (this.props.loggedIn) {
			this.props.router.push("/");
		}
	}

	update(field) {
		return e => this.setState({
			[field]: e.currentTarget.value
		});
	}

	updateFormType(formType) {
		return e => this.setState({
			formType: formType
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const user = this.state;
		if (this.state.formType === 'Log In') {
			this.props.login({user});
			this.handleIdentitySubmit();
		}
		else {
			this.props.signup({user});
			this.handleIdentitySignUp();
		}
	}

	handleFacebookSubmit(e) {
		e.preventDefault();
		window.location = "/api/auth/facebook";
	}

	handleGoogleSubmit(e) {
		e.preventDefault();
		window.location = "/api/auth/google_oauth2";
	}

	handleLinkedinSubmit(e) {
		e.preventDefault();
		window.location = "/api/auth/linkedin";
	}

	handleIdentitySubmit() {
		window.location = "/api/auth/identity/callback";
	}

	handleIdentitySignUp() {
		window.location = "api/auth/identity/register/callback";
	}

	navLink() {
		if (this.state.formType === "Log In") {
			return (
				<div>
					<button
						type="button"
						onClick={this.updateFormType('Sign Up')}
						className="soft-button">
						Sign Up
					</button>
				</div>
			);
		} else {
			return (
				<div>
					<button
						type="button"
						onClick={this.updateFormType('Log In')}
						className="soft-button">
						Log In
					</button>
				</div>
			);
		}
	}

	renderErrors() {
		if (this.props.errors.length > 0) {
			return(
				<ul className="errors">
					{this.props.errors.map((error, i) => (
						<li className="err" key={`error-${i}`}>
							{error}
						</li>
					))}
				</ul>
			);
		} else {
			return "";
		}
	}

	render() {
		return (
      <div>
        <form onSubmit={this.handleSubmit} className='session-form'>
          <h1>{`Please ${this.state.formType}`}</h1>
					<div className="third-party-login-wrapper">
						<button type="button" className="third-party-login" onClick={this.handleGoogleSubmit}>
		          <img src="assets/google1.png"></img>
		        </button>
						<button type="button" className="third-party-login" onClick={this.handleFacebookSubmit}>
		          <img src="assets/facebook.png"></img>
		        </button>
						<button type="button" className="third-party-login" onClick={this.handleLinkedinSubmit}>
		          <img src="assets/linkedin1.png"></img>
		        </button>
					</div>
          {this.renderErrors()}
          <div className='form-input'>
            <input
							className='f-input'
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.update("username")}
							placeholder="Username..."
            />
          </div>
          <div className='form-input'>
            <input
							className='f-input'
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.update("password")}
							placeholder="Password..." />
          </div>
          <div className='form-submit'>
            <input
              type="submit"
              value={this.state.formType}
              onClick={this.handleSubmit} />
          </div>

					<h3>Or</h3>

					{this.navLink()}
        </form>

      </div>
    );
  }
}

export default SessionForm;
