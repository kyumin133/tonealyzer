export const login = user => (
  $.ajax({
    method: 'POST',
    url: '/api/session',
    data: { user }
  })
);

export const logout = () => (
  $.ajax({
    method: 'DELETE',
    url: '/api/session'
  })
);

export const loginDemoUser = () => (
  $.ajax({
    method: 'POST',
    url: '/api/session',
    data: {identity: {email: "email@gmail.com", password: "secretpass123"}}
  })
);
