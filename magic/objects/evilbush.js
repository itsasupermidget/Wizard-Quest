function evilBush(parent) {
  const DAMAGE = 5;
  const DEBOUNCE = 5;
  const KNOCKBACK = 10;
  const MISTDAMAGE = 5;
  const MISTSTUN = 4;
  const SWORDDAMAGE = 3;
  const SWORDSTUN = 10;
  const SHARDDAMAGE = 9;
  const FIREDAMAGE = 3;
  const FIRESTUN = 5;
  const SPEED = 5;
  const RANGE = 7;
  var dist = parent.position.distance(player.position);
  if (dist < RANGE*TILE && !parent.flicker) {
    if (player.position.x < parent.position.x) {
      parent.facing = -1;
    } else {
      parent.facing = 1;
    }
    if (parent.canMove(new vector(0,1))) {
      parent.position.x -= parent.velocity.x;
      parent.velocity.x = 0;
    }
    if (!parent.canMove(new vector(parent.facing*TILE,TILE)) && parent.animation.current > 9) {
      var goal = parent.facing*SPEED;
      if (parent.velocity.x != goal) {
        if (parent.velocity.x < goal) {
          parent.velocity.x += 1;
        } else {
          parent.velocity.x -= 1;
        }
      }
    } else {
      parent.velocity.x = 0;
    }
  } else {
    parent.velocity.x = 0;
    parent.animation.start = tick-12;
    parent.animation.current = 12;
  }
  var hits = parent.collision();
  for (var i=0;i<hits.length;i++) {
    var that = hits[i];
    if (parent.animation.current > 9) {
      if (that.name == "player" && parent.debounce == 0 && ((parent.position.y+parent.sprite.size.y) - (that.position.y+that.sprite.size.y)) < 8 && !parent.flicker) {
        parent.debounce = DEBOUNCE;
        that.hit(DAMAGE);
        parent.velocity.x += -parent.facing*KNOCKBACK;
      }
    }
    if (parent.animation.current > 6) {
      if (that.name == "mist") {
        parent.hit(MISTDAMAGE, MISTSTUN);
        that.health = 0;
        that.dead = true;
      }
      if (that.name == "sword" && that.debounce == 0) {
        parent.hit(SWORDDAMAGE, SWORDSTUN);
        that.debounce = 10;
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
      }
    }
  }  
}