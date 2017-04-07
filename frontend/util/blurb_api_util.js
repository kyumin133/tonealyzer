export const createBlurb = (title, body) => {
  return $.ajax({
    method: 'POST',
    url: '/api/blurbs',
    data: {
      title,
      body
    }
  });
};

export const fetchBlurb = (id) => {
  return $.ajax({
    method: 'GET',
    url: `/api/blurbs/${id}`,
  });
};

export const fetchBlurbs = () => {
  return $.ajax({
    method: 'GET',
    url: `/api/blurbs`,
  });
};
