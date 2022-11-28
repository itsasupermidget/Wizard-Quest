var IDLE = new animation([
  new sprite(new vector(0,0), new vector(16,24)),
  new sprite(new vector(48,600), new vector(16,24)),
  new sprite(new vector(48,624), new vector(16,24)),
  new sprite(new vector(0,24), new vector(16,24)),  
  ],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,0,0,0,0,1,1,2,2,1],4,"idle");
var IDLELEFT = new animation([
  new sprite(new vector(0,24), new vector(16,24)),
  new sprite(new vector(48,624), new vector(16,24)),
  new sprite(new vector(48,600), new vector(16,24)),
  ],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,2,1],4,"idle");
var WALK = new animation([
  new sprite(new vector(0,0), new vector(16,24)),
  new sprite(new vector(16,0), new vector(16,24)),
  new sprite(new vector(32,0), new vector(16,24)),
  ], [1,0,2,0], 2, "walk");
var WALKLEFT = new animation([
  new sprite(new vector(0,24), new vector(16,24)),
  new sprite(new vector(16,24), new vector(16,24)),
  new sprite(new vector(32,24), new vector(16,24)),
  ], [1,0,2,0], 2, "walk");
var JUMP = new animation([
  new sprite(new vector(48,600), new vector(16,24)),
  new sprite(new vector(64,600), new vector(16,24)),
  new sprite(new vector(64,0), new vector(16,24)),
  ],[0,1,2,2], 1, "jump");
var JUMPLEFT = new animation([
  new sprite(new vector(48,624), new vector(16,24)),
  new sprite(new vector(64,624), new vector(16,24)),
  new sprite(new vector(64,24), new vector(16,24)),
  ],[0,1,2,2], 1, "jump");
var FALLING = new animation([
  new sprite(new vector(64,600), new vector(16,24)),
  new sprite(new vector(96,600), new vector(16,24)),
  new sprite(new vector(112,600), new vector(16,24)),
],[0,0,0,0,1,1,2,2,1,1,2,2,1,1,2,2,1,1], 2, "falling");
var FALLINGLEFT = new animation([
  new sprite(new vector(64,624), new vector(16,24)),
  new sprite(new vector(96,624), new vector(16,24)),
  new sprite(new vector(112,624), new vector(16,24)),
],[0,0,0,0,1,1,2,2,1,1,2,2,1,1,2,2,1,1], 2, "falling");
var LANDING = new animation([
  new sprite(new vector(48,600), new vector(16,24)),
],[0], 2, "landing");
var LANDINGLEFT = new animation([
  new sprite(new vector(48,624), new vector(16,24)),
],[0], 2, "landing");
var DUCK = new animation([
  new sprite(new vector(48,600), new vector(16,24)),
  ],[0],1,"duck");
var DUCKLEFT = new animation([
  new sprite(new vector(48,624), new vector(16,24)),
  ],[0],1,"duck");
var LOOKUP = new animation([
  new sprite(new vector(80,600), new vector(16,24)),
  ],[0],1,"lookup");
var LOOKUPLEFT = new animation([
  new sprite(new vector(80,624), new vector(16,24)),
  ],[0],1,"lookup");  
var HURT = new animation([
  new sprite(new vector(112,760), new vector(16,24)),
  ],[0],5,"hurt");
var HURTLEFT = new animation([
  new sprite(new vector(112,784), new vector(16,24)),
  ],[0],5,"hurt");   
var ATTACK = new animation([
  new sprite(new vector(16,600), new vector(16,24)), 
  new sprite(new vector(32,600), new vector(16,24)), 
  new sprite(new vector(48,0), new vector(16,24))
  ],[0,0,1,2,2,1,0], 1, "attack");
var ATTACKLEFT = new animation([
  new sprite(new vector(16,624), new vector(16,24)), 
  new sprite(new vector(32,624), new vector(16,24)), 
  new sprite(new vector(48,24), new vector(16,24))
  ],[0,0,1,2,2,1,0], 1, "attack");
