import { connect } from 'react-redux';
import { requestLogin, requestSignup, requestGoogleLogin, clearErrors } from '../../../actions/session_actions';
import SessionForm from './session_form';


const mapStateToProps = ({ session }, {formType}) => ({
  loggedIn: Boolean(session.currentUser),
  errors: session.errors,
  formType
});

const mapDispatchToProps = (dispatch, { formType }) => {
  return {
    login: user => dispatch(requestLogin(user)),
    signup: user => dispatch(requestSignup(user)),
    googleAction: () => dispatch(requestGoogleLogin()),
    clearErrors: () => dispatch(clearErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
