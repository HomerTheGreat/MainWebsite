class Instructions extends Phaser.Scene {
    constructor() {
        super('Instructions')
    }
    preload() {
        this.load.setCORS('anonymous')
        this.load.image('button', 'Images/button.png')
        this.load.image('background', 'Images/Background2.png')
    }

    create() {
        let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background')
        let scaleX = this.cameras.main.width / image.width
        let scaleY = this.cameras.main.height / image.height
        let scale = Math.max(scaleX, scaleY)
        image.setScale(scale).setScrollFactor(0)

        this.add.text(425, 20, "Help Menu", {font: "40px Arial", fill: "yellow"});
        this.add.text(55, 120, "Player 1 Controls", {font: "50px Arial", fill: "white"});
        this.add.text(55, 220, "A : Move Left", {font: "20px Arial", fill: "white"});
        this.add.text(55, 280, "D : Move Right", {font: "20px Arial", fill: "white"});
        this.add.text(55, 340, "S : Shoot", {font: "20px Arial", fill: "white"});

        this.add.text(635, 120, "Player 2 Controls", {font: "50px Arial", fill: "white"});
        this.add.text(635, 220, "Right Arrow Key : Move Right", {font: "20px Arial", fill: "white"});
        this.add.text(635, 280, "Left Arrow Key : Move Left", {font: "20px Arial", fill: "white"});
        this.add.text(635, 340, "Up Arrow Key : Shoot", {font: "20px Arial", fill: "white"});

        const actionOnClick = () => {
            console.log('click')
        }


        let btn1 = new Button(this, 525, 650, 'button', actionOnClick, 2, 1, 0)
        btn1.onInputOut = () => {
            console.log('Btn1: onInputOut')
        }
        btn1.onInputDown = () => {

            this.scene.start("Menu")
        }
        this.add.text(425, 625, "Main Menu", {font: "40px Arial", fill: "yellow"});
    }
}
