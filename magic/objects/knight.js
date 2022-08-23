function knight(parent) {
  const DAMAGE = 3;
  const KNOCKBACK = 10;
  const MISTDAMAGE = 6;
  const MISTKNOCKBACK = 5;
  const MISTSTUN = 4;
  const SWORDDAMAGE = 5;
  const SWORDKNOCKBACK = 7;
  const SWORDYKNOCKBACK = 6;
  const SWORDSTUN = 4;
  const SHARDDAMAGE = 15;
  const FIREDAMAGE = 5;
  const FIREKNOCKBACK = 2;  
  const FIRESTUN = 3;
  const RANGE = 10;
  var xDistance = Math.round(player.position.x+player.sprite.size.x/2-(parent.position.x+parent.sprite.size.x/2));
  parent.facing = (xDistance)/Math.max(1,Math.abs(xDistance));
  if (parent.facing == -1) {
    parent.animation = KNIGHT;
  } else {
    parent.animation = KNIGHTRIGHT;
  }       
  if (Math.abs(xDistance) < TILE*COMBATRANGE && COMBATHP <= xDistance) {
    COMBATHP = Math.abs(xDistance);
    if (parent.facing == -1) {
      parent.animation = KNIGHTATTACK;
    } else {
      parent.animation = KNIGHTATTACKRIGHT;
    }
    player.facing = -parent.facing;
  }        
  var goal = 0;
  if (player.position.x != parent.position.x && xDistance < RANGE*TILE && Math.abs(xDistance) > player.sprite.size.x/2 && !parent.flicker) {
    var speed = Math.round((Math.abs(xDistance)+TILE)/TILE/4)+1;
    if (speed < 1) {
      speed = 1;
    }
    if (speed > 5) {
      speed = 5;
    }
    if ((parent.animation == KNIGHTATTACK || parent.animation == KNIGHTATTACKRIGHT) && parent.animation.current > parent.animation.order.length/2) {
      speed = 7;
    }
    goal = speed*parent.facing;
  }
  if (parent.velocity.x < goal) {
    parent.velocity.x += 1;
  } else {
    parent.velocity.x -= 1;
  }
  var hits = parent.collision();
  for (var i=0;i<hits.length;i++) {
    var that = hits[i];
    var xDistance = Math.round((that.position.x+that.sprite.size.x/2-(parent.position.x+parent.sprite.size.x/2))/2);
    if ((that.name == "skeleton" || that.name == "knight") && that.health > 0) {
      if ((that.facing == 1 && that.position.x < parent.position.x) || (that.facing == -1 && that.position.x > parent.position.x)) {
        that.velocity.x = -that.velocity.x/2;
        parent.velocity.x += -that.velocity.x;
      } else {
        parent.velocity.x = -parent.velocity.x/2;
        that.velocity.x += -parent.velocity.x;
      }
    }
    if (that.name == "player" && that.position.y+that.sprite.size.y > parent.position.y+8 && Math.abs(xDistance) < TILE/3) {
      if (parent.debounce == 0 && !parent.flicker) {
        that.hit(DAMAGE);
        parent.debounce = KNIGHTATTACK.order.length;
      }
      that.bounce(parent);
      that.velocity.x = parent.facing*KNOCKBACK;
      that.velocity.y = -SWORDYKNOCKBACK;
      parent.velocity.x = -parent.facing*KNOCKBACK;
    }
    if (that.name == "mist") {
      parent.hit(MISTDAMAGE, MISTSTUN);
      that.health = 0;
      that.dead = true;
      parent.velocity.x = -parent.facing*MISTKNOCKBACK;
    }
    if (that.name == "sword" && that.debounce == 0) {
      parent.hit(SWORDDAMAGE, SWORDSTUN);
      that.debounce = 10;
      parent.velocity.x = -parent.facing*SWORDKNOCKBACK;
      parent.velocity.y = -SWORDYKNOCKBACK;
    }
    if (that.name == "shard") {
      parent.hit(SHARDDAMAGE);
      that.health = 0;
      that.dead = true;
    }
    if (that.name == "fire") {
      parent.hit(FIREDAMAGE, FIRESTUN);
      that.health = 0;
      that.dead = true;
      parent.velocity.x = -parent.facing*FIREKNOCKBACK;
    }        
  }  
}