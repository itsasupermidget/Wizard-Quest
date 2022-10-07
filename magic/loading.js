var SCREENWIDTH = 256; //256 NES, 400 Shovel Knight, 416 Widescreen, 384 SMM2
var SCREENHEIGHT = 240;
var SCALE = 3;
var canvas = document.createElement("canvas");
document.body.appendChild(canvas);
var screen = canvas.getContext("2d");
screen.imageSmoothingEnabled = false;
canvas.width = SCREENWIDTH*SCALE;
canvas.height = SCREENHEIGHT*SCALE;
screen.font = "64px Lucida Console";
canvas.style.position = "absolute";
canvas.style.marginLeft = (window.innerWidth-canvas.width)/2-8+"px";
canvas.style.marginTop = (window.innerHeight-canvas.height)/2-5+"px";
screen.textAlign = "center";