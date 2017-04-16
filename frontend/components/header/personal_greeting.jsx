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
    if (this.props.currentUser.name) {
      return (
        <div className='header-group'>
          <div>
            <button className='soft-title'>{`👤 ${this.props.currentUser.name}`}</button>
          </div>
          <div  className="analysis-link-wrapper">
            <Link to={"newBlurb/"} className="analysis-link">New Analysis</Link>
          </div>
          <button type="button" onClick={this.handleLogout}>
            Logout
          </button>
        </div>
      );
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default PersonalGreeting;
