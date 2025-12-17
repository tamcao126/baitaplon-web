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
        if (!slide || !dot) return;

        slide.classList.add("active-slide");
        dot.classList.add("active");
        runTextAnimation(slide);
    };

    if (dots.length) {
        dots.forEach(dot => {
            dot.addEventListener("click", () => {
                showSlide(dot.dataset.target);
            });
        });
        showSlide(dots[0].dataset.target);
    }

    /* ========= SEARCH ========= */
    const searchIcon = document.querySelector(".search-icon");
    const searchBar = document.querySelector(".search-bar");

    if (searchIcon && searchBar) {
        searchIcon.addEventListener("click", () => {
            searchBar.classList.toggle("active");
        });
    }

    /* ========= COUNTDOWN ========= */
    const eventDate = new Date("December 30, 2025 08:00:00").getTime();

    setInterval(() => {
        const now = Date.now();
        const diff = eventDate - now;
        if (diff <= 0) return;

        document.getElementById("days").innerText =
            Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById("hours").innerText =
            Math.floor((diff / (1000 * 60 * 60)) % 24);
        document.getElementById("minutes").innerText =
            Math.floor((diff / (1000 * 60)) % 60);
        document.getElementById("seconds").innerText =
            Math.floor((diff / 1000) % 60);
    }, 1000);

    /* ========= HEADER SCROLL ========= */
    const header = document.querySelector(".header");
    if (header) {
        window.addEventListener("scroll", () => {
            header.classList.toggle("scrolled", window.scrollY > 80);
        });
    }

    /* ========= SPEAKERS ========= */
    const speakersGrid = document.getElementById("speakersGrid");

    if (speakersGrid) {
        const speakers = [
            {
                name: "Sarah Johnson",
                position: "CTO tại TechVision",
                image: "https://i.pinimg.com/1200x/1e/cb/a9/1ecba98ac8bfd242436a87fb0996f14d.jpg",
                bio: "Chuyên gia AI & Machine Learning"
            },
            {
                name: "Michael Chen",
                position: "Lead Developer tại InnovateCo",
                image: "https://i.pinimg.com/736x/8a/ae/c3/8aaec3c92019e854e93fffb30fa5193a.jpg",
                bio: "Blockchain & Web3 Specialist"
            },
            {
                name: "Emma Rodriguez",
                position: "Product Director tại FutureLabs",
                image: "https://i.pinimg.com/736x/b3/e7/67/b3e7678fbc9a8f949f69979d0b5b65ee.jpg",
                bio: "UX/UI Design Innovator"
            },
            {
                name: "David Park",
                position: "CEO tại QuantumLeap",
                image: "https://i.pinimg.com/1200x/0e/c7/cb/0ec7cbc9e263c5e10d8ba4cdd0d3e0af.jpg",
                bio: "Quantum Computing Pioneer"
            }
        ];

        speakers.forEach(sp => {
            const card = document.createElement("div");
            card.className = "ev-speaker-card";

            card.innerHTML = `
                <div class="ev-speaker-img">
                    <img src="${sp.image}" alt="${sp.name}">
                </div>
                <div class="ev-speaker-overlay"></div>
                <div class="ev-speaker-info">
                    <h3>${sp.name}</h3>
                    <span>${sp.position}</span>
                    <p>${sp.bio}</p>
                </div>
            `;
            speakersGrid.appendChild(card);
        });
    }

    /* ========= PRICING ========= */
    const pricingContainer = document.getElementById("pricingCards");

    if (pricingContainer) {
        const pricingData = [
            {
                name: "Basic",
                price: "$99",
                period: "per ticket",
                features: [
                    "Access to all conference sessions",
                    "Conference materials",
                    "Lunch & coffee breaks",
                    "Networking opportunities"
                ],
                featured: false
            },
            {
                name: "Premium",
                price: "$199",
                period: "per ticket",
                features: [
                    "All Basic features",
                    "VIP seating",
                    "Speaker dinner access",
                    "Conference merchandise",
                    "Priority networking"
                ],
                featured: true
            },
            {
                name: "Enterprise",
                price: "$499",
                period: "per ticket",
                features: [
                    "All Premium features",
                    "Private mentoring sessions",
                    "Exclusive workshop access",
                    "Year-round community access",
                    "Dedicated support"
                ],
                featured: false
            }
        ];

        pricingData.forEach(plan => {
            const card = document.createElement("div");
            card.className = `pricing-card ${plan.featured ? "featured" : ""}`;

            card.innerHTML = `
                <div class="pricing-header">
                    <h4>${plan.name}</h4>
                    <div class="pricing-price">${plan.price}</div>
                    <div class="pricing-period">${plan.period}</div>
                </div>

                <ul class="pricing-features">
                    ${plan.features.map(f => `<li>${f}</li>`).join("")}
                </ul>

                <div class="pricing-footer">
                    <button class="pricing-btn">Select Plan</button>
                </div>
            `;

            card.querySelector(".pricing-btn").addEventListener("click", () => {
                // Chỉ chuyển sang sl.html kèm plan
                window.location.href = `sl.html?plan=${encodeURIComponent(plan.name)}`;
            });


            pricingContainer.appendChild(card);
        });
    }

});

/* ========= SELECT PLAN ========= */
function selectPlan(planName) {
    alert(`You selected the ${planName} plan! Redirecting to checkout...`);
    window.location.href = `#checkout?plan=${encodeURIComponent(planName)}`;
}
/* ========= EVENT CALENDAR ========= */
const calendarData = [
    {
        date: "15",
        month: "December",
        title: "Opening Keynote",
        time: "09:00 AM - 10:30 AM",
        speaker: "Sarah Johnson",
        image: "assets/img/calendar/c1.png"
    },
    {
        date: "16",
        month: "December",
        title: "Tech Workshops",
        time: "10:00 AM - 04:00 PM",
        speaker: "Michael Chen & Team",
        image: "assets/img/calendar/c2.png"
    },
    {
        date: "17",
        month: "December",
        title: "Closing Ceremony",
        time: "03:00 PM - 05:00 PM",
        speaker: "All Speakers",
        image: "assets/img/calendar/c3.png"
    }
];

const calendarTable = document.getElementById("eventCalendar");

if (calendarTable) {
    /* Header */
    const thead = calendarTable.createTHead();
    const headerRow = thead.insertRow();
    const headerCell = headerRow.insertCell();
    headerCell.colSpan = 5;
    headerCell.textContent = "Event Schedule";

    /* Body */
    const tbody = calendarTable.createTBody();

    calendarData.forEach(ev => {
        const row = tbody.insertRow();

        row.innerHTML = `
            <td class="event-img">
                <img src="${ev.image}" alt="${ev.title}">
            </td>

            <td class="event-date">
                ${ev.date}
                <span>${ev.month}</span>
            </td>

            <td>
                <div class="event-info">
                    <h5>${ev.title}</h5>
                    <h6>${ev.time}</h6>
                    <p>Speaker: ${ev.speaker}</p>
                </div>
            </td>

            <td>
                <a href="#" class="event-btn">Details</a>
            </td>

            <td class="event-register">
                <a href="#pricing">Register</a>
            </td>
        `;
    });
}
