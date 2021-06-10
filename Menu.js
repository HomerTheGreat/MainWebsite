class Button extends Phaser.GameObjects.Sprite {
    onInputOver = () => {}
    onInputOut = () => {}
    onInputUp = () => {}
    onInputDown = () => {}

    constructor(scene, x, y, texture, actionOnClick = () => {}, overFrame, outFrame) {
        super(scene, x, y, texture)
        scene.add.existing(this)

        this.setFrame(outFrame)
            .setInteractive()

            .on('pointerover', () => {
                this.onInputOver()

            })
            .on('pointerdown', () => {
                this.onInputDown()
                actionOnClick()
            })

            .on('pointerup', () => {
                this.onInputUp()

            })
            .on('pointerout', () => {
                this.onInputOut()
            })
    }
}

class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu' })
    }

    preload()
    {
        this.load.setCORS('anonymous')
        this.load.image('button', 'Images/Button15.png')
        this.load.image('background', 'Images/Background1.jpg')
        this.load.audio('menuMusic', 'Images/BackgroundMusic.mp3')
        this.load.image('button2', 'Images/Button15.png')
    }

    create()
    {
        let bgMusic = this.sound.add('menuMusic')
        bgMusic.play({volume: 3, loop: true, config})

        let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background')
        let scaleX = this.cameras.main.width / image.width
        let scaleY = this.cameras.main.height / image.height
        let scale = Math.max(scaleX, scaleY)
        image.setScale(scale).setScrollFactor(0)

        game.sound.context.resume();

        const actionOnClick = () => {

            console.log('click')
        }

        let btn1 = new Button(this, 400, 400, 'button', actionOnClick, 2, 1, 0)
        btn1.onInputOut = () => {
            console.log('Btn1: onInputOut')
        }
        btn1.onInputDown = () => {
            bgMusic.stop();
            this.scene.start("Instructions")
        }

        btn1.setOrigin(0)

        let btn2 = new Button(this, 400, 200, 'button2', actionOnClick, 'over', 'out', 'down')
        btn2.onInputOut = () => {
            console.log('Btn2: onInputOut')
        }

        btn2.setOrigin(0)

        btn2.onInputDown = () => {
            bgMusic.stop();
            this.scene.start("Gameplay");
        }

        this.add.text(350, 20, "Duel Brawlers", {font: "75px Arial", fill: "yellow"});
        this.add.text(495, 215, "Play ", {font: "45px Arial", fill: "black"});

        this.add.text(495, 415, "Help ", {font: "45px Arial", fill: "black"});
    }
}