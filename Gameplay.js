class Laser extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y) {
        super(scene, x ,y, 'laser');
    }

    fire(x, y)
    {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);

        this.setVelocityY(-900);
    }

    fire2(x, y)
    {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);

        this.setVelocityY(900);
    }

    preUpdate(time, delta)
    {
        super.preUpdate(time, delta)
        {
            if(this.y <= 0)
            {
                this.setActive(false);
                this.setVisible(false);
            }

            if(this.y >= 1000)
            {
                this.setActive(false);
                this.setVisible(false);
            }
        }
    }
}

class LaserGroup extends Phaser.Physics.Arcade.Group{
    constructor(scene) {
        super(scene.physics.world, scene);

        this.createMultiple(
            {
                classType: Laser,
                frameQuantity: 30,
                active: false,
                visible: false,
                key: 'laser'
            })
    }

    fireLaser(x, y)
    {
        const laser = this.getFirstDead(false)
        if(laser)
        {
            laser.fire(x, y);
        }
    }

    fireLaser2(x, y)
    {
        const laser = this.getFirstDead(false)
        if(laser)
        {
            laser.fire2(x, y);
        }
    }
}

class Gameplay extends Phaser.Scene {
    constructor() {
        super('Gameplay')
    }

    preload() {
        this.load.image('Player', 'Images/playerShip1_blue.png');
        this.load.image('Player2', 'Images/playerShip1_red.png');
        this.load.image('laser', 'Images/blasterbolt.png');
        this.load.image('Background2', 'Images/Background2.png');
        this.load.image('Health', 'Images/medkit.png');
        this.load.image('blocker', 'Images/medkit.png');
        this.load.image('Powerup', 'Images/ShotSpeed.png');
        this.load.image('Powerup2', 'Images/ShotSpeed.png');
        this.load.audio('Music2', 'Images/Space.mp3');
        this.load.audio('Shoot', 'Images/Shoot.wav');
    }

    create() {

        cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.setBackgroundColor(0x1D1923);

        levelMus = this.sound.add('Music2');
        levelMus.play({volume: 1, loop: true, config});

        let image2 = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Background2')
        let scaleX = this.cameras.main.width / image2.width
        let scaleY = this.cameras.main.height / image2.height
        let scale = Math.max(scaleX, scaleY)
        image2.setScale(scale).setScrollFactor(0)

        ShootSound = this.sound.add('Shoot');

        playerBullets = new LaserGroup(this);
        playerBullets2 = new LaserGroup(this);

        Player2Text = this.add.text(20, 350, "Health: 500",  {font: "20px Arial", fill: "blue"});
        Player1Text = this.add.text(20, 310, "Health: 500", {font: "20px Arial", fill: "red"});

        Player1 = this.physics.add.sprite(400, 680, 'Player').setScale(1);
        Player2 = this.physics.add.sprite(400, 50, 'Player2').setScale(1);

        Player2.flipY = true;

        Player1.setCollideWorldBounds(true);
        Player2.setCollideWorldBounds(true);

        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        this.physics.add.collider(playerBullets);
        this.physics.add.collider(playerBullets2);

        Blocker = this.physics.add.image(-230,-230,'blocker').setImmovable();

        this.physics.add.overlap(Player2, playerBullets, gotHit, null, this);
        this.physics.add.overlap(Player1, playerBullets2, gotHit2, null, this);

        this.physics.add.collider(Player2, Blocker);

        TimedEvent = this.time.addEvent({ delay: 500, callback: onEvent, callbackScope: this, repeat:9, loop: true });
        TimedEvent2 = this.time.addEvent({ delay: 500, callback: onEvent2, callbackScope: this, repeat:9, loop: true })
        TimedEvent3 = this.time.addEvent({ delay: 500, callback: onEvent3, callbackScope: this, repeat:9, loop: true });
        TimedEvent4 = this.time.addEvent({ delay: 500, callback: onEvent4, callbackScope: this, repeat:9, loop: true });

    }

    shootLaser()
    {
        playerBullets.fireLaser(Player1.x, Player1.y - 20)
    }

    shootLaser2()
    {
        playerBullets2.fireLaser2(Player2.x, Player2.y - 20)
    }

    update() {

        if(Player1 != null) {
            Player1.setVelocity(0);
            Player1.setRotation(0);
        }

        if(Player2 != null) {
            Player2.setVelocity(0);
            Player2.setRotation(0);
        }

        if(iscountdownActive === false) {
            BulletTimer2 +=1;
        }

        else if(iscountdownActive === true) {
            BulletTimer2 +=3;
        }

        if(iscountdownActive2 === false) {
            BulletTimer +=1;
        }

        else if(iscountdownActive2 === true) {
            BulletTimer +=3;
        }

        if (cursors.left.isDown && player1Dead === false && player2Dead === false)
        {
            Player1.setVelocityX(-300);
        }

        else if (cursors.right.isDown && player1Dead === false && player2Dead === false)
        {
            Player1.setVelocityX(300);
        }

        if(cursors.up.isDown && BulletTimer >= 30 && player1Dead === false && player2Dead === false)
        {
            this.shootLaser();
            ShootSound.play();
            BulletTimer = 0;
        }

        if(keyA.isDown && player2Dead === false && player1Dead === false)
        {
            console.log('A key pressed')
            Player2.setVelocityX(-300);
        }

        if(keyS.isDown && BulletTimer2 >= 30 && player2Dead === false && player1Dead === false)
        {
            console.log('P key pressed')
            this.shootLaser2();
            ShootSound.play();
            BulletTimer2 = 0;
        }

        else if(keyD.isDown && player2Dead === false && player1Dead === false) {
            console.log('D key pressed')
            Player2.setVelocityX(300);
        }

        if(isHealthSpawned == true)
        {
            despawnTimer++;
        }

        if(isHealthSpawned2 == true)
        {
            despawnTimer2++;
        }

        if(isPowerSpanwed == true)
        {
            despawnTimer3++;
        }

        if(isPowerSpanwed2 == true)
        {
            despawnTimer4++;
        }

        console.log(spawnTimer4);

        deSpawn();
        deSpawn2();
        deSpawn3();
        deSpawn4();

        if(iscountdownActive === true)
        {
            countdownTimer++;
        }

        if(iscountdownActive2 === true)
        {
            countdownTimer2++;
        }

        if(countdownTimer >= 200)
        {
            iscountdownActive = false;
            countdownTimer = 0;
        }

        if(countdownTimer2 >= 200)
        {
            iscountdownActive2 = false;
            countdownTimer2 = 0;
        }

        if(keyP.isDown && player2Dead === true || keyP.isDown && player1Dead === true)
        {
            levelMus.stop();
            player1Dead = false;
            player2Dead = false;
            Player1Health = 500;
            Player2Health = 500;
            this.scene.start("Menu")
        }

        if(Player2Health <= 0)
        {
            player2Dead = true;
            Player1.setVisible(false);
            this.add.text(400, 300, "Player 1 Wins!", {font: "35px Arial", fill: "red"});
            this.add.text(400, 400, "Press P to go back to Main Menu", {font: "35px Arial", fill: "red"});
        }

        if(Player1Health <= 0)
        {
            player1Dead = true;
            Player2.setVisible(false);
            this.add.text(400, 300, "Player 2 Wins!", {font: "35px Arial", fill: "blue"});
            this.add.text(400, 400, "Press P to go back to Main Menu", {font: "35px Arial", fill: "blue"});
        }

        console.log(Player1Health);
    }
}