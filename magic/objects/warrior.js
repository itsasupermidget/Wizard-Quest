function warrior(parent) {
  const DAMAGE = 5;
  const DEBOUNCE = 10;
  const KNOCKBACK = 8;
  const MISTDAMAGE = 16;
  const MISTKNOCKBACK = 4;
  const MISTSTUN = 2;
  const SWORDDAMAGE = 5;
  const SWORDKNOCKBACK = 4;
  const SWORDSTUN = 4;
  const SHARDDAMAGE = 15;
  const FIREDAMAGE = 8;
  const FIREKNOCKBACK = 2;
  const FIRESTUN = 3;
  const RANGE = 16; 
  if (player.position.x+player.sprite.size.x/2 < parent.position.x+parent.sprite.size.x/2) {
    parent.facing = -1;
  } else {
    parent.facing = 1;
  }  
  if ((parent.animation == WARRIOR || parent.animation == WARRIORRIGHT) || parent.walking < 1) {
    if (parent.facing == -1) {
      parent.animation = WARRIOR;
    } else {
      parent.animation = WARRIORRIGHT;
    }
  }      
  var distance = player.position.distance(parent.position);
  if (distance < RANGE*TILE && Math.abs(player.position.y-parent.position.y) < 6*TILE && !parent.flicker) {
    var speed = Math.max(distance/TILE/4,1);
    if (distance > 8*TILE) {
      parent.walking = 0;
    }
    var evade = 1;
    if (distance < 6*TILE && distance > 4*TILE) {
      evade = -1;
    }
    if ((distance > 5*TILE && distance <= 7*TILE)) {
      if (evade == -1) {
        evade = 0;
      }
      if (parent.animation == WARRIOR || parent.animation == WARRIORRIGHT) {
        parent.animation.start = tick;
      }
    }
    if (parent.walking < 10 || evade == -1) {
      parent.velocity.x = speed*parent.facing*evade;
    }
    if (!parent.canMove(new vector(parent.velocity.x, 0)) && parent.velocity.x != 0 && !parent.canMove(new vector(0,1))) {
      parent.velocity.y = -10;
    }
    if (parent.animation.current == parent.animation.order.length-1 && parent.walking < 1) {
      parent.walking = 25;
    }
    if ((parent.animation == WARRIOR || parent.animation == WARRIORRIGHT) && parent.mana >= 30 && parent.walking < 1) {
      if (parent.children.length > 0) {
        collisions.splice(collisions.indexOf(parent.children[0]),1);
        parent.children = [];
      }
      if (parent.facing == -1) {
        parent.animation = WARRIORSWING;
      } else {
        parent.animation = WARRIORSWINGRIGHT;
      }
    }
    if (parent.animation == WARRIORSWING || parent.animation == WARRIORSWINGRIGHT) {
      if (parent.animation.current == 7 || parent.animation.current == 9) {
        if (parent.mana >= 15) {
          var attack = new body(new vector(parent.position.x+16*parent.facing,parent.position.y+8), new sprite(new vector(0,0), new vector(0,0)));
          attack.animation = new animation(FIRE.sprites,FIRE.order,FIRE.speed);
          attack.animation.start = tick;
          if (parent.facing == -1) {
            attack.animation = new animation(FIRELEFT.sprites,FIRELEFT.order,FIRELEFT.speed);
            attack.animation.start = tick;
          }
          attack.facing = parent.facing;
          attack.fizzles = true;
          attack.solid = false;
          attack.name = "flames";
          attack.velocity.x = parent.facing*6;
          attack.acceleration.y = -1;
          collisions.push(attack);
          parent.mana -= 12;
        }
      }
    } else {
      if (parent.children.length < 1) {
        var shield = new body(new vector(0,0), SHIELD);
        shield.name = "shield";
        shield.solid = false;
        shield.parent = parent;
        parent.children.push(shield);
        collisions.push(shield);
        parent.walking = 25;
      } else {
        parent.walking -= 1;
      }
    }
  }
  var hits = parent.collision();
  for (var i=0;i<hits.length;i++) {
    var that = hits[i];
    var shield = parent.children.length > 0 && parent.children[0].collision() && parent.children[0].collision().includes(that);
    if (that.name == "player" && parent.debounce == 0 && !parent.flicker) {
      that.hit(DAMAGE)
      that.velocity.x = parent.facing*KNOCKBACK;
      that.velocity.y = -KNOCKBACK;
      parent.debounce = DEBOUNCE;
    }
    if (that.name == "mist" && !that.dead) {
      if (!shield) {
        parent.hit(MISTDAMAGE, MISTSTUN);
      }
      that.health = 0;
      that.dead = true;
      parent.velocity.x = -parent.facing*MISTKNOCKBACK;
    }
    if (that.name == "sword" && that.debounce == 0) {
      if (!shield) {
        parent.hit(SWORDDAMAGE, SWORDSTUN);
      }
      that.debounce = 10;
      parent.velocity.x = -parent.facing*SWORDKNOCKBACK;
      if (parent.canMove(new vector(parent.velocity.x,0))) {
        parent.position.x += parent.velocity.x;
      }        
      parent.velocity.y = -6;
    }  
    if (that.name == "shard") {
      parent.hit(SHARDDAMAGE);
      that.health = 0;
      that.dead = true;
    }                  
    if (that.name == "fire") {
      if (!shield) {
        parent.hit(FIREDAMAGE, FIRESTUN);
      }
      that.health = 0;
      that.dead = true;
      parent.velocity.x = -parent.facing*FIREKNOCKBACK;          
    }        
  }  
}