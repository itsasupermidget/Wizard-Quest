function tumble(parent) {
  const DAMAGE = 5;
  const DEBOUNCE = 10;
  const SPEED = 10;
  const RANGE = 12;
  const JUMP = 8;
  if (parent.velocity.x > -SPEED) {
    parent.velocity.x -= 1;
  }
  if (!parent.canMove(new vector(0,1))) {
    parent.velocity.y -= JUMP;
  }
  var hits = parent.collision();
  for (var i=0;i<hits.length;i++) {
    var that = hits[i];
    if (that.name == "player") {
      if (parent.debounce == 0 && !parent.flicker) {
        parent.debounce = DEBOUNCE;
        if (that.velocity.y >= parent.velocity.y && that.jumpCharge == 0) {
          if (!(that.velocity.y > parent.velocity.y)) {
            that.hit(DAMAGE);
          }
        }
        if (that.velocity.y > parent.velocity.y) {
          that.bounce(parent);
        }
      }
    } else {
      if (that.solid) {
        parent.position.y -= Math.round(JUMP/2);
        parent.velocity.y = -JUMP;
      }
    }
  }
}