class Player {
    constructor(id, posX, egg) {

        this.id = id;
        this.height = 50;
        this.width = 50;



        if (egg) {
            this.brain = egg.brain;
            this.category = egg.category;
        } else {
            this.brain = new NeuralNetwork(4, 10, 10, 3);
            this.category = "";
        }



        this.vision = 400;


        this.posX = posX;
        this.posY = 0;

        this.jumping = false;
        this.falling = false;
        this.maxJumpHeight = 220;
        this.currentJumpHeight = 0;
        this.jumpSpeed = 7;

        this.color = "znj"

        this.lastObstacle = 0;
        this.numberOfJumps = 0;
        this.score = 0;

        this.collectedStarsIndexes = [];

        

        this.firstJumpObstacle = 0;

        this.passedLandObsIndexes = [];
        this.crashed = false;

        this.firstBonus = false;
    }

    think(obstacles, stars) {

        var nextObstacle = this.getNextObstacle(obstacles);
        var nextStar = this.getNextStar(stars);

        this.lastObstacle = nextObstacle.index;

        var nextObstacleAltitude, nextStarAltitude;

        let { vision } = this;

        var distanceToNextStar = nextStar ? nextStar.posX - this.posX : vision;
        var nextStarAltitude = nextStar ? nextStar.posY : 0
        if (distanceToNextStar > vision) {
            distanceToNextStar = vision
            nextStarAltitude = vision;
        }

        //distanceToNextStar /= vision;
        //nextStarAltitude /= vision;

        var distanceToNextObstacle = nextObstacle ? nextObstacle.posX - this.posX : 400;
        if (distanceToNextObstacle > 400) 
        {
            distanceToNextObstacle = vision;
            nextObstacleAltitude = vision;
        } else {
            nextObstacleAltitude = nextObstacle.posY;
        }

        
        //distanceToNextObstacle /= 400;

        let inputs1 = [distanceToNextObstacle/400,
            nextObstacleAltitude/400,
            distanceToNextStar/400,
            nextStarAltitude/400]

        let output = this.brain.predict(inputs1);
 
        let total = output[0] + output[1] + output[2];

        var chances = [];

        for (let o of output) chances.push(o/total)

        //if (this.id==0) console.log(this.id, chances, distanceToNextObstacle, distanceToNextStar, nextObstacleAltitude)

        if ( output[0]/total > 0.33 || output[1]/total > 0.33 ) this.startJump();
            

    }
   
    generateHTML() {
        let { id, score, width, height, posX, currentJumpHeight, category, collectedStarsIndexes , parentIndex} = this;
        if (score >= 75) category = "white";
        //if (color == "cyan") console.log("generate", this, parentIndex)
        var html = `<div id="jumper${id}" class="jumper ${category}" style="
            width:${width}px;
            height:${height}px;
            left:${posX}px;
            bottom:${currentJumpHeight}px;
            ">
            ${score}<br/> 
            ${this.numberOfJumps}||${this.collectedStarsIndexes.length}

            </div>`;
        return html;
    }



    //TODO: CALL THIS ONLY IN DEBUG MODE, OTHERWISE CALCULATE JUST IN END
    calculateScore(y) {
  
        const { lastObstacle, numberOfJumps } = this;
        const passedGrounded = this.passedLandObsIndexes.length;
        const starsCollected = this.collectedStarsIndexes.length;
        
        this.score = 3 + passedGrounded * 4 + starsCollected * 7 - numberOfJumps * 3
        //if (lastObstacle == 1) this.score;
        //if (lastObstacle > 1) this.score +=2;

        //this.score *=10;

        return this.score;

    }


    getNextObstacle(obstacles) {
        for (let i = 0; i < obstacles.length; i++) {
            if (this.posX < obstacles[i].posX + obstacles[i].width - 5) {
                return obstacles[i];
            }
        }
    }

    addLastLandObs(obstacles) {

        for (let obs of obstacles){
            if (obs.posY == 0 && obs.posX + obs.width < this.posX && !this.passedLandObsIndexes.includes(obs.index)) {
                this.passedLandObsIndexes.push(obs.index);
            }
        }

        

    }

    getNextStar(stars) {
        //TAKE CARE
        if (!stars.length) return;
        for (let i = 0; i < stars.length; i++) {
            var distance = stars[i].posX - this.posX;
            if (distance > 400) return undefined;
            if (distance < 400 && distance > -stars[i].width && !this.collectedStarsIndexes.includes(stars[i].id)) {
                return stars[i];
            }
        }
    }

    startJump() {
        if (this.jumping == false && this.falling == false) {
            this.jumping = true;
            this.numberOfJumps++;
            this.currentJumpHeight = 0;

            if (!this.firstJumpObstacle) this.firstJumpObstacle = this.lastObstacle;
        }
    }

    checkJump() {
        if (this.jumping == false && this.currentJumpHeight > 0) {
            this.currentJumpHeight -= this.jumpSpeed;
            if (this.currentJumpHeight <= 0) {
                this.currentJumpHeight = 0;
                this.falling = false;
            }
        }

        if (this.jumping == true) {
            this.currentJumpHeight += this.jumpSpeed;
            if (this.currentJumpHeight >= this.maxJumpHeight) {
                if (this.currentJumpHeight > this.maxJumpHeight) this.currentJumpHeight = this.maxJumpHeight;
                this.jumping = false;
                this.falling = true;
            }

        }

    }

}
