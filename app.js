class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('game');
        this.context = this.canvas.getContext('2d');
        document.addEventListener("keydown", this.onKeyPress.bind(this));
        this.canvas.addEventListener("mousedown", this.getMousePosition.bind(this))

        function sound(src) {
            this.sound = document.createElement("audio");
            this.sound.src = src;
            this.sound.setAttribute("preload", "auto");
            this.sound.setAttribute("controls", "none");
            this.sound.style.display = "none";
            document.body.appendChild(this.sound);
            this.play = function() {
                this.sound.play();
            }
            this.stop = function() {
                this.sound.pause();
            }
        }
        this.mysound = new sound("ses2.mp3");
        this.Screamsound = new sound("Scream.mp3");

    }

    init() {
        this.speed = 7;
        this.positionX = this.positionY = 10;
        this.appleX = this.appleY = 5;
        this.tailSize = 5;
        this.trail = [];
        this.gridSize = this.tileCount = 20;
        this.velocityX = 0
        this.velocityY = 1;
        this.timerCount = 0;

        this.timer = setInterval(this.loop.bind(this), 1000 / this.speed)
    }

    reset() {
        clearInterval(this.timer);
        this.init();
    }

    loop() {
        this.update();
        this.draw();

    }

    getMousePosition(event) {
        //let rect = canvas.getBoundingClientRect();
        var x = event.clientX;
        var y = event.clientY;
        console.log("Coordinate x: " + x,
            "Coordinate y: " + y);

        if (x >= 10 && x <= 85 && y >= 125 && y <= 270) {
            this.velocityX = -1;
            this.velocityY = 0;
        }

        if (x >= 115 && x <= 300 && y >= 15 && y <= 90) {
            this.velocityX = 0;
            this.velocityY = -1;
        }

        if (x >= 315 && x <= 390 && y >= 125 && y <= 270) {
            this.velocityX = 1;
            this.velocityY = 0;
        }

        if (x >= 115 && x <= 300 && y >= 315 && y <= 390) {
            this.velocityX = 0;
            this.velocityY = 1;
        }
    }





    update() {



        // this.timerCount += 1;
        // if (this.timerCount / 700 == 1) {
        //     if (this.speed >= 10) {
        //         this.speed = 10;
        //     } else {
        //         this.speed += 1;
        //     }
        //     this.timerCount = 0;
        //     console.log("object");
        //     this.init();
        // }
        // console.log(this.speed);

        this.positionX += this.velocityX;
        this.positionY += this.velocityY;

        if (this.positionX < 0) {
            this.positionX = this.tileCount - 1;
        }
        if (this.positionY < 0) {
            this.positionY = this.tileCount - 1;
        }
        if (this.positionX > this.tileCount - 1) {
            this.positionX = 0;
        }

        if (this.positionY > this.tileCount - 1) {
            this.positionY = 0;
        }

        this.trail.forEach(t => {
            if (this.positionX === t.positionX && this.positionY === t.positionY) {
                this.Screamsound.play();
                this.reset();
            }
        });

        this.trail.push({ positionX: this.positionX, positionY: this.positionY });

        while (this.trail.length > this.tailSize) {
            this.trail.shift();
        }
        if (this.appleX === this.positionX && this.appleY === this.positionY) {
            this.mysound.play();
            this.tailSize++;
            this.appleX = Math.floor(Math.random() * this.tileCount);
            this.appleY = Math.floor(Math.random() * this.tileCount);
        }
    }

    draw() {
        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)

        this.context.fillStyle = "white";
        this.context.font = "20px Arial";
        this.context.fillText(this.tailSize - 5, 20, 40);



        this.context.fillStyle = "red";
        this.trail.forEach(t => {
            this.context.fillRect(t.positionX * this.gridSize, t.positionY * this.gridSize - 5, this.gridSize - 5, this.gridSize - 5)
        });

        this.context.fillStyle = "pink";
        this.context.fillRect(this.appleX * this.gridSize, this.appleY * this.gridSize, this.gridSize - 5, this.gridSize - 5)
    }

    onKeyPress(e) {
        if (e.keyCode === 37 && this.velocityX !== 1) {
            this.velocityX = -1;
            this.velocityY = 0;
        }

        if (e.keyCode === 38 && this.velocityY !== 1) {
            this.velocityX = 0;
            this.velocityY = -1;
        }

        if (e.keyCode === 39 && this.velocityX !== -1) {
            this.velocityX = 1;
            this.velocityY = 0;
        }

        if (e.keyCode === 40 && this.velocityY !== -1) {
            this.velocityX = 0;
            this.velocityY = 1;
        }




    }


}

const game = new SnakeGame();
window.onload = () => game.init();