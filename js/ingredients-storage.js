const STORAGE_KEY = 'INGREDIENTS_ITEMS';

class IngredientsStorage {
    items;

    constructor () {
        let storageResult = localStorage.getItem(STORAGE_KEY);
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
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...this.items.values()]));
    }
}