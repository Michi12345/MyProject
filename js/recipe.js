class Recipe {
    id;
    title;
    ingredients = [];
    image;
    shortDescription;
    fullRecipe;
    meetTypes = [];


    constructor(title, image, shortDescription, fullRecipe) {
        this.id = this.getLastRecipeId();
        this.title = title;
        this.image = image;
        this.shortDescription = shortDescription;
        this.fullRecipe = fullRecipe;
    }

    getLastRecipeId() {
        let lastRecipeId = parseInt(localStorage.lastRecipeId);
        if (!lastRecipeId) {
            lastRecipeId = 0;
        }
        lastRecipeId++;
        localStorage.lastRecipeId = lastRecipeId;
        return lastRecipeId;
    }

    addIngredients (ingredientId, ingredientCount) {
        let recipeRecord = {
            id: ingredientId,
            count: ingredientCount
        };
        this.ingredients.push(recipeRecord);
    }

    // getTypes () {
    //
    // }

}