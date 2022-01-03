var cameraReset = false;
function drawGui(sX,sY,w,h,x,y,width,height) {
  if (x == -1) {
    x = SCREENWIDTH/2-w/2;
  }
  if (!width) {
    width = w;
  }
  if (!height) {
    height = h;
  }
  screen.drawImage(SPRITES,sX,sY,Math.round(w),Math.round(h),x*SCALE,y*SCALE,Math.round(width)*SCALE,Math.round(height)*SCALE);
}

function drawText(string,x,y) {
  var offset = 0;
  if (x == -1) {
    x = SCREENWIDTH/2-(string.length*6)/2+1;
  }
  for (var c=0;c<string.length;c++) {
    var code = string.charCodeAt(c);
    var char = code-97;
    if (char >= 0 && char < 24) {
      drawGui(char*6,184,6,7,x+c*6,y);
    }
    if (char >= 24 && char < 26) {
      drawGui((char-24)*6,192,6,7,x+c*6,y);
    }
    if (string[c] == "!") {
      drawGui(136,176,6,7,x+c*6,y);
    }
  }
}

function drawNumbers(string,x,y) {
  if (x == -1) {
    x = SCREENWIDTH/2-(string.length*8)/2;
  }  
  for (var c=0;c<string.length;c++) {
    var char = string[c];
    if (char != " ") {
      drawGui(char*8,176,8,8,x+c*8,y);
    }
  }  
}

function highlight(x,y,length) {
  if (x == -1) {
    x = SCREENWIDTH/2-((length*6+2)+6)/2+1;
  } else {
    x -= 2;
  }
  y -= 2;
  if (!length) {
    drawGui(104,172,12,12,x,y);
  } else {
    drawGui(104,172,3,9,x,y); //tl
    drawGui(107,172,1,9,x+3,y,length*6+2); //tc
    drawGui(113,172,3,9,(x+2+(length*6+2)),y); //tr
    drawGui(104,181,3,3,x,y+8); //bl
    drawGui(107,181,1,3,x+3,y+8,length*6+2); //bc
    drawGui(113,181,3,3,(x+2+(length*6+2)),y+8); //br    
  }
}

function drawPassword(pass,y,length) {
  for (var i=0;i<pass.length;i++) {
    var c = symbolPad.indexOf(pass[i]);
    if (symbolPad.includes(pass[i]) || pass[i] > 4) {
      var align = i*8+SCREENWIDTH/2-(length*8/2);
      if (c != -1) {
        if (c < 5) {
          drawGui(c*8,176,8,8,align,y);
        } else if (c < 8) {
          drawGui(c*8+40,176,8,8,align,y);
        } else {
          drawGui(c*8+56,176,8,8,align,y);
        }
      } else {
        drawGui(pass[i]*8,176,8,8,align,y);
      }
    }
  }
}

