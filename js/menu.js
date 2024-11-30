document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll(".navigation__link");
    const currentPath = window.location.pathname === "/" ? "/index.html" : window.location.pathname;
    let activeLinkFound = false;
    links.forEach(link => {
        const linkPath = new URL(link.href, window.location.origin).pathname;
        if (!activeLinkFound && (linkPath === currentPath || linkPath === window.location.hash)) {
            link.classList.add("active");
            activeLinkFound = true;
        }
    });
});