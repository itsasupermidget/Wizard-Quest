function spawner(parent) {
  if (tick % 1000) {
    if (tick < 5000) {
      var minion = new body(new vector(parent.position.x, parent.position.y),new sprite(new vector(0,48), new vector(16,16)));
      minion.name = "skeleton";
      minion.gravity = true;
      minion.solid = false;
      minion.animation = SKELETONWALK;
      collisions.push(minion);
      enemies += 1;
    }
    if (tick > 5000 && tick < 8000) {
      var minion = new body(new vector(parent.position.x, parent.position.y-TILE),new sprite(new vector(0,48), new vector(16,16)));
      minion.name = "knight";
      minion.gravity = true;
      minion.solid = false;
      minion.animation = KNIGHT;
      collisions.push(minion);
      enemies += 1;
    }
    if (tick > 8000 && tick < 12000) {
      var minion = new body(new vector(parent.position.x, parent.position.y),new sprite(new vector(0,48), new vector(16,16)));
      minion.name = "evilbush";
      minion.gravity = true;
      minion.solid = false;
      minion.animation = EVILBUSH;
      collisions.push(minion);
      enemies += 1;
    }
    if (tick > 12000 && tick < 17000) {
      var minion = new body(new vector(parent.position.x, parent.position.y),new sprite(new vector(0,48), new vector(16,16)));
      minion.name = "plant";
      minion.gravity = true;
      minion.solid = false;
      minion.animation = PLANT;
      collisions.push(minion);
      enemies += 1;
    }
    if (tick > 17000 && tick < 20000) {
      var minion = new body(new vector(parent.position.x, parent.position.y-TILE*3),new sprite(new vector(0,48), new vector(16,16)));
      minion.name = "beehive";
      minion.gravity = true;
      minion.solid = false;
      minion.animation = BEEHIVE;
      collisions.push(minion);
      enemies += 1;
    }
    if (tick > 20000 && tick < 23000) {
      var minion = new body(new vector(parent.position.x, parent.position.y-TILE),new sprite(new vector(0,48), new vector(16,16)));
      minion.name = "warrior";
      minion.gravity = true;
      minion.solid = false;
      minion.animation = WARRIOR;
      collisions.push(minion);
      enemies += 1;
    }
  } 
}