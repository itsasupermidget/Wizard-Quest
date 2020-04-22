const SOUNDS = [];
const AUDIO = [];
function playSound(name) {
  if (!SOUNDS.includes(name)) {
    SOUNDS.push(name);
    AUDIO.push(document.createElement("audio"));
  }
  var i = SOUNDS.indexOf(name);
  if (AUDIO[i].paused) {
    AUDIO[i].src = "magic/sounds/"+name+".mp3";
  }
  AUDIO[i].play();
}