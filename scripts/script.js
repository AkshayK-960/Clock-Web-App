function onClockClick() {
    document.getElementById("stopwatch_contents").style.display = "none";
    document.getElementById("timer_contents").style.display = "none";
    document.getElementById("clock_contents").style.display = "block";
    document.getElementById("welcome").style.display = "none";
}

function onStopwatchClick() {
    document.getElementById("stopwatch_contents").style.display = "block";
    document.getElementById("timer_contents").style.display = "none";
    document.getElementById("clock_contents").style.display = "none";
    document.getElementById("welcome").style.display = "none";
}

function onTimerClick() {
    document.getElementById("stopwatch_contents").style.display = "none";
    document.getElementById("timer_contents").style.display = "block";
    document.getElementById("clock_contents").style.display = "none";
    document.getElementById("welcome").style.display = "none";
}

function onTimerStart() {
    calculateTimerSeconds();
}

function updateClock() {
    let now = new Date();
    let second = now.getSeconds().toString().padStart(2, '0');
    let minute = now.getMinutes().toString().padStart(2, '0');
    let hour = now.getHours().toString().padStart(2, '0');
    let date = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();

    document.getElementById("lbl_clock").innerText = hour + ":" + minute + ":" + second;
    document.getElementById("lbl_date").innerText = month + "/" + date + "/" + year;
}
setInterval(updateClock, 1000);

let timerInterval = null;

function calculateTimerSeconds() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    let hours = parseInt(document.getElementById("timerHours").value) || 0;
    let minutes = parseInt(document.getElementById("timerMinutes").value) || 0;
    let seconds = parseInt(document.getElementById("timerSeconds").value) || 0;
    
    let totalSecondsRemaining = (hours * 3600) + (minutes * 60) + seconds;
    let startingTotalSeconds = totalSecondsRemaining;

    if (totalSecondsRemaining <= 0) {
        timerUp();
        return;
    }

    const progressBar = document.getElementById("timer_progress");
    if (progressBar) {
        progressBar.max = startingTotalSeconds;
        progressBar.value = startingTotalSeconds;
    }

    timerInterval = setInterval(function() {
        totalSecondsRemaining--;

        let displayHours = Math.floor(totalSecondsRemaining / 3600);
        let displayMinutes = Math.floor((totalSecondsRemaining % 3600) / 60);
        let displaySeconds = totalSecondsRemaining % 60;

        document.getElementById("timerHours").value = displayHours;
        document.getElementById("timerMinutes").value = displayMinutes;
        document.getElementById("timerSeconds").value = displaySeconds;

        if (progressBar) {
            progressBar.value = totalSecondsRemaining;
        }

        if (totalSecondsRemaining <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            timerUp();
        }
    }, 1000);
}

function timerUp() {
    let sound = document.getElementById("timer_sound");
    if (sound) {
        sound.play().catch(error => {
            console.log("sound not able to play");
        });
    }
}

let stopwatchTotalTime = 0;
let stopwatchStartTime = 0;
let stopwatchRunning = false;
let stopwatchUpdate = null;

function stopwatchTimerStart() {
    if (stopwatchRunning) {
        return;
    }

    stopwatchStartTime = Date.now();
    stopwatchRunning = true;

    if (!stopwatchUpdate) {
        stopwatchUpdate = setInterval(updateStopwatch, 10);
    }
}

function stopwatchTimerStop() {
    if (!stopwatchRunning) {
        return;
    } 
    let stopwatchEndTime = Date.now();
    stopwatchRunning = false;
    stopwatchTotalTime += (stopwatchEndTime - stopwatchStartTime);
    
    if (stopwatchUpdate) {
        clearInterval(stopwatchUpdate);
        stopwatchUpdate = null;
    }
}

function stopwatchTimerReset() {
    stopwatchRunning = false;
    stopwatchTotalTime = 0;
    stopwatchStartTime = 0;
    if (stopwatchUpdate) {
        clearInterval(stopwatchUpdate);
        stopwatchUpdate = null;
    }
    document.getElementById("lbl_stopwatch").innerText = "00:00:00.00";
}

function updateStopwatch() {
    if (!stopwatchRunning) {
        return;
    }
    let elapsedTime = formatMsTime(stopwatchTotalTime + (Date.now() - stopwatchStartTime));
    document.getElementById("lbl_stopwatch").innerText = elapsedTime;
}

function formatMsTime(time) {
    let hours = Math.floor(time / 3600000).toString().padStart(2, '0');
    let minutes = Math.floor((time % 3600000) / 60000).toString().padStart(2, '0');
    let seconds = Math.floor((time % 60000) / 1000).toString().padStart(2, '0');
    let centiseconds = Math.floor((time % 1000) / 10).toString().padStart(2, '0');

    return hours + ":" + minutes + ":" + seconds + "." + centiseconds;
}
