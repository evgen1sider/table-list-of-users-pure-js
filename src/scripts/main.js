import { postUser } from '../api/api';
import { appendUsersList } from './append_users';
import { User } from './classes';
import { createNode } from './create_elements';

function getUsers() {
  removeFormAnswer();
  addNewUser();
  appendUsersList();
};

getUsers();

export function removeFormAnswer() {
  const deleteUl = document.querySelector('.form__answer');
  const reset = document.getElementById('reset');

  if (deleteUl) {
    deleteUl.remove();
  }

  reset.addEventListener('click', (event) => {
    event.preventDefault();

    const submit = document.getElementById('add');

    submit.setAttribute('disabled', false);
  });
}

export function addNewUser() {
  const myForm = document.getElementById('myForm');

  let user = null;

  myForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // eslint-disable-next-line no-undef
    const data = new FormData(event.target);

    const name = data.get('name');
    const username = data.get('username');
    const email = data.get('email');
    const website = data.get('website');

    const newUser = new User(
      name,
      username,
      email,
      website,
      12,
      '0fd549511-000',
      {
        street: 'bakersstreet',
      },
      {
        name: 'LG inc',
      }

    );

    const ul = createNode('ul');

    ul.className = 'form__answer';

    ul.innerHTML = `
    
  `;

    // eslint-disable-next-line no-undef
    alert(`
      sending new user...
        name: ${name}
        username: ${username}
        email: ${email}
        website: ${website}
        phone: ${newUser.phone}

        address :
          street: ${newUser.address.street}
          suite: ${newUser.address.suite}
          city: ${newUser.address.city}
          zipcode: ${newUser.address.zipcode}
    `);

    user = newUser;
    postUser(newUser);
  });

  return user;
}
