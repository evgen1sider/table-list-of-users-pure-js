import { createNode } from './create_elements';

export function sortButton(value) {
  const name = document.getElementById(value);
  const a = createNode('a');

  a.className = 'table__sort-button';
  a.setAttribute('href', '#users');
  a.innerHTML = value;

  name.append(a);

  return name;
};

const sortByName = (firstUser, secondUser) => {
  return firstUser.name.localeCompare(secondUser.name);
};

const sortByUsername = (firstUser, secondUser) => {
  return firstUser.username.localeCompare(secondUser.username);
};

const sortByUserEmail = (firstUser, secondUser) => {
  return firstUser.email.localeCompare(secondUser.email);
};

const sortByUserWebsite = (firstUser, secondUser) => {
  return firstUser.website.localeCompare(secondUser.website);
};

const sortByUserId = (firstUser, secondUser) => {
  return firstUser.id - secondUser.id;
};

export const sortingBy = (sortBy = 'id') => {
  switch (sortBy) {
    case 'name':
      return sortByName;
    case 'username':
      return sortByUsername;
    case 'email':
      return sortByUserEmail;
    case 'website':
      return sortByUserWebsite;
    default:
      return sortByUserId;
  }
};
