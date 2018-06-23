
let exportBest = {};
let nnShape = [4, 10, 10, 3]
class Game {
    constructor(eggs, training, generation, trainTotalGenerations, best) {
        
        this.best = best;
        this.sceneWidth = 1519;
        this.minimumTotalObstacles = 7;
        this.numOfStartingObstacles = 10;
        this.obstacles = [];
        this.numberOfObstacles = 0;
        this.initialNumberOfObstacles = 30
        this.obstacleDistanceMin = 1500;
        this.obstacleDistanceMax = 2000;
        this.obstacleDistanceDev = this.obstacleDistanceMax - this.obstacleDistanceMin;

        this.stars = [];
        this.initiateStars();

        this.addInitialObstacles();
        this.addNewObstacles(1);
        
        this.moveSpeed = 5;
        this.jumpers = [];
        //this.initiateJumpers(pretrainedJumpers);
        this.crashedJumpers = [];
        this.numOfJumpers = 5000;
        this.gameOver = false;
        this.drewLast = false;
        this.fps = 200;
        this.generation = generation || 1;
        
        //
        best ? this.addImportedJumpers() : eggs ? this.addNewGeneration(eggs) : this.addRandomJumpers();

        this.training = training || false;

        this.trainTotalGenerations = trainTotalGenerations;

        if (training) {
            this.train();
        } else {
            this.training = false;
            this.start();
        }

        this.paused = false;
    }

    train() {
        while (!this.gameOver) {
            this.move();
        }
    }

    getIndexOfJumperById(index) {
        for (var i = 0; i < this.jumpers.length; i++) {
            if (this.jumpers[i].id == index) console.log("INDEX OF ", index, ": ", i);
        }
    }

    togglePause() {
        if (!this.training) {
            this.paused = !this.paused;
            if (this.paused) clearInterval(this.intervalId);
            if (!this.paused) this.start();
        }
    }

    addImportedJumpers(){
        var i = 0;
        for ( let b of best ){
            this.jumpers.push(new Player(i, 50, 50, 50 + (i * 50) % 500 ) )
            this.jumpers[i].brain = NeuralNetwork.deserialize(this.best[i]);
            i++;
        }
    }

    addNewGeneration( eggs ){
        
        let pid = 0;

        const { blackBox, mutated_2, mutated_5, mutated_10, bred } = eggs;

        for (let egg of blackBox) {
            this.jumpers.push(new Player(pid++, 100, egg ))
        }

        for (let egg of mutated_2) {
            this.jumpers.push(new Player(pid++, 200, egg ))
        }

        for (let egg of mutated_5) {
            this.jumpers.push(new Player(pid++, 300, egg ))
        }

        for (let egg of mutated_10) {
            this.jumpers.push(new Player(pid++, 400, egg ))
        }
    }

    addRandomJumpers() {
       
        for (var i = 0; i < this.numOfJumpers; i++) {
            this.jumpers.push(new Player(i, 50 + (i * 50) % 500 ));
        }
    }

    initiateStars() {
        //var star = new Star(0, this.sceneWidth*4);
        var star;

        star = new Star(0, 2600, 2);
        this.stars.push(star);

        star = new Star(1, 3050, 2);
        this.stars.push(star);

        star = new Star(2, 3550, 2);
        this.stars.push(star);

        star = new Star(3, 4250, 2);
        this.stars.push(star);

        star = new Star(4, 4900, 2);
        this.stars.push(star);

        star = new Star(5, 5350, 2);
        this.stars.push(star);

        star = new Star(6, 6050, 2);
        this.stars.push(star);

        star = new Star(7, 6550, 2);
        this.stars.push(star);

        star = new Star(8, 6900, 2);
        this.stars.push(star);

        star = new Star(9, 7100, 2);
        //this.stars.push(star);

        star = new Star(10, 7600, 2);
        this.stars.push(star);

        star = new Star(11, 7900, 2);
        this.stars.push(star);

        star = new Star(12, 8400, 2);
        this.stars.push(star);

        star = new Star(13, 8700, 2);
        this.stars.push(star);


        star = new Star(14, 9000, 3);
        this.stars.push(star);

        star = new Star(15, 9500, 0.1);
        star.posY = 0;
        this.stars.push(star);

        star = new Star(16, 10100, 0.1);
        this.stars.push(star);

        
        this.stars.push(new Star(17, 10400, 3));

        this.stars.push(new Star(18, 10600, 2));
        
        this.stars.push(new Star(19, 11300, 2));

        this.stars.push(new Star(20, 11800, 2));

    }

