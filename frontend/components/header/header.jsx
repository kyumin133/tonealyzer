import React from 'react';
import { hashHistory, Link } from 'react-router';

import PersonalGreeting from './personal_greeting';
import SessionLinks from './session_links';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="header-div">
        <Link onClick={null} to={this.props.currentUser ? "home/" : "/"}><i className="fa fa-lightbulb-o fa-5x header-logo" aria-hidden="true"></i></Link>
        <div className="header-right-icons">
          {
            this.props.currentUser ?
              <PersonalGreeting
                currentUser={this.props.currentUser}
                logout={this.props.logout}
              /> :
              <SessionLinks
                login={this.props.login}
                requestDemoUser={this.props.requestDemoUser}
                clearErrors={this.props.clearErrors}
              />
          }
        </div>
      </div>
    )
  }
}

export default Header;
