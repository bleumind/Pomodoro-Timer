"use strict";
// Elements
const play = document.querySelector(".resume");
const pause = document.querySelector(".pause");
const restart = document.querySelector(".restart-btn");
const timer = document.querySelector("#timer");
const header = document.querySelector(".heading");
const breakTimer = document.querySelector("#break-timer");
let extraStudyTimer = document.querySelector("#extra-study-timer");
const fadeEffect = document.querySelector(".restart-fade");
const totalTime = document.querySelector("#total-time");

// Progress Timer
let startingMinutes = 25;
let breakMinutes = 5;
let time = (t) => t * 60;
let mainTime = time(startingMinutes);
let breakTime = time(breakMinutes);

let isRunning = false;
let xsIsRunning = false;
let breakIsRunning = false;
let breakIsRunningToggle = 0;

let timerActive;
let breakTimerActive;

let xsTimerActive;
let xsMinuteTime = 0;
let xsTime = 0;


// Updating Every Timer Count
function updateTimer() {


  let minutes = Math.floor(mainTime / 60);
  minutes = minutes >= 10 ? minutes : "0" + minutes;

  let seconds = mainTime % 60;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  
  if (minutes === '00:00' || seconds < 0){
    isRunning = false;
    clearInterval(timerActive);
}
  
  timer.innerHTML = `${minutes}:${seconds}`;
  mainTime--;

  if (Number(minutes) <= 0 && Number(seconds) <= 0) {
    extraStudyTimer.style.display = "block";
    clearInterval(timerActive);
    isRunning = false;
    xsIsRunning = true;
    xsTimerActive = setInterval(updateXStimer, 1000);
    
  }

  if (!isRunning) {
    restart.style.display = "none";
  }
}

function updateXStimer() {
  if (xsTime > 59) {
    xsTime = 0;
    xsMinuteTime++;
  }

  let xsMinutes = xsMinuteTime;
  xsMinutes = xsMinuteTime < 10 ? "0" + xsMinuteTime : xsMinuteTime;

  let xsSeconds = xsTime;

  xsSeconds = xsSeconds < 10 ? "0" + xsSeconds : xsSeconds;
  extraStudyTimer.innerHTML = `Extra Time: +${xsMinutes}:${xsSeconds}`;
  xsTime++;

}

function updateBreakTimer() {
  let minutes = Math.floor(breakTime / 60);
  minutes = minutes >= 10 ?  minutes : "0" + minutes;

  let seconds = breakTime % 60;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  console.log(minutes.length)
  timer.innerHTML = `${minutes}:${seconds}`;
  breakTime--;

  if (minutes === "00" && seconds === "00") {
    clearInterval(breakTimerActive);
    clearInterval(timerActive);
    breakIsRunning = false;
    timer.style.color = "azure";
    extraStudyTimer.innerHTML = "Back To Work~";
    timer.innerHTML = `${
      startingMinutes < 10 ? "0" + startingMinutes : startingMinutes
    }:00`;
    play.style.display = "block";
   
    mainTime = time(startingMinutes);
    updateTimer();
  };


}

// Record Daily Total Progress
let totalHour = 0;
let totalMinute = 0;
let totalSecond = 0;

if (totalMinute >= 60) {
  totalHour++;
  totalMinute = totalMinute % 60;
}

if (totalSecond === 60) {
  totalMinute++;
  totalSecond = totalSecond % 60;
}

// Buttons
window.addEventListener("keydown", function (e) {
  if (e.code == "Space") {
    timingConditions();
  }
});

play.addEventListener("click", timingConditions);

restart.addEventListener("click", function () {
  time = startingMinutes * 60;
  clearInterval(timerActive);

  if (isRunning) {
    isRunning = false;
    updateTimer();
  } else {
    updateTimer();
  }
});

// Function Code For Timing Conditions
function timingConditions() {

  if (isRunning) {
    clearInterval(timerActive);
    isRunning = false;
    play.innerHTML = "Play";
  } else if (!isRunning && !xsIsRunning && !breakIsRunning) {
    timerActive = setInterval(updateTimer, 1000);
    isRunning = true;
    play.innerHTML = "Pause";
  }

  if (xsIsRunning) {
    clearInterval(xsTimerActive);
    totalMinute += startingMinutes;
    xsIsRunning = false;
    totalMinute += xsMinuteTime;
    xsMinuteTime = 0;
    totalSecond += xsTime;
    xsTime = 0;

    extraStudyTimer.innerHTML = "Break-Time! :)";
    extraStudyTimer.style.color = "azure";
    totalTime.innerHTML = `Daily Total Time:   ${totalHour} Hr : ${totalMinute} Min : ${totalSecond} Sec`;
    play.innerHTML = "Play";
    timer.style.color = "rgb(125, 255, 125)";
    
    breakMinutes < 10 && breakMinutes[0] !== "0"
      ? (breakMinutes = "0" + breakMinutes)
      : (breakMinutes = breakMinutes);
    timer.innerHTML = `${breakMinutes}:00`;
  
    breakIsRunning = true;
    // breakTimeIsRunning = setInterval(updateBreakTimer(), 1000);
  }

  // breakIsRunningToggle = breakIsRunningToggle > 0 && breakIsRunningToggle % 2 === 0 ? breakIsRunningToggle++ : breakIsRunningToggle;
  
  if (breakIsRunning) {
    if (breakIsRunningToggle % 2 === 1) {
      breakTimerActive = setInterval(updateBreakTimer, 1000);
      play.style.display = "none";
      breakIsRunningToggle++;
    } else if (breakIsRunningToggle % 2 === 0 && breakIsRunningToggle > 0) {
    breakTime = time(breakMinutes);
    breakIsRunningToggle--;
    }
    if (breakIsRunningToggle === 0) {
      breakIsRunningToggle = breakIsRunningToggle === 0 ? 3 : 4;
    }
  }
};
