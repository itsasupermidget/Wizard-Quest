function spawner(parent) {
  if (tick % 100 == 0) {
    if (tick < 500) {
      var minion = new body(new vector(parent.position.x, parent.position.y),new sprite(new vector(0,48), new vector(16,16)));
      minion.name = "skeleton";
      minion.gravity = true;
      minion.solid = false;
      minion.animation = SKELETONWALK;
      collisions.push(minion);
      enemies += 1;
    }
    if (tick > 500 && tick < 800) {
      var minion = new body(new vector(parent.position.x, parent.position.y-TILE),new sprite(new vector(0,48), new vector(16,16)));
      minion.name = "knight";
      minion.gravity = true;
      minion.solid = false;
      minion.animation = KNIGHT;
      collisions.push(minion);
      enemies += 1;
    }
    if (tick > 800 && tick < 1200) {
      var minion = new body(new vector(parent.position.x, parent.position.y),new sprite(new vector(0,48), new vector(16,16)));
      minion.name = "evilbush";
      minion.gravity = true;
      minion.solid = false;
      minion.animation = EVILBUSH;
      collisions.push(minion);
      enemies += 1;
    }
    if (tick > 1200 && tick < 1700) {
      var minion = new body(new vector(parent.position.x, parent.position.y-8),new sprite(new vector(0,48), new vector(16,16)));
      minion.name = "plant";
      minion.gravity = true;
      minion.solid = false;
      minion.animation = PLANT;
      collisions.push(minion);
      enemies += 1;
    }
    if (tick > 1700 && tick < 2000) {
      var minion = new body(new vector(parent.position.x, parent.position.y-TILE*3),new sprite(new vector(0,48), new vector(16,16)));
      minion.name = "beehive";
      minion.gravity = true;
      minion.solid = false;
      minion.animation = BEEHIVE;
      collisions.push(minion);
      enemies += 1;
    }
    if (tick > 2000 && tick < 2300) {
      var minion = new body(new vector(parent.position.x, parent.position.y-TILE),new sprite(new vector(0,48), new vector(16,16)));
      minion.name = "warrior";
      minion.gravity = true;
      minion.solid = false;
      minion.animation = WARRIOR;
      collisions.push(minion);
      enemies += 1;
    }
    if (tick > 2300 && tick < 6600) {
      var minion = new body(new vector(parent.position.x, parent.position.y-TILE),new sprite(new vector(0,48), new vector(16,16)));
      minion.name = "cactus";
      minion.gravity = true;
      minion.solid = false;
      minion.animation = WARRIOR;
      collisions.push(minion);
      enemies += 1;
    }    
  } 
}