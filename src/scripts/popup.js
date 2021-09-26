// import { append, createNode } from './create_elements';

import { removeUserDetails } from './append_users';

function addPopupLink() {
  const links = document.querySelectorAll('.popup-link');

  return links;
}

const popupLinks = addPopupLink();
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

// eslint-disable-next-line no-console
// console.log('this popup, user');

let unlock = true;

const timeout = 800;

function getLink(link) {
  if (link.length > 0) {
    const popupLink = link;

    popupLink.addEventListener('click', (event) => {
      const popupName = popupLinks.getAttribute('href').replace('#', '');
      const currentPopup = document.getElementById(popupName);

      popupOpen(currentPopup);
      event.preventDefault();
    });
  }
}

if (popupLinks.length > 0) {
  for (let i = 0; i < popupLinks.length; i++) {
    getLink(popupLinks[i]);
  }
}

const popupCloseIcons = document.querySelectorAll('.close-popup');

if (popupCloseIcons.length > 0) {
  for (let i = 0; i < popupCloseIcons.length; i++) {
    const el = popupCloseIcons[i];

    el.addEventListener('click', (event) => {
      popupClose(el.closest('.popup'));
      event.preventDefault();
    });
  }
}

export function popupOpen(currentPopup) {
  if (currentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');

    // eslint-disable-next-line no-console
    console.log('clicked open', currentPopup);

    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }

    currentPopup.classList.add('open');

    currentPopup.addEventListener('click', (event) => {
      if (!event.target.closest('.popup__content')) {
        popupClose(event.target.closest('.popup'));
      }
    });
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open');

    if (doUnlock) {
      bodyUnLock();
    }
    removeUserDetails();
  }
}

function bodyLock() {
  const lockPaddingValue = window.innerWidth
    - document.querySelector('.wrapper').offsetWidth + 'px';

  if (lockPadding.length > 0) {
    for (let i = 0; i < lockPadding.length; i++) {
      const el = lockPadding[i];

      el.style.paddingRight = lockPaddingValue;
    }
  }

  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');

  unlock = false;

  setTimeout(() => {
    unlock = true;
  }, timeout);
}

function bodyUnLock() {
  setTimeout(() => {
    for (let i = 0; i < lockPadding.length; i++) {
      const el = lockPadding[i];

      el.style.paddingRight = '0px';
    }

    body.style.paddingRight = '0px';
    body.classList.remove('lock');
  }, timeout);

  unlock = false;

  setTimeout(() => {
    unlock = true;
  }, timeout);
}

document.addEventListener('keydown', (event) => {
  if (event.which === 27) {
    const popupActive = document.querySelector('.popup.open');

    popupClose(popupActive);
  }
});

(function() {
  // eslint-disable-next-line no-undef
  if (!Element.prototype.closest) {
    // eslint-disable-next-line no-undef
    Element.prototype.closest = function(css) {
      // eslint-disable-next-line no-var
      var node = this;

      while (node) {
        if (node.matches(css)) {
          return node;
        } else {
          node = node.parentElement;
        }
      }

      return null;
    };
  }
})();

(function() {
  // eslint-disable-next-line no-undef
  if (!Element.prototype.matches) {
    // eslint-disable-next-line no-undef
    Element.prototype.matches = Element.prototype.matchesSelector
      // eslint-disable-next-line no-undef
      || Element.prototype.webkitMatchesSelector
      // eslint-disable-next-line no-undef
      || Element.prototype.mozMatchesSelector
      // eslint-disable-next-line no-undef
      || Element.prototype.msMatchesSelector;
  }
})();
