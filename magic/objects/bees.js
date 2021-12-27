function bees(parent) {
  const DAMAGE = 8;
  const DEBOUNCE = 6;
  const MISTDAMAGE = 3;
  const SWORDDAMAGE = 1.1;
  const FIREDAMAGE = 2.1;
  const RANGE = 8;
  if (player.position.x+player.sprite.size.x/2 + -player.facing*TILE > parent.position.x+parent.sprite.size.x/2) {
    parent.facing = 1;
  } else {
    parent.facing = -1
  }
  console.log("BEESPAWN")
  if (player.position.distance(parent.position) < RANGE*TILE) {
    var speed = Math.round(player.position.distance(parent.position)/TILE/3);
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
    parent.velocity.x += goalX/Math.max(1,Math.abs(goalX));
    parent.velocity.y += goalY/Math.max(1,Math.abs(goalY));
    if (player.position.y > parent.position.y+parent.sprite.size.y/2) {
      var goalY = 1*Math.ceil(speed/2) - parent.velocity.y;
    } else {
      var goalY = -1*Math.ceil(speed/2) - parent.velocity.y;
    }
    if (parent.debounce != 0) {
      parent.facing = -parent.facing;
      parent.velocity.x = parent.facing*4;
      parent.velocity.y = -4;
    }
  } else {
    parent.velocity.x = 0;
    parent.velocity.y = 0;
  }
  if (parent.facing == 1) {
    parent.animation = BEESRIGHT;
  } else {
    parent.animation = BEES;
  }      
  var hits = parent.collision();
  for (var i=0;i<hits.length;i++) {
    var that = hits[i];
    if (that.name == "bees") {
      var parentCenter = new vector(parent.position.x+parent.sprite.size.x/2, parent.position.y+parent.sprite.size.y/2);
      var thatCenter = new vector(that.position.x+that.sprite.size.x/2, that.position.y+that.sprite.size.y/2);
      var intersection = new vector((parentCenter.x+thatCenter.x)/2,(parentCenter.y+thatCenter.y)/2);
      parent.velocity.x += (parent.position.x-intersection.x)/8;
      parent.velocity.y += (parent.position.y-intersection.y)/8;
      that.velocity.x += (that.position.x-intersection.x)/8;
      that.velocity.y += (that.position.y-intersection.y)/8;
    }
    if (that.name == "player") {
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