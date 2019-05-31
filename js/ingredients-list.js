class IngredientsList {
    storage = new IngredientsStorage();
    ingredientsEl;

    constructor(ingredientsEl) {
        this.ingredientsEl = ingredientsEl;
        this.ingredientsEl.addEventListener('submit', this);
        this.ingredientsEl.addEventListener('click', this);
        this.ingredientsEl.addEventListener('change', this);

        let ulBlock = this.ingredientsEl.querySelector('ul');
        [...this.storage.items.values()].forEach(function (ingredient) {
            let ingredientsBlock = IngredientsList.createEntry(ingredient);
            ulBlock.append(ingredientsBlock);
        });
    }

    handleEvent(event) {
        switch (event.type) {
            case 'submit':
                event.preventDefault();
                this.onSubmit(new FormData(event.target));
                return event.target.reset();
        }
        //    add some more cases
    }

    onSubmit(formData) {
        let item = new Ingredient(formData.get('ingredientsName'), formData.get('ingredientsCalories'));
        this.storage.add(item);
        this.ingredientsEl
            .querySelector('ul')
            .insertAdjacentElement('afterbegin', IngredientsList.createEntry(item));
    }

    static createEntry(item) {
        let li = document.createElement('li');
        li.innerHTML = `
            <div class="text">${item.name}</div>
            <div class="caloriesNumber">${item.caloriesNumber}</div>
        `;
        li.dataset.id = item.id;
        return li;
    }

    static createEntryWithCheckbox(item) {
        let div = document.createElement('div');
        div.innerHTML = `
            <label class="text"><input type="checkbox" class="special-input" value="${item.id}" name="ingredients">${item.name}</label>
        `;
        div.dataset.id = item.id;
        return div;
    }
}