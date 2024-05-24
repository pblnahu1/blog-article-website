const navLinks = document.querySelectorAll("[data-navlink]");

navLinks.forEach((link) => {
    if (link.getAttribute("href") === window.location.pathname) {
        link.setAttribute("aria-current", "page");
    }
})