function onClockClick() {
    alert("Clock Clicked");
}
function onStopwatchClick() {
    alert("Stopwatch Clicked");
}
function onTimerClick() {
    alert("Timer Clicked");
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