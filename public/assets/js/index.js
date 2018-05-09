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

async function register(newUser) {
  return seahorsePost('/api/auth/register', newUser, false);
}

async function login(user) {
  return seahorsePost('/api/auth/login', user, false);
}

const registerForm = document.getElementById('registerForm');
const registerButton = document.getElementById('registerBtn');

registerButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (!registerForm.checkValidity()) {
    return registerForm.reportValidity();
  }

  const newUser = {
    firstName: registerForm.firstName.value,
    lastName: registerForm.lastName.value,
    email: registerForm.email.value,
    password: registerForm.password.value,
  };

  register(newUser).then((auth) => {
    if (auth && auth.auth) {
      registerForm.reset();
      return;
    }

    if (auth.number && auth.number === 409) {
      return alert('User Already Exists');
    }

    return alert('Unknwon Error');

  }).catch((err) => {
    return alert('Unknown Error');
  });
});

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
      loginForm.reset();

      return alert('login complete: cookie created');
    }
    return alert('not authorized');
  }).catch((error) => {
    return alert('unknown error');
  });
});
