const BASE_URL = 'https://jsonplaceholder.typicode.com';
const API_URL = BASE_URL + '/users';

export function loadUsers() {
  // eslint-disable-next-line no-undef
  return fetch(API_URL)
    .then(response => response.json());
};

export function postUser(user) {
  // eslint-disable-next-line no-undef
  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({
      user,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    // eslint-disable-next-line no-console
    .then((json) => console.log(json));
}
