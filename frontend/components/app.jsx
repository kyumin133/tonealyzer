import React from 'react';
import { Link, withRouter } from 'react-router';

import HeaderContainer from './header/header_container';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <HeaderContainer />
        { this.props.children }
      </div>
    );
  }

}

export default App;
