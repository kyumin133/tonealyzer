import React from 'react';
import { hashHistory, Link } from 'react-router';

import PersonalGreeting from './personal_greeting';
import SessionLinks from './session_links';

const Header = ({currentUser}) => {

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
              currentUser={null}
              logout={null}
            /> :
            <SessionLinks
              login={null}
            />
        }
      </div>
    </div>

  );

};

export default Header;
