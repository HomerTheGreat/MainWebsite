var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1080,
        height: 720,
        audio: {
            disableWebAudio: true,
            Auto: true
        }
    },
    backgroundColor: '#ffffff',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    parent: 'phaser-example',
    scene: [Menu, Instructions, Gameplay]
};

var game = new Phaser.Game(config);

var Player1;
var Player2;

var cursors;

let keyA;
let keyD;
let keyP;
let keyS;

var playerBullets;
var playerBullets2;

var Lasers;

var BulletTimer = 0;
var BulletTimer2 = 0;

var Player1Text;
var Player2Text;

var Player1Health = 500;
var Player2Health = 500;

var Healthkit1;
var Healthkit2;
var powerup;
var powerup2;

var spawnTimer = 0;
var despawnTimer = 0;
var spawnTimer2 = 0;
var despawnTimer2 = 0;

var spawnTimer3 = 0;
var despawnTimer3 = 0;
var spawnTimer4 = 0;
var despawnTimer4 = 0;

var stopTimer = false;
var isHealthSpawned = false;
var isHealthSpawned2 = false;
var isPowerSpanwed = false;
var isPowerSpanwed2 = false;

var didPlayer1Win = false;
var didPlayer2Win = false;

var countdownTimer = 0;
var iscountdownActive = false;
var countdownTimer2 = 0;
var iscountdownActive2 = false;

var player1Dead = false;
var player2Dead = false;

let ShootSound;
let levelMus;

var TimedEvent;
var TimedEvent2;
var TimedEvent3;
var TimedEvent4;


var Blocker;

function gotHit()
{
    Player1Health -= 5;
    Player1Text.setText("Health: " + Player1Health);
}

function gotHit2()
{
    Player2Health -= 5;
    Player2Text.setText("Health: " + Player2Health);
}

function onEvent ()
{
    spawnTimer++;

    if (spawnTimer === 10)
    {
        isHealthSpawned = true;
        Healthkit1 = this.physics.add.image(500, 550, 'Health').setOrigin(0).setScale(0.25);
        this.physics.add.overlap(Player1, Healthkit1, gotHealth, null, this);
        spawnTimer = 0;
    }
}

function onEvent2 ()
{
    spawnTimer2++;

    if (spawnTimer2 === 10)
    {
        isHealthSpawned2 = true;
        Healthkit2 = this.physics.add.image(500, 50, 'Health').setOrigin(0).setScale(0.25);
        this.physics.add.overlap(Player2, Healthkit2, gotHealth2, null, this);
        spawnTimer2 = 0;
    }
}

function onEvent3 ()
{
    spawnTimer3++;

    if (spawnTimer3 === 10)
    {
        isPowerSpanwed = true;
        powerup = this.physics.add.image(850, 50, 'Powerup').setOrigin(0).setScale(0.25);
        this.physics.add.overlap(Player2, powerup, gotPower, null, this);
        spawnTimer3 = 0;
    }
}

function onEvent4 ()
{
    spawnTimer4++;

    if (spawnTimer4 === 10)
    {
        isPowerSpanwed2 = true;
        powerup2 = this.physics.add.image(850, 650, 'Powerup2').setOrigin(0).setScale(0.25);
        this.physics.add.overlap(Player1, powerup2, gotPower2, null, this);
        spawnTimer4 = 0;
    }
}

function gotHealth()
{
    Healthkit1.destroy(this);
    spawnTimer = 0;
    despawnTimer = 0;
    Player2Health += 50;
    Player2Text.setText("Health: " + Player2Health);
    console.log('gothealth');
}

function gotHealth2()
{
    Healthkit2.destroy(this);
    spawnTimer2 = 0;
    despawnTimer2 = 0;
    Player1Health += 50;
    Player1Text.setText("Health: " + Player1Health);
    console.log('gothealth2');
}

function gotPower()
{
    powerup.destroy(this);
    spawnTimer3 = 0;
    despawnTimer3 = 0;
    iscountdownActive = true;
}

function gotPower2()
{
    powerup2.destroy(this);
    spawnTimer4 = 0;
    despawnTimer4 = 0;
    iscountdownActive2 = true;
}

function deSpawn()
{
    if (despawnTimer >= 175)
    {
        despawnTimer = 0;
        Healthkit1.destroy(this);
        isHealthSpawned = false;
    }
}

function deSpawn2()
{
    if (despawnTimer2 >= 175)
    {
        despawnTimer2 = 0;
        Healthkit2.destroy(this);
        isHealthSpawned2 = false;
    }
}

function deSpawn3()
{
    if (despawnTimer3 >= 175)
    {
        despawnTimer3 = 0;
        powerup.destroy(this);
        isPowerSpanwed = false;
    }
}

function deSpawn4()
{
    if (despawnTimer4 >= 175)
    {
        despawnTimer4 = 0;
        powerup2.destroy(this);
        isPowerSpanwed2 = false;
    }
}


