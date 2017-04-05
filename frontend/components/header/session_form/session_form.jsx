import React from 'react';
import { Link, withRouter, hashHistory } from 'react-router';


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

	signUpLink(e) {
	  e.preventDefault();
	  const url = `/signup`;
	  hashHistory.push(url);
	}

	logInLink(e) {
	  e.preventDefault();
	  const url = `/login`;
	  hashHistory.push(url);
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
        <form onSubmit={this.handleSubmit}>
          <h1>{`Please ${this.state.formType}`}</h1>
          <br/>
          <h5>{this.renderErrors()}</h5>
          <h3>Username:</h3>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.update("username")}
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.update("password")}
          />
          <input
            type="submit"
            value={`${this.state.formType}!`}
            onClick={this.handleSubmit}
          />

        </form>

      </div>
    );








  }

}

export default withRouter(SessionForm);
