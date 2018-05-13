async function seahorsePost(uri, payload, secure) {
  const headers = {};
  headers['content-type'] = 'application/json';
  if (secure) {
    headers.Authorization = `Bearer ${'token'}`;
  }

  const ajaxParm = {
    body: JSON.stringify(payload),
    headers,
    method: 'POST',
    redirect: 'follow',
    credentials: 'include',
  };

  return fetch(uri, ajaxParm).then(resp => resp.json());
}



async function login(user) {
  return seahorsePost('/api/auth/login', user, false);
}



const loginForm = document.getElementById('loginForm');
const loginButton = document.getElementById('loginBtn');

loginButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (!loginForm.checkValidity()) {
    return loginForm.reportValidity();
  }

  const user = {
    email: loginForm.email.value,
    password: loginForm.password.value,
  };

  login(user).then((auth) => {
    if (auth && auth.auth) {
      const cookie = `projectAuth=${auth.token};max-age=1800`;
      // document.cookie = cookie;
      return loginForm.reset();
    }
    return alert('not authorized');
  }).catch((error) => {
    return alert('unknown error');
  });
});


function removeCookie(name) {
  document.cookie = `${name} =; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', () => {
  removeCookie('seahorse');
});
