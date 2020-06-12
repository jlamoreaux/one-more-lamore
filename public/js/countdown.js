const dueDate = new Date('Jun 22, 2020 08:00:00').getTime();
const countdownElem = document.querySelector('#countdown');

const x = setInterval(() => {
  const now = new Date().getTime();

  const distance = dueDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownElem.innerHTML = `<div id='days' class='count'>${days} <span class="label">days</span></div> <div class='count' id='hours'>${hours} <span class="label">hours</span></div> <div class='count' id='minutes'>${minutes} <span class="label">minutes</span></div> <div class='count' id='seconds'>${seconds} <span class="label">seconds</span></div>`;
}, 1000);
