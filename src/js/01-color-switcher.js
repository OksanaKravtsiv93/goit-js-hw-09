function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const bodyEl = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.style.cssText = `cursor: pointer;`;
stopBtn.style.cssText = `cursor: pointer;`;

startBtn.addEventListener('click', () => {
  bodyEl.style.backgroundColor = getRandomHexColor();
  interval = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  intervalBox = setInterval(() => {
    createBoxes();
  }, 100);
  startBtn.setAttribute('disabled', '');
  stopBtn.removeAttribute('disabled');
});

let interval;
let intervalBox;
stopBtn.addEventListener('click', () => {
  clearInterval(interval);
  clearInterval(intervalBox);
  stopBtn.setAttribute('disabled', '');
  startBtn.removeAttribute('disabled');
});
