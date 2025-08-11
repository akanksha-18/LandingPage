 class CasinoCarousel {
            constructor() {
                this.carousel = document.getElementById('casinoGames');
                this.prevBtn = document.getElementById('prevBtn');
                this.nextBtn = document.getElementById('nextBtn');
                
                if (!this.carousel || !this.prevBtn || !this.nextBtn) {
                    console.error('Carousel elements not found');
                    return;
                }
                
                this.currentIndex = 0;
                this.cardsVisible = this.getVisibleCards();
                this.totalCards = this.carousel.children.length;
                this.cardWidth = 220 + 24; // card width + gap
                
                this.init();
                this.bindEvents();
            }

            getVisibleCards() {
                const containerWidth = window.innerWidth;
                if (containerWidth <= 480) return 1;
                if (containerWidth <= 768) return 2;
                if (containerWidth <= 1024) return 3;
                if (containerWidth <= 1200) return 4;
                return 5;
            }

            init() {
                this.updateButtons();
                this.carousel.style.transition = 'transform 0.3s ease';
            }

            bindEvents() {
                this.prevBtn.addEventListener('click', () => this.prev());
                this.nextBtn.addEventListener('click', () => this.next());
                
                // Handle window resize
                let resizeTimeout;
                window.addEventListener('resize', () => {
                    clearTimeout(resizeTimeout);
                    resizeTimeout = setTimeout(() => {
                        this.cardsVisible = this.getVisibleCards();
                        this.cardWidth = this.getCardWidth();
                        this.currentIndex = Math.min(this.currentIndex, Math.max(0, this.totalCards - this.cardsVisible));
                        this.updateCarousel();
                    }, 250);
                });

                // Touch/swipe support
                let startX = 0;
                let isDragging = false;

                this.carousel.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                    isDragging = true;
                    this.carousel.style.transition = 'none';
                }, { passive: true });

                this.carousel.addEventListener('touchmove', (e) => {
                    if (!isDragging) return;
                    e.preventDefault();
                }, { passive: false });

                this.carousel.addEventListener('touchend', (e) => {
                    if (!isDragging) return;
                    isDragging = false;
                    this.carousel.style.transition = 'transform 0.3s ease';
                    
                    const endX = e.changedTouches[0].clientX;
                    const diff = startX - endX;
                    
                    if (Math.abs(diff) > 50) {
                        if (diff > 0) {
                            this.next();
                        } else {
                            this.prev();
                        }
                    } else {
                        this.updateCarousel();
                    }
                }, { passive: true });
            }

            getCardWidth() {
                const containerWidth = window.innerWidth;
                if (containerWidth <= 480) return 180 + 16;
                return 220 + 24;
            }

            prev() {
                if (this.currentIndex > 0) {
                    this.currentIndex--;
                    this.updateCarousel();
                }
            }

            next() {
                const maxIndex = Math.max(0, this.totalCards - this.cardsVisible);
                if (this.currentIndex < maxIndex) {
                    this.currentIndex++;
                    this.updateCarousel();
                }
            }

            updateCarousel() {
                const translateX = -this.currentIndex * this.cardWidth;
                this.carousel.style.transform = `translateX(${translateX}px)`;
                this.updateButtons();
            }

            updateButtons() {
                const maxIndex = Math.max(0, this.totalCards - this.cardsVisible);
                
                this.prevBtn.disabled = this.currentIndex === 0;
                this.nextBtn.disabled = this.currentIndex >= maxIndex;
                
                this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.3' : '1';
                this.nextBtn.style.opacity = this.currentIndex >= maxIndex ? '0.3' : '1';
            }
        }

        // Testimonial dots functionality
        class TestimonialManager {
            constructor() {
                this.dots = document.querySelectorAll('.testimonial-dots .dot');
                this.currentDot = 0;
                this.bindEvents();
                this.autoRotate();
            }

            bindEvents() {
                this.dots.forEach((dot, index) => {
                    dot.addEventListener('click', () => {
                        this.setActiveDot(index);
                    });
                });
            }

            setActiveDot(index) {
                this.dots.forEach(dot => dot.classList.remove('active'));
                this.dots[index].classList.add('active');
                this.currentDot = index;
            }

            autoRotate() {
                setInterval(() => {
                    this.currentDot = (this.currentDot + 1) % this.dots.length;
                    this.setActiveDot(this.currentDot);
                }, 4000);
            }
        }

        // Newsletter subscription
        function setupNewsletter() {
            const newsletterForm = document.querySelector('.newsletter');
            const emailInput = document.querySelector('.email-input');
            const submitBtn = document.querySelector('.email-submit');

            if (submitBtn) {
                submitBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const email = emailInput.value.trim();
                    
                    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                        alert('Thank you for subscribing! We\'ll keep you updated with the latest news and offers.');
                        emailInput.value = '';
                    } else {
                        alert('Please enter a valid email address.');
                    }
                });
            }
        }

        // Smooth scroll for navigation links
        function setupSmoothScroll() {
            const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }

        // Betting button functionality
        function setupBettingButtons() {
            const betButtons = document.querySelectorAll('.bet-btn');
            betButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    alert('Please register or sign in to place bets. Join FantasyXI now!');
                });
            });
        }

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            // Initialize carousel
            new CasinoCarousel();
            
            // Initialize testimonial manager
            new TestimonialManager();
            
            // Setup newsletter
            setupNewsletter();
            
            // Setup smooth scrolling
            setupSmoothScroll();
            
            // Setup betting buttons
            setupBettingButtons();
            
           
            const playButtons = document.querySelectorAll('.play-btn');
            playButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const gameTitle = e.target.closest('.game-card').querySelector('h3').textContent;
                    alert(`Coming Soon: ${gameTitle} will be available soon!`);
                });
            });

            document.body.style.opacity = '0';
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.5s ease-in';
                document.body.style.opacity = '1';
            }, 100);
        });

        
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
         const testimonials = [
            {
                avatar: 'S',
                name: 'Suresh K',
                type: 'Daily Player',
                text: 'The live betting feature is amazing, and customer support is super responsive! Highly recommend FantasyXI.'
            },
            {
                avatar: 'R',
                name: 'Rahul S.',
                type: 'Verified User',
                text: 'FantasyXI is the best platform for betting. Instant withdrawals & great user experience! I have been playing for months.'
            },
            {
                avatar: 'A',
                name: 'Amit P.',
                type: 'Fantasy Gamer',
                text: 'I love the variety of games here. Football, Cricket, and Casino - all in one place! Perfect platform.'
            },
            {
                avatar: 'V',
                name: 'Vikram M.',
                type: 'Pro Bettor',
                text: 'Outstanding odds and lightning-fast payouts. FantasyXI has become my go-to platform for all sports betting!'
            },
            {
                avatar: 'P',
                name: 'Priya D.',
                type: 'Casino Player',
                text: 'The casino games are top-notch with great graphics and fair play. Love the live dealer section especially!'
            }
        ];

        let currentIndex = 1; // Start with middle card as main
        let autoPlayInterval;

        function updateTestimonials(centerIndex) {
            const cards = document.querySelectorAll('.testimonial-card-new');
            const dots = document.querySelectorAll('.dot');
            
            // Update active dot
            dots.forEach(dot => dot.classList.remove('active'));
            dots[centerIndex].classList.add('active');
            
            // Calculate which testimonials to show (previous, current, next)
            const prevIndex = (centerIndex - 1 + testimonials.length) % testimonials.length;
            const nextIndex = (centerIndex + 1) % testimonials.length;
            
            // Update card contents and classes
            cards.forEach(card => card.classList.add('transitioning'));
            
            setTimeout(() => {
                // Left card
                updateCardContent(cards[0], testimonials[prevIndex]);
                cards[0].classList.remove('main-card');
                
                // Center card (main)
                updateCardContent(cards[1], testimonials[centerIndex]);
                cards[1].classList.add('main-card');
                
                // Right card
                updateCardContent(cards[2], testimonials[nextIndex]);
                cards[2].classList.remove('main-card');
                
                cards.forEach(card => card.classList.remove('transitioning'));
            }, 50);
        }

        function updateCardContent(card, testimonial) {
            card.querySelector('.avatar-img').textContent = testimonial.avatar;
            card.querySelector('h3').textContent = testimonial.name;
            card.querySelector('.user-type').textContent = testimonial.type;
            card.querySelector('.testimonial-text').textContent = testimonial.text;
        }

        function nextTestimonial() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateTestimonials(currentIndex);
        }

        function goToTestimonial(index) {
            currentIndex = index;
            updateTestimonials(currentIndex);
            resetAutoPlay();
        }

        function startAutoPlay() {
            autoPlayInterval = setInterval(nextTestimonial, 4000);
        }

        function resetAutoPlay() {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        }

        // Event listeners
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.addEventListener('click', () => goToTestimonial(index));
        });

        // Pause autoplay on hover
        document.querySelector('.testimonials-grid').addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });

        document.querySelector('.testimonials-grid').addEventListener('mouseleave', () => {
            startAutoPlay();
        });

        // Initialize
        updateTestimonials(currentIndex);
        startAutoPlay();