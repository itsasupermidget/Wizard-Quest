function monkey(parent) {
  const DAMAGE = 7;
  const DEBOUNCE = 10;
  const KNOCKBACK = 6;
  const MISTDAMAGE = 4;
  const MISTKNOCKBACK = 4;
  const MISTSTUN = 2;
  const SWORDDAMAGE = 3;
  const SWORDKNOCKBACK = 4;
  const SWORDSTUN = 5;
  const SHARDDAMAGE = 9;
  const FIREDAMAGE = 3;
  const FIREKNOCKBACK = 2;
  const FIRESTUN = 3;
  const RANGE = 16;
  const CLOSERANGE = 7;
  const JUMP = 20;
  const SPEED = 3;
  var ANIMS = [MONKEY,MONKEYLEFT,MONKEYJUMP,MONKEYJUMPLEFT,MONKEYHANGING,MONKEYHANGINGLEFT];
  if (parent.health > 100) {
    ANIMS = [SKELEMONKEY,SKELEMONKEYLEFT,SKELEMONKEYJUMP,SKELEMONKEYJUMPLEFT,SKELEMONKEYHANGING,SKELEMONKEYHANGINGLEFT];
  }
  var dist = player.position.distance(parent.position);
  if (dist/TILE < RANGE) {
    if (!parent.flicker) {
      if (player.position.x+player.sprite.size.x/2 < parent.position.x+parent.sprite.size.x/2) {
        parent.facing = -1;
      } else {
        parent.facing = 1;
      }    
      if (!parent.animation || parent.animation.name != "hanging") {
        if (parent.facing == -1) {
          parent.animation = ANIMS[1];
        } else {
          parent.animation = ANIMS[0];
        }
        if (parent.velocity.x == 0) {
          parent.animation.start = tick;
        }
      }
      var playerAbove = player.position.y+player.sprite.size.y < parent.position.y+parent.sprite.size.y;
      if (dist/TILE > CLOSERANGE) {
        if ((Math.abs(parent.velocity.x) > SPEED-1 || playerAbove || !parent.canMove(new vector(parent.facing,0))) && (!parent.canMove(new vector(0,1)) || parent.onplatform != false)) {
          parent.velocity.y = -JUMP;
        }
      }
      if (parent.velocity.y != 0 && parent.onplatform == false) {
        if (parent.facing == 1) {
          parent.animation = ANIMS[2];
        } else {
          parent.animation = ANIMS[3];
        }
        parent.animation.start = tick;    
      }
      var goal = parent.facing*SPEED;
      if (tick % 2 != 0) {
        goal = parent.facing*(SPEED+1);
      }     
      var edge = parent.canMove(new vector(goal,1), true);
      if (tick % 2 != 0) {
        if (goal > parent.velocity.x) {
          parent.velocity.x += 1;
        } else if (goal < parent.velocity.x) {
          parent.velocity.x -= 1;
        }
      }
      if (edge && !parent.canMove(new vector(0,-1),true) && !(parent.animation && parent.animation.name == "hanging")) {
        if (playerAbove) {
          parent.velocity.y = -JUMP;
        } else {
          parent.velocity.x = 0;
          parent.animation.start = tick-3;
        }
      }
      if (parent.canMove(new vector(0,-1),true)) {
        parent.gravity = true;
      }
      if (parent.animation && parent.animation.name == "hanging") {
        parent.velocity.x = 0;
      }
      if (parent.animation && parent.animation.name == "hanging" && parent.animation.current == parent.animation.order.length-1 && dist/TILE < CLOSERANGE) {
        parent.velocity.x = Math.sqrt(dist)*parent.facing;
        parent.velocity.y = -JUMP;
        parent.gravity = true;
      }    
      if (parent.onplatform != false && parent.position.y < player.position.y) {
        parent.drop = true;
      } else {
        parent.drop = false;
      }
      var hits = parent.collision();
      for (var i=0;i<hits.length;i++) {
        var that = hits[i];
        if ((that.name == "platform" || that.name == "corner") && (that.position.y+11 < parent.position.y || that.position.y+11 < parent.position.y-parent.velocity.y/2) && parent.velocity.y > -JUMP) {
          if (parent.facing == 1) {
            parent.animation = ANIMS[4];
          } else {
            parent.animation = ANIMS[5];
          }
          if (parent.gravity) {
            parent.animation.start = tick; 
            parent.position.y = that.position.y+that.sprite.size.y-1
            parent.gravity = false;
            parent.velocity.y = 0;
          }
        }
        var xDistance = Math.round((that.position.x+that.sprite.size.x/2-(parent.position.x+parent.sprite.size.x/2))/2);
        if ((that.name == "monkey" || that.name == "player") && that.health > 0) {
          var thatVel = that.velocity.x;
          if (that.name == "monkey") {
            that.velocity.x = -parent.velocity.x;
          }
          parent.velocity.x = -thatVel;          
          parent.velocity.x += -Math.floor(xDistance/2);
          parent.velocity.y = -JUMP/2;
          parent.position.y -= 1;
        }        
        if (that.name == "player") {
          if (parent.debounce == 0 && !parent.flicker) {
            parent.debounce = DEBOUNCE;
            that.hit(DAMAGE);
          }
          parent.velocity.x = -parent.facing*KNOCKBACK;
        }
        if (that.name == "mist") {
          parent.velocity.x = -parent.facing*MISTKNOCKBACK;
          parent.hit(MISTDAMAGE, MISTSTUN);
          that.health = 0;
          that.dead = true;
        }
        if (that.name == "sword" && that.debounce == 0) {
          parent.velocity.x = -parent.facing*SWORDKNOCKBACK;
          if (parent.canMove(new vector(parent.velocity.x,0))) {
            parent.position.x += parent.velocity.x;
          }            
          parent.hit(SWORDDAMAGE, SWORDSTUN);
          that.debounce = 10;
        }      
        if (that.name == "shard") {
          parent.hit(SHARDDAMAGE);
          that.health = 0;
          that.dead = true;
        }
        if (that.name == "fire") {
          parent.velocity.x = -parent.facing*FIREKNOCKBACK;
          parent.hit(FIREDAMAGE, FIRESTUN);
          that.health = 0;
          that.dead = true;
        }
      }
    }
  } else {
    parent.velocity.x = 0;
  }
}