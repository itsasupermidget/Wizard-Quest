function skeleboss(parent) {
  const KNOCKBACK = 6;
  const MISTDAMAGE = 32;
  const SWORDDAMAGE = 20;
  const SHARDDAMAGE = 60;
  const FIREDAMAGE = 20;
  const RANGE = 14;
  if (parent.position.distance(player.position) < RANGE*TILE) {
    var phase1 = (parent.health <= 50);
    var phase2 = (parent.health <= 33 && enemies < 4);
    if (parent.animation == BOSSDROP) {
      if (enemies < 3 || phase2) {
        parent.facing = 1;
        if (parent.animation.current == 4) {
          var minion = new body(new vector(parent.position.x, parent.position.y+16),new sprite(new vector(0,48), new vector(16,16)));
          minion.name = "skeleton";
          minion.gravity = true;
          minion.solid = false;
          minion.animation = SKELETONWALK;
          minion.velocity.x = (player.position.x-minion.position.x)/Math.abs(player.position.x-minion.position.x)*2;
          if (phase1) {
            minion.acceleration.x = (player.position.x-minion.position.x)/Math.abs(player.position.x-minion.position.x);
            minion.gravity = false;        
          }
          collisions.push(minion);
          enemies += 1;
        }
        if (parent.animation.current == parent.animation.order.length-1) {
          parent.animation = BOSSDUCK;
          parent.animation.start = tick;
          parent.animation.current = 0;
        }
      } else if (parent.animation.current == parent.animation.order.length-1) {
        parent.animation = BOSSSTOMP;
        parent.animation.start = tick;
        parent.animation.current = 0;        
      }
    }
    if (parent.animation == BOSSSTOMP) {
      if (parent.animation.current == 9) {
        for (var i=0;i<collisions.length;i++) {
          var item = collisions[i];
          if (item && item.name == "spikes") {
            item.velocity.y = -12;
            item.gravity = true;
          }
          if (item && item.name == "rocks") {
            item.velocity.y = 4;
          }
          if (item && item.name == "skeleton") {
            item.hit(4,2);
            if (phase1) {
              item.hit(4);
            }
            if (phase2) {
              item.hit(4);
            }
            item.velocity.y = -13;
            if (phase1) {
              item.gravity = !item.gravity;
            } else {
              item.gravity = true;
            }
          }
          if (item && item.name == "player") {
            if (!player.onladder && (player.velocity.y == 0 || player.onplatform)) {
              player.velocity.x = 0;
              player.velocity.y = -5;
            }
          }
        }          
      }
      if (parent.animation.current == parent.animation.order.length-1 || parent.facing == -1) {
        parent.facing = -1;
        parent.animation.start = tick;        
        if (enemies < 3 || phase2) {
          parent.animation = BOSSDROP;
          parent.animation.start = tick;
        } else {
          parent.animation = BOSSDUCK;
          parent.facing = 1;
          parent.animation.start = tick;
          parent.animation.current = 0;
        }
      }
    }
    if (parent.animation == BOSSDUCK) {
      if (parent.animation.current >= 12 && parent.animation.current <= 14) {
        parent.visible = false;
      } else {
        parent.visible = true;
      }
      if (parent.animation.current == 14) {
        if (!phase2) {
          if (parent.position.x == 360) {
            if (player.position.x < 360) {
              parent.position.x = 232;
            } else {
              parent.position.x = 488;
            }
          } else {
            parent.position.x = 360
          }
        } else {
          if (parent.position.x == 232) {
            parent.position.x = 360;
          } else if (player.position.x < 360) {
            parent.position.x = 488;
          } else {
            parent.position.x = 232;
          }
        }
      }
      if (phase2) {
        parent.animation.current += 1;
        parent.animation.start -= 1;
      }
      if (parent.animation.current >= parent.animation.order.length-1) {
        if (enemies < 3 || phase2) {
          parent.animation = BOSSDROP;
          parent.animation.start = tick;
        } else {
          parent.animation = BOSSSTOMP;
          parent.animation.start = tick;
          parent.animation.current = 0;
        }
      }
    }      
  }
  var hits = parent.collision();
  for (var i=0;i<hits.length;i++) {
    var that = hits[i];
    var reflecting = ((parent.animation == BOSSDUCK && parent.animation.current >= parent.animation.order.length/3) || parent.animation == BOSSDROP);
    if (that.name == "player") {
      var xDistance = Math.round((that.position.x+that.sprite.size.x/2-(parent.position.x+parent.sprite.size.x/2))/2);
      if (Math.abs(xDistance) < 12) {
        if (Math.abs(xDistance) <= TILE/2 && that.canMove(new vector(0,-TILE/2))) {
          that.bounce(parent);
        } else if (that.canMove(new vector(xDistance,0))) {
          that.velocity.x = -KNOCKBACK*that.facing;
        }
      }
    }    
    if (!reflecting) {
      var oldhp = parent.health;-that.velocity.x*2
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
        parent.hit(FIREDAMAGE);
        that.health = 0;
        that.dead = true;
      }
      if (oldhp > parent.health) {
        parent.animation = BOSSDUCK;
        parent.animation.start = tick-9;
        parent.animation.current = 9;
      }
    } else {
      if (that.name == "mist" || that.name == "fire" || that.name == "shard") {
        that.facing = -that.facing;
        that.velocity.x = -that.velocity.x/2;
        that.position.x += that.velocity.x;
      }
    }
  }  
}