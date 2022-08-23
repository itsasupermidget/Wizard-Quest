var keys = [];
var keyMemory = [];
var keyTimes = [];
var BUTTONATTACKS = false;
var TOUCHCONTROLS = false;
var TOUCHPADCENTER = new vector(TILE*2,SCREENHEIGHT-TILE*2);
var BUTTONPADCENTER = new vector(SCREENWIDTH-TILE*4,SCREENHEIGHT-TILE*4);
var STARTCENTER = new vector(SCREENWIDTH-TILE*2,TILE);
var BUTTONCENTERS = [new vector(BUTTONPADCENTER.x, BUTTONPADCENTER.y+TILE), new vector(BUTTONPADCENTER.x-TILE, BUTTONPADCENTER.y), new vector(BUTTONPADCENTER.x, BUTTONPADCENTER.y-TILE), new vector(BUTTONPADCENTER.x+TILE, BUTTONPADCENTER.y)];

function startButton() {
  if (title) {
    if (menu < 2) {
      modeSelect = menu+1;
      title = false;
      menu = 1;
    } else if (menu == 3) {
      settings = true;
      title = false;
    } else {
      passwordScreen = true;
      title = false;
      menu = 0;
    }
  } else if (modeSelect != false) {
    if (menu == 0) { //select easy
      difficultyGoal = 0;
    }
    if (menu == 1) { //select normal
      difficultyGoal = .5;
    }
    if (menu == 2) { //select hard
      difficultyGoal = 1;
    }
    if (modeSelect == 1) { //new game
      loadPassword("ZWZZZZZW44ZZWZZ0") //ZWZZZVZW44ZZWZZ0 1,0 -- ZQZWZWZQ44ZXWZWZ 2,1
    } else if (modeSelect == 2) {
      function randomPair(min,max) {
        return encrypt(Math.floor(Math.random()*(max-min+1)+min));
      }
      var world = randomPair(1,2);
      if (world == "ZW") {
        var level = randomPair(1,7);
      } else {
        var level = randomPair(1,5);
      }
      //loadPassword(world+randomPair(0,6)+level+randomPair(0,6)+randomPair(1,99)+randomPair(0,6)+randomPair(10,99)+randomPair(5,99));
      loadPassword(world+"ZW"+level+"ZQ44ZXWZWZ");    
    }
    paused = false;
    modeSelect = false;        
  } else if (passwordScreen) {
    modeSelect = 3;
    passwordScreen = false;
    menu = 1;    
    if (password.length == 1) {
      password = "ZQZWZQZQ44ZXWZWZ";
    } else if (password.length < 1) {
      level = new vector(0,1);
      loadPassword("ZZZWZWZQ44ZXWZWZ");
    }
    if (password.length == 16) {
      loadPassword(password);
      modeSelect = 3;
    }
  } else if (settings) {
    settings = false;
    title = true;
  } else {
    paused = !paused;
  }  
}

function upButton() {
  if (menu == 0) {
    menu = 3;
    if (modeSelect != false) {
      menu = 2;
    }
  } else {
    menu -= 1;
  }
}

function downButton() {
  if (menu > 2 || (menu > 1 && modeSelect != false)) {
    menu = 0;
  } else {
    menu += 1;
  }
}

function leftButton() {
  player.walking = -1;
  player.facing = -1;
}

function rightButton() {
  player.walking = 1;
  player.facing = 1;
}

function jumpRelease() {
  if (player.jumping) {
    player.jumpCancel = true;
  }
  player.jumping = false;
  if (passwordScreen) {
    password += symbolPad[menu];
  }
  if (password.length > 16) {
    password = password.slice(0,16);
  }  
}

