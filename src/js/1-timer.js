import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
  dateInput: document.querySelector('.date-input'),
  dateBtn: document.querySelector('.date-btn'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let intervalId = null;
let userSelectedDate = null;

refs.dateBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selected = selectedDates[0];

    if (selected <= Date.now()) {
      iziToast.warning({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      refs.dateBtn.disabled = true;
    } else {
      userSelectedDate = selected;
      refs.dateBtn.disabled = false;
    }
  },
};

flatpickr(refs.dateInput, options);

const onStartBtnClick = e => {
  refs.dateInput.disabled = true;
  refs.dateBtn.disabled = true;

  intervalId = setInterval(() => {
    const diff = userSelectedDate - Date.now();
    if (diff <= 0) {
      clearInterval(intervalId);
      updateTimer(0);
      refs.dateInput.disabled = false;
      return;
    }
    updateTimer(diff);
  }, 1000);
};

function updateTimer(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  refs.days.textContent = pad(days);
  refs.hours.textContent = pad(hours);
  refs.minutes.textContent = pad(minutes);
  refs.seconds.textContent = pad(seconds);
}

function pad(value) {
  return String(value).padStart(2, '0');
}

refs.dateBtn.addEventListener('click', onStartBtnClick);

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
