import * as APIUtil from '../util/personality_api_util';

export const RECEIVE_PERSONALITY = "RECEIVE_PERSONALITY";

export const updatePersonality = (id) => dispatch => (
  APIUtil.updatePersonality(id)
  .then((personality) => dispatch(receivePersonality(personality)))
);

export const fetchPersonality = (id) => dispatch => (
  APIUtil.fetchPersonality(id)
  .then((personality) => dispatch(receivePersonality(personality)))
);

export const receivePersonality = (personality) => ({
  type: RECEIVE_PERSONALITY,
  personality
});
