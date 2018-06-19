class Egg {
    constructor(brain, mutateRate, category, parentIndex) {

        this.brain = brain.copy();
        this.category = category;

        if (mutateRate) this.brain.mutate(mutateRate/100);
    }
}