document.addEventListener("keydown", function(event) {
  if (player.health > 0) {  
    var key = event.keyCode;
    if (!keyMemory.includes(key)) {
      keyMemory.push(key);
      keyTimes.push(0);
    }
    if (!keys.includes(key)) {
      keys.push(key);
      if (player.onplatform && ((key == 83 && keyTimes[keyMemory.indexOf(key)] > -5) || (keys.includes(83) && keys.includes(75)))) {
        player.drop = true;
      }
      keyTimes[keyMemory.indexOf(key)] = 0;
      if ((key == 75 || key == 32) && !player.drop) {
        player.jumping = true;
      }
      if (key == 65) {
        leftButton();
      }  
      if (key == 68) {
        rightButton();
      }
      if (key == 87) {
        player.climbing = -1;    
      }
      if (key == 83) {
        player.climbing = 1;
      }
      if (key == 74 || key == 16 || key == 76 || key == 186) {
        player.charging = true;
      }
    }
  }
});

document.addEventListener("keyup", function(event) {
  var key = event.keyCode;
  if (DEBUG) {
    if (key == 73) {
      player.health = player.maxHealth;
    }  
    if (key == 79) {
      player.velocity.y = -10;
      player.position.y -= 32;
    }
    if (key == 80) {
      player.position.x += player.facing*64;
      player.health = player.maxHealth;
    }
    if (key == 82) {
      player.health = 0;
    }
  }
  if (player.health > 0) {
    if (key == 74 || key == 16) {
      if (keys.includes(87) && !BUTTONATTACKS) {
        swingSword(player);
      } else if (keys.includes(83) && !BUTTONATTACKS) {
        swingStaff(player);
      } else if ((!keys.includes(87) && !keys.includes(83)) || BUTTONATTACKS) {
        mistAttack(player);
      }
    }
    if (key == 76) {
      swingSword(player);
    }
    if (key == 186) {
      swingStaff(player);
    }
  }  
  if (key == 65 && !keys.includes(68)) {
    player.walking = 0;
    if (passwordScreen) {
      if (menu == 0) {
        menu = 9
      } else {
        menu -= 1;
      }
    }
  }  
  if (key == 68 && !keys.includes(65)) {
    player.walking = 0;
    if (passwordScreen) {
      if (menu == 9) {
        menu = 0
      } else {
        menu += 1;
      }
    }
  }
  if (key == 87 && !passwordScreen) {
    upButton();
  } 
  if (key == 83 && !passwordScreen) {
    downButton();
  }
  if (key == 74) {
    password = password.slice(0,password.length-1);
  }
  if (key == 75 || key == 32) {
    jumpRelease();
  }
  if (key == 13) {
    startButton();
  }
  if (keys.includes(key)) {
    keyTimes[keyMemory.indexOf(key)] = 0;
    keys.splice(keys.indexOf(key),1);
  }  
  if ((key == 87 && player.climbing == -1) || (key == 83 && player.climbing == 1)) {
    player.climbing = 0;
    if (keys.includes(87)) {
      player.climbing = -1;
    }
    if (keys.includes(83)) {
      player.climbing = 1;
    }
  }
});

function touchControls(event, name) {
  var screenPos = new vector((window.innerWidth-SCREENWIDTH*SCALE)/2,(window.innerHeight-SCREENHEIGHT*SCALE)/2);
  var touches = event.changedTouches;
  for (var i=0;i<touches.length;i++) {
    var touchPos = new vector((touches[i].clientX-screenPos.x)/SCALE, (touches[i].clientY-screenPos.y)/SCALE);
    if (touchPos.distance(STARTCENTER) < 64 && name == "start") {
      startButton();
    }
    var padDist = touchPos.distance(TOUCHPADCENTER);
    if (padDist < 32) {
      if (touchPos.x < TOUCHPADCENTER.x && name != "end") {
        leftButton();
      } else if (touchPos.x > TOUCHPADCENTER.x && name != "end") {
        rightButton();
      } else {
        player.walking = 0;
        //player.climbing = 0;
      }
      if (name == "start") {
        if (touchPos.y < TOUCHPADCENTER.y) {
          upButton();
          player.climbing = -1;
        } else if (touchPos.y > TOUCHPADCENTER.y) {
          downButton();
          player.climbing = 1;
        }
      }
    }
    if (touchPos.distance(BUTTONCENTERS[1]) < TILE*2) {
      if (name == "start") {
        mistAttack(player);
      }
    }
    if (touchPos.distance(BUTTONCENTERS[3]) < TILE*2) {
      if (name == "start") {
        swingStaff(player);
      }        
    }      
    if (touchPos.distance(BUTTONCENTERS[2]) < TILE*2) {
      if (name == "start") {
        swingSword(player);
      }
    }
    if (touchPos.distance(BUTTONCENTERS[0]) < TILE*2) {
      if (name == "start") {
        player.jumping = true;
      } else if (name == "end") {
        jumpRelease();
      }
    }  
  }
}

