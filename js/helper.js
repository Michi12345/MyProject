function getOne(selector) {
    return document.querySelector(selector);
}

function getAll(selector) {
    return Array.from(document.querySelectorAll(selector));
}

function ajax(url, onload) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function () {
        if (xhr.status === 200) {
            onload(xhr.responseText);
        }
    };
    xhr.send();
}



