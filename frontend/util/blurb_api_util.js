export const createBlurb = (body) => {
  return $.ajax({
    method: 'POST',
    url: '/api/blurbs',
    data: {
      body
    }
  });

};
