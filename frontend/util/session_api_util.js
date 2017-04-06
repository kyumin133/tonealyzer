export const login = identity => {
  // debugger;
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




/// hopefully can use react-redux-oauth2 package for this. npm install!

// export const loginFacebook = user => (
//   $.ajax({
//     method: 'GET',
//     url: 'api/auth/facebook',
//     data: { user }
//   })
// );
//
// export const loginGoogle = user => (
//   $.ajax({
//     method: 'GET',
//     url: 'api/auth/google_oauth2',
//     data: { user }
//   })
// );
