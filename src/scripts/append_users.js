import { createNode, append } from './create_elements.js';
import { loadUsers } from '../api/api.js';
import { User } from './classes.js';
import { popupOpen } from './popup.js';
import { sortButton, sortingBy } from './sorting.js';

const table = document.getElementById('users');

const sortByNameButton = sortButton('name');
const sortByUsernameButton = sortButton('username');
const sortByEmailButton = sortButton('email');
const sortByWebsiteButton = sortButton('website');
let sortBy = '';

let ifSortByName = false;
let ifSortByUsername = false;
let ifSortByEmail = false;
let ifSortByWebsite = false;

export function appendUsersList(newUser) {
  if (!ifSortByName) {
    sortByNameButton.addEventListener('click', event => {
      event.preventDefault();
      sortBy = 'name';
      ifSortByName = true;
      ifSortByUsername = false;
      ifSortByEmail = false;
      ifSortByWebsite = false;

      removeTableRow();

      loadUsers()
        .then(data => {
          data.sort(sortingBy(sortBy));

          return data.map(user => {
            createTableRow(user);
          });
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error);
        });
    });
  }

  if (!ifSortByUsername) {
    sortByUsernameButton.addEventListener('click', event => {
      sortBy = 'username';

      ifSortByName = false;
      ifSortByUsername = true;
      ifSortByEmail = false;
      ifSortByWebsite = false;

      removeTableRow();

      loadUsers()
        .then(data => {
          data.sort(sortingBy(sortBy));

          return data.map(user => {
            createTableRow(user);
          });
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error);
        });
    });
  }

  if (!ifSortByEmail) {
    sortByEmailButton.addEventListener('click', event => {
      sortBy = 'email';

      ifSortByName = false;
      ifSortByUsername = false;
      ifSortByEmail = true;
      ifSortByWebsite = false;

      removeTableRow();

      loadUsers()
        .then(data => {
          data.sort(sortingBy(sortBy));

          return data.map(user => {
            createTableRow(user);
          });
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error);
        });
    });
  }

  if (!ifSortByWebsite) {
    sortByWebsiteButton.addEventListener('click', event => {
      sortBy = 'website';

      ifSortByName = false;
      ifSortByUsername = false;
      ifSortByEmail = false;
      ifSortByWebsite = true;

      removeTableRow();

      loadUsers()
        .then(data => {
          data.sort(sortingBy(sortBy));

          return data.map(user => {
            createTableRow(user);
          });
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error);
        });
    });
  }

  if (sortBy === '') {
    loadUsers()
      .then(data => {
        return data.map(user => {
          createTableRow(user);
        });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }

  if (newUser) {
    loadUsers()
      .then(data => {
        data.push(newUser);

        return data.map(user => {
          createTableRow(user);
        });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }
}

function adTableElement(value) {
  const span = createNode('span');

  span.innerHTML = value;

  const td = createNode('td');

  append(td, span);

  return td;
}

function addUserDetails(user) {
  const {
    name,
    username,
    email,
    website,
    phone,
    address,
  } = user;
  const title = document.querySelector('.popup__title');
  const popupContent = document.querySelector('.popup__text');

  const h4 = createNode('h4');
  const ul = createNode('ul');

  h4.className = 'popup__title-head';
  ul.className = 'popup__list';

  ul.innerHTML = `
    <ul>
      <li>name: ${name}</li>
      <li>username: ${username}</li>
      <li>email: ${email}</li>
      <li>website: ${website}</li>
      <li>address
        <address>
          street: ${address.street}<br>
          suite: ${address.suite}<br>
          city: ${address.city}<br>
          zipcode: ${address.zipcode}<br>
        </address>
      </li>
      <li>phone: ${phone}</li>
    </ul>
  `;
  h4.innerHTML = name;

  append(title, h4);
  append(popupContent, ul);
}

export function removeUserDetails() {
  const title = document.querySelector('.popup__title-head');
  const ul = document.querySelector('.popup__list');

  title.remove();
  ul.remove();
}

function createTableRow(user) {
  const currentUser = new User(
    user.name,
    user.username,
    user.email,
    user.website,
    user.id,
    user.phone,
    user.address,
    user.company,
  );
  const userName = adTableElement(currentUser.name);
  const userUsername = adTableElement(currentUser.username);
  const userEmail = adTableElement(currentUser.email);
  const userWebsite = adTableElement(currentUser.website);
  const tr = createNode('tr');
  const td = createNode('td');
  const link = createNode('a');

  link.innerHTML = 'details';
  link.setAttribute('href', '#popup');
  tr.className = 'table__item';
  link.classList.add('popup-link');
  userName.className = 'small';
  userUsername.className = 'tablet';
  userEmail.className = 'medium';
  userWebsite.className = 'large';

  link.addEventListener('click', (event) => {
    const popupName = link.getAttribute('href').replace('#', '');
    const currentPopup = document.getElementById(popupName);

    addUserDetails(currentUser);

    popupOpen(currentPopup);

    event.preventDefault();
  });

  append(td, link);

  append(tr, userName);
  append(tr, userUsername);
  append(tr, userEmail);
  append(tr, userWebsite);
  append(tr, td);
  append(table, tr);
}

function removeTableRow() {
  const trDelete = document.querySelectorAll('.table__item');

  trDelete.forEach(el => {
    el.remove();
  });
}
