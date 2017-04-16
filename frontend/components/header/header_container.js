import { connect } from 'react-redux';
import { requestLogout, requestLogin, requestDemoUser, clearErrors } from "../../actions/session_actions";
import Header from './header';

const mapStateToProps = ({ session }) => {
  return({
    errors: session.errors,
    currentUser: session.currentUser
  })
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(requestLogout()),
  login: (user) => dispatch(requestLogin(user)),
  requestDemoUser: () => dispatch(requestDemoUser()),
  clearErrors: () => dispatch(clearErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
