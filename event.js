document.addEventListener("DOMContentLoaded", () => {

    /* ========= SLIDER ========= */
    const dots = document.querySelectorAll(".dot");
    const slides = document.querySelectorAll(".hero-section");

    const runTextAnimation = (slide) => {
        const items = slide.querySelectorAll(
            ".subtitle, .title, .date-location, .btn-buy-tickets"
        );
        items.forEach(el => el.classList.remove("show-text"));
        items.forEach((el, i) => {
            setTimeout(() => el.classList.add("show-text"), 300 * (i + 1));
        });
    };

    const showSlide = (id) => {
        slides.forEach(s => s.classList.remove("active-slide"));
        dots.forEach(d => d.classList.remove("active"));

        const slide = document.getElementById(id);
        const dot = document.querySelector(`.dot[data-target="${id}"]`);

        slide.classList.add("active-slide");
        dot.classList.add("active");
        runTextAnimation(slide);
    };

    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            showSlide(dot.dataset.target);
        });
    });

    showSlide(dots[0].dataset.target);

    /* ========= SEARCH ========= */
    const searchIcon = document.querySelector(".search-icon");
    const searchBar = document.querySelector(".search-bar");

    searchIcon.addEventListener("click", () => {
        searchBar.classList.toggle("active");
    });

    /* ========= EVENT INFO ========= */
    const eventInfoData = [
        { icon: "fa-solid fa-calendar-days", title: "DATE", value: "30-31 December 2025" },
        { icon: "fa-solid fa-location-dot", title: "LOCATION", value: "San Francisco, CA" },
        { icon: "fa-solid fa-users", title: "SPEAKERS", value: "12 Industry Experts" },
        { icon: "fa-solid fa-ticket", title: "TICKETS", value: "From $99" }
    ];

    const container = document.getElementById("eventInfo");
    container.innerHTML = "";

    eventInfoData.forEach(item => {
        container.innerHTML += `
            <div class="info-card">
                <div class="info-icon"><i class="${item.icon}"></i></div>
                <h4>${item.title}</h4>
                <p>${item.value}</p>
            </div>
        `;
    });

    /* ========= COUNTDOWN ========= */
    const eventDate = new Date("December 30, 2025 8:00:00").getTime();

    setInterval(() => {
        const now = new Date().getTime();
        const diff = eventDate - now;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
        document.getElementById("seconds").innerText = seconds;
    }, 1000);

    /* ========= HEADER SCROLL ========= */
    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 80);
    });

});
