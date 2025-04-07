var work_duration;
var rest_duration;
var round_count;

var timeLeft = work_duration*10; 
var roundsLeft = round_count
var interval = 'work';
var started = false;

function intervalTimer() {
    oneDing();
    let curdur = work_duration*10
    const timerLogic = setInterval(() => {
        formatDuration(timeLeft);
        if (started) {
            timeLeft -= 1;
            let delta = (timeLeft/curdur).toFixed(3)
            if (interval == 'work') {
                setTimeout(function() { cm.circleProgress('value', 1-delta); }, 0)}
            else {
                setTimeout(function() { cm.circleProgress('value', delta); }, 0)}
            
            if (timeLeft < 0) {
                if (interval == 'work' && roundsLeft != 1) { 
                    threeDing();
                    timeLeft = rest_duration*10;
                    curdur = timeLeft;
                    interval = 'rest';
                }
                else if (interval == 'rest' && rest_duration >= 0) {
                    oneDing();
                    timeLeft = work_duration*10;
                    curdur = timeLeft;
                    roundsLeft -= 1;
                    interval = 'work';
                }
                else if (interval == 'work' && roundsLeft <= 1) {
                    threeDing();
                    started = false;
                    startButton.src="asset/play.png";
                    clearInterval(timerLogic);
                }
            }
        } else {clearInterval(timerLogic)};
    }, 100);
}

function updateIntervaldurations(work, rest, rounds) {
    started = false;
    interval = 'work';
    work_duration = work;
    rest_duration = rest;
    round_count = rounds;
    timeLeft = work*10;
    roundsLeft = rounds;
    formatDuration(timeLeft);
    startButton.src="asset/play.png";
    //animation
}

// --- Format Time and Print to Screen ---
let timeRef = document.querySelector("#displaytimer");
let timeRefms = document.querySelector("#displaytimerms");

function formatDuration(duration) {   
    let minutes = Math.floor(duration / 600);
    let seconds = Math.floor(duration/10) % 60;
    let milliseconds = duration % 10
    
    minutes = minutes < 10 ? minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timeRef.innerHTML = `${minutes}:${seconds}:`;
    timeRefms.innerHTML = `${milliseconds}`;
}


// --- BELLS & ANIMATIONS ---
function oneDing() {
    var snd = document.getElementById("one-ding");
    snd.play();
    bellrings();
}   

function twoDing() { // not currently used
    var snd = document.getElementById("two-ding");
    snd.play();
}

function threeDing() {
    var snd = document.getElementById("three-ding");
    snd.play();
    bellrings();
    randBGimg(currentBG);
}

// --- START/PAUSE BUTTON ---
function playPause() {
    if (started == false && timeLeft > 0) {
        started = true;
        intervalTimer();
        startButton.src = "asset/pause.png";
    } else {
        started = false;
        startButton.src = "asset/play.png";
    }
}

var startButton = document.getElementById("startstop");
startButton.addEventListener("click", () => {
    playPause();
    document.activeElement.blur(); // unselects button after pressing it so spacebar bind doesnt double click
});

// --- JQuery UI & GSAP Animations ---
var cm = $('.progbarcircle');
cm.circleProgress({
    value: 0.0,
    size: 920,
    thickness: 85,
    startAngle: -Math.PI / 2,
    reverse: true,
    animation: {duration: 200, easing: false},
    //animation: false,
    fill: {gradient: ['#cc0000', '#75004a'], gradientAngle: -Math.PI / 2}
    })

var bellAnimationTL = gsap.timeline() 

function bellrings() {
    bellAnimationTL.from(".ring", {
        scale: .25,
        opacity: 1,
        duration: 2,
        stagger: {each: 0.25},
        ease: "power1",
        });
    bellAnimationTL.from(".circle1", {
        backgroundColor: "#e10000",
        opacity: 1,
        scale: .75,
        duration: 1,
        ease: "back.out(3.5)",
    })
   gsap.set(".ring", { clearProps: true });
}


formatDuration(work_duration)
updateIntervaldurations(300, 30, 0) // Default intervals (5min work / 30sec rest/ infinite rounds)
