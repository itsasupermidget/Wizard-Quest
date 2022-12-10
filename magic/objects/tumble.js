function tumble(parent) {
  const DAMAGE = 4;
  const DEBOUNCE = 5;
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
        if (that.jumpCharge == 0 && that.velocity.y == 0) {
          that.hit(DAMAGE);
        }
        if (that.velocity.y > parent.velocity.y && that.velocity.y != 0) {
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