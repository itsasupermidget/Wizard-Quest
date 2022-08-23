var items = [null,"mist","sword","staff","staffa","staffb","staffc","necklace"];
function encrypt(number) {
  number = Math.round(number);
  var stringNumber = number+"";
  if (number < 10) {
    return "Z"+symbols[number];
  } else {
    return symbols[Number(stringNumber[0])]+symbols[Number(stringNumber[1])];
  }
}

function generatePassword() {
  var password = "";
  password += encrypt(level.x);
  if (player.inventory[0]) {
    password += encrypt(items.indexOf(player.inventory[0]));
  } else { password += "ZZ"};
  password += encrypt(level.y);
  if (player.inventory[1]) {
    password += encrypt(items.indexOf(player.inventory[1]));
  } else { password += "ZZ"};
  var hp = ((player.health/player.maxHealth)*100)-1;
  if (hp < 1) {
    hp = 100;
  }
  password += encrypt(hp);
  if (player.inventory[2]) {
    password += encrypt(items.indexOf(player.inventory[2]));
  } else { password += "ZZ"};
  password += encrypt(player.maxHealth/10);
  password += encrypt(player.maxMana/10);
  return password;
}

function loadPassword(password) {
  var doubles = [];
  var numbers = ["0","1","2","3","4","5","6","7","8","9"];
  var i = 0;
  while (i < password.length) {
    doubles.push(Number(numbers[symbols.indexOf(password[i])]+numbers[symbols.indexOf(password[i+1])]));
    i+=2;
  }
  var a = items[doubles[1]];
  var b = items[doubles[3]];  
  var c = items[doubles[5]];
  if (a) {player.inventory.push(items[doubles[1]])}
  if (b) {player.inventory.push(items[doubles[3]])}
  if (c) {player.inventory.push(items[doubles[5]])}
  player.maxHealth = doubles[6]*10;
  player.health = ((doubles[4]+1)/100)*player.maxHealth;
  player.maxMana = doubles[7]*10;
  player.mana = player.maxMana/2;
  if (doubles[0] == 50 && doubles[2] == 2) {
    generateLevel(new vector(-1,0));
  } else {
    generateLevel(new vector(doubles[0], doubles[2]));
  }
}