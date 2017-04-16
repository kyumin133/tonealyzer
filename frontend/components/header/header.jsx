import React from 'react';
import { hashHistory, Link } from 'react-router';

import PersonalGreeting from './personal_greeting';
import SessionLinks from './session_links';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  renderErrors() {
    let errors = this.props.errors;
    if (errors === undefined || errors.length < 1) {
      return "";
    } else {
      return(
        <ul className="errors">
          {errors.map( (error, idx) => (
            <li key={`error-${idx}`}>
              {error}
            </li>
          ))}
        </ul>
      )
    }
  }

  render() {
    return(
      <div className="header-div">
        <Link onClick={null} to={this.props.currentUser ? "home/" : "/"}><i className="fa fa-lightbulb-o fa-5x header-logo" aria-hidden="true"></i></Link>
        <div className="header-right-icons">
          {this.renderErrors()}
          {
            this.props.currentUser ?
              <PersonalGreeting
                currentUser={this.props.currentUser}
                logout={this.props.logout}
              /> :
              <SessionLinks
                login={this.props.login}
                requestDemoUser={this.props.requestDemoUser}
              />
          }
        </div>
      </div>
    )
  }
}

// const Header = ({currentUser, logout, login, requestDemoUser}) => {
//   return (
//     <div className="header-div">
//       <Link onClick={null} to={currentUser ? "home/" : "/"}><i className="fa fa-lightbulb-o fa-5x header-logo" aria-hidden="true"></i></Link>
//       <div className="header-right-icons">
//         {
//           currentUser ?
//             <PersonalGreeting
//               currentUser={currentUser}
//               logout={logout}
//             /> :
//             <SessionLinks
//               login={login}
//               requestDemoUser={requestDemoUser}
//             />
//         }
//       </div>
//     </div>
//   );
// };

export default Header;
