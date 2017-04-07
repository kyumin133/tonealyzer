import { connect } from "react-redux";
import BlurbInput from "./blurb_input";
import { createBlurb } from "../../actions/blurb_actions";


const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    createBlurb: (title, body) => dispatch(createBlurb(title, body))
  });

export default connect(mapStateToProps, mapDispatchToProps)(BlurbInput);
