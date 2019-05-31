class Router {
    routes = [];
    container = {};

    constructor(el) {
        this.container = el;
    }

    addRout(url, pathToPage, onHashWasCalled) {
        this.routes.push(
            {
                url,
                pathToPage,// здесь лежит путь, по которому нужно отправить ajax запрос, чтобы получить html страницу
                onHashWasCalled
            }
        );
    }

    start() {
        window.addEventListener('hashchange', this);
        this.handleEvent();
    }

    handleEvent() {
        let currentRouter = this;
        let rout = this.routes.find(x => x.url === location.hash);
        if (!rout) {
            rout = this.routes.find(x => x.url === '#about');
        }
        let ajaxObj = new XMLHttpRequest();
        ajaxObj.open('GET', rout.pathToPage);
        ajaxObj.onload = function () {
            if (ajaxObj.status === 200) {
                currentRouter.container.innerHTML = ajaxObj.responseText;
                if (rout.onHashWasCalled) {
                    rout.onHashWasCalled();
                }
            }
        };
        ajaxObj.send();
    };
}


document.addEventListener('DOMContentLoaded', function () {
    let router = new Router(document.getElementById('routerContainer'));
    router.addRout('#menu', 'menu.html', function () {
        menuModule.start();
    });
    router.addRout('#about', 'about.html');
    router.addRout('#productsPicker', 'productsPicker.html', () => {
        getOne('.cooked').onclick = () => {
            let checked = getAll('input:checked');
            let products = checked.map(input => input.value);
            localStorage.setItem('products', JSON.stringify(products));
        }
    });
    router.addRout('#registration', 'registration.html');
    router.addRout('#ingredients', 'ingredients.html', () => {
        new IngredientsList(document.getElementById('ingredients'));
    });
    router.addRout('#recipes', 'recipes.html', () => {
        new RecipesList(document.getElementById('recipes'));
    });
    router.start();
});

