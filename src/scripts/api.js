const BASE_URL = 'https://jsonplaceholder.typicode.com';
const API_URL = BASE_URL + '/users';

export function loadUsers() {
  // eslint-disable-next-line no-undef
  return fetch(API_URL)
    .then(response => response.json());
};