    addInitialObstacles() {
        //first obstacle is floating
        //var obsFloating = new ;
        
        this.obstacles.push(new Obstacle(this.numberOfObstacles++, 1600, 75));

        this.obstacles.push(new Obstacle(this.numberOfObstacles++, 2200, 0));

        this.obstacles.push(new Obstacle(this.numberOfObstacles++, 3000, 0));

        this.obstacles.push(new Obstacle(this.numberOfObstacles++, 4000, 0));

        this.obstacles.push(new Obstacle(this.numberOfObstacles++, 5100, 0));

        this.obstacles.push(new Obstacle(this.numberOfObstacles++, 5600, 0));

        this.obstacles.push(new Obstacle(this.numberOfObstacles++, 7000, 75));

        this.obstacles.push(new Obstacle(this.numberOfObstacles++, 7700, 75));

        this.obstacles.push(new Obstacle(this.numberOfObstacles++, 8700, 0));
        this.obstacles.push(new Obstacle(this.numberOfObstacles++, 9700, 0));
        this.obstacles.push(new Obstacle(this.numberOfObstacles++, 10100, 75));
        this.obstacles.push(new Obstacle(this.numberOfObstacles++, 10400, 75));
        this.obstacles.push(new Obstacle(this.numberOfObstacles++, 10900, 75));
        this.obstacles.push(new Obstacle(this.numberOfObstacles++, 11405, 75));
        this.obstacles.push(new Obstacle(this.numberOfObstacles++, 11900, 75));
        this.obstacles.push(new Obstacle(this.numberOfObstacles++, 12400, 100));

      

///////////////////////// this.obstacles.push(new Obstacle(this.numberOfObstacles++, 12400, xxxxxxx));



    }

    addNewObstacles(numOfObsToAdd) {
        for (let i = 0; i < numOfObsToAdd; i++) {
            let position = this.obstacles[this.obstacles.length - 1].posX + this.getRandomObstacleDistance();
            let obs = new Obstacle(this.numberOfObstacles++, position, 0);
            //this.obstacles.push(obs);
        }

        //LAST OBSTACLE
        // var last = this.obstacles[this.obstacles.length - 1];
        // //last.index = "END";
        // last.posY = 0;
        // last.height = 200;
        // last.posX += 500;
    }

    getRandomObstacleDistance() {
        return Math.floor(Math.random() * this.obstacleDistanceDev) + this.obstacleDistanceMin;
    }

    start(moveRounds) {
        this.gameOver = false;
        
        for (let i = 0; i < moveRounds; i++) {
           if (this.gameOver == false) this.move();
        }

        this.move();
        this.draw();
        this.intervalId = setInterval(this.play.bind(this), 10);
        
    }

    play() {
        if (this.gameOver) {
            //console.log("play, ", this.gameOver)
            if (this.drewLast) {
                this.move();
                this.drewLast = true;
            }
            return;
        }
        this.move();
        this.draw();
    }

    draw() {

        let html = "";

        //DRAW ALL JUMPERS;
        for (let jumper of this.jumpers) html += jumper.generateHTML();
       
        this.obstacles.map((o, i) => {
            if (o.posX < 1800) {
                html += o.generateHTML()
            } //else {break};

        })

        for (let s of this.stars) {
            if (s.posX < 1800) { html += s.generateHTML() }
            //else {break};
        }


        html += this.generateDataDiv();

        //document.getElementById("game").innerHTML = "";
        document.getElementById("game").innerHTML = html;

    }


