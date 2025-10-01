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

// Slider

// Accordions

document.addEventListener('DOMContentLoaded', function () {
  const accordionItems = document.querySelectorAll('.faq__item');
  const KEY = 'activeAccordionIndex';

  function closeAllAccordions() {
    accordionItems.forEach((item) => {
      item.classList.remove('active');
    });
  }

  function openAccordion(index) {
    const item = accordionItems[index];

    item.classList.add('active');
    localStorage.setItem(KEY, index.toString());
  }

  accordionItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      if (isActive) {
        return;
      }

      closeAllAccordions();
      openAccordion(index);
    });
  });

  const savedIndex = localStorage.getItem(KEY);
  if (savedIndex !== null) {
    closeAllAccordions();
    openAccordion(parseInt(savedIndex));
  } else {
    openAccordion(0);
  }
});
