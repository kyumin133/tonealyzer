export const fetchPersonality = (userId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/personalities/${userId}`,
  });

};

export const updatePersonality = (userId) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/personalities/${userId}`,
  });

};
