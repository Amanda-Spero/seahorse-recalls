

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

  if (registerForm.password.value !== registerForm.verifyPassword.value) {
    return writeRegisterError('Confirmed password does not match.');
  }

  register(newUser).then((auth) => {
    if (auth && auth.auth) {
      registerForm.reset();
      window.location.replace("account");
      return;
    }

    if (auth.number && auth.number === 409) {
      return writeRegisterError('User already exists.');
    }
    return writeRegisterError('Unable to register.')

  }).catch((err) => {
    return writeRegisterError('Unable to register.')
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
      return window.location.replace("account");
    }
    writeLoginError();
  }).catch((error) => {
    writeLoginError();
  });
});

function writeLoginError(){
  const p = document.getElementById("loginErrorMessage");
  p.innerText = "Login Not Valid.";
}

function writeRegisterError(message){
  const p = document.getElementById("registerErrorMessage");
  p.innerText = message;
}