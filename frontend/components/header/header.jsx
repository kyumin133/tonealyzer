import React from 'react';
import { hashHistory, Link } from 'react-router';

import PersonalGreeting from './personal_greeting';
import SessionLinks from './session_links';

const Header = ({currentUser, logout, login, requestDemoUser}) => {

  return (
    <div className="header-div">
      <img
        className='header-logo'

        alt="Tonealyzer"
        onClick={null}
      />
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
