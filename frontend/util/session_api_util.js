export const login = identity => (
  $.ajax({
    method: 'POST',
    url: '/api/session',
    data: { identity }
  })
);

export const signup = identity => (
  $.ajax({
    method: 'POST',
    url: '/api/identities',
    xhrFields: { withCredentials: true },
    data: { identity }
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
