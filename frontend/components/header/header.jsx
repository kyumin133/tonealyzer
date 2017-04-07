import React from 'react';
import { hashHistory, Link } from 'react-router';

import PersonalGreeting from './personal_greeting';
import SessionLinks from './session_links';

const Header = ({currentUser, logout, login, requestDemoUser}) => {

  return (
    <div className="header-div">
      <Link onClick={null} to={currentUser ? "home/" : "/"}><i className="fa fa-lightbulb-o fa-5x header-logo" aria-hidden="true"></i></Link>
      { currentUser ?
        <div className="header-center">
          <Link to={"newBlurb/"} className="analysis-link">New Analysis</Link>
        </div>
        :
        <div></div>
      }
      <div className="header-right-icons">
        {
          currentUser ?
            <PersonalGreeting
              currentUser={currentUser}
              logout={logout}
            /> :
            <SessionLinks
              login={login}
              requestDemoUser={requestDemoUser}
            />
        }
      </div>
    </div>

  );

};

export default Header;
