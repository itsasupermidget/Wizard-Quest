function playerScript(parent) {
  var animLeft = (parent.animation == ATTACKLEFT || parent.animation == IDLELEFT || parent.animation == JUMPLEFT || parent.animation == WALKLEFT || parent.animation == LOOKUPLEFT || parent.animation == LANDINGLEFT || parent.animation == DUCKLEFT || parent.animation == FALLINGLEFT || parent.animation == SWINGLEFT || parent.animation == CLIMBLEFT || parent.animation == HURTLEFT);
  if (animLeft) {
    parent.animationFacing = -1;
    necklace.facing = -1;
  } else {
    parent.animationFacing = 1;
    necklace.facing = 1;
  }
  var remaining = totalEnemies-enemies
  stageProgress = (Math.min(totalEnemies*difficultyGoal,remaining)+(totalCollectables-collectables))/(totalEnemies*difficultyGoal+totalCollectables);
  if (difficultyGoal == 0 && totalCollectables == 0) {
    stageProgress = 1;
  }
  if (remaining/totalEnemies >= difficultyGoal && collectables == 0 && (difficultyGoal > 0 || totalCollectables > 0)) {
    if (!collisions.includes(key)) {
      collisions.push(key);
    }
    var keyDist = key.position.distance(parent.position)
    if (keyDist > 4*TILE) {
      key.visible = true;
      var xVel = Math.max(WALKSPEED,Math.abs(parent.velocity.x));
      var yVel = Math.max(WALKSPEED,Math.abs(parent.velocity.y));      
      if (parent.position.x > key.position.x+xVel) {
        key.position.x += xVel;
      } else if (parent.position.x < key.position.x-xVel) {
        key.position.x -= xVel;
      }
      if (parent.position.y > key.position.y+yVel) {
        key.position.y += yVel;
      } else if (parent.position.y < key.position.y-yVel) {
        key.position.y -= yVel;
      }          
    }
    if (parent.position.distance(door.position) < TILE*8) {
      key.position = new vector(parent.position.x+parent.sprite.size.x/2+3, parent.position.y+parent.sprite.size.y/2);
    } else if (keyDist < TILE) {
      key.visible = false;
      key.position = door.position.clone();
    }    
  } else {
    key.visible = false;
  }
  for (var i=0;i<parent.actions.length;i++) {
    var name = parent.actions[i];
    var start = parent.actionTimers[i][0];
    var current = start+parent.actionTimers[i][1];
    var end = start+parent.actionTimers[i][2];
    if (parent.actions[i]) {
      parent.actionTimers[i][1] += 1;
      if (current >= end) {
        parent.actions.splice(i,1);
        parent.actionTimers.splice(i,1);                
      }
      if (current == end) {
        if (name == "attack") {
          var attack = new body(new vector(parent.position.x+16*parent.animationFacing,parent.position.y+8), new sprite(new vector(0,0), new vector(0,0)));
          if (parent.animationFacing == -1) {
            attack.animation = MISTLEFT.clone();
          } else if (parent.animationFacing == 1) {
            attack.animation = MIST.clone(); 
          }
          attack.animation.start = tick;
          attack.fizzles = true;
          attack.solid = false;
          attack.name = "mist";
          attack.velocity.x = parent.walking*5 + parent.animationFacing*6;
          parent.chargeLevel = Math.min(parent.chargeLevel, 12);
          if (parent.chargeLevel > 2) {
            parent.chargeLevel -= 2;
            attack.velocity.x += parent.animationFacing*parent.chargeLevel;
          }
          parent.chargeLevel = 0;
          attack.velocity.y = parent.velocity.y/4;
          collisions.push(attack);
          attack.parent = parent;
          parent.attacks.push("mist");
          parent.mana -= 10;      
        }
        if (name == "jump") {
          playerJump(parent);
        }
      }
    }
  }
  var goal = parent.walking*WALKSPEED;
  if (tick % 2 == 0) {
    goal += parent.walking;
  }   
  var current = parent.velocity.x;
  var delta = 1;
  if (parent.velocity.y != 0) {
    delta = 1;
  } else if (Math.abs(parent.velocity.x) < delta) {
    parent.velocity.x = 0;
  }
  if (current < goal) {
    parent.velocity.x += delta;
  }
  if (current > goal) {
    parent.velocity.x -= delta;
  }
  parent.jumps = 0;
  if (parent.velocity.y >= 0 && !parent.canMove(new vector(0,parent.velocity.y))) {
    if (parent.freefall) {
      var length = Math.pow((parent.velocity.y+1),2.2)/256;
      LANDING = new animation(LANDING.sprites, [0,0], length, "landing");
      LANDINGLEFT = new animation(LANDINGLEFT.sprites, [0,0], length, "landing");      
      if (parent.animationFacing == 1) {
        parent.animation = LANDING;
      } else {
        parent.animation = LANDINGLEFT;
      }
    }
    parent.freefall = false;
    parent.coyoteTime = COYOTETIME;
  } else {
    parent.freefall = true;
    if (parent.coyoteTime > 0) {
      parent.coyoteTime -= 1;
    }
  }
  if (!parent.canMove(new vector(0,1)) || parent.onladder || parent.onplatform || parent.onstairs) {
    parent.coyoteTime = COYOTETIME;
  }
  if (parent.coyoteTime > 0) { //(parent.velocity.y > 0 && !parent.canMove(new vector(0, parent.velocity.y*REVERSECOYOTETIME)))
    parent.jumps = 1;
    parent.freefall = false;
  }
  if (parent.onladder || parent.onplatform) {
    if (parent.climbing !== false) {
      parent.velocity.y = -GRAVITY;
      if (parent.climbing != 0 && parent.onladder) {
        var goal = parent.onladder.position.x;
        if (parent.position.x < goal) {
          parent.position.x += 1;
        }
        if (parent.position.x > goal) {
          parent.position.x -= 1;
        }
        parent.velocity.y += parent.climbing*4;
      }
    }
  }
  if (parent.jumpCancel && !parent.jumping) {
    playerJump(parent);
  }
  parent.jumpCancel = false;
  if (parent.jumping && parent.freefall) {
    parent.jumping = false;
  }
  if (parent.jumping && parent.jumps > 0 && !(parent.animation && parent.animation.name == "jump")) {
    parent.actions.push("jump");
    parent.actionTimers.push([tick,0,3]);        
    parent.animation = JUMP;
    if (parent.animationFacing == -1) {
      parent.animation = JUMPLEFT;
    }
    parent.animation.start = tick+1;
    parent.animation.current = 0;
  }
  if (parent.jumping) {
    parent.jumpCharge = parent.jumpCharge + 1;
    if (parent.jumpCharge > 3) {
      parent.jumpCharge = 3;
    }
  } else {
    parent.jumpCharge = 0;
  }
  if (parent.charging && parent.inventory.includes("necklace")) {
    if (tick % 2 == 0) {
      necklace.sprite = new sprite(new vector(136,600), new vector(8,8));
    } else {
      necklace.sprite = new sprite(new vector(128,600), new vector(8,8));
    }
    parent.chargeLevel += .5;
  } else {
    necklace.sprite = new sprite(new vector(128,600), new vector(8,8));
  }
  if (parent.animation && parent.animation.name == "swing") {
    if (parent.attacks.includes("sword") && (parent.animation.current == 5 || parent.animation.current == 6 || (parent.animation.current > 4 && parent.animation.current < parent.chargeLevel) && player.mana > 5)) {
      var shard = new body(new vector(parent.position.x+4+(parent.animation.order.length-parent.animation.current)*parent.animationFacing*2,parent.position.y+12-parent.animation.current), new sprite(new vector(0,0), new vector(0,0)));
      shard.animation = SWORDSHARD; 
      if (parent.animationFacing == -1) {
        shard.animation = SWORDSHARDLEFT;
      }
      shard.animation.start = tick;
      shard.fizzles = true;
      shard.solid = false;
      shard.name = "shard";
      shard.velocity.x = parent.velocity.x + parent.animationFacing*Math.min(4,Math.max(2,parent.chargeLevel/3));
      shard.velocity.y = parent.velocity.y/4;
      parent.mana -= 5;
      collisions.push(shard);
      shard.parent = parent;
    }
    if (parent.animation.current == 10) {
      parent.chargeLevel = 0;
    }
  }
  if (!parent.animation || (parent.animation.name != "attack" && parent.animation.name != "swing" && parent.animation.name != "jump" && parent.animation.name != "landing" && (parent.animation.name != "falling" || parent.flicker || parent.onplatform || parent.onstairs || parent.onladder || !parent.canMove(new vector(0,1)))) || parent.animation.current == parent.animation.order.length-1) {
    if (parent.velocity.x != 0 && parent.facing == 1) {
      parent.animation = WALK;
    } else if (parent.velocity.x != 0 && parent.facing == -1) {
      parent.animation = WALKLEFT;
    } else {
      if (parent.animationFacing == 1) {
        if (parent.animation != IDLE) {
          IDLE.start = tick;
        }
        parent.animation = IDLE;
        if (keys.includes(83)) {
          parent.animation = DUCK;
        }
        if (keys.includes(87)) {
          parent.animation = LOOKUP;
        }
      } else {
        if (parent.animation != IDLELEFT) {
          IDLELEFT.start = tick;
        }
        parent.animation = IDLELEFT;
        if (keys.includes(83)) {
          parent.animation = DUCKLEFT;
        }
        if (keys.includes(87)) {
          parent.animation = LOOKUPLEFT;
        }
      }    
    }
    if (parent.flicker) {
      if (parent.facing == 1) {
        parent.animation = HURT;
      } else {
        parent.animation = HURTLEFT;
      }
      if (parent.animation.name != "hurt") {
        parent.animation.current = 0;
        parent.animation.start = tick;
      }
    }      
    if (parent.climbing !== false && parent.onladder) {
      if (parent.facing == 1) {
        parent.animation = CLIMB;
      } else {
        parent.animation = CLIMBLEFT;
      }
      if (parent.climbing == 0 && parent.velocity.x == 0) {
        parent.animation.start = tick;
      }
    }       
  } else {
    if (parent.animation) {
      if (parent.animation.name == "attack") {
        if (parent.animation.current == 7) {
          parent.animation = IDLE;
          if (parent.facing == -1) {
            parent.animation = IDLELEFT;
          }
        }
      }
    }
  }
  if (parent.velocity.y != 0 && !parent.onladder && !parent.onplatform && (!parent.animation || (parent.animation.name != "landing" && parent.animation.name != "attack"))) {
    if (parent.velocity.y >= GRAVITY && parent.coyoteTime < 1) { //falling anim
      if (parent.animationFacing == 1 && parent.animation.name != "falling") {
        parent.animation = FALLING;
        parent.animation.start = tick;
        parent.animation.current = 0;
      } else if (parent.animationFacing == -1 && parent.animation.name != "falling") {
        parent.animation = FALLINGLEFT;
        parent.animation.start = tick;
        parent.animation.current = 0;
      }
    } else if (parent.velocity.y < 0) { //jump anim
      if (parent.animationFacing == 1) {
        parent.animation = JUMP;
        parent.animation.start = tick-1;
        parent.animation.current = 2;
      } else {
        parent.animation = JUMPLEFT;
        parent.animation.start = tick-1;
        parent.animation.current = 2;
      }
    }
  } 
  if (parent.attacks.includes("sword") || parent.attacks.includes("staff")) {
    for (var i=0;i<parent.children.length;i++) {
      var that = parent.children[i];
      if (that.name == "sword" || that.name == "staff") {
        if (that.animation) {
          if (parent.animation.name != "swing") {
            if (parent.facing == 1) {
              parent.animation = SWING;
            } else {
              parent.animation = SWINGLEFT;
            }
          }
          parent.animation.current = that.animation.current;
          parent.animation.start = tick-that.animation.current;
        }
      }
    }
  }
  if (parent.inventory.includes("necklace")) {
    necklace.visible = true;
    if (!parent.children.includes(necklace)) {
      parent.children.push(necklace);
    }
  } else {
    necklace.visible = false;
  }
}

