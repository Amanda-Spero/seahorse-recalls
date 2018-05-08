const registerForm = document.getElementById('registerForm');
const registerButton = document.getElementById('registerBtn');

async function register(newUser) {
  const url = '/api/auth/register';

  return fetch(url, {
    body: JSON.stringify(newUser), // must match 'Content-Type' header
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    redirect: 'follow',
    referrer: 'no-referrer',
  }).then(response => response.json());
}

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
      const cookie = `projectAuth=${auth.token};max-age=1800`;
      document.cookie = cookie;
      registerForm.reset();

      alert('rester complete: cookie created');
    }
  });
});
