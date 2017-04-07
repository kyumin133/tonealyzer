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
    data: { identity }
  })
);

export const loginFacebook = () => (
  $.ajax({
    method: 'GET',
    url: 'api/auth/facebook'
  })
);

export const loginGoogle = () => (
  $.ajax({
    method: 'GET',
    url: 'api/auth/google_oauth2'
  })
);
