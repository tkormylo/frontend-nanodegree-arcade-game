function GetRandomNumber(min, max) {
  var randomNumber = Math.floor(Math.random()*(max-min+1)+min);
  return randomNumber;
};

// Entity object base class
var Entity = function(spriteImg, x, y) {
  this.sprite = spriteImg;
  this.x = x;
  this.y = y;
};

// Entity objects base class
Entity.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function(_sprite, _speed, _x, _y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = _sprite;
    this.speed = _speed;
    Entity.call(this, _sprite, _x, _y);
};
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

//console.log("-- entered enemy update function");

    if (this.x > 550) {
      this.x = -150;
      this.y = bugRowArray[GetRandomNumber(0, 2)];
      this.speed = GetRandomNumber(100, 200);
    } else {
      this.x = this.x + (this.speed * dt);
    }

//console.log("Current Enemy Speed = " + this.speed);
//console.log("Current Enemy X = " + this.x);
//console.log("Current Enemy Y = " + this.y);


//console.log("***** EXITING ENEMY UPDATE FUNCTION *****");

};

// Draw the enemy on the screen, required method for game
//Enemy.prototype.render = function() {
    //ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
//}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(sprite, x, y) {
  Entity.call(this, sprite, x, y);
  this.sprite = sprite;
};

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function() {
};

// TSK: Take the key input and move the player
//      according to the direction pressed.
//      If the player position does not allow that move
//      do not move the player.
Player.prototype.handleInput = function(keyPressed) {
  if (keyPressed === 'left' && player.x > 50 && player.x <= 400) {
    player.x = player.x - 100;
  }
  else if (keyPressed === 'right' && player.x < 400) {
    player.x = player.x + 100;
  }
  else if (keyPressed === 'up' && player.y > 60) {
    player.y = player.y - 80;
  }
  else if (keyPressed === 'down' && player.y < 380) {
    player.y = player.y + 80;
  }
};

var bugRowArray = [60, 140, 220];

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy('images/enemy-bug.png', 100, 0, bugRowArray[GetRandomNumber(0, 2)]);
var enemy2 = new Enemy('images/enemy-bug.png', 100, 0, bugRowArray[GetRandomNumber(0, 2)]);
var enemy3 = new Enemy('images/enemy-bug.png', 100, 0, bugRowArray[GetRandomNumber(0, 2)]);
var enemy4 = new Enemy('images/enemy-bug.png', 100, 0, bugRowArray[GetRandomNumber(0, 2)]);
var enemy5 = new Enemy('images/enemy-bug.png', 100, 0, bugRowArray[GetRandomNumber(0, 2)]);
var player = new Player('images/char-boy.png', 200, 380);
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
