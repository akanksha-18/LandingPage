document.addEventListener("DOMContentLoaded", () => {

    /* ------------------ Casino Carousel ------------------ */
    const carousel = document.getElementById("casinoGames");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    let index = 0;
    const cardWidth = 220 + 20; // width + gap
    const totalCards = carousel.children.length;
    let visibleCards = 0;

    function calculateVisibleCards() {
        const containerWidth = document.querySelector(".casino-games-container").offsetWidth;
        visibleCards = Math.floor(containerWidth / cardWidth);
    }

    function updateButtons() {
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index >= totalCards - visibleCards;
    }

    function moveCarousel() {
        carousel.style.transform = `translateX(${-index * cardWidth}px)`;
        updateButtons();
    }

    prevBtn.addEventListener("click", () => {
        if (index > 0) index--;
        moveCarousel();
    });

    nextBtn.addEventListener("click", () => {
        if (index < totalCards - visibleCards) index++;
        moveCarousel();
    });

    window.addEventListener("resize", () => {
        calculateVisibleCards();
        index = Math.min(index, totalCards - visibleCards);
        moveCarousel();
    });

    calculateVisibleCards();
    updateButtons();


    /* ------------------ Testimonials ------------------ */
    const testimonials = [
        { avatar: 'S', name: 'Suresh K', type: 'Daily Player', text: 'The live betting feature is amazing, and customer support is super responsive! Highly recommend FantasyXI.' },
        { avatar: 'R', name: 'Rahul S.', type: 'Verified User', text: 'FantasyXI is the best platform for betting. Instant withdrawals & great user experience! I have been playing for months.' },
        { avatar: 'A', name: 'Amit P.', type: 'Fantasy Gamer', text: 'I love the variety of games here. Football, Cricket, and Casino - all in one place! Perfect platform.' },
        { avatar: 'V', name: 'Vikram M.', type: 'Pro Bettor', text: 'Outstanding odds and lightning-fast payouts. FantasyXI has become my go-to platform for all sports betting!' },
        { avatar: 'P', name: 'Priya D.', type: 'Casino Player', text: 'The casino games are top-notch with great graphics and fair play. Love the live dealer section especially!' }
    ];

    let currentTestimonial = 0;
    const testimonialCards = document.querySelectorAll(".testimonial-card-new");
    const dots = document.querySelectorAll(".dot");

    function updateTestimonials() {
        dots.forEach(dot => dot.classList.remove("active"));
        dots[currentTestimonial].classList.add("active");

        const prevIndex = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        const nextIndex = (currentTestimonial + 1) % testimonials.length;

        fillCard(testimonialCards[0], testimonials[prevIndex]);
        fillCard(testimonialCards[1], testimonials[currentTestimonial]);
        fillCard(testimonialCards[2], testimonials[nextIndex]);
    }

    function fillCard(card, data) {
        card.querySelector(".avatar-img").textContent = data.avatar;
        card.querySelector("h3").textContent = data.name;
        card.querySelector(".user-type").textContent = data.type;
        card.querySelector(".testimonial-text").textContent = data.text;
    }

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            currentTestimonial = i;
            updateTestimonials();
            resetAutoPlay();
        });
    });

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonials();
    }

    let autoPlay = setInterval(nextTestimonial, 4000);

    function resetAutoPlay() {
        clearInterval(autoPlay);
        autoPlay = setInterval(nextTestimonial, 4000);
    }

    updateTestimonials();

});