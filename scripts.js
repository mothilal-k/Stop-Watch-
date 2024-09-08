let startStopBtn = document.getElementById('startStopBtn');
let lapBtn = document.getElementById('lapBtn');
let resetBtn = document.getElementById('resetBtn');
let display = document.getElementById('display');
let lapsList = document.getElementById('lapsList');

let timerInterval;
let startTime;
let elapsedTime = 0;
let running = false;

function updateDisplay() {
    let time = Date.now() - startTime + elapsedTime;
    let milliseconds = parseInt((time % 1000) / 100);
    let seconds = parseInt((time / 1000) % 60);
    let minutes = parseInt((time / (1000 * 60)) % 60);
    let hours = parseInt((time / (1000 * 60 * 60)) % 24);

    milliseconds = milliseconds.toString().padStart(1, '0');
    seconds = seconds.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    hours = hours.toString().padStart(2, '0');

    display.innerText = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function startStop() {
    if (running) {
        clearInterval(timerInterval);
        elapsedTime += Date.now() - startTime;
        startStopBtn.innerText = 'Start';
        startStopBtn.classList.remove('stop');
    } else {
        startTime = Date.now();
        timerInterval = setInterval(updateDisplay, 100);
        startStopBtn.innerText = 'Stop';
        startStopBtn.classList.add('stop');
    }
    running = !running;
}

function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    running = false;
    display.innerText = '00:00:00.0';
    lapsList.innerHTML = '';
    startStopBtn.innerText = 'Start';
    startStopBtn.classList.remove('stop');
}

function lap() {
    if (running) {
        let lapTime = display.innerText;
        let lapElement = document.createElement('li');
        lapElement.innerText = lapTime;
        lapsList.appendChild(lapElement);
    }
}

startStopBtn.addEventListener('click', startStop);
lapBtn.addEventListener('click', lap);
resetBtn.addEventListener('click', reset);
