class RecipesList {
    storage = new RecipesStorage();
    recipesEl;

    constructor(recipesEl) {
        this.recipesEl = recipesEl;
        this.recipesEl.addEventListener('submit', this);
        this.recipesEl.addEventListener('click', this);
        this.recipesEl.addEventListener('change', this);

        let ulBlock = this.recipesEl.querySelector('ul');
        [...this.storage.items.values()].forEach(function (recipe) {
            let recipeBlock = RecipesList.createEntry(recipe);
            ulBlock.append(recipeBlock);
        });


        let blockForIngedients = getOne('.available-ingredients');
        let ingredientsStorage = new IngredientsStorage();
        let allIngedients = ingredientsStorage.getItems();
        allIngedients.forEach(oneIngedient => {
            let htmlIngedient = IngredientsList.createEntryWithCheckbox(oneIngedient);
            blockForIngedients.append(htmlIngedient);
        });
    }

    handleEvent(event) {
        switch (event.type) {
            case 'submit':
                event.preventDefault();
                this.onSubmit(new FormData(event.target));
                return event.target.reset();
        }
    }

    onSubmit(formData) {
        let item = new Recipe(
            formData.get('recipeName'),
            formData.get('recipeImage'),
            formData.get('shortRecipe'),
            formData.get('fullDescription')
        );
        this.storage.add(item);
        this.recipesEl
            .querySelector('ul')
            .insertAdjacentElement('afterbegin', RecipesList.createEntry(item));
    }

    static createEntry(recipeModel) {
        let recipeHtml = document.createElement('div');
        let allIngredientDiv = document.createElement('div');
        let ingredientsStorage = new IngredientsStorage();
        let allIngredients = ingredientsStorage.getItems();
        allIngredients.forEach(ingredient => {
            let ingredientBlock = document.createElement('div');
            ingredientBlock.innerHTML = `
                    <!--<input type="checkbox" id="${ingredient.id}">-->
                    <label for="${ingredient.id}">${ingredient.name}</label>
                    <!--<input type="number">-->
                `;
            allIngredientDiv.append(ingredientBlock);
        });
        recipeHtml.innerHTML = `
            <div class="">${recipeModel.title}</div>
            <div class="">${allIngredientDiv.outerHTML}</div>
            <div class="">${recipeModel.image}</div>
            <div class="">${recipeModel.shortDescription}</div>
            <div class="">${recipeModel.fullRecipe}</div>
            <div class="">${recipeModel.meetTypes}</div>
         `;
        return recipeHtml;
    }
}