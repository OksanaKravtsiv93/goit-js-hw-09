import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

document.addEventListener('DOMContentLoaded', () => {
  const picker = flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];

      if (selectedDate < new Date()) {
        window.alert('Будь ласка, виберіть дату у майбутньому');
        document.querySelector('[data-start]').disabled = true;
      } else {
        document.querySelector('[data-start]').disabled = false;
      }
    },
  });

  const startBtn = document.querySelector('[data-start]');
  const input = document.querySelector('#datetime-picker input');

  startBtn.disabled = true;

  startBtn.addEventListener('click', () => {
    const selectedDate = picker.selectedDates[0];
    const countdownElement = document.querySelector('.timer');

    const countdownInterval = setInterval(() => {
      const currentDate = new Date();
      const remainingTime = selectedDate - currentDate;

      if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        countdownElement.style.display = 'none';
        startBtn.disabled = true;
        input.disabled = false;
        return;
      }

      const { days, hours, minutes, seconds } = convertMs(remainingTime);

      document.querySelector('[data-days]').textContent = addLeadingZero(days);
      document.querySelector('[data-hours]').textContent =
        addLeadingZero(hours);
      document.querySelector('[data-minutes]').textContent =
        addLeadingZero(minutes);
      document.querySelector('[data-seconds]').textContent =
        addLeadingZero(seconds);
    }, 1000);
  });

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }
});