document.addEventListener("touchstart", function() {touchControls(event, "start")});
document.addEventListener("touchmove", function() {touchControls(event, "move")});
document.addEventListener("touchend", function() {touchControls(event, "end")});
//PRO CONTROLLER SUPPORT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
var con = false;
function delKey(id) {
  if (keys.includes(id)) {
    keyTimes[keyMemory.indexOf(id)] = 0;
    keys.splice(keys.indexOf(id),1);
  } 
}
function pro() {
  var con = navigator.getGamepads()[0];
  if (con) { //12 13 14 15
    if (con.axes) {
      var lr = Math.round(con.axes[0]*2)/2;
      var ud = Math.round(con.axes[1]*2)/2;
    }
    if (con.buttons[0].pressed) { //B
      player.jumping = true;
      keys.push(75);
      keyTimes.push(0);
    }
    if (con.buttons[2].pressed) { //Y
      player.charging = true;
      keys.push(74);
      keyTimes.push(0);
    }
    if (keys.includes(75) && (!con.buttons[0].pressed)) { //B up
      jumpRelease();
      delKey(75);
    }
    if (keys.includes(74) && (!con.buttons[2].pressed)) { //Y up
      mistAttack(player);
      password = password.slice(0,password.length-1);
      delKey(74);
    }
    if (con.buttons[12].pressed || ud == -1) { //Up
      player.climbing = -1;
      keys.push(87);
      keyTimes.push(0);
    }
    if (con.buttons[13].pressed || ud == 1) { //Down
      player.climbing = 1;
      keys.push(83);
      keyTimes.push(0);
    }
    if (!con.buttons[12].pressed && keys.includes(87)) { //Up release
      delKey(87);
      if (!passwordScreen) {
        upButton();
      }
    }
    if (!con.buttons[13].pressed && keys.includes(83)) { //Down release
      delKey(83);
      if (!passwordScreen) {
        downButton();
      }      
    }    
    if (keys.includes(65) && !keys.includes(68) && (!con.buttons[14].pressed) || lr == 0) { //Left up
      delKey(65);
      if (passwordScreen) {
        if (menu == 0) {
          menu = 9;
        } else {
          menu -= 1;
        }
      }
    }
    if (keys.includes(68) && !keys.includes(65) && (!con.buttons[15].pressed) || lr == 0) { //Right up
      delKey(68);
      if (passwordScreen) {
        if (menu == 9) {
          menu = 0;
        } else {
          menu += 1;
        }
      }
    } 
    if (con.buttons[14].pressed || lr == -1) { //Left
      leftButton();
      keys.push(65);
      keyTimes.push(0);
    } else if (con.buttons[15].pressed || lr == 1) { //Right
      rightButton();
      keys.push(68);
      keyTimes.push(0);
    } else {
      player.walking = 0;
    }
    if (con.buttons[3].pressed) { //X
      swingSword(player);
    }
    if (con.buttons[1].pressed) { //A
      swingStaff(player);

    }
    if (con.buttons[9].pressed && !keys.includes(13)) {
      keys.push(13);
      keyTimes.push(0);
    } else if (!con.buttons[9].pressed && keys.includes(13)) { //release start
      delKey(13);
      startButton();
    }    
    console.log(con.buttons[9]); //+9 -8 ZR7 ZL6 R5 L4 
  }
  return true;
}