    generateDataDiv() {
        let div = `<div class="dataDiv">`

        let maxSur = 0;
        for (let j of this.jumpers) { j.calculateScore(); if (j.score > maxSur) maxSur = j.score; }

        let maxCra = 0
        for (let j of this.crashedJumpers) { j.calculateScore(); if (j.score > maxCra) maxCra = j.score; }


        var survivorCount = this.jumpers.length;

        //console.log("TRAINING TRAINING.... max", max, survivorCount)

        div += `<h4>Training generation ${this.generation}. </h4>`
        div += `<h4>Total survivors: ${survivorCount}</h4>`
        div += `<h4>Max score survivors: ${maxSur}</h4>`
        div += `<h4>Max score crashed: ${maxCra}</h4>`


        div += `</div>`

        return div;
    }

    move() {

        if ( !this.jumpers.length || ( !this.obstacles.length && !this.stars.length ) )  this.endGame()
        
        for (let i = this.obstacles.length-1; i >= 0; i--) {
                
            this.obstacles[i].posX -= this.moveSpeed;
            if (this.obstacles[i].posX < -this.obstacles[i].width) {
                this.obstacles.shift(i,1);
            } 
        }

        for (let i = this.stars.length-1; i >= 0; i--) {
            
            this.stars[i].posX -= this.moveSpeed;
            if (this.stars[i].posX < -this.stars[i].width) {
                this.stars.shift(i,1);
            } 
        }

        //MOVE PLAYER
        let i = this.jumpers.length;
       
        while (i--) {
            let jumper = this.jumpers[i];
            //console.log(this.obstacles)
            let obs = this.checkCollision(jumper);
            if (obs) {
                jumper.crashed = obs.id;
                this.crashedJumpers.push(this.jumpers.splice(i, 1)[0]);
            }
            else if (jumper.score < 0) {
                //console.log("REMOVING I", i, this.jumpers[i])        
                this.crashedJumpers.push(this.jumpers.splice(i, 1)[0]);
            }
        }
        for ( let jumper of this.jumpers){
            if (!jumper.falling && !jumper.jumping)jumper.think(this.obstacles, this.stars);
            jumper.checkJump();
            jumper.addLastLandObs(this.obstacles)
            if (this.stars.length > 0) this.checkStarCollision(jumper);
            jumper.calculateScore();

        }
       

        if (!this.jumpers.length) {
            this.endGame();
        }

      

        //ADDS NEW OBSTACLES
        //if (this.obstacles.length < this.minimumTotalObstacles) this.addNewObstacles(5);


    }

    //TODO: make 1 check collision for obstacles, stars...
    checkCollision(jumper) {

        const playerLeft = jumper.posX;
        const playerBottom = jumper.currentJumpHeight;
        const playerRight = playerLeft + jumper.width;
        const playerTop = playerBottom + jumper.height;

        const obs = jumper.getNextObstacle(this.obstacles);

        if (obs){
            const obsLeft = obs.posX;
            const obsRight = obsLeft + obs.width;
            const obsBottom = obs.posY;
            const obsTop = obs.height + obs.posY;
    
            if (playerLeft <= obsRight && playerRight >= obsLeft &&
                playerTop >= obsBottom && playerBottom <= obsTop) {
                jumper.lastObstacle = obs.id;
                return obs;
            }
        }
       


        return false;
    }