function reface(parent) {
  if (parent.velocity.x > 0) {
    parent.facing = 1;
  } else if (parent.velocity.x < 0) {
    parent.facing = -1;
  }
}
function swingSword(parent) {
  if (parent.inventory.includes("sword") && !parent.attacks.includes("sword")) {
    parent.charging = false;      
    SWORD.start = tick;
    SWORDLEFT.start = tick;        
    SWING.start = tick;
    SWINGLEFT.start = tick;
    var sword = new body(new vector(parent.position.x-8,parent.position.y), new sprite(new vector(0,0), new vector(0,0)));
    sword.fizzles = true;
    sword.solid = false;
    sword.visible = false;
    sword.name = "sword";
    sword.debounce = 0;
    parent.attacks.push("sword");
    parent.children.push(sword);
    collisions.push(sword);
    sword.parent = parent;
    playSound("swordswing");
    reface(parent);
  }
}

function swingStaff(parent) {
  if (player.inventory.includes("staff") && !player.attacks.includes("staff")) {
    parent.charging = false;
    STAFF.start = tick;
    STAFF.current = 0;
    STAFFLEFT.start = tick;        
    STAFFLEFT.current = 0;
    var staff = new body(new vector(parent.position.x-8,parent.position.y), new sprite(new vector(0,0), new vector(0,0)));
    staff.fizzles = true;
    staff.solid = false;
    staff.visible = false;
    staff.name = "staff";
    staff.debounce = 0;
    parent.attacks.push("staff");
    parent.children.push(staff);
    collisions.push(staff);
    staff.parent = parent;
    playSound("swordswing");
    reface(parent)
  }
}

function mistAttack(parent) {
  if (player.mana >= 10 && (!player.animation || (player.animation.name != "attack" || player.animation.current > 4))) {
    parent.charging = false;
    if (parent.facing == 1) {
      parent.animation = ATTACK;
    } else {
      parent.animation = ATTACKLEFT;
    }
    playSound("attack");
    parent.animation.start = tick;
    parent.animation.current = 0;
    if (!parent.actions.includes("attack")) {
      parent.actions.push("attack");
      parent.actionTimers.push([tick,0,1]);
    }  
  }
  reface(parent)
}

function playerJump(parent) {
  if (parent.jumps > 0) {
    playSound("jump");
    var maxJump = 3; //jump charge ends here
    var minJump = .5;
    parent.velocity.y = Math.ceil(Math.min(-JUMPPOWER*minJump, -JUMPPOWER*(parent.jumpCharge/maxJump)));
    console.log(parent.velocity.y);
    parent.jumpCharge = 0;
    parent.freefall = true;
    parent.jumping = false;
    parent.onplatform = false;
    parent.onladder = false;
    parent.climbing = false;
    parent.jumps -= 1;
    parent.jumpCancel = false;
    parent.coyoteTime = 0;
    reface(parent);
  }      
}