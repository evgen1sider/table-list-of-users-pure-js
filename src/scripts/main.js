import { postUser } from '../api/api';
import { appendUsersList } from './append_users';
import { User } from './classes';
import { append, createNode } from './create_elements';

let ifPost = false;

function getUsers() {
  let user = null;

  if (!ifPost) {
    user = addNewUser();
  } else {
    removeFormAnswer();
  }

  if (user) {
    appendUsersList(user);
  } else {
    appendUsersList();
  }
  // eslint-disable-next-line no-console
  console.log(user);
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

    ifPost = false;
  });
}

export function addNewUser() {
  const myForm = document.getElementById('myForm');

  let user = null;

  myForm.addEventListener('submit', (event) => {
    event.preventDefault();

    ifPost = true;

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
    <ul>
      <li>name: ${name}</li>
      <li>username: ${username}</li>
      <li>email: ${email}</li>
      <li>website: ${website}</li>
      <li>address
        <address>
          street: ${newUser.address.street}<br>
          suite: ${newUser.address.suite}<br>
          city: ${newUser.address.city}<br>
          zipcode: ${newUser.address.zipcode}<br>
        </address>
      </li>
      <li>phone: ${newUser.phone}</li>
    </ul>
  `;

    const submit = document.getElementById('add');

    submit.setAttribute('disabled', true);

    append(myForm, ul);

    user = newUser;
    postUser(newUser);
  });

  return user;
}
