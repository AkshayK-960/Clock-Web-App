function onClockClick() {
    document.getElementById("stopwatch_contents").style="display:none"
    document.getElementById("timer_contents").style="display:none"
    document.getElementById("clock_contents").style="display:block"
    document.getElementById("welcome").style="display:none"
}
function onStopwatchClick() {
    document.getElementById("stopwatch_contents").style="display:block"
    document.getElementById("timer_contents").style="display:none"
    document.getElementById("clock_contents").style="display:none"
    document.getElementById("welcome").style="display:none"
}
function onTimerClick() {
    document.getElementById("stopwatch_contents").style="display:none"
    document.getElementById("timer_contents").style="display:block"
    document.getElementById("clock_contents").style="display:none"
    document.getElementById("welcome").style="display:none"
}
function updateClock() {
    let now = new Date();
    let second = now.getSeconds();
    let minute = now.getMinutes();
    let hour = now.getHours();
    let date = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    document.getElementById("lbl_clock").innerText = (hour + ":" + minute + ":" + second + ",        " + month + "/" + date + "/" + year);

}
setInterval(updateClock, 1000);
// let stopwatchTime = 0;
// function stopwatchStart() {
    
// }