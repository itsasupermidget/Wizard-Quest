function beeChase(parent, target) {
  var speed = Math.round(target.position.distance(target.position)/TILE/1.5);
  if (speed < 1) {
    speed = 1;
  }
  if (speed > 5) {
    speed = 5;
  }
  if (parent.velocity.x > 5) {
    parent.velocity.x = 5;
  }
  if (parent.velocity.x < -5) {
    parent.velocity.x = -5;
  }
  if (parent.velocity.y > 5) {
    parent.velocity.y = 5;
  }      
  if (parent.velocity.y < -5) {
    parent.velocity.y = -5;
  }
  var goalX = parent.facing*speed - parent.velocity.x;
  var goalY = (target.position.y-parent.position.y)/Math.max(1,Math.abs((target.position.y-parent.position.y)))*speed - parent.velocity.y;
  parent.velocity.x += goalX/Math.max(1,Math.abs(goalX));
  parent.velocity.y += goalY/Math.max(1,Math.abs(goalY));
  if (player.position.y > parent.position.y+parent.sprite.size.y/2) {
    var goalY = 1*Math.ceil(speed/2) - parent.velocity.y;
  } else {
    var goalY = -1*Math.ceil(speed/2) - parent.velocity.y;
  }
  if (parent.debounce != 0) {
    parent.facing = -parent.facing;
    parent.velocity.x = parent.facing*2;
    parent.velocity.y = -2;
  }
}
function bees(parent) {
  const DAMAGE = 8;
  const DEBOUNCE = 6;
  const MISTDAMAGE = 3;
  const SWORDDAMAGE = 1.1;
  const FIREDAMAGE = 2.1;
  const RANGE = 9;
  if (player.position.x+player.sprite.size.x/2 + -player.facing*TILE > parent.position.x+parent.sprite.size.x/2) {
    parent.facing = 1;
  } else {
    parent.facing = -1
  }
  if (parent.facing == 1) {
    parent.animation = BEESRIGHT;
  } else {
    parent.animation = BEES;
  }      
  if (player.position.distance(parent.position) < RANGE*TILE) {
    beeChase(parent, player);
  } else {
    if (parent.owner) {
      beeChase(parent, parent.owner);
    } else {
      parent.velocity.x = 0;
      parent.velocity.y = 1;
    }
  }
  var hits = parent.collision();
  for (var i=0;i<hits.length;i++) {
    var that = hits[i];
    if (that.name == "bees" || that.solid && parent.sprite && that.sprite) {
      var parentCenter = new vector(parent.position.x+parent.sprite.size.x/2, parent.position.y+parent.sprite.size.y/2);
      var thatCenter = new vector(that.position.x+that.sprite.size.x/2, that.position.y+that.sprite.size.y/2);
      var intersection = new vector((parentCenter.x+thatCenter.x)/2,(parentCenter.y+thatCenter.y)/2);
      parent.velocity.x += (parent.position.x-intersection.x)/4;
      parent.velocity.y += (parent.position.y-intersection.y)/4;
      if (!that.solid) {
        that.velocity.x += (that.position.x-intersection.x)/16;
        that.velocity.y += (that.position.y-intersection.y)/16;
      } else {
        parent.position.add(parent.velocity);
      }
    }
    if (that.name == "player" && parent.debounce == 0) {
      that.hit(DAMAGE);
    }
    if ((that.name == "player" || that.name == "mist" || that.name == "sword" || that.name == "fire") && parent.debounce == 0) {
      parent.debounce += DEBOUNCE;       
    }
    if (that.name == "mist" && !that.dead) {
      parent.hit(MISTDAMAGE);
      that.health = 0;
      that.dead = true;
      parent.debounce += 4;
    }
    if (that.name == "sword" && that.debounce == 0) {
      parent.hit(SWORDDAMAGE);
      that.debounce = 10;
      parent.debounce += 8;          
    }
    if (that.name == "fire") {
      parent.hit(FIREDAMAGE);
      that.health = 0;
      that.dead = true;
      parent.debounce += 6;          
    }
  }
}