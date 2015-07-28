function GetRandomNumber(min, max) {
    var randomNumber = Math.floor(Math.random()*(max-min+1)+min);
    return randomNumber;
};

// TSK: ScoreBoard object base class
var ScoreBoard = function(_score) {
    score = _score;
}
ScoreBoard.prototype.render = function() {
    ctx.clearRect(10, 600, 100, -14);
    ctx.font="18px Arial";
    ctx.fillText("Score: " + score, 10, 600);
}

// TSK: PickupItem object base class
var PickupItem = function(_pickupItemImg, _pickupItemX, _pickupItemY) {
    this.image = _pickupItemImg;
    this.x = _pickupItemX;
    this.y = _pickupItemY;
};

PickupItem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.image), this.x, this.y);
};

var Gem = function (_gemImage, _gemXLocation, _gemYLocation) {
    PickupItem.call(this, _gemImage, _gemXLocation, _gemYLocation);
};
Gem.prototype = Object.create(PickupItem.prototype);
Gem.prototype.constructor = Gem;
Gem.prototype.checkIfTouchingPlayer = function(player, gem) {
    if (player.x === gem.x && player.y === gem.y) {
      score = score + 100;
      gem.image = gemImageArray[GetRandomNumber(0, (gemImageArray.length - 1))];
      gem.x = gemXLocArray[GetRandomNumber(0, (gemXLocArray.length - 1))];
      gem.y = gemYLocArray[GetRandomNumber(0, (gemYLocArray.length - 1))];
    }
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

// TSK: Check enemy position and if off right edge of canvas, randomize
// Y position and speed and reset back to start X position.
// If not off screen, continue to move across screen by
// current movement speed.
    if (this.x > 550) {
      this.x = -150;
      this.y = bugRowArray[GetRandomNumber(0, (bugRowArray.length - 1))];
      this.speed = GetRandomNumber(100, 200);
    } else {
      this.x = this.x + (this.speed * dt);
    }

//console.log("Current Enemy Speed = " + this.speed);
//console.log("Current Enemy X = " + this.x);
//console.log("Current Enemy Y = " + this.y);

//console.log("***** EXITING ENEMY UPDATE FUNCTION *****");
};

Enemy.prototype.checkIfTouchingPlayer = function(enemyX, enemyY, playerX, playerY, player) {
    if (enemyY === playerY && (enemyX >= (playerX -40) && (enemyX <= (playerX + 40)))) {
      player.x = 200;
      player.y = 380;
      score = 0;
    }
};

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
    // TSK: If player is in the water (player.y = -20) then reset player (death).
    if (player.y === -20) {
      player.x = 200;
      player.y = 380;
    }
};

//  TSK: Take the key input and move the player
//  according to the direction pressed.
//  If the player position does not allow that move
//  do not move the player.
Player.prototype.handleInput = function(keyPressed) {
    if (keyPressed === 'left' && player.x > 50 && player.x <= 400) {
      player.x = player.x - 100;
    }
    else if (keyPressed === 'right' && player.x < 400) {
      player.x = player.x + 100;
    }
    else if (keyPressed === 'up' && player.y > -20) {
      player.y = player.y - 80;
    }
    else if (keyPressed === 'down' && player.y < 380) {
      player.y = player.y + 80;
    }
};

var bugRowArray = [60, 140, 220];
var gemXLocArray = [0, 100, 200, 300, 400];
var gemYLocArray = [60, 140, 220];
var gemImageArray = ['images/Gem Blue.png', 'images/Gem Green.png', 'images/Gem Orange.png'];
var spriteImgArray = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'];

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy('images/enemy-bug.png', GetRandomNumber(100, 200), -150, bugRowArray[GetRandomNumber(0, (bugRowArray.length - 1))]);
var enemy2 = new Enemy('images/enemy-bug.png', GetRandomNumber(100, 200), -150, bugRowArray[GetRandomNumber(0, (bugRowArray.length - 1))]);
var enemy3 = new Enemy('images/enemy-bug.png', GetRandomNumber(100, 200), -150, bugRowArray[GetRandomNumber(0, (bugRowArray.length - 1))]);
var enemy4 = new Enemy('images/enemy-bug.png', GetRandomNumber(100, 200), -150, bugRowArray[GetRandomNumber(0, (bugRowArray.length - 1))]);
var enemy5 = new Enemy('images/enemy-bug.png', GetRandomNumber(100, 200), -150, bugRowArray[GetRandomNumber(0, (bugRowArray.length - 1))]);
var player = new Player(spriteImgArray[GetRandomNumber(0, (spriteImgArray.length - 1))], 200, 380);
var gem1 = new Gem(gemImageArray[GetRandomNumber(0, (gemImageArray.length - 1))], gemXLocArray[GetRandomNumber(0, (gemXLocArray.length - 1))], gemYLocArray[GetRandomNumber(0, (gemYLocArray.length - 1))]);
var scoreBoard = new ScoreBoard(0);

var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];
var allPickupItems = [gem1];

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
