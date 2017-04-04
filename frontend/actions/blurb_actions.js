import * as APIUtil from '../util/blurb_api_util';

export const RECIEVE_BLURB = "RECIEVE_BLURB";
export const RECIEVE_BLURBS = "RECIEVE_BLURBS";


export const createBlurb = (body) => dispatch => (
  APIUtil.createBlurb(body)
  .then((blurb) => dispatch(recieveBlurb(blurb)))
);

export const fetchBlurb = (id) => dispatch => (
  APIUtil.fetchBlurb(id)
  .then((blurb) => dispatch(recieveBlurb(blurb)))
);

export const fetchBlurbs = () => dispatch => (
  APIUtil.fetchBlurbs()
  .then((blurbs) => dispatch(recieveBlurbs(blurbs)))
);




export const recieveBlurb = (blurb) => ({
  type: RECIEVE_BLURB,
  blurb
});

export const recieveBlurbs = (blurbs) => ({
  type: RECIEVE_BLURBS,
  blurbs
});
