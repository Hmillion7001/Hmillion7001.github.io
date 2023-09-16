var currentBG = 'img/4f330a0193fa.jpg'

// --- BACKGROUND IMAGE CHANGER ---
function randBGimg(oldimg) {
    //var fs = require('fs'); // doesnt work outside of VSCode/Node
    //var files = fs.readdirSync('img/');
    var files = ['img/4f330a0193fa.jpg', 'img/5bf3c0365e1b.jpg', 'img/53e57f98eae2.jpg', 'img/84253cadfd2a.jpg', 'img/a526ceffde54.jpg', 'img/7cOw8fW.jpg', 'img/DXXxFjU.jpg']
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

// Non-clientside way of getting array of images from asset folder   !!! FILE API ?!?
//const imagesInput = document.getElementById("videos-input");

//imagesInput.addEventListener("change", (e) => {
//    const files = imagesInput.files;
//    const fileNames = [...files].filter((file) => file.type === "Image").map((file) => file.name);
//    console.log(fileNames, fileNames.length);
    
    // do whatever with `fileNames`
//});

let volumeSlider = document.getElementById('volume-slider');
    Array.from(document.querySelectorAll('audio')).forEach(function(audio) {
        audio.volume = volumeSlider.value / 100;
    });
    volumeSlider.addEventListener("change", function(e) {
        Array.from(document.querySelectorAll('audio')).forEach(function(audio) {
            audio.volume = e.currentTarget.value / 100;
        });
    });


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

//toggleFullscreen();