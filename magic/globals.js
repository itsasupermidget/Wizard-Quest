var SPRITES = LOADED[1];
var TILE = 16;
var FPS = 30;
var WIDTH;
var HEIGHT;
var symbols = ["Z","W","Q","X","V","0","1","2","3","4"];
var symbolPad = ["0","1","2","3","4","Q","V","W","X","Z"];
const GRAVITY = 2;
const TERMINALVELOCITY = 14;
var JUMPPOWER = 13;
var WALKSPEED = 5;
var BOUNCEPOWER = 10;
var HITSTUN = 12;
var COYOTETIME = 4;
var DEBUG = false;
const COMBATRANGE = 7;
var COMBATHP = 0;
var tick = 0;
var difficultyGoal = .5;
var collisions = [];
var player = new body(new vector(0,0), new sprite(new vector(0,0), new vector(0,0)));
player.name = "player";
player.gravity = true;
player.solid = false;
var player2 = new body(new vector(0,0), new sprite(new vector(0,0), new vector(0,0)));
player2.name = "player";
player2.gravity = true;
player2.solid = false;
var key = new body(new vector(0,0), new sprite(new vector(0,640), new vector(16,8)));
key.name = "key";
key.gravity = false;
key.solid = false;
key.visible = false;
var generator = null;
var necklace = new body(new vector(0,0), new sprite(new vector(128,600), new vector(8,8)));
necklace.name = "necklace";
necklace.gravity = false;
necklace.solid = false;
necklace.visible = false;
var door = new body(new vector(0,0), new sprite(new vector(0,0)));
var stageProgress = 0;
var boss;
var camera = player.position;
var spawn;
var level = new vector(null,null);
var enemies = 0;
var collectables = 0;
var totalEnemies = 0;
var totalCollectables = 0;
var map;
var paused = true;
var message = "";
var messageTimer = 0;
var title = true;
var modeSelect = false;
var passwordScreen = false;
var settings = false;
var loading = false;
var menu = 0;
var password = "";
var looking = 0;
var levelCoins = 0;

function sprite(position,size,offset) {
  this.position = position;
  this.size = size;
  if (offset) {
    this.offset = offset;
  } else {
    this.offset = new vector(0,0);
  }
}

function animation(sprites, order, speed, name) {
  this.sprites = sprites;
  this.order = order;
  this.start = tick;
  this.current = 0;
  this.speed = speed;
  this.name = name;
  if (this.speed) {
    var newOrder = [];
    for (var i=0;i<this.order.length;i++) {
      for (var s=0;s<this.speed;s++) {
        newOrder.push(this.order[i]);
      }
    }
    this.order = newOrder;
  }
  this.play = function() {
    var frame = tick-this.start;
    this.current = (frame+1)%(this.order.length);
    var frameId = this.order[this.current];
    return sprites[frameId];
  }
  this.projectCurrent = function(projectedStart) {
    var frame = tick-projectedStart;
    return (frame+1)%(this.order.length);
  }
  this.clone = function() {
    return new animation(this.sprites,this.order,null,this.name);
  }
}