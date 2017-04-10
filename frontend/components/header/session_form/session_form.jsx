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
		//TODO i don't think we need to bind these
		// this.handleGoogleSubmit = this.handleGoogleSubmit.bind(this);
		// this.handleFacebookSubmit = this.handleFacebookSubmit.bind(this);
		// this.handleIdentitySubmit = this.handleIdentitySubmit.bind(this);
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
			// debugger;
			this.props.login({user});
			this.handleIdentitySubmit();
		}
		else {
			// debugger;
			this.props.signup({user});
			this.handleIdentitySignUp();
		}
	}

	handleFacebookSubmit(e) {
		e.preventDefault();
		// this.props.googleAction();
		window.location = "/api/auth/facebook";
	}

	handleGoogleSubmit(e) {
		e.preventDefault();
		// this.props.googleAction();
		window.location = "/api/auth/google_oauth2";
	}

	handleIdentitySubmit() {
		// e.preventDefault();
		// debugger;
		window.location = "/api/auth/identity/callback";
	}

	handleIdentitySignUp() {
		// e.preventDefault();
		// window.location = "api/auth/identity/register";
		// debugger;
		window.location = "api/auth/identity/register";
	}

	// navLink() {
	// 	if (this.state.loginOrSignUp === "login") {
	// 		return (
	// 			<div>
	// 				<FlatButton
	// 					onClick={this.updateFormType('signup')}
	// 					label="Sign Up"
	// 					/>
	// 			</div>
	// 		);
	// 	} else {
	// 		return (
	// 			<div>
	// 				<FlatButton
	// 					onClick={this.updateFormType('login')}
	// 					label="Login"
	// 					/>
	// 			</div>
	// 		);
	// 	}
	// }

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
						onClick={this.updateFormType('Login')}
						className="soft-button">
						Log In
					</button>
				</div>
			);
		}
	}

	renderErrors() {
		return(
			<ul>
				{this.props.errors.map((error, i) => (
					<li className="err" key={`error-${i}`}>
						{error}
					</li>
				))}
			</ul>
		);
	}

	render() {

		return (

      <div>
        <form onSubmit={this.handleSubmit} className='session-form'>
          <h1>{`Please ${this.state.formType}`}</h1>
					<div className="third-party-login-wrapper">
						<button type="button" className="third-party-login" onClick={this.handleGoogleSubmit}>
		          <img src="assets/google.png"></img>
		        </button>
						<button type="button" className="third-party-login" onClick={this.handleFacebookSubmit}>
		          <img src="assets/facebook.png"></img>
		        </button>
					</div>
          <h5>{this.renderErrors()}</h5>
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
