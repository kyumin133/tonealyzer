export const fetchPersonality = (userId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/personalities/${userId}`,
  });

};
