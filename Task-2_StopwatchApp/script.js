let startTime,
  updatedTime,
  difference,
  tInterval,
  running = false;
let display = document.getElementById("display");
let startBtn = document.getElementById("start");
let pauseBtn = document.getElementById("pause");
let resumeBtn = document.getElementById("resume");
let resetBtn = document.getElementById("reset");
let lapBtn = document.getElementById("lap");
let lapList = document.getElementById("lap-list");

pauseBtn.style.display = "none";
resumeBtn.style.display = "none";

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resumeBtn.addEventListener("click", resumeTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);

function startTimer() {
  if (!running) {
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1000);
    running = true;
    startBtn.style.display = "none";
    pauseBtn.style.display = "inline-block";
  }
}

function pauseTimer() {
  if (running) {
    clearInterval(tInterval);
    difference = new Date().getTime() - startTime;
    running = false;
    pauseBtn.style.display = "none";
    resumeBtn.style.display = "inline-block";
  }
}

function resumeTimer() {
  if (!running) {
    startTime = new Date().getTime() - difference;
    tInterval = setInterval(getShowTime, 1000);
    running = true;
    resumeBtn.style.display = "none";
    pauseBtn.style.display = "inline-block";
  }
}

function resetTimer() {
  clearInterval(tInterval);
  running = false;
  display.innerHTML = "00:00:00";
  pauseBtn.style.display = "none";
  resumeBtn.style.display = "none";
  startBtn.style.display = "inline-block";
  lapList.innerHTML = "";
}

function getShowTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  let hours = Math.floor(difference / (1000 * 60 * 60));
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);

  display.innerHTML =
    (hours < 10 ? "0" + hours : hours) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds);
}

function recordLap() {
  if (running) {
    const lapTime = display.innerHTML;
    const li = document.createElement("li");
    li.textContent = lapTime;
    lapList.appendChild(li);
  }
}
