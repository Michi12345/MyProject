class Ingredient {
   id;
   name;
   caloriesNumber;

   constructor (name, caloriesNumber) {
       this.id = this.getLastIngredientId();
       this.name = name;
       this.caloriesNumber = caloriesNumber
   }

    getLastIngredientId() {
        let lastIngredientId = parseInt(localStorage.lastIngredientId);
        if (!lastIngredientId) {
            lastIngredientId = 0;
        }
        lastIngredientId++;
        localStorage.lastIngredientId = lastIngredientId;
        return lastIngredientId;
    }
}