(function() {
    window.addEventListener("load", function() {
        const loadTime = (performance.now() / 1000).toFixed(3);
        const textPlace = document.querySelector(".load-time__text");
        if (textPlace) {
            textPlace.innerHTML += `Время загрузки страницы: ${loadTime} секунд`;
        }
    });
})();