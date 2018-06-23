function evolveBrains(allJumpers){

 
    let filtered = allJumpers.filter(jumper => jumper.score > 3);


    let topScore = 0;
    for (let j of filtered) if (j.score > topScore) topScore = j.score;


    let blackBoxCount = 10;
    let mutateCount = 330;

    if (!filtered.length) return false;

    maxFitness = calculateFitness(filtered);
    
    const blackBox = getBlackBox(filtered);

    exportBest = { blackBox, topScore };
   
    const mutated_2 = evolve(filtered, mutateCount, 1, "mutate2");
    const mutated_5 = evolve(filtered, mutateCount, 3, "mutate5");
    const mutated_10 = evolve(filtered, mutateCount, 7, "mutate10");

    //const bred = breed(filtered, 100)
    
    return  { blackBox, mutated_2, mutated_5, mutated_10 };

}

const getBlackBox = filtered => {

    var blackBox = [];
    var maxScore = 0;
    for (let j of filtered) if (j.score > maxScore) maxScore = j.score;

    for (let j of filtered) if (j.score >= maxScore)  {
        blackBox.push(new Egg(j.brain, false, "blackBox"))  
    }

    return shuffle(blackBox).slice(0,10);
}

function evolve(jumpers, count, mutationRate, category){
    
    var mutated = [];
    
    //TODO: use functinal
    for (i = 0; i < count; i++) {
        var picked = pickOne(jumpers)
        let pickedJumper = jumpers[picked];
        mutated.push(new Egg(pickedJumper.brain, mutationRate, category));
    }

    return mutated;
}

function breed(jumpers, count){
    let bred = [];

    for (i = 0; i < count; i++) {
        var dad = new NeuralNetwork(pickOne(jumpers).brain);
        var mom = new NeuralNetwork(pickOne(jumpers).brain);

        // var random = Math.random(1);

        // if ( random < 0.05) {            
        //     mom = new NeuralNetwork(4, 5, 1);
        // }
        
        var brain = new NeuralNetwork.crossover(dad, mom);

        bred.push (new Egg(brain, "bred"))
        
    }

    return evolved;
}



function pickOne(jumpers, pickedArray){
    var index = 0;
    var random = Math.random(1);

    while (random > 0) {
        random -= jumpers[index].fitness;
        index++;
    }
    index--;
    return index;
}

//modifies jumpers by giving them a fitness score and returns fitness sum
function calculateFitness(jumpers){

    var fitnessSum = jumpers.reduce(function(prevVal, j) {
        return prevVal + Math.pow(j.score,2);
    }, 0);
    

    for (j of jumpers) {
        j.fitness = Math.pow(j.score,2) / fitnessSum;
    }
}

function compareID(a,b) {
    if(a.id < b.id) return -1;
    if(a.id > b.id) return 1;
    return 0;
}

function compareScores(a,b) {
    if(a.score < b.score) return -1;
    if(a.score > b.score) return 1;
    return 0;
}
  
randomGaussian = function(mean, sd)  {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
  };


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}
