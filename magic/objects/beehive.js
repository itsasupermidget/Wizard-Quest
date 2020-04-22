function beehive(parent) {
  const MISTDAMAGE = 8;
  const SWORDDAMAGE = 4;
  const SHARDDAMAGE = 16;
  const FIREDAMAGE = 6;
  const BEEDAMAGE = 8;
  const RANGE = 14;
  const RATE = 48;
  function makeBees(hive) {
    if (tick%RATE==0) {
      for (var i=0;i<2;i++) {
        if (hive.minions < 2) {
          var bees = new body(new vector(hive.position.x, hive.position.y+TILE*i), new sprite(new vector(0,0), new vector(0,0)));
          bees.name = "bees";
          bees.solid = false;
          collisions.push(bees);
          hive.minions += 1;
          enemies += 1;
          bees.owner = hive;
          hive.hit(BEEDAMAGE);
        }
      }
    }
  }
  if (parent.position.distance(player.position) < RANGE*TILE) {
    makeBees(parent);
  }
  var hits = parent.collision();
  for (var i=0;i<hits.length;i++) {
    var that = hits[i];
    if (that.name == "mist" && !that.dead) {
      parent.hit(MISTDAMAGE);
      that.health = 0;
      that.dead = true;
      makeBees(parent);
    }
    if (that.name == "sword" && that.debounce == 0) {
      parent.hit(SWORDDAMAGE);
      that.debounce = 10;
      makeBees(parent);
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
      makeBees(parent);
    }
  }        
}