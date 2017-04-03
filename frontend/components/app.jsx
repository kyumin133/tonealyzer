import React from 'react';
import { Link, withRouter } from 'react-router';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>
      This is the App component.
    </div>;
  }
};

export default withRouter(App);
