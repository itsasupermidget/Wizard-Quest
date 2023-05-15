function vector(x,y) {
  this.x = x;
  this.y = y;
  this.add = function(that) {
    this.x += that.x;
    this.y += that.y;
  }
  this.distance = function(that) {
    return Math.sqrt((that.x-this.x)*(that.x-this.x)+(that.y-this.y)*(that.y-this.y));
  }
  this.slope = function(that) {
    return new vector(that.x-this.x,that.y-this.y);
  }
  this.equals = function(x,y) {
    return (this.x == x && this.y == y);
  }
  this.clone = () => new vector(this.x,this.y);
}

function body(position,s) {
  this.position = position;
  this.spawnPos = new vector(this.position.x,this.position.y);
  this.velocity = new vector(0,0);
  this.acceleration = new vector(0,0);
  this.sprite = s;
  this.animation = null;
  this.gravity = false;
  this.climbing = false;
  this.onladder = false;
  this.onplatform = false;
  this.onstairs = false;
  this.freefall = false;
  this.coyoteTime = 0;
  this.drop = false;
  this.name = "";
  this.facing = 1;
  this.animationFacing = 1;
  this.walking = 0;
  this.walkCharge = 0;
  this.jumping = false;
  this.jumpCharge = 0;
  this.jumps = 1;
  this.jumpHold = false;
  this.canFloat = false;
  this.charging = false;
  this.chargeLevel = 0;
  this.fizzles = false;
  this.attacks = [];
  this.children = [];
  this.parent = null;
  this.solid = true;
  this.maxHealth = 100;
  this.health = this.maxHealth;
  this.mana = 50;
  this.maxMana = 50;
  this.debounce = 0;
  this.dead = false;
  this.visible = true;
  this.inventory = [];
  this.flicker = false;
  this.lastHit = 0;
  this.hitTimer = 0;
  this.minions = 0;
  this.owner = null;
  this.actions = [];
  this.actionTimers = [];
  this.lives = 5;
  this.coins = 0;
  this.clone = function() {
    var thisClone = new body(new vector(this.position.x, this.position.y), new sprite(new vector(this.sprite.position.x, this.sprite.position.y), new vector(this.sprite.size.x, this.sprite.size.y)));
    thisClone.velocity = new vector(this.velocity.x, this.velocity.y);
    thisClone.gravity = this.gravity;
    thisClone.solid = this.solid;
    thisClone.name = this.name;
    return thisClone;
  }
  this.render = function(fromParent) {
    var sp = this.sprite;
    var pos = this.position;
    if (sp !== undefined && pos !== undefined && (this.visible || (this.parent && this.parent.children.includes(this)) && fromParent)) {
      if (nes.includes(this) || this == player) {
        screen.drawImage(SPRITES,sp.position.x,sp.position.y,sp.size.x,sp.size.y,(pos.x-camera.x+sp.offset.x)*SCALE,(pos.y-camera.y+sp.offset.y)*SCALE,sp.size.x*SCALE,sp.size.y*SCALE); //RENDER
      }
      if (this.children.length > 0) {
        for (var i=0;i<this.children.length;i++) {
          this.children[i].render(true);
        }
      }
      if (DEBUG) {
        screen.beginPath();
        screen.lineWidth = "2";
        screen.strokeStyle = "red";
        screen.rect((this.position.x-camera.x+this.sprite.offset.x)*SCALE,(this.position.y-camera.y+this.sprite.offset.y)*SCALE,this.sprite.size.x*SCALE,this.sprite.size.y*SCALE);
        screen.stroke();
      }
    }    
  }
  this.frameCheck = function() {
    if ((this.position.x < camera.x+SCREENWIDTH-TILE/2 && this.position.x > camera.x-TILE*2 && this.position.y < camera.y+SCREENHEIGHT && this.position.y > camera.y+TILE) || this.name == "player" || (boss) || this.health < 1 || this.velocity.y != 0 || this.name == "mist" || this.name == "fire" || this.name == "key" || this.solid) { //RENDER DISTANCE
      nes.push(this);
    }
  }
  this.play = function(fromParent) {  
    if (this.fizzles && this.animation && this.animation.current+1 == this.animation.order.length-1) {
      this.health = 0;
    }    
    if (this.health < 1) {
      if (this.name == "player") {
        if (!this.animation || this.animation.name != "death") {
          DEATH.start = tick;
          DEATH.current = 0;
          this.velocity.x = 0;
        }
        this.animation = DEATH;
        this.flicker = false;
        this.visible = true;
        this.canFloat = false;
        if (this.animation.current == this.animation.order.length-2) {
          var respawnPercent = .7;
          if (difficultyGoal == 0) {
            respawnPercent = 1;
          } else if (difficultyGoal == 1) {
            respawnPercent = .3;
          }
          if (this == player) {
            this.lives -= 1;
            if (this.lives < 0) {
              if (difficultyGoal == 0) {
                this.lives = 9;
              } else if (difficultyGoal == 1) {
                this.lives = 1;
              } else {
                this.lives = 5;
              }
              generateLevel(new vector(level.x, 1));
            } else {
              generateLevel(level);
            }
          } else {
            this.position = new vector(player.position.x, player.position.y);
            this.animation = IDLE;
            this.animation.current = 0;
          }
          this.health = this.maxHealth*respawnPercent;
          this.mana = this.maxMana*respawnPercent;
        }
      } else {
        if (this.sprite && this.sprite.size) {
          var heart = new body(new vector(this.position.x+this.sprite.size.x/2, this.position.y+this.sprite.size.y/2), new sprite(new vector(0,128), new vector(8,8)));
          heart.name = "heart";
          heart.velocity = new vector(0,-8);
          heart.gravity = true;
          heart.solid = false;
          if ((player.health/player.maxHealth > .5 && player.mana/player.maxMana > .25 && !(this.name == "box" && this.maxHealth == 300)) || (this.name == "box" && this.maxHealth == 200)) {
            heart.name = "coin";
            heart.animation = COIN;
          }
        }
        if (this.name == "skeleton") {
          if (this.animation != SKELETONDIE) {
            this.animation = SKELETONDIE;
            this.velocity = new vector(0,-2);
          }
        }
        if (this.name == "box") {
          console.log(this.maxHealth)
          if (this.animation != BOXBREAK) {
            this.animation = BOXBREAK;
            this.animation.start = tick;
            if (this.maxHealth == 100) {
              collisions[collisions.indexOf(this.parent)] = null;
            }
          }          
        }        
        if (this.name == "knight") {
          if (this.facing == -1 && this.animation != KNIGHTDIE) {
            this.animation = KNIGHTDIE;
            this.animation.start = tick;
          } else if (this.facing == 1 && this.animation != KNIGHTDIERIGHT) {
            this.animation = KNIGHTDIERIGHT;
            this.animation.start = tick;
          }
          this.velocity = new vector(0,-1);
        }
        if (this.name == "skeleboss") {
          if (this.animation != BOSSDEATH) {
            this.animation = BOSSDEATH;
            this.animation.start = tick;
            this.animation.current = 0;
          }
          this.visible = (tick%2==0);
          player.health = player.maxHealth;
          if (this.animation.current+1 == this.animation.order.length-2) {
            boss = false;
            generateLevel(new vector(level.x+1, 1));
          }
        }
        if (this.name == "beehive" && this.animation != BROKENBEEHIVE) {
          this.animation = BROKENBEEHIVE;
          this.animation.start = tick;
          this.animation.current = 0;
          this.gravity = true;
        }
        if (this.name == "warrior") {
          if (this.animation != WARRIORDIE && this.animation != WARRIORDIELEFT) {
            this.animation = WARRIORDIE;
            if (this.facing == -1) {
              this.animation = WARRIORDIELEFT;
            }
            this.animation.start = tick;
            this.velocity = new vector(0,0);
          }
        }
        if (this.name == "plant") {
          if (this.animation != PLANTDIE) {
            this.animation = PLANTDIE;
            this.animation.start = tick;
          }      
        }
        if (this.name == "evilbush") {
          this.name = "bush";
          this.health = 100;
          this.velocity.x = 0;
          this.animation = BUSH;
        }
        if (this.name == "monkey") {
          this.velocity.y += GRAVITY;
          if (this.animation != MONKEYDIE && this.animation != MONKEYDIELEFT) {
            this.velocity.x = -this.facing*2;
            this.velocity.y = -GRAVITY*GRAVITY*GRAVITY;
            if (this.facing == -1) {
              this.animation = MONKEYDIELEFT;
            } else {
              this.animation = MONKEYDIE;
            }
            this.animation.start = tick;
          }
        }
        for (var i=0;i<this.children.length;i++) {
          if (collisions.includes(this.children[i])) {
            collisions[this.children[i]] = null;
          }
        }
        if (collisions.includes(this) && (!this.animation || this.animation.current+1 == this.animation.order.length-1 || this.dead || this.name == "bush")) {
          if (this.parent) {
            this.parent.attacks.splice(this.parent.attacks.indexOf(this.name),1);
            if (this.parent.children.includes(this)) {
              this.parent.children.splice(this.parent.children.indexOf(this),1);
            }
          }
          if ((this.name == "skeleton" || this.name == "knight" || this.name == "bees" || this.name == "plant" || this.name == "warrior" || this.name == "bush" || this.name == "monkey" || this.name == "box" || this.name == "cactus") && this.health < 1 && this.sprite) {
            if (this.name != "box") {
              enemies -= 1;
              key.position = new vector(this.position.x+this.sprite.size.x/2, this.position.y+this.sprite.size.y/2);
              if (this.owner) {
                this.owner.minions -= 1;
              }
            }
            if (this.name != "bush" && !(this.name == "box" && this.maxHealth == 100)) {
              collisions[collisions.indexOf(this)] = heart;
            } else {
              collisions[collisions.indexOf(this)] = null;
            }
            if (this.name == "knight" || this.name == "beehive" || this.name == "plant" || this.name == "warrior" || this.name == "bush" || this.name == "monkey" || this.name == "cactus") {
              var heartClone = heart.clone();
              heartClone.position.x += 16;
              collisions.push(heartClone);
              itemGet("sword", "item get!  sword! up b move");
            }
          } else {
            collisions[collisions.indexOf(this)] = null;            
          }
        }
      }
    }
    if ((this.position.x < camera.x+SCREENWIDTH-TILE/2 && this.position.x > camera.x-TILE*2 && this.position.y < camera.y+SCREENHEIGHT && this.position.y > camera.y+TILE) || this.name == "player" || (boss) || this.health < 1 || this.velocity.y != 0 || this.name == "mist" || this.name == "fire" || this.name == "key") { //RENDER DISTANCE
      if (this.flicker != false) {
        if (this == player) {
          this.visible = tick%2==0;
        }
        this.flicker -= 1;
        if (this.flicker == 0) {
          this.flicker = false;
        }
        if (!this.flicker) {
          this.visible = true;
        }
      }     
      if (this.debounce > 0) {
        this.debounce -=1 ;
      }  
      this.increaseMana(Math.ceil(Math.max(1,this.mana)/64));
      if (this.name == "player") {
        if (this.mana < 10) {
          message = "out of mana";
          messageTimer = 80;
        } else if (message == "out of mana") {
          messageTimer = 0;
        }
      }
      if ((this.name == "player" || this.name == "skeleton" || this.name == "knight" || this.name == "warrior" || this.name == "monkey") && this.health > 0) {
        this.onladder = false;
        this.onplatform = false;
        this.onstairs = false;
        var hits = this.collision();
        for (var i=0;i<hits.length;i++) {
          var that = hits[i];
          if (that.name == "ladder") {
            this.onladder = that;
          }
          if (that.name == "platform" || that.name == "corner") {
            if (this.position.y+this.sprite.size.y-11 == that.position.y) {
              this.onplatform = that;
              this.freefall = false;
              this.velocity.y = -2;
              if (this.drop) {
                if (this.canMove(new vector(0,1))) {
                  this.position.y += 1;
                } else {
                  this.position.x = that.position.x;
                  this.position.y += 1;
                }
                this.onplatform = false;
                this.freefall = true;
                this.drop = false;
              }
            }
          }
          if (that.name == "stairs") {
            this.onstairs = that;
            var stair = that.onstairs;
            if (this.position.y+this.sprite.size.y == that.position.y+that.sprite.size.y && this.canMove(new vector(0,-8))) {
              if (that.position.x > stair.position.x) {
                if (this.position.x == that.position.x) {
                  this.position.add(new vector(-1,-8));
                }
              } else {
                if (this.position.x+this.sprite.size.x == that.position.x+that.sprite.size.x) {
                  this.position.add(new vector(1,-8));
                }
              }
            }
          }
          if (this.name == "player" && that.name == "chest" && that.sprite == CHESTCLOSED) {
            that.sprite = CHESTOPEN;
            collectables -= 1;
            if (collectables < 0) {
              collectables = 0;
            }
            spawn.x = that.position.x;
            spawn.y = that.position.y-TILE;
            if (level.equals(1,2)) {            
              itemGet("staffa", "item get!  spell part i of iv");
            } else if (level.equals(1,3)) {
              itemGet("staffb", "item get!  spell part ii of iv");
            } else if (level.equals(1,4)) {
              itemGet("staffc", "item get!  spell part iii of iv");
            } else if (level.equals(1,5)) {
              itemGet("staff", "item get!  flame staff! down b move");    
            } else if (level.x > 1 && this.health > this.maxHealth/3) {
              itemGet("necklace", "item get! magic necklace")
            } else {
              message = "checkpoint!";
              messageTimer = 80;
            }    
          }
        }
      }
      this.drop = false;
      if (this.name == "player" && this.health > 0 && (!this.animation || this.animation.name != "respawn" || this.animation.current == this.animation.order.length-1)) {
        playerScript(this);
      }    
      if (this.name == "skeleton" && this.health > 0) {
        skeleton(this);
      }
      if (this.name == "tumble" && this.health > 0) {
        tumble(this);
      }      
      if (this.name == "spikes" || this.name == "rocks") {
        var hits = this.collision();
        for (var i=0;i<hits.length;i++) {
          var that = hits[i];
          if (((that.name == "player" && (that.position.x > this.position.x+3 || that.position.x+that.sprite.size.x < this.position.x+this.sprite.size.x-3)) || that.name == "skeleton" || that.name == "warrior") && this.debounce == 0) {
            if (this.name == "rocks" || (this.name == "spikes" && that.position.y+that.sprite.size.y >= this.position.y+this.sprite.size.y/2)) {
              this.debounce = 10;
              if (this.canMove(new vector(1,0),true) || this.canMove(new vector(-1,0),true) || this.gravity || this.name == "rocks") {
                that.hit(3);
              } else {
                that.hit(1);
              }
            }
          }
        }
      }
      if (this.name == "lava") {
        var hits = this.collision();
        for (var i=0;i<hits.length;i++) {
          var that = hits[i];
          if (that.name == "player" || that.name == "skeleton" || that.name == "knight" || that.name == "warrior") {
            that.health = 0;
          }
        }
      }    
      if (this.name == "rocks") {
        var distance = this.position.distance(player.position);
        if (distance < 7*TILE) {
          if (player.position.x + player.sprite.size.x > this.position.x + this.sprite.size.x*1.5) {
            //this.velocity.y = -4;
          } else {
            if (player.position.x >= this.position.x-16) {
              this.gravity = true;
              this.velocity.y -= 1;
            }            
          }
        }
        if (!this.canMove(new vector(0,this.velocity.y+1))) {
          this.sprite.size.y -= 1;
          if (this.sprite.size < TILE/2) {
            this.visible = false;
          }
        }
      }
      if (this.name == "door") {
        if ((totalEnemies-enemies)/totalEnemies >= difficultyGoal && collectables == 0) {
          if (level.x == 2) {
            DOORSPRITE = JUNGLEDOOR;
          } else {
            DOORSPRITE = DOOROPEN;
          }
          var hits = this.collision();
          for (var i=0;i<hits.length;i++) {
            var that = hits[i];
            if (that.name == "player") {
              levelCoins = that.coins;
              generateLevel(new vector(level.x, level.y+1));
            }
          }
        } else {
          if (level.x == 2) {
            DOORSPRITE = JUNGLEDOORLOCKED;
          } else {
            DOORSPRITE = DOORLOCKED;
          }
        }
        this.sprite = DOORSPRITE;
      }
      if (this.name == "box") {
        var hits = this.collision();
        for (var i=0; i<hits.length; i++) {
          if (hits[i].name == "mist" || hits[i].name == "fire" || hits[i].name == "sword") {
            this.health = 0;
          }
        }
      }
      if (this.name == "spawner") {
        spawner(this);
      }
      if (this.name == "knight" && this.health > 0) {
        knight(this);
      }
      if (this.name == "cactus" && this.health > 0) {
        cactus(this);
      }          
      if (this.name == "heart" && this.health > 0) {
        var hits = this.collision();
        this.visible = true;
        for (var i=0;i<hits.length;i++) {
          var that = hits[i];
          if (that.name == "player" && this.health > 0) {
            if (that.health < 1) {
              message = "resurrection!"
              messageTimer = 80;
            }
            that.increaseHealth(30);
            that.increaseMana(15);
            playSound("collect");
            this.health = 0;
          }
          if (that.name == "spikes" || that.name == "lava") {
            this.visible = false;
            this.health = 0;
          }
          if (that.solid) {
            this.position.y -= 8;
            this.visible = false;
          }
        }      
      }
      if (this.name == "coin" && this.health > 0) {
        var hits = this.collision();
        this.visible = true;
        for (var i=0;i<hits.length;i++) {
          var that = hits[i];
          if (that.name == "player" && this.health > 0) {
            that.coins += 1;
            playSound("collect");
            this.health = 0;
            this.visible = false;
          }
          if (that.name == "spikes" || that.name == "lava") {
            this.visible = false;
            this.health = 0;
          }
          if (that.solid) {
            this.position.y -= 8;
            this.visible = false;
          }
        }      
      }      
      if (this.name == "hat" && this.health > 0) {
        var hits = this.collision();
        this.visible = true;
        for (var i=0;i<hits.length;i++) {
          var that = hits[i];
          if (that.name == "player" && this.health > 0) {
            that.canFloat = true;
            playSound("collect");
            this.health = 0;
            this.visible = false;
          }
          if (that.name == "spikes" || that.name == "lava") {
            this.visible = false;
            this.health = 0;
          }
          if (that.solid) {
            this.position.y -= 8;
            this.visible = false;
          }
        }      
      }      
      if (this.name == "timer") {
        var frame = Math.floor((tick%480)/160)+1;
        this.visible = this.health == frame || this.health == 1 && frame == 2 || this.health == 2 && frame == 3 || this.health == 3 && frame == 1;
        this.solid = this.visible;
        var hits = this.collision();
        if (hits && hits.length > 0 && hits.includes(player)) {
          this.visible = false;
          this.solid = false;
        }
      }
      if (this.name == "sword") {
        if (this.parent.animationFacing == -1) {
          this.animation = SWORDLEFT;
        } else {
          this.animation = SWORD;
        }
      }
      if (this.name == "staff") {
        if (this.parent.animationFacing == - 1) {
          this.animation = STAFFLEFT;
        } else {
          this.animation = STAFF;
        }
        if (((this.animation.current == 4 && player.mana >= 10) || (this.animation.current == 6 && player.mana >= 15) || (this.animation.current > 4 && this.animation.current < player.chargeLevel && this.animation.current%2!=0 && player.mana >= 10)) && fromParent) {
          var attack = new body(new vector(player.position.x+12*player.animationFacing+4,player.position.y+8), new sprite(new vector(0,0), new vector(0,0)));
          attack.animation = FIRE.clone();
          if (player.animationFacing == -1) {
            attack.animation = FIRELEFT.clone();
          }
          attack.animation.start = tick;
          attack.animation.current = 0;
          attack.facing = player.animationFacing;
          attack.fizzles = true;
          attack.solid = false;
          attack.name = "fire";
          attack.velocity.x = player.walking*2 + player.animationFacing*(6+Math.min(Math.max(0,player.chargeLevel/2),4));
          attack.acceleration.y = -1;
          player.mana -= 10;
          if (this.animation.current == 6) {
            player.mana -= 5;
          }
          collisions.push(attack);
        }
        if (this.animation.current == 10) {
          player.chargeLevel = 0;
        }        
      }
      if (this.name == "skeleboss" && this.health > 0) {
        skeleboss(this);
      }
      if (this.animation != null && !this.dead && this.animation.play) {
        this.sprite = this.animation.play(this);
      }
      if (this.name == "mist") {
        if (!this.canMove(new vector(0,0))) {
          this.dead = true;
          this.health = 0;
        }
      }
      if (this.name == "fire" || this.name == "flames") {
        if (!this.canMove(new vector(0,0))) {
          this.dead = true;
          this.health = 0;
        }        
        if (this.acceleration.y == 0) {
          if (!this.canMove(new vector(0,-1))) {
            this.acceleration.y = 1;
            this.velocity.y = 3;
          } else if (!this.canMove(new vector(0,-1))) {
            this.acceleration.y = -1;
            this.velocity.y = -3;
          } else if (this.velocity.y == 0) {
            this.velocity.y = -3;
            this.acceleration.y = 1;
          }
        }
        if (Math.abs(this.velocity.y) > GRAVITY*2 || !this.canMove(this.velocity.y)) {
          this.acceleration.y = -this.acceleration.y;
        }
        if (this.animation.current > 8 && this.animation.current < 20) {
          if (this.facing == 1) {
            if (this.velocity.y > 0) {
              this.sprite = new sprite(new vector(112,16), new vector(8,8));
            } else {
              this.sprite = new sprite(new vector(104,16), new vector(8,8));
            }
          } else {
            if (this.velocity.y > 0) {
              this.sprite = new sprite(new vector(112,40), new vector(8,8));
            } else {
              this.sprite = new sprite(new vector(104,40), new vector(8,8));
            }          
          }
        }
        if (this.velocity.x == 0) {
          this.velocity.x = this.facing*6;
        }
      }
      if (this.name == "platform" || this.name == "corner") {
        var hits = this.collision();
        for (var i=0;i<hits.length;i++) {
          var that = hits[i];
          if (that.name == "player" || that.name == "skeleton" || that.name == "knight" || that.name == "warrior" || (that.name == "monkey" && that.health > 0)) {
            var bottom = that.position.y+that.sprite.size.y;
            var projection = bottom+that.velocity.y+that.velocity.y;
            var backProjection = bottom-that.velocity.y;
            var top = this.position.y+11;
            if ((bottom <= top && projection >= top) || (bottom >= top && backProjection <= top)) {
              that.position.y = top-that.sprite.size.y;
              that.velocity.y = -1;
            }
          }
        }
      }
      if (this.name == "beehive" && this.health > 0) {
        beehive(this);
      }
      if (this.name == "bees") {
        bees(this);
      }
      if (this.name == "plant" && this.health > 0) {
        plant(this);
      }
      if (this.name == "spikeball") {
        var hits = this.collision();
        for (var i=0;i<hits.length;i++) {
          var that = hits[i];
          if (this.health > 0) {
            if (that.name == "player" && this.health > 0 && !that.attacks.includes("sword")) {
              this.health = 0;
              this.velocity.x = -this.velocity.x/Math.abs(this.velocity.x)*2;
              this.gravity = true;
              that.hit(6);
            }
            if (that.name == "fire") {
              this.health = 0;
              this.dead = true;
              that.health = 0;
              that.dead = true;
              this.gravity = true;
              that.gravity = true;
            }
            if (that.name == "sword") {
              if (Math.abs(this.velocity.x) == 4) {
                this.position.x -= this.velocity.x;
                this.velocity.x = -this.velocity.x*2;
              }
              this.animation.start = tick;
              this.animation.current = 0;
              this.health = 100;
            }
            if (that.name == "spikeball") {
              if (Math.abs(this.velocity.x) > 4) {
                that.gravity = true;
                that.velocity.x -= that.velocity.x; 
              }
            }
            if (that.name == "plant" && Math.abs(this.velocity.x) != 4 && this.velocity.x != 0) {
              if (Math.abs(this.velocity.x) < 4) {
                that.hit(6); 
              } else {
                that.hit(4);
              }
              this.health = 0;
              this.dead = true;
            }
          }
          if (that.solid) {
            this.health = 0;
            this.dead = true;
          }
        }
      }
      if (this.name == "warrior" && this.health > 0) {
        warrior(this);
      }
      if (this.name == "flames") {
        var hits = this.collision();
        for (var i=0;i<hits.length;i++) {
          var that = hits[0];
          if (that.name == "fire") {
            this.velocity.x = this.velocity.x/2;
            that.velocity.x = that.velocity.x/2;
            this.name = "fire";
            if (Math.abs(that.velocity.x) < 3) {
              that.dead = true;
              that.health = 0;
            }
          }
          if (that.name == "player" && !that.debounce) {
            that.hit(10);
            this.health = 0;
            this.dead = true;
            that.debounce = WARRIORSWING.order.length;
          }
          if (that.name == "sword") {
            this.velocity.x = -this.velocity.x;
            this.position.x += this.velocity.x*2;
            this.facing = -this.facing;
            this.name = "fire";
          }
        }
      }
      if (this.name == "evilbush") {
        evilBush(this);
      }
      if (this.name == "monkey" && this.health > 0) {
        monkey(this);
      }
      if (this.gravity && (this.canMove(new vector(0,this.velocity.y+1)))) {
        this.velocity.add(new vector(0,GRAVITY));
        this.velocity.y = Math.min(this.velocity.y,TERMINALVELOCITY);
        if (this.name == "player") {
          if (this.velocity.y < JUMPPOWER*-.666) {
            this.velocity.y -= GRAVITY/2;
          }
          if (this.velocity.y > TERMINALVELOCITY/2) {
            this.velocity.add(new vector(0,GRAVITY/2));
          }
        }
      }
      this.velocity.add(this.acceleration);
      var oldVel = new vector(this.velocity.x, this.velocity.y);
      if (this.velocity.x !=0 || this.velocity.y != 0) {
        var tries = 100;
        while (!this.canMove(new vector(this.velocity.x,0)) && !this.velocity.x == 0) {
          this.acceleration.x = 0;
          this.acceleration.y = Math.floor(this.acceleration.y/2); //friction
          if (this.velocity.x != 0 && tries > 0) {
            this.velocity.x -= this.velocity.x/Math.abs(this.velocity.x); //push horizontally
            tries -= 1;
          } else {
            break;
          }
        }
        var tries = 100;
        while (!this.canMove(new vector(0,this.velocity.y)) && !this.velocity.y == 0) {
          this.acceleration.y = 0;
          if (this.velocity.y != 0 && tries > 0) {
            this.velocity.y -= this.velocity.y/Math.abs(this.velocity.y); //push vertically
            tries -= 1;
          } else {
            break;
          }
        }
        if (!this.canMove(this.velocity)) {
          this.velocity = oldVel;
          var tries = 100;
          while (!this.canMove(new vector(this.velocity.x,this.velocity.y))) { //push diagonally
            if (this.velocity.x != 0) {
              this.velocity.x -= this.velocity.x/Math.abs(this.velocity.x);
            }
            if (this.velocity.y != 0) {
              this.velocity.y -= this.velocity.y/Math.abs(this.velocity.y);
            }        
            tries-=1;
            if (this.velocity.x == 0 && this.velocity.y == 0 || tries == 0) {
              break;
            }
          }
        }
      }
      this.position.add(this.velocity);
      if (this.name == "player" && player.sprite) {
        var side = SCREENWIDTH/2-player.sprite.size.x/2;
        var top = SCREENHEIGHT/2;
        if (!collisions.includes(player2)) {
          player2.position = new vector(player.position.x, player.position.y);
        }
        var ahead = player;
        var behind = player2;
        if (player2.x > player.x) {
          ahead = player2;
          behind = player1;
        }
        var goal = new vector(((ahead.position.x+behind.position.x+ahead.position.x)/3)-side, ((ahead.position.y+behind.position.y)/2)-top+TILE*looking);
        camera.x += goal.x-camera.x;
        camera.y = goal.y;
        if (cameraReset) {
          console.log(goal.x, camera.x)
          camera.x = goal.x;
          camera.y = goal.y;
          cameraReset = false;
        }
        if (camera.x*SCALE < 0) {
          camera.x = 0;
        }
        if (camera.x*SCALE > WIDTH-canvas.width) {
          camera.x = (WIDTH-canvas.width)/SCALE;
        }
        if (camera.y*SCALE < 0) {
          camera.y = 0;
        }   
        if (camera.y*SCALE > HEIGHT-canvas.height) {
          camera.y = (HEIGHT-canvas.height)/SCALE;
        }
      }
      for (var i=0;i<this.children.length;i++) {
        var child = this.children[i];
        child.position = new vector(this.position.x-8, this.position.y);
        if (child.name == "shield") {
          child.position = new vector(this.position.x+this.sprite.size.x/2-8+this.facing*8,this.position.y+this.sprite.size.y/3-child.sprite.size.y/2);
        }
        if (child.name == "necklace") {
          if (this.health/this.maxHealth < .33) {
            this.inventory[this.inventory.indexOf("necklace")] = "mist";
            this.children.splice(this.children.indexOf("necklace"),1);
          }
          var xpos = 5;
          if (child.facing == -1) {
            xpos = 4;
          }
          var ypos = 13;
          if ((this.animation.name == "walk" && (this.animation.current == 0 || this.animation.current == 1 || this.animation.current == 4 || this.animation.current == 5)) || ((this.animation.name == "jump" || this.animation.name == "attack" || this.animation.name == "swing") && this.animation.current > 0) || this.animation.name == "lookup") {
            ypos = 12;
          }
          if (this.animation.name == "landing" || this.animation.name == "duck") {
            ypos = 14;
          }
          child.position = new vector(this.position.x+xpos,this.position.y+ypos);
          if (this.animation.name != "climb" && this.animation.name != "death") {
            child.play(true);
          }
        } else {
          child.play(true);
        }
        child.render(true);
      }
      this.render(fromParent);
      if (this.hitTimer > 0 && this.lastHit > 0) {
        this.hitTimer -= 1;
        drawNumbers(this.lastHit+" ",this.position.x-camera.x+this.sprite.size.x/2-this.hitTimer*this.velocity.x,this.position.y-camera.y+8-this.hitTimer);
      }
    }
    if (this.position.y > map.height*TILE && !loading) {
      this.health = 0;
    }
  }
  this.collision = function() {
    var hits = [];
    for (var i=0;i<collisions.length;i++) {
      var b = collisions[i];
      if (b && b.sprite && this.sprite && this.sprite.size) {
        var pos = this.position;
        var bpos = b.position;
        var size = this.sprite.size;
        var bsize = b.sprite.size;
        if (b != this && pos && bpos && size && bsize && bpos.x < pos.x+size.x && bpos.x + bsize.x > pos.x && bpos.y < pos.y+size.y && bpos.y + bsize.y > pos.y) {
          hits.push(b);
        }         
      }
    }
    if (hits.length == 0) {
      return false;
    } else {
      return hits;
    }
  }
  this.canMove = function(delta, strict) {
    var old = new vector(this.position.x, this.position.y);
    this.position.add(delta);
    var hits = this.collision();
    this.position = old;
    var can = true;
    if (hits != false) {
      for (var i=0;i<hits.length;i++) {
        if ((hits[i].solid || strict) && hits[i] != this) {
          can = false;
        }
      }
    }
    return can;
  }
  this.increaseHealth = function(delta) {
    this.health += delta;
    if (this.health > this.maxHealth) {
      this.health = this.maxHealth;
    }
  }
  this.increaseMana = function(delta) {
    this.mana += delta;
    if (this.mana > this.maxMana) {
      this.mana = this.maxMana;
    }
  }
  this.hit = function(amount, length) {
    if (this == player) {
      length = HITSTUN;
    }
    if (!length) {
      length = 0;
    }
    if (this.flicker < length || (this != player)) {
      if (this.animation) {
        var magicBlock = (this.animation.name == "attack" || this.animation.name == "swing");
        if (magicBlock) {
          this.mana -= 100/amount;
          if (this.mana < 0) {
            this.health += this.mana;
            this.mana = 0;
          }
        } else {
          this.health -= 100/amount;
          this.lastHit = Math.ceil(this.health/(100/amount));
          this.hitTimer = 8;
        }
        this.flicker = length;
        if (this.name == "player" && (this.health/this.maxHealth < .4 || amount < 3) && this.health > 0) {
          playSound("warning");
        }
      }
    }
  }
  this.bounce = function(that) {
    if (this.velocity.y > that.velocity.y || this.position.y+this.sprite.size.y < that.position.y+that.sprite.size.y || that.name == "skeleboss") {
      this.velocity.y = -BOUNCEPOWER;
    }
  }
}