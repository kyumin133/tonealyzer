import { connect } from 'react-redux';
// import { login, logout, signup } from '../../actions/session_actions';
import SessionForm from './session_form';


const mapStateToProps = ({ session }, {formType}) => ({
  loggedIn: Boolean(session.currentUser),
  errors: session.errors,
  formType
});

const mapDispatchToProps = (dispatch, { loginOrSignUp }) => {
  // const processForm = (loginOrSignUp === 'login') ? login : signup;

  return {
    login: user => dispatch(login(user)),
    signup: user => dispatch(signup(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
