function GetRandomNumber(maxValue) {
  var randomNumber = Math.floor(Math.random() * maxValue);
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
var Enemy = function(sprite, x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    Entity.call(this, sprite, x, y);
    this.sprite = sprite;
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

    //for (var i = 0; i < 551; i++) {
      //this.x = this.x + 1;
      //console.log("i = " + i + " x = " + this.x);
    //}

    //if (this.x <= 550) {
      this.x = this.x + (100 * dt);
      console.log("DT = " + dt);
    //}

    if (this.x > 550) {
      this.x = -125;
    }

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
var enemy1 = new Enemy('images/enemy-bug.png', 0, bugRowArray[GetRandomNumber(3)]);
var enemy2 = new Enemy('images/enemy-bug.png', 0, bugRowArray[GetRandomNumber(3)]);
var player = new Player('images/char-boy.png', 200, 380);
var allEnemies = [enemy1, enemy2];

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
