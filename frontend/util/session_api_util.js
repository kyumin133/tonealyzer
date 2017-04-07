export const login = identity => {
  return($.ajax({
    method: 'POST',
    url: '/api/session',
    data: { identity }
  }))
};

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

export const signup = identity => (
  $.ajax({
    method: 'POST',
    url: '/api/identities',
    xhrFields: { withCredentials: true },
    data: { identity }
  })
);

export const loginFacebook = () => (
  $.ajax({
    method: 'GET',
    url: '/api/facebook'
  })
);

export const loginGoogle = () => (
  $.ajax({
    method: 'GET',
    url: '/api/google'
  })
);
