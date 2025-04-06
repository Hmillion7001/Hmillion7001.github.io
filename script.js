var currentBG = 'img/000.jpg' // default BG image

// --- BACKGROUND IMAGE CHANGER ---
function randBGimg(oldimg) {
    //var fs = require('fs'); // doesnt work outside of VSCode/Node
    //var files = fs.readdirSync('img/');
    var files = ['img/000.jpg', 'img/001.jpg', 'img/002.jpg', 'img/003.jpg', 'img/004.jpg', 'img/005.jpg',
        'img/006.jpg', 'img/007.jpg', 'img/008.jpg', 'img/009.jpg', 'img/010.jpg',
        'img/011.jpg', 'img/012.jpg']
        while (true) {
            var random = Math.floor(Math.random() * files.length);
            var newimg = files[random];
            if (newimg == oldimg) {  
            } else {
                currentBG = newimg;
                document.getElementById("bg").style.backgroundImage = "url("+newimg+")";
                break;
            }};
        };

// --- VOLUME SLIDER ---
let volumeSlider = document.getElementById('volume-slider');
    Array.from(document.querySelectorAll('audio')).forEach(function(audio) {
        audio.volume = volumeSlider.value / 100;
    });
    volumeSlider.addEventListener("change", function(e) {
        Array.from(document.querySelectorAll('audio')).forEach(function(audio) {
            audio.volume = e.currentTarget.value / 100;
        });
    });

// --- FULLSCREEN TOGGLE ---
function toggleFullscreen() {
    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

    var docElm = document.documentElement;
    if (!isInFullScreen) {
        document.getElementById("fullscreen").src="asset/nonfullscreen.png";
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
        } else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
        }
    } else {
        document.getElementById("fullscreen").src="asset/fullscreen.png";
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

// ----- EDIT MENU -----
var dialog
          dialog = $('div#dialog').dialog( {
            autoOpen: false,
            height: 480,
            width: 720,
            modal: true,
            resizable: false,
          });
          //document.getElementById('work').innerHTML = work_duration;
          //document.getElementById('rest').value = rest_duration;
          //document.getElementById('rounds').value = round_count;
          $('#edit').click(function(e){
            e.preventDefault();
            dialog.dialog('open');
          });
          $('#submit').click(function() {
            updateIntervaldurations($('#work').val(), $('#rest').val(), $('#rounds').val());
            dialog.dialog('close');

          });
        $('#cancel').click(function() {
            dialog.dialog('close');
          });

// ---- KEY BINDS ----
document.addEventListener('keydown', function (event) {
    console.log('Key pressed: ', event.key);
    if (event.key === 'MediaPlayPause' || event.key === ' ') { // Play/Pause button and spacebar on airmouse bound to start/stop of the timer
        playPause(); 
        document.activeElement.blur(); // unselects button after pressing it so spacebar bind doesnt double click
    } else if (event.key === 'MediaTrackPrevious' || event.key === 'MediaTrackNext') { // maybe find another button for Edit Menu to not mess up background music?
        console.log('menu needs to be put into function'); 
    };
});

//toggleFullscreen(); // Was trying to get the webpage to open directly into fullscreen but this doesn't appear to work
