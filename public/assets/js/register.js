
async function register(newUser) {
  return seahorsePost('/api/auth/register', newUser, false);
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