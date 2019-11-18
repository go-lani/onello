import add from './add';
import popup from './popup';
import dragdrop from './dragdrop';
import works from './works';

popup();
dragdrop();
add();
works();

(function () {
  const $timer = document.querySelector('.digital-time');
  const date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  const currentTime = () => {
    $timer.textContent = `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`
  };

  const timer = () => {
    second += 1;
    if (second > 59) {
      second = 0;
      minute += 1;

      if (minute > 59) {
        minute = 0;
        hour += 1;

        if (hour > 23) {
          hour = 0;
        }
      }
    }
    currentTime();
  };

  setInterval(() => {
    timer();
  }, 1000);
}());