var DEATH = new animation([
  new sprite(new vector(0,808), new vector(16,24)), 
  new sprite(new vector(16,808), new vector(16,24)), 
  new sprite(new vector(32,808), new vector(16,24)),
  new sprite(new vector(48,808), new vector(16,24)),  
  ],[0,1,2,3,3,2,2,2,0,1,1,1,2,3], 2, "death");
var RESPAWN = new animation([
  new sprite(new vector(0,808), new vector(16,24)), 
  new sprite(new vector(16,808), new vector(16,24)), 
  new sprite(new vector(32,808), new vector(16,24)),
  new sprite(new vector(48,808), new vector(16,24)),  
  ],[3,3,2,2,1,0], 1, "respawn");
var CLIMB = new animation([
  new sprite(new vector(0,664), new vector(16,24)), 
  new sprite(new vector(16,664), new vector(16,24)), 
  ],[0,1], 3, "climb");
var CLIMBLEFT = CLIMB.clone();
var KNIGHT = new animation(
  [new sprite(new vector(112,96), new vector(16,32)),
  new sprite(new vector(96,96), new vector(16,32)),
  new sprite(new vector(128,96), new vector(16,32))], [1,0,2,0], 2
);
var KNIGHTRIGHT = new animation(
  [new sprite(new vector(112,64), new vector(16,32)),
  new sprite(new vector(96,64), new vector(16,32)),
  new sprite(new vector(128,64), new vector(16,32))], [1,0,2,0], 2
);
var KNIGHTATTACK = new animation(
  [new sprite(new vector(112,96), new vector(16,32)),
  new sprite(new vector(16,96), new vector(16,32)),
  new sprite(new vector(32,96), new vector(16,32))], [0,0,1,1,2,2,2,1,0]
);
var KNIGHTATTACKRIGHT = new animation(
  [new sprite(new vector(112,64), new vector(16,32)),
  new sprite(new vector(16,64), new vector(16,32)),
  new sprite(new vector(32,64), new vector(16,32))], [0,0,1,1,2,2,2,1,0]
);
var SKELETONWALK = new animation(
  [new sprite(new vector(0,48), new vector(16,16)),
  new sprite(new vector(16,48), new vector(16,16)),
  new sprite(new vector(32,48), new vector(16,16))
  ], [1,0,2,0], 2
);
var SKELETONDIE = new animation(
  [new sprite(new vector(64,80), new vector(16,16)),
  new sprite(new vector(80,80), new vector(16,16))], [0,0,1,1], 4
);
var SKELETONSTOOL = new animation(
  [new sprite(new vector(64,80), new vector(16,16)),
  new sprite(new vector(80,80), new vector(16,16))], [0,1,1,0], 2
);
var KNIGHTDIE = new animation(
  [new sprite(new vector(64,128), new vector(16,32)),
  new sprite(new vector(80,128), new vector(16,32))], [0,0,1,1], 2
);
var KNIGHTDIERIGHT = new animation(
  [new sprite(new vector(64,96), new vector(16,32)),
  new sprite(new vector(80,96), new vector(16,32))], [0,0,1,1], 2
);
var LAVA = new animation(
  [new sprite(new vector(112,48), new vector(16,8)),
  new sprite(new vector(112,49), new vector(16,8)),
  new sprite(new vector(112,50), new vector(16,8)),
  new sprite(new vector(112,51), new vector(16,8)),
  new sprite(new vector(112,52), new vector(16,8)),
  new sprite(new vector(112,53), new vector(16,8)),
  new sprite(new vector(112,54), new vector(16,8)),
  new sprite(new vector(112,55), new vector(16,8)),
  new sprite(new vector(112,56), new vector(16,8))],
  [0,1,2,3,4,5,6,7,6,5,4,3,2,1], 5
);
var COIN = new animation(
  [new sprite(new vector(8,128), new vector(8,8)),
  new sprite(new vector(16,128), new vector(8,8)),
  new sprite(new vector(24,128), new vector(8,8)),
  new sprite(new vector(32,128), new vector(8,8)),
  new sprite(new vector(40,128), new vector(8,8)), 
  new sprite(new vector(48,128), new vector(8,8)),
  new sprite(new vector(56,128), new vector(8,8))],   
  [0,0,0,2,2,1,1,1,2,2,3,3,3,4,4,5,5,5,2,2,0,0,0,6,6], 1
);
var MIST = new animation(
  [new sprite(new vector(80,0), new vector(16,16)),
    new sprite(new vector(96,0), new vector(16,16)),
    new sprite(new vector(112,0), new vector(16,16)),
    new sprite(new vector(128,0), new vector(16,16)),        
  ],
  [0,0,1,1,1,2,2,2,3,3,0]
);
var MISTLEFT = new animation(
  [new sprite(new vector(80,24), new vector(16,16)),
    new sprite(new vector(96,24), new vector(16,16)),
    new sprite(new vector(112,24), new vector(16,16)),
    new sprite(new vector(128,24), new vector(16,16)),        
  ],
  [0,0,1,1,1,2,2,2,3,3,0]
);
var FIRE = new animation(
  [new sprite(new vector(80,16), new vector(8,8)),
    new sprite(new vector(88,16), new vector(8,8)),
    new sprite(new vector(96,16), new vector(8,8)),
    new sprite(new vector(104,16), new vector(8,8)),        
  ],
  [0,0,0,1,1,1,2,2,2,3,3,3,3,3,3,3,3,3,3,3,2,1,1,0]
);
var FIRELEFT = new animation(
  [new sprite(new vector(80,40), new vector(8,8)),
    new sprite(new vector(88,40), new vector(8,8)),
    new sprite(new vector(96,40), new vector(8,8)),
    new sprite(new vector(104,40), new vector(8,8)),        
  ],
  [0,0,0,1,1,1,2,2,2,3,3,3,3,3,3,3,3,3,3,3,2,1,1,0]
);
var SWING = new animation(
  [new sprite(new vector(16,0), new vector(16,24)),
    new sprite(new vector(32,0), new vector(16,24)),
    new sprite(new vector(0,136), new vector(16,24)),
    new sprite(new vector(16,136), new vector(16,24)),        
  ],
  [2,1,1,0,0,1,1,2,2,3,3,3,2,2,1,0], 1, "swing"
);
var SWINGLEFT = new animation(
  [new sprite(new vector(16,24), new vector(16,24)),
    new sprite(new vector(32,24), new vector(16,24)),
    new sprite(new vector(32,136), new vector(16,24)),
    new sprite(new vector(48,136), new vector(16,24)),        
  ],
  [2,1,1,0,0,1,1,2,2,3,3,3,2,2,1,0], 1, "swing"
);
var SWORD = new animation(
  [new sprite(new vector(0,200), new vector(32,24)),
    new sprite(new vector(32,200), new vector(32,24)),
    new sprite(new vector(64,200), new vector(32,24)),
    new sprite(new vector(96,200), new vector(32,24)),        
  ],
  [2,1,1,0,0,1,1,2,2,3,3,3,2,2,1,0], 1
);
var SWORDLEFT = new animation(
  [new sprite(new vector(0,224), new vector(32,24)),
    new sprite(new vector(32,224), new vector(32,24)),
    new sprite(new vector(64,224), new vector(32,24)),
    new sprite(new vector(96,224), new vector(32,24)),        
  ],
  [2,1,1,0,0,1,1,2,2,3,3,3,2,2,1,0], 1
);
var SWORDSHARD = new animation([
  new sprite(new vector(120,16), new vector(8,8)),
  new sprite(new vector(128,16), new vector(8,8)),
  new sprite(new vector(136,16), new vector(8,8)),
  ],
  [0,0,0,1,1,1,1,2,2,2,2,2,2,0,0,0]
);
var SWORDSHARDLEFT = new animation([
  new sprite(new vector(120,40), new vector(8,8)),
  new sprite(new vector(128,40), new vector(8,8)),
  new sprite(new vector(136,40), new vector(8,8)),
  ],
  [0,0,0,1,1,1,1,2,2,2,2,2,2,0,0,0]
);
var STAFF = new animation(
  [new sprite(new vector(0,264), new vector(32,24)),
    new sprite(new vector(32,264), new vector(32,24)),
    new sprite(new vector(64,264), new vector(32,24)),
    new sprite(new vector(96,264), new vector(32,24)),        
  ],
  [2,1,1,0,0,1,1,2,2,3,3,3,2,2,1,0]
);
var STAFFLEFT = new animation(
  [new sprite(new vector(0,288), new vector(32,24)),
    new sprite(new vector(32,288), new vector(32,24)),
    new sprite(new vector(64,288), new vector(32,24)),
    new sprite(new vector(96,288), new vector(32,24)),        
  ],
  [2,1,1,0,0,1,1,2,2,3,3,3,2,2,1,0]
);
var BOSSDROP = new animation(
  [new sprite(new vector(0,312), new vector(48,72)),
  new sprite(new vector(48,312), new vector(48,72)),
  new sprite(new vector(96,312), new vector(48,72)),
  ],
  [0,1,1,2,2,1,0], 2
);
var BOSSSTOMP = new animation(
  [new sprite(new vector(0,384), new vector(48,72)),
  new sprite(new vector(48,384), new vector(48,72)),
  new sprite(new vector(96,384), new vector(48,72)),
  ],
  [0,0,0,1,1,1,2,2,2,1,0]
);
var BOSSDUCK = new animation(
  [new sprite(new vector(0,456), new vector(48,72)),
  new sprite(new vector(48,456), new vector(48,72)),
  new sprite(new vector(96,456), new vector(48,72)),
  ],
  [0,0,0,1,1,2,2,2,2,1,0,0], 2
);
var BOSSDEATH = new animation(
  [new sprite(new vector(0,456), new vector(48,72)),
  new sprite(new vector(48,456), new vector(48,72)),
  new sprite(new vector(96,456), new vector(48,72)),
  ],
  [0,0,1,1,2,2,1,0,1,2,1,0,1,2,1,0,0,1,1,2,2,2], 2
);
var CHESTCLOSED = new sprite(new vector(0,608), new vector(16,16));
var CHESTOPEN = new sprite(new vector(96,48), new vector(16,16));
var DOOROPEN = new sprite(new vector(0,64), new vector(16,32));
var DOORLOCKED = new sprite(new vector(0,96), new vector(16,32));
var JUNGLEDOOR = new sprite(new vector(96,648), new vector(16,32));
var JUNGLEDOORLOCKED = new sprite(new vector(80,648), new vector(16,32));
var BEEHIVE = new sprite(new vector(0,624), new vector(16,16));
var BROKENBEEHIVE = new animation([new sprite(new vector(128,616), new vector(16,16)), new sprite(new vector(128,632), new vector(16,16)), new sprite(new vector(128,648), new vector(16,16))],[0,0,0,1,1,0,1,1,1,2,2]);
var BEES = new animation([new sprite(new vector(32,664), new vector(16,16)),new sprite(new vector(48,664), new vector(16,16)),new sprite(new vector(64,664), new vector(16,16)),new sprite(new vector(32,680), new vector(16,16)),new sprite(new vector(48,680), new vector(16,16))],[0,1,2,3,4]);
var BEESRIGHT = new animation([new sprite(new vector(64,680), new vector(16,16)),new sprite(new vector(80,680), new vector(16,16)),new sprite(new vector(96,680), new vector(16,16)),new sprite(new vector(112,680), new vector(16,16)),new sprite(new vector(128,680), new vector(16,16))],[0,1,2,3,4]);
var PLANT = new animation([new sprite(new vector(0,704), new vector(16,24)),new sprite(new vector(16,704), new vector(16,24))],[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],4);
var PLANTDIE = new animation([new sprite(new vector(0,1032), new vector(16,24)),new sprite(new vector(16,1032), new vector(16,24)), new sprite(new vector(32,1032), new vector(16,24)),new sprite(new vector(48,1032), new vector(16,24))],[0,0,1,1,2,2,2,3,3,4,4],1);
var PLANTUP = new animation([new sprite(new vector(16,704), new vector(16,24)),new sprite(new vector(32,696), new vector(16,32)),new sprite(new vector(48,696), new vector(16,32))],[0,1,2,2,1,1,0,0],2);
var PLANTLEFT = new animation([new sprite(new vector(16,704), new vector(16,24)),new sprite(new vector(64,704), new vector(24,24)),new sprite(new vector(88,704), new vector(32,24))],[0,1,2,2,1,1,0,0],2);
var PLANTRIGHT = new animation([new sprite(new vector(16,704), new vector(16,24)),new sprite(new vector(64,736), new vector(24,24)),new sprite(new vector(88,736), new vector(32,24))],[0,1,2,2,1,1,0,0],2);
var SPIKEBALL = new animation([new sprite(new vector(16,688), new vector(8,8)), new sprite(new vector(24,688), new vector(8,8)), new sprite(new vector(16,696), new vector(8,8)), new sprite(new vector(24,696), new vector(8,8))],
[0,0,0,0,0,0,0,0,1,1,2,3], 2);
var WARRIOR = new animation([new sprite(new vector(16,760), new vector(16,32)),new sprite(new vector(0,760), new vector(16,32)),new sprite(new vector(32,760), new vector(16,32))],[0,1,0,2],3);
var WARRIORRIGHT = new animation([new sprite(new vector(16,728), new vector(16,32)),new sprite(new vector(0,728), new vector(16,32)),new sprite(new vector(32,728), new vector(16,32))],[0,1,0,2],3);
var WARRIORSWING = new animation([new sprite(new vector(16,760), new vector(16,32)),new sprite(new vector(120,696), new vector(16,32)),new sprite(new vector(120,728), new vector(16,32))],
[0,0,1,1,1,2,2,2,1,1,0,0,0,0]);
var WARRIORSWINGRIGHT = new animation([new sprite(new vector(16,728), new vector(16,32)),new sprite(new vector(48,728), new vector(16,32)),new sprite(new vector(48,760), new vector(16,32))],
[0,0,1,1,1,2,2,2,1,1,0,0,0,0]);
var SHIELD = new sprite(new vector(0,688), new vector(16,16));
var WARRIORDIE = new animation([
  new sprite(new vector(64,760), new vector(16,32)),
  new sprite(new vector(80,760), new vector(16,32)),
  new sprite(new vector(96,760), new vector(16,32)),
], [0,0,1,1,1,1,2,2], 2);
var WARRIORDIELEFT = new animation([
  new sprite(new vector(64,792), new vector(16,32)),
  new sprite(new vector(80,792), new vector(16,32)),
  new sprite(new vector(96,792), new vector(16,32)),
], [0,0,1,1,1,1,2,2], 2);
var BUSH = new animation([
  new sprite(new vector(32,648), new vector(16,16)), 
], [0], 1);
var EVILBUSH = new animation([
  new sprite(new vector(32,648), new vector(16,16)),
  new sprite(new vector(112,664), new vector(16,16)),
  new sprite(new vector(128,664), new vector(16,16)), 
], [0,0,0,1,2,2,1], 3);
var MONKEYLEFT = new animation([
  new sprite(new vector(0,832), new vector(16,16)),
  new sprite(new vector(16,832), new vector(16,16)),
  new sprite(new vector(32,832), new vector(16,16)), 
], [0,1,0,2], 2);
var MONKEY = new animation([
  new sprite(new vector(0,848), new vector(16,16)),
  new sprite(new vector(16,848), new vector(16,16)),
  new sprite(new vector(32,848), new vector(16,16)), 
], [0,1,0,2], 2);
var MONKEYHANGINGLEFT = new animation([
  new sprite(new vector(48,832), new vector(16,16)),
  new sprite(new vector(64,832), new vector(16,16)),
  new sprite(new vector(80,832), new vector(16,16)), 
], [0,1,1,0,2,2], 2, "hanging");
var MONKEYHANGING = new animation([
  new sprite(new vector(48,848), new vector(16,16)),
  new sprite(new vector(64,848), new vector(16,16)),
  new sprite(new vector(80,848), new vector(16,16)), 
], [0,1,1,0,2,2], 2, "hanging");
var MONKEYJUMPLEFT = new animation([
  new sprite(new vector(64,832), new vector(16,16)),
], [0], 1);
var MONKEYJUMP = new animation([
  new sprite(new vector(64,848), new vector(16,16)),
], [0], 1);
var SKELEMONKEYLEFT = new animation([
  new sprite(new vector(0,864), new vector(16,16)),
  new sprite(new vector(16,864), new vector(16,16)),
  new sprite(new vector(32,864), new vector(16,16)), 
], [0,1,0,2], 2);
var SKELEMONKEY = new animation([
  new sprite(new vector(0,880), new vector(16,16)),
  new sprite(new vector(16,880), new vector(16,16)),
  new sprite(new vector(32,880), new vector(16,16)), 
], [0,1,0,2], 2);
var SKELEMONKEYHANGINGLEFT = new animation([
  new sprite(new vector(48,864), new vector(16,16)),
  new sprite(new vector(64,864), new vector(16,16)),
  new sprite(new vector(80,864), new vector(16,16)), 
], [0,1,1,0,2,2], 2, "hanging");
var SKELEMONKEYHANGING = new animation([
  new sprite(new vector(48,880), new vector(16,16)),
  new sprite(new vector(64,880), new vector(16,16)),
  new sprite(new vector(80,880), new vector(16,16)), 
], [0,1,1,0,2,2], 2, "hanging");
var SKELEMONKEYJUMPLEFT = new animation([
  new sprite(new vector(64,864), new vector(16,16)),
], [0], 1);
var SKELEMONKEYJUMP = new animation([
  new sprite(new vector(64,880), new vector(16,16)),
], [0], 1);
var MONKEYDIE = new animation([
  new sprite(new vector(64,848), new vector(16,16)),
  new sprite(new vector(80,848), new vector(16,16)),
], [0,0,1,1], 3);
var MONKEYDIELEFT = new animation([
  new sprite(new vector(64,832), new vector(16,16)),
  new sprite(new vector(80,832), new vector(16,16)),
], [0,0,1,1], 3);
var CACTUS = new animation([
  new sprite(new vector(0,912), new vector(16,32)),
  new sprite(new vector(16,912), new vector(16,32)),
  new sprite(new vector(32,912), new vector(16,32)),
  new sprite(new vector(48,912), new vector(16,32)),
  new sprite(new vector(64,912), new vector(16,32)),
], [0,1,2,3,4,3,2,1], 2);
var CACTUSATTACK = new animation([
  new sprite(new vector(80,912), new vector(16,32)),
  new sprite(new vector(104,912), new vector(16,32)),  
  new sprite(new vector(896,912), new vector(16,32)),
], [0,1,2,3,4,3,2,1], 2);
var TUMBLEWEED = new animation([
  new sprite(new vector(80,912), new vector(16,16)),
  new sprite(new vector(104,912), new vector(16,16)),  
], [0,1,2,3,4,3,2,1], 2);