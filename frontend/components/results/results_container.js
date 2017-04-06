import { connect } from "react-redux";
import { fetchBlurb, fetchBlurbs } from "../../actions/blurb_actions";

import Results from "./results";

const mapStateToProps = (state, ownProps) => {
  return {
    blurb: state.blurbs[ownProps.params.blurbId]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchBlurb: (id) => (dispatch(fetchBlurb(id)))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);
