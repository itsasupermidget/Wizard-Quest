function load(name) {
  var type = name.slice(-3);
  var object;
  if (type == ".js") {
    object = document.createElement("script");
    document.head.appendChild(object);
  } else if (type == "png") {
    object = document.createElement("img"); 
  }
  object.src = "magic/"+name;
  LOADED.push(object);
  return object;
}

var LOADORDER = [
"loading.js",
"sprites.png",
"nessprites.png",
"gbsprites.png",  
"physics.js",
"globals.js",
"builder.js",
"password.js",
"animations.js",
"objects/skeleton.js",
"objects/knight.js",
"objects/skeleboss.js",
"objects/plant.js",
"objects/beehive.js",
"objects/bees.js",
"objects/warrior.js",
"objects/evilbush.js",
"objects/monkey.js",
"objects/cactus.js",
"objects/spawner.js",
"objects/tumble.js",
"player.js",
"input.js",
"rendering.js",
"audio.js",
];

var LOADED = [];

function iterativeLoad(i=0) {0
  var name = LOADORDER[i];
  var object = load(name);
  if (i < LOADORDER.length-1) {
    object.onload = () => iterativeLoad(i+1);
  }
  if (LOADED.length > 1) {
    screen.fillStyle = "black";
    screen.fillRect(0,0,canvas.width,canvas.height);
    screen.fillStyle = "purple";
    screen.fillText("loading...",canvas.width/2,canvas.height/2);  
    screen.fillText(i+"/"+LOADORDER.length,canvas.width/2,canvas.height/2+64);  
  }
}

iterativeLoad();