    checkStarCollision(jumper) {

        const playerLeft = jumper.posX;
        const playerBottom = jumper.currentJumpHeight;
        const playerRight = playerLeft + jumper.width;
        const playerTop = playerBottom + jumper.height;

        const star = jumper.getNextStar(this.stars);

        if (star) {
            const starLeft = star.posX;
            const starRight = starLeft + star.width;
            const starBottom = star.posY;
            const starTop = star.height + star.posY;

            if (playerLeft <= starRight && playerRight >= starLeft &&
                playerTop >= starBottom && playerBottom <= starTop) {

                if (!jumper.collectedStarsIndexes.includes(star.id)) jumper.collectedStarsIndexes.push(star.id);

            }
        }

    }

    endGame(startNew) {
        //this.generation++;
    
        this.gameOver = true;
        clearInterval(this.intervalId);


        this.allJumpers = this.crashedJumpers.concat(this.jumpers);

        this.allJumpers.sort(function(a, b) {
            return a.id - b.id;
        });

        for (let j of this.allJumpers) j.calculateScore();
        this.newJumpers = evolveBrains(this.allJumpers);

       
        if (this.generation > this.trainTotalGenerations) this.training = false;

        if (this.training) {

            //console.log("ALL JUMPERS", this.allJumpers)

            let max = 0;
            for (let j of this.allJumpers) { if (j.score > max) max = j.score; }

            var survivorCount = this.jumpers.length;

            var html = `<h4>Trained generation ${this.generation}. </h4>`
            html += `<h4>Total survivors: ${survivorCount}</h4>`
            html += `<h4>Max score: ${max}</h4>`
            document.getElementById("game").innerHTML = html;
            //document.getElementById("game").innerHTML = "1ffasdfasd";
        }

        //REDO THIS - CALL NEW GAME OUTSIDE OF GAME CLASS
        if (!startNew) {
            var self = this;
            setTimeout(function () {
                if (self.training) {
                    self.generateTrainingHtmlDiv();
                }
                newGame(self.newJumpers, self.training, ++self.generation, self.trainTotalGenerations);
            }, 10)

        }

    }

    generateTrainingHtmlDiv(generation, survivors) {



    }

}


class Star {
    constructor(id, posX, posY) {
        this.posX = posX;
        this.posY = posY * 60 || getRandomInt(1, 5) * 60;

        //this.posY = 110;
        this.moveSpeed = 5;
        this.width = 50;
        this.height = 50;
        this.id = id;

    }

    //${ this.next? `<img src="style/coin.png" class="starImg" />` : "???"  };
    generateHTML() {
        const { id, width, height, posX, posY } = this;
        var html = `<div id="star${id}" class="star" style="
            width:${width}px;
            height:${height}px;
            left:${posX}px;
            bottom:${posY}px;
            ">
            <img src="style/coin.png" class="starImg" />
            
            </div>`
        return html;
    }
}

function newGame(jumpers, training, generation, trainTotalGenerations, best) {
    game = new Game(jumpers, training, generation, trainTotalGenerations, best);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

{
    document.addEventListener('keydown', (event) => {
        if (event.key == "r") {
            game.endGame(true);
            var mega = game.mega;
            game = new Game(mega);
            //game.start();
        }

        if (event.key == "t") {
            game.training = false;
        }

        if (event.key == "p") {
            game.togglePause();
        }

        if (event.key == "m") {
            game.move();
            game.draw()
        }

        if (event.key == "k") {
            game.jumpers = game.jumpers.splice(0,11)
        }

        if (event.key == "s" ){
            let jumpers = game.jumpers.splice(0,3);
            let data = [];
            
            let maxScore = 0;
 
            //for (let j of jumpers) if (j.score > maxScore) maxScore = j.score;

            //let maxFiltered = exportBest.filter(a => a.score == maxScore);


            let dataJs = "let best = [];\n\n";
            
            dataJs += "nnShape =  [ " + nnShape.toString() + " ];\n\n";

            exportBest.blackBox.map(j => {dataJs+=`best.push(${j.brain.serialize()});\n` })
            
            download(dataJs, `best_${exportBest.topScore}.js`, "text")

        }
    });
}

function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}