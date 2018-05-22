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

function removeCookie(name) {
  document.cookie = `${name} =; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

const navBar = document.getElementById('navbar');
navBar.addEventListener("click", (event) => {
  const action = event.target.getAttribute('data-action');
  if (action === 'logout') {
    removeCookie('seahorse');
    location.replace('/');
  }
});