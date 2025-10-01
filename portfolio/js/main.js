// Burger menu

const burger = document.querySelector('#burger');
const menu = document.querySelector('#mobile-menu');
const links = document.querySelectorAll('.mobile__nav__link');
const logo = document.querySelector('#logo');
const body = document.body;

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  body.classList.toggle('menu-open');
});

menu.addEventListener('click', function (e) {
  if (e.target === this) {
    burger.classList.remove('active');
    body.classList.remove('menu-open');
  }
});

logo.addEventListener('click', () => {
  burger.classList.remove('active');
  body.classList.remove('menu-open');
});

links.forEach((link) => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    body.classList.remove('menu-open');
  });
});
