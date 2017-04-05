import { connect } from 'react-redux';
import Header from './header';

const mapStateToProps = ({ session }) => ({
  currentUser: session.currentUser
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(requestLogout()),
  login: (user) => dispatch(requestLogin(user)),
  requestDemoUser: () => dispatch(requestDemoUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
