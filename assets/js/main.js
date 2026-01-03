(() => {
    // Active nav
    const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll("[data-nav]").forEach(a => {
        const href = (a.getAttribute("href") || "").toLowerCase();
        if (href.endsWith(file)) a.classList.add("active");
    });

    // Drawer
    const body = document.body;
    const openBtn = document.querySelector("[data-burger]");
    const closeBtn = document.querySelector("[data-close]");
    const overlay = document.querySelector("[data-overlay]");

    const openDrawer = () => body.classList.add("drawerOpen");
    const closeDrawer = () => body.classList.remove("drawerOpen");

    openBtn?.addEventListener("click", openDrawer);
    closeBtn?.addEventListener("click", closeDrawer);
    overlay?.addEventListener("click", closeDrawer);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDrawer(); });

    document.querySelectorAll(".drawer a").forEach(a => {
        a.addEventListener("click", () => closeDrawer());
    });

    // Reveal on scroll
    const els = Array.from(document.querySelectorAll(".reveal"));
    if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((en) => {
                if (en.isIntersecting) {
                    en.target.classList.add("in");
                    io.unobserve(en.target);
                }
            });
        }, { threshold: 0.12 });
        els.forEach(el => io.observe(el));
    } else {
        els.forEach(el => el.classList.add("in"));
    }

    // Year
    const y = document.querySelector("[data-year]");
    if (y) y.textContent = String(new Date().getFullYear());
})();
