function beehive(parent) {
  const MISTDAMAGE = 8;
  const SWORDDAMAGE = 4;
  const SHARDDAMAGE = 16;
  const FIREDAMAGE = 6;
  const BEEDAMAGE = 12;
  const RANGE = 14;
  function makeBees(t) {
      for (var i=0;i<t;i++) {
      if (parent.minions < t) {
        var bees = new body(new vector(parent.position.x, parent.position.y-i*TILE), new sprite(new vector(0,0), new vector(0,0)));
        bees.name = "bees";
        bees.solid = false;
        bees.animation = BEES;
        bees.owner = parent;
        collisions.push(bees);
        parent.minions += 1;
        enemies += 1;
        parent.hit(BEEDAMAGE);
      }
  }
  }
  if (parent.position.distance(player.position) <= RANGE*TILE) {
    makeBees(2);
  }
  var hits = parent.collision();
  for (var i=0;i<hits.length;i++) {
    var that = hits[i];
    if (that.name == "mist" && !that.dead) {
      parent.hit(MISTDAMAGE);
      that.health = 0;
      that.dead = true;
      makeBees(3);
    }
    if (that.name == "sword" && that.debounce == 0) {
      parent.hit(SWORDDAMAGE);
      that.debounce = 10;
      makeBees(3);
    }
    if (that.name == "shard") {
      parent.hit(SHARDDAMAGE);
      that.health = 0;
      that.dead = true;
      makeBees(2);
    }        
    if (that.name == "fire") {
      parent.hit(FIREDAMAGE);
      that.health = 0;
      that.dead = true;
      makeBees(3);
    }
  }        
}