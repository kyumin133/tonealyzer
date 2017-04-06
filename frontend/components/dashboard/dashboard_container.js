import { connect } from "react-redux";
import { fetchBlurbs } from "../../actions/blurb_actions";
import { fetchPersonality, updatePersonality } from "../../actions/personality_actions";
import Dashboard from "./dashboard";

const mapStateToProps = (state, ownProps) => {
  return {
    blurbs: state.blurbs,
    personality: state.personality
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchBlurbs: () => (dispatch(fetchBlurbs())),
    fetchPersonality: () => (dispatch(fetchPersonality())),
    updatePersonality: () => (dispatch(updatePersonality()))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
