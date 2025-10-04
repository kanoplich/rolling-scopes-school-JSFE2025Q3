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

const slider = document.querySelector('#slider');
const leftZone = document.querySelector('#left-zone');
const rightZone = document.querySelector('#right-zone');
const container = document.querySelector('#container');

let animationFrameId = null;
let currentLeft;
let currentSpeed;
let maxLeft = 20;
let minLeft;

function initSlider() {
  currentLeft = (container.clientWidth - slider.scrollWidth) / 2;
  minLeft = container.clientWidth - slider.scrollWidth - 20;
  slider.style.transform = `translateX(${currentLeft}px)`;
}

function startSliding(direction) {
  stopSliding();
  currentSpeed = direction === 'left' ? -5 : 5;
  animateSlider();
}

function stopSliding() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}

function animateSlider() {
  currentLeft += currentSpeed;

  if (currentLeft <= minLeft) {
    currentLeft = minLeft;
    stopSliding();
  }
  if (currentLeft >= maxLeft) {
    currentLeft = maxLeft;
    stopSliding();
  }

  slider.style.transform = `translateX(${currentLeft}px)`;
  animationFrameId = requestAnimationFrame(() => animateSlider());
}

let resizeTimeout;

function handlerResize() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(initSlider, 300);
}

window.addEventListener('load', initSlider);
window.addEventListener('resize', handlerResize);

leftZone.addEventListener('mouseenter', () => startSliding('left'));
rightZone.addEventListener('mouseenter', () => startSliding('right'));

leftZone.addEventListener('mouseleave', stopSliding);
rightZone.addEventListener('mouseleave', stopSliding);

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

      closeAllAccordions();

      if (!isActive) {
        openAccordion(index);
      }
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

// Modal

const cardBtns = document.querySelectorAll('.card__btn');
const modalOverlay = document.querySelector('#modal-overlay');
const modalCloseBtn = document.querySelector('#btn-closed');
const modal = document.querySelector('#modal');

cardBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    modal.classList.remove('modal-closed');
    modalOverlay.classList.remove('modal-closed');
    body.classList.add('modal-open');
  });
});

modalCloseBtn.addEventListener('click', () => {
  modal.classList.add('modal-closed');
  modalOverlay.classList.add('modal-closed');
  body.classList.remove('modal-open');
});

modalOverlay.addEventListener('click', () => {
  modal.classList.add('modal-closed');
  modalOverlay.classList.add('modal-closed');
  body.classList.remove('modal-open');
});
