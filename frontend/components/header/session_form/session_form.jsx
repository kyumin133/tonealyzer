import React from 'react';
import { Link } from 'react-router';


class SessionForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			formType: this.props.formType
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleGoogleSubmit = this.handleGoogleSubmit.bind(this);
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
			loginOrSignUp: formType
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const user = this.state;
		if (this.state.formType === 'login') {
			this.props.login({user});

		}
		else {
			this.props.signup({user});
		}
	}

	handleGoogleSubmit(e) {
		e.preventDefault();
		this.props.googleAction();
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
          <br/>
						<button type="button" onClick={this.handleGoogleSubmit}>
		          Login with Google
		        </button>
						<button type="button" onClick={this.handleSubmit}>
		          Login with Facebook
		        </button>
          <h5>{this.renderErrors()}</h5>
          <div className='form-input'>
            <h3>Username:</h3>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.update("username")}
            />
          </div>
          <div className='form-input'>
            <h3>Password:</h3>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.update("password")}
            />
          </div>
          <div className='form-submit'>
            <input
              type="submit"
              value={`${this.state.formType}!`}
              onClick={this.handleSubmit}
            />
          </div>

        </form>

      </div>
    );








  }

}

export default SessionForm;
