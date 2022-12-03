function skeleton(parent) {
  const DAMAGE = 5;
  const KNOCKBACK = 10;
  const DEBOUNCE = 10;
  const MISTDAMAGE = 4;
  const MISTKNOCKBACK = 8;
  const MISTSTUN = 4;
  const SWORDDAMAGE = 3;
  const SWORDKNOCKBACK = 7;
  const SWORDSTUN = 5;
  const SHARDDAMAGE = 9;
  const FIREDAMAGE = 2;
  const FIREKNOCKBACK = 4;
  const FIRESTUN = 5;
  const SPEED = 2;
  const RANGE = 12;
  const JUMP = 16;
  var distance = player.position.distance(parent.position);
  if (player.position.x > parent.position.x) {
    parent.facing = 1;
  } else {
    parent.facing = -1;
  }
  if (parent.animation == SKELETONSTOOL) {
    if (parent.animation.current == parent.animation.order.length-1) {
      parent.animation = SKELETONWALK;
    }
  }
  if (distance < TILE*COMBATRANGE && COMBATHP <= distance) {
    COMBATHP = distance;
    player.facing = -parent.facing;
  }
  var goal = 0;
  if (player.position.x != parent.position.x && distance < RANGE*TILE && !parent.flicker) {
    goal = parent.facing*SPEED;
  }
  if (parent.velocity.x < goal) {
    parent.velocity.x += 1;
  }
  if (parent.velocity.x > goal) {
    parent.velocity.x -= 1;
  }
  if (!parent.gravity) {
    if (player.position.y+player.sprite.size.y/2 < parent.position.y+parent.sprite.size.y/2) {
      parent.velocity.y = -1;
    } else {
      parent.velocity.y = 1;
    }
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
    if (that.name == "player") {
      if (parent.debounce == 0 && !parent.flicker) {
        parent.debounce = DEBOUNCE;
        if (that.velocity.y >= parent.velocity.y && that.jumpCharge == 0) {
          if (!(that.velocity.y > parent.velocity.y)) {
            that.hit(DAMAGE);
          }
          parent.velocity.x = -parent.facing*KNOCKBACK;
        }
        if (that.jumpCharge > 0 || that.jumping) {
          parent.animation = SKELETONSTOOL;
          parent.animation.start = tick;
          parent.animation.current = 0;        
        }
        if (that.velocity.y > parent.velocity.y) {
          that.bounce(parent);
        }
      }
    }
    if (that.name == "mist") {
      parent.hit(MISTDAMAGE, MISTSTUN);
      that.health = 0;
      that.dead = true;
      parent.velocity.x = -parent.facing*MISTKNOCKBACK;
      parent.gravity = true;
    }
    if (that.name == "sword") {
      if (that.debounce == 0) {
        parent.hit(SWORDDAMAGE, SWORDSTUN);
        that.debounce = 10;
      }
      if (parent.health > 0) {
        parent.velocity.x = -parent.facing*SWORDKNOCKBACK;
        parent.gravity = true;
      }
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
      parent.gravity = true;            
    }
  }
}