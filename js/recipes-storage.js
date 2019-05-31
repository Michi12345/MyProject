const RECIPES_STORAGE_KEY = 'RECIPE_ITEMS';

class RecipesStorage {
    items;

    constructor () {
        let storageResult = localStorage.getItem(RECIPES_STORAGE_KEY);
        this.items = storageResult
            ? new Map(JSON.parse(storageResult).map(item => [item.id, item]))
            : new Map();
    }

    getItems() {
        return this.items;
    }

    add(item) {
        this.items.set(item.id, item);
        this.save();
    }

    delete(id) {
        this.items.delete(id);
        this.save();
    }

    save() {
        localStorage.setItem(RECIPES_STORAGE_KEY, JSON.stringify([...this.items.values()]));
    }
}