import React from 'react';
import { Link } from "react-router";

class PersonalGreeting extends React.Component {

  constructor(props) {
    super(props);
    this.handleLogout= this.handleLogout.bind(this);

  }

  handleLogout() {
    this.props.logout();
  }

  render() {

    return (
    	<div className='header-group'>        
        <div>
          {`Hi ${this.props.currentUser.name}!`}
        </div>
        <button type="button" onClick={this.handleLogout}>
          Logout
        </button>
    	</div>
    );
  }
}

export default PersonalGreeting;
