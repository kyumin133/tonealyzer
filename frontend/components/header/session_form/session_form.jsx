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
		if (this.state.formType === 'login') {
			this.props.login({user});

		}
		else {
			this.props.signup({user});
		}
	}

	navLink() {
		if (this.state.formType === "login") {
			return (
				<div>
					<button
						type="button"
						onClick={this.updateFormType('signup')}
						className="soft-button"
						>
						Sign Up
					</button>
				</div>
			);
		} else {
			return (
				<div>
					<button
						type="button"
						onClick={this.updateFormType('login')}
						className="soft-button"
						>
						Login
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
          <br/>
						<button type="button" onClick={this.handleSubmit}>
		          Login with Google
		        </button>
						<button type="button" onClick={this.handleSubmit}>
		          Login with Facebook
		        </button>
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
					<br/>
          <div className='form-input'>
            <input
							className='f-input'
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.update("password")}
							placeholder="Password..."

            />

          </div>
					<br/>

          <div className='form-submit'>
            <input
              type="submit"
              value={`${this.state.formType}!`}
              onClick={this.handleSubmit}
            />
          </div>

					<h3>Or</h3>
					{this.navLink()}

        </form>



      </div>
    );








  }

}

export default SessionForm;
