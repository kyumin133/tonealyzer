import { connect } from 'react-redux';
import Header from './header';

const mapStateToProps = () => ({
  currentUser: null
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
