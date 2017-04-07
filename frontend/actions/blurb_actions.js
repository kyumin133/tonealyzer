import * as APIUtil from '../util/blurb_api_util';

export const RECEIVE_BLURB = "RECEIVE_BLURB";
export const RECEIVE_BLURBS = "RECEIVE_BLURBS";


export const createBlurb = (body) => dispatch => (
  APIUtil.createBlurb(body)
  .then((blurb) => dispatch(receiveBlurb(blurb)))
);

export const fetchBlurb = (id) => dispatch => (
  APIUtil.fetchBlurb(id)
  .then((blurb) => dispatch(receiveBlurb(blurb)))
);

export const fetchBlurbs = () => dispatch => (
  APIUtil.fetchBlurbs()
  .then((blurbs) => dispatch(receiveBlurbs(blurbs)))
);


export const receiveBlurb = (blurb) => ({
  type: RECEIVE_BLURB,
  blurb
});

export const receiveBlurbs = (blurbs) => ({
  type: RECEIVE_BLURBS,
  blurbs
});