function itemGet(name, msg) {
  if (name.slice(0,5) == "staff") {
    for (var i=0;i<player.inventory.length;i++) {
      if (player.inventory[i].slice(0,5) == "staff") {
        player.inventory.splice(i,1);
        break;
      }
    }
  }
  if (name == "necklace") {
    if (player.inventory.includes('mist')) {
      player.inventory.splice(player.inventory.indexOf("mist"),1);
    }
  }
  if (!player.inventory.includes(name)) {
    message = msg;
    messageTimer = 120;
    player.inventory.push(name);
  }
}
var lastFrame;
var lastStamp = 0;
function loop(stamp) {
  if (Math.abs(lastStamp-stamp) >= 1000/FPS) {
    canvas.width = SCREENWIDTH*SCALE;
    canvas.height = SCREENHEIGHT*SCALE;
    canvas.style.position = "absolute";
    canvas.style.marginLeft = (window.innerWidth-canvas.width)/2-8+"px";
    canvas.style.marginTop = (window.innerHeight-canvas.height)/2-5+"px";
    screen.imageSmoothingEnabled = false;
    if (level.x == 1 || paused || loading) {
      screen.fillStyle = "black";
    } else {
      screen.fillStyle = "rgba(104,136,252,255)";
    }
    screen.fillRect(0,0,canvas.width,canvas.height); //background color
    if (!paused && !loading) {
      if (!boss && camera) {
        for (var y=0;y<map.height;y++) {
          for (var x=0;x<map.width;x++) {
          if (x*TILE <= camera.x+SCREENWIDTH-TILE/2 && x*TILE >= camera.x-TILE && y*TILE < camera.y+SCREENHEIGHT && y*TILE > camera.y+TILE) { //RENDER DISTANCE
            if (level.x == 1) { //w1 background
              iY = y
              if (y > 11) {
                if (y > map.height-12) {
                  drawGui(80,48,TILE,TILE,x*TILE-camera.x,y*TILE-camera.y);       
                  if (y > map.height-6) {
                    drawGui(80,56,TILE,TILE/2,x*TILE-camera.x,y*TILE-camera.y);
                  }
                } else {
                  drawGui(80,48,TILE,TILE/2,x*TILE-camera.x,y*TILE-camera.y);
                  drawGui(80,48,TILE,TILE/2,x*TILE-camera.x,y*TILE+8-camera.y);              
                }
              } else {
                drawGui(0,600,TILE,TILE/2,x*TILE-camera.x,y*TILE-camera.y);
                drawGui(0,600,TILE,TILE/2,x*TILE-camera.x,y*TILE+8-camera.y);
              }
              if (y == 10) {
                drawGui(80,48,TILE,TILE/2,x*TILE-camera.x,y*TILE+8-camera.y);
              }            
              y = iY
            } else {
              var backgroundLevel = 22;
              if (level.y == 2) {
                backgroundLevel = 32;
              }
              if (level.y == 3) {
                backgroundLevel = 36;
              }
              if (level.y == 4 || level.y == 5) {
                backgroundLevel = 28;
              }
              var height = Math.round((6-x%10)/3)+backgroundLevel;
              if (y >= height) {
                if (y == height) {
                  drawGui(112,808,TILE,TILE,x*TILE-camera.x,y*TILE-camera.y); //grass
                } else {
                  drawGui(128,808,TILE,TILE,x*TILE-camera.x,y*TILE-camera.y); //dirt
                }
              }
            }
            }
          }
        }
      }
      for (var i=0;i<collisions.length;i++) {
        if (collisions[i] && collisions[i] != player) {
          collisions[i].play(); //run physics/rendering
        }
      }
      screen.fillStyle = "black";
      screen.fillRect(0,0,canvas.width,32*SCALE);
      if (messageTimer > 0) {
        screen.fillRect(0,32*SCALE,canvas.width,8*SCALE);
        drawText(message,-1,32);
        messageTimer -= 1;
      }
      drawGui(96,128,48,32,SCREENWIDTH/2-120,0); //inventory
      drawText("health",SCREENWIDTH/2-58,5);
      drawGui(0,160,32,16,SCREENWIDTH/2-56,12); //health bar    
      drawGui(32,160,Math.max(0,player.health/player.maxHealth*24),8,SCREENWIDTH/2-52,16); //health gauge 
      drawText("level",-1,5);
      drawNumbers(level.x+" "+level.y,-1,16);
      screen.fillStyle = "white";
      screen.fillRect(canvas.width/2-2*SCALE,19*SCALE,4*SCALE,2*SCALE);    
      drawText("mana",SCREENWIDTH/2+29,5);
      drawGui(0,160,32,16,SCREENWIDTH/2+24,12); //mana bar
      if (player.mana < 0) {
        player.mana = 0;
      }
      drawGui(32,168,player.mana/player.maxMana*24,8,SCREENWIDTH/2+28,16); //mana gauge
      drawGui(96,138,48,22,SCREENWIDTH/2+76,10); //progress bar
      if (DEBUG) {
        drawNumbers(tick+" ", 8,8);
        drawNumbers(Math.round(tick/FPS)+" ", 8,16);
        var unix = new Date().getTime();
        drawNumbers(Math.round(1000/(unix-lastFrame))+"",8,32);
        lastFrame = unix;
      }
      if (!boss) {
        drawText("progress",SCREENWIDTH/2+75,3);
        drawGui(104,160,36*Math.max(1,stageProgress),12,SCREENWIDTH/2+80,14); //progress gauge
        function minimap(that) {
          screen.fillStyle = "white";
          screen.fillRect(SCREENWIDTH*SCALE/2+80*SCALE + that.x*SCALE/WIDTH*36*SCALE,19*SCALE,1*SCALE,2*SCALE)
        }
        screen.fillStyle = "white";
        minimap(spawn);
        screen.fillRect(SCREENWIDTH*SCALE/2+80*SCALE + spawn.x*SCALE/WIDTH*36*SCALE,19*SCALE,((player.position.x-spawn.x)-spawn.x)*SCALE/WIDTH*36*SCALE,2*SCALE);
        minimap(door.position);
      } else {
        drawText("boss",SCREENWIDTH/2+86,3);
        drawGui(104,160,36*boss.health/boss.maxHealth,12,SCREENWIDTH/2+80,14); //boss health
      }
      var neutralB = new vector(0,248);
      var upB = new vector(0,0);
      var downB = new vector(0,0);
      if (player.inventory.includes("sword")) {
        upB.x = 16;
        upB.y = 248;
      }
      if (player.inventory.includes("staff")) {
        downB.x = 32;
        downB.y = 248;
      }
      if (player.inventory.includes("staffa")) {
        downB.x = 48;
        downB.y = 248;
      }    
      if (player.inventory.includes("staffb")) {
        downB.x = 64;
        downB.y = 248;
      }    
      if (player.inventory.includes("staffc")) {
        downB.x = 80;
        downB.y = 248;
      }    
      if (upB.y != 0) {
        drawGui(upB.x,upB.y,16,16,SCREENWIDTH/2-118,12);
      }
      if (neutralB.y != 0) {
        drawGui(neutralB.x,neutralB.y,16,16,SCREENWIDTH/2-106,12);
      }
      if (downB.y != 0) {
        drawGui(downB.x,downB.y,16,16,SCREENWIDTH/2-94,12); 
      }
      if (player.health < 1 || loading) {
        screen.fillStyle = "black";
        screen.fillRect(0,0,canvas.width,canvas.height);
      }
      if (player) {
        player.play();
      }
      for (var i=0;i<keyMemory.length;i++) {
        if (keys.includes(keyMemory[i])) {
          keyTimes[i] += 1;
        } else {
          keyTimes[i] -= 1;
        }
      }
      tick++;
    } else if (!loading) {
      drawGui(0,528,144,56,-1,24); //logo
      if (title) {
        drawText("press start",-1,96);
        drawText("new game",-1,128);
        drawText("random game",-1,144);
        drawText("continue game",-1,160);
        drawText("settings",-1,176);
        if (menu == 0) { //highlight new game
          highlight(-1,128,8);
        }
        if (menu == 1) { //highlight random game
          highlight(-1,144,11); 
        }
        if (menu == 2) { //hightlight continue
          highlight(-1,160,13); 
        }
        if (menu == 3) { //hightlight settings
          highlight(-1,176,8); 
        }      
      } else if (passwordScreen) {
        drawText("press start",-1,96);
        drawText("enter password",-1,128);
        drawGui(0,584,144,16,-1,136); //password bar
        drawPassword(password,140,16);
        drawPassword("01234QVWXZ",156,10);
        highlight(SCREENWIDTH/2-40+menu*8,156);
      } else if (modeSelect != false) {
        drawText("press start",-1,96);
        drawText("easy",-1,128);
        drawText("normal",-1,144);
        drawText("champion",-1,160);
        if (menu == 0) { //highlight easy
          highlight(-1,128,4);
        }
        if (menu == 1) { //highlight normal
          highlight(-1,144,6); 
        }
        if (menu == 2) { //highlight hard
          highlight(-1,160,8); 
        }      
      } else if (settings) {
        drawText("press start",-1,96);
        drawText("press a to set",-1,112);
        drawText("select screen size",-1,136);
        drawText("classic  widescreen",-1,152);
        drawText("select scale multiplier",-1,176);
        drawNumbers("1 2 3 4",-1,192);
      } else {
        drawText("game paused",-1,96);
        drawText("press start",-1,128);  
        var difficulty = "normal";
        if (difficultyGoal == 0) {
          difficulty = "easy";
        }
        if (difficultyGoal == 1) {
          difficulty = "champion";
        }
        drawText("current password",-1,164);
        password = generatePassword();
        drawGui(0,584,144,16,-1,172);
        drawPassword(password,176,16);  
        drawText("difficulty set to "+difficulty,-1,192);
      }
    }
    if (player.health < 1 && !paused) {
      drawText("you died!",-1,80);
      drawText("but your quest continues",-1,96);
    } else if (TOUCHCONTROLS) {
      drawGui(0,976,32,32,TOUCHPADCENTER.x-TILE, TOUCHPADCENTER.y-TILE);
      drawGui(32,976,64,64,BUTTONPADCENTER.x-TILE, BUTTONPADCENTER.y-TILE);   
      drawGui(64,976,16,16,STARTCENTER.x-8, STARTCENTER.y-8);    
      drawNumbers("1234",528/SCALE,221/SCALE);
    }
    lastStamp = stamp;
  }
  window.requestAnimationFrame(loop);
}
loop(0);