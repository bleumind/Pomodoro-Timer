"use strict";
// Elements
const play = document.querySelector(".resume");
const pause = document.querySelector(".pause");
const restart = document.querySelector(".restart");
const timer = document.querySelector("#timer");

// Timer
const startingMinutes = 25;
let time = startingMinutes * 60;
let isRunning = false;
let timerActive;

function updateTimer() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  timer.innerHTML = `${minutes} : ${seconds}`;
  time--;
  if (time === 0) {
    clearInterval(timerActive);
  }
}

// Buttons
document.querySelector(".resume").addEventListener("click", function () {
  if (!isRunning) {
    timerActive = setInterval(updateTimer, 1000);
    isRunning = true;
  }
});

document.querySelector(".pause").addEventListener("click", function () {
  clearInterval(timerActive);
  isRunning = false;
});

document.querySelector(".restart").addEventListener("click", function () {
  time = startingMinutes * 60;
  clearInterval(timerActive);

  if (isRunning) {
    isRunning = false;
    updateTimer();
  } else {
    updateTimer();
  }
});
