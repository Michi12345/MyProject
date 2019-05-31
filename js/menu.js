'use strict';

let menuModule = (function () {
    function onLoadDishes(data) {
        let products = JSON.parse(localStorage.getItem('products'));

        let allDishes = JSON.parse(data);

        let availableBreakfast = getDishes(allDishes, products, 'breakfast');
        showDishes(availableBreakfast, 'breakfast');

        let availableDinner = getDishes(allDishes, products, 'dinner');
        showDishes(availableDinner, 'dinner');

        let availableSupper = getDishes(allDishes, products, 'supper');
        showDishes(availableSupper, 'supper');
    }

    function getDishes(allDishes, products, type) {
        return allDishes.filter(dish => {
            let ingredients = dish.ingredients;
            return dish.types.indexOf(type) > -1
                && ingredients.some(ingredient => products.indexOf(ingredient) > -1);
        });
    }

    function showDishes(availableDishes, type) {
        availableDishes.forEach(dish => {
            let dishContainer = getOne('.' + type + ' .dishes');
            dishContainer.innerHTML = `<img src="${dish.image}">`;
            dishContainer.innerHTML += `<h3>${dish.title}</h3>`;
            dishContainer.innerHTML += `<p>${dish.description}</p>`;
            dishContainer.innerHTML += `<span>${dish.calories}</span>`;
            dishContainer.innerHTML += `<button class="btnDetail" id="btnDetail_${dish.id}">Подробнее &rarr;</button>`;

            let btn = getOne('#btnDetail_' + dish.id);
            btn.onclick = () => {
                let modal = document.getElementById('modalWindow');
                modal.style.display = "flex";
                document.getElementsByClassName('close')[0].onclick = () => {
                    modal.style.display = "none";
                };
                let descriptionContainer = document.getElementsByClassName('dish-description')[0];
                descriptionContainer.innerHTML = `<h3>${dish.title}</h3>`;
                descriptionContainer.innerHTML += `<h4>Ингредиенты</h4>`;
                descriptionContainer.innerHTML += `<p>${dish.ingredientsForUser.join(', ')}</p>`;
                descriptionContainer.innerHTML += `<h4>Рецепт</h4>`;
                descriptionContainer.innerHTML += `${dish.recipe}`;

                let imageContainer = document.getElementsByClassName('dish-image')[0];
                imageContainer.innerHTML = `<img src="${dish.image}" class="dish-image">`;
            };
        });

    }

    return {
        start: function () {
            ajax('/resources/data.json', onLoadDishes);

            let modal = document.getElementById('modalWindow');
            let closeWindow = document.getElementsByClassName('close');
            closeWindow.onclick = () => {
                modal.style.display = "none";
            };
        }
    };
}());
