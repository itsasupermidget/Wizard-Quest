function plant(parent) {
  const DAMAGE = 3;
  const DEBOUNCE = 4;
  const MISTDAMAGE = 6;
  const SWORDDAMAGE = 4;
  const SHARDDAMAGE = 12;
  const FIREDAMAGE = 4;
  const RANGE = 12;
  if (player.position.distance(parent.position) < TILE*RANGE && parent.animation == PLANT) {
    if (tick%24 == 0) {
      if (player.position.y+player.sprite.size.y < parent.position.y && player.position.distance(parent.position) < TILE*5) {
        parent.animation = PLANTUP;
        parent.animation.start = tick;
      } else {
        if (player.position.x+player.sprite.size.x/2 <= parent.position.x+parent.sprite.size.x/2) {
          parent.animation = PLANTLEFT;
          parent.animation.start = tick;
          parent.facing = -1;
        } else {
          parent.animation = PLANTRIGHT;
          parent.animation.start = tick;
          parent.facing = 1;
        }
      }
    }
  } else if (parent.animation.current == parent.animation.order.length-1) {
    parent.animation = PLANT;
    parent.position.x = parent.spawnPos.x;
    parent.position.y = parent.spawnPos.y;
  }
  function spikeBall(x,y,vX,vY) {
    if (parent.health > 0) {
      var spikes = new body(new vector(x,y), new sprite(new vector(0,0), new vector(0,0)));
      spikes.animation = SPIKEBALL;
      spikes.animation.start = tick;
      spikes.animation.current = 0;
      spikes.velocity = new vector(vX,vY);
      spikes.gravity = false;
      spikes.fizzles = true;
      spikes.name = "spikeball";
      spikes.solid = false;
      spikes.facing = vX/Math.abs(vX);
      collisions.push(spikes);
    }
  }
  if (parent.animation == PLANTUP) {
    if (parent.animation.current == 4) {
      parent.position.y = parent.spawnPos.y-8;
      spikeBall(parent.position.x+parent.sprite.size.x/2-4,parent.position.y+4,0,-4);
    }
    if (parent.animation.current == 12) {
      parent.position.y = parent.spawnPos.y;
    }
  }
  if (parent.animation == PLANTLEFT) {
    if (parent.animation.current == 2) {
      parent.position.x = parent.spawnPos.x-6;
    }
    if (parent.animation.current == 4) {
      parent.position.x = parent.spawnPos.x-16;
      spikeBall(parent.position.x+4,parent.position.y+2,-4,0);
    }        
    if (parent.animation.current == 8) {
      parent.position.x = parent.spawnPos.x-8;
    }
    if (parent.animation.current == 12) {
      parent.position.x = parent.spawnPos.x;
    }
  } 
  if (parent.animation == PLANTRIGHT && parent.animation.current == 4) {
    spikeBall(parent.position.x+parent.sprite.size.x-4,parent.position.y+2,4,0);
  }
  var hits = parent.collision();
  for (var i=0;i<hits.length;i++) {
    var that = hits[i];
    if (that.name == "player" && parent.debounce == 0) {
      var strength = 3;
      if (parent.animation != PLANT) {
        if (player.position.x+player.sprite.size.x/2 < parent.position.x+parent.sprite.size.x/2) {
          that.velocity.x -= 8;
        } else {
          that.velocity.x += 8;
        }
        that.velocity.y -= 4;            
        that.hit(DAMAGE);
        parent.debounce = DEBOUNCE;
      }
    }
    if (that.name == "mist") {
      parent.hit(MISTDAMAGE);
      that.health = 0;
      that.dead = true;
    }
    if (that.name == "sword" && that.debounce == 0) {
      parent.hit(SWORDDAMAGE);
      that.debounce = 10;
    }
    if (that.name == "shard") {
      parent.hit(SHARDDAMAGE);
      that.health = 0;
      that.dead = true;
    }        
    if (that.name == "fire") {
      if (parent.animation.order[parent.animation.current] == 2) {
        that.gravity = true;
        that.velocity.x = parent.facing;
      } else {
        parent.hit(FIREDAMAGE);
        that.health = 0;
        that.dead = true;
      }
    }
  }                
}