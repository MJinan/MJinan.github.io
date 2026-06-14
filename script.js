document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Prompt & Audio
    const loader = document.getElementById('loader');
    const audio = document.getElementById('linkmp3');
    let isPlaying = false;

    console.log("DOM Ready - Starting Script");

    // 1. Initial Prompt & Audio Logic
    async function initExperience() {
        console.log("initExperience called");
        try {
            console.log("Opening Swal...");
            const { value: name } = await Swal.fire({
                title: 'Masukin Nama Dedek Sayang ❤️',
                input: 'text',
                inputPlaceholder: 'Nama kamu...',
                confirmButtonText: 'Buka Kejutan ✨',
                confirmButtonColor: '#d4a373',
                allowOutsideClick: false,
                backdrop: `
                    rgba(212, 163, 115, 0.4)
                    url("img/bg.png")
                    center center
                    no-repeat
                    cover
                `,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });

            if (name) {
                console.log("Name entered:", name);
                document.getElementById('userName').textContent = name;
                
                const panda = document.getElementById('panda-mascot');
                
                // Faster Hide loader
                gsap.to(loader, {
                    opacity: 0,
                    duration: 0.3, // Even faster
                    onComplete: () => {
                        loader.style.display = 'none';
                        createParticles();
                        
                        // Snappier Hero Reveal
                        gsap.to('.hero-content', {
                            opacity: 1,
                            y: 0,
                            duration: 0.6, // Faster
                            onComplete: () => {
                                // Show Panda immediately
                                panda.style.display = 'block';
                                gsap.from(panda, {
                                    scale: 0.5,
                                    y: 20,
                                    opacity: 0,
                                    duration: 0.5,
                                    ease: 'back.out(2)'
                                });
                                // NO AUTOMATIC FADE OUT
                            }
                        });
                    }
                });
            }
        } catch (e) {
            console.error("Swal error:", e);
            hideLoader();
        } 
    }

    function hideLoader() {
        if (loader.style.display === 'none') return;
        
        gsap.to(loader, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                loader.style.display = 'none';
                createParticles();
                gsap.to('.hero-content', { opacity: 1, duration: 1 });
            }
        });
    }

    // Fail-safe: Force hide loader after 2 seconds if still stuck
    setTimeout(() => {
        if (loader && loader.style.display !== 'none') {
            console.warn("Fail-safe: Force hiding loader");
            hideLoader();
        }
    }, 2000);

    // Run init as soon as possible
    initExperience();


    // 1.2 Music Toggle
    const musicBtn = document.createElement('div');
    musicBtn.id = 'music-btn';
    musicBtn.innerHTML = '🎵';
    document.body.appendChild(musicBtn);

    musicBtn.onclick = () => {
        if (isPlaying) {
            audio.pause();
            musicBtn.style.animation = 'none';
            musicBtn.innerHTML = '🔇';
        } else {
            audio.play();
            musicBtn.style.animation = 'pulse 1s infinite';
            musicBtn.innerHTML = '🎵';
        }
        isPlaying = !isPlaying;
    };

    // Auto-play attempt on first click anywhere
    document.addEventListener('click', () => {
        if (!isPlaying) {
            audio.play().then(() => {
                isPlaying = true;
                musicBtn.style.animation = 'pulse 1s infinite';
            });
        }
    }, { once: true });

    // 1.5 Floating Particles System
    function createParticles() {
        const container = document.getElementById('particles-container');
        const items = ['❤️', '✨', '🌸', '🌹'];
        
        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.innerHTML = items[Math.floor(Math.random() * items.length)];
            p.style.left = Math.random() * 100 + 'vw';
            p.style.top = Math.random() * 100 + 'vh';
            container.appendChild(p);
            
            // Animate randomly
            animateParticle(p);
        }
    }

    function animateParticle(p) {
        gsap.to(p, {
            x: 'random(-150, 150)',
            y: 'random(-150, 150)',
            rotation: 'random(-360, 360)',
            opacity: 'random(0.1, 0.4)',
            duration: 'random(10, 20)', // Slower for elegance
            ease: 'sine.inOut',
            onComplete: () => animateParticle(p)
        });
    }

    // --- Smart Navigation Logic for Typer ---
    let journeyStatus = { isFinished: false, instance: null, text: "Happy birthday, dedek sayang! 🎉❤️<br><br>Selamat yaa, level umur dedek naik lagi. Tapi tenang, wajahnya dedek masih tetap kayak pemain utama, belum berubah jadi karakter pendukung hehehe. 😆<br><br>Terima kasih karena sampai hari ini dedek masih mau sayang sama mas, padahal kadang mas nyebelin, suka jahil, dan hobi bikin dedek gemas setengah emosi. ❤️<br><br>Semoga di umur yang baru ini semua hal baik datang menghampiri dedek sayang. Rezekinya lancar, kesehatannya terjaga, impiannya satu per satu tercapai, dan semoga kesabarannya menghadapi mas juga makin luas, dan semoga hubungan kita juga makin kuat sampai nanti kita ribut soal menu makan malam di rumah sendiri. 🤭<br><br>Nikmati hari spesial dedek ya, sayang. Jangan lupa bahagia, karena hari ini dunia sedang merayakan hadirnya orang yang paling Mas sayang. ❤️🥰<br><br>Selamat ulang tahun, sayang. Hari ini dedek yang ulang tahun, tapi mas yang merasa paling beruntung karena punya dedek sayang. ❤️" };
    
    let wishStatus = { isFinished: false, instance: null, text: "Terima kasih telah menjadi bagian tercantik dalam hidupnya mas. ❤️<br><br>Semoga di umurnya dedek yang baru ini, semesta selalu memeluk dedek sayang dengan kebahagiaan, kesehatan, dan cinta yang tak pernah padam. <br><br>Mas akan selalu ada di sini, untuk terus mencintai dedek sayang dan merayakan setiap langkah bersama dedek sayang. ✨" };

    function initTypers() {
        // Clear elements first
        const journeyEl = document.getElementById('typer-journey');
        const wishEl = document.getElementById('typer-wish');
        if (journeyEl) journeyEl.innerHTML = '';
        if (wishEl) wishEl.innerHTML = '';

        // Journey Typer
        journeyStatus.instance = new TypeIt("#typer-journey", {
            strings: [journeyStatus.text],
            speed: 60,
            waitUntilVisible: true,
            cursor: true,
            html: true,
            afterComplete: (instance) => { 
                journeyStatus.isFinished = true;
                instance.destroy(); // Properly remove cursor
            }
        }).go();

        // Wish Typer (Wait for explicit trigger in scrollToNext)
        wishStatus.instance = new TypeIt("#typer-wish", {
            strings: [wishStatus.text],
            speed: 60,
            waitUntilVisible: false,
            cursor: true,
            html: true,
            afterComplete: (instance) => { 
                wishStatus.isFinished = true;
                instance.destroy(); // Properly remove cursor
            }
        });
    }

    initTypers();
    
    // --- New Panda Transition Logic ---
    window.scrollToNext = function(target) {
        const currentSection = document.querySelector('section[style*="display: flex"]') || document.querySelector('#hero');
        
        // --- Smart TypeIt Bypass ---
        if (currentSection.id === 'journey' && !journeyStatus.isFinished) {
            journeyStatus.instance.destroy();
            const el = document.getElementById('typer-journey');
            el.innerHTML = journeyStatus.text;
            // Cleanup any stray cursor elements
            const strayCursors = el.querySelectorAll('.ti-cursor');
            strayCursors.forEach(c => c.remove());
            journeyStatus.isFinished = true;
            return;
        }
        if (currentSection.id === 'wish' && !wishStatus.isFinished) {
            wishStatus.instance.destroy();
            const el = document.getElementById('typer-wish');
            el.innerHTML = wishStatus.text;
            // Cleanup any stray cursor elements
            const strayCursors = el.querySelectorAll('.ti-cursor');
            strayCursors.forEach(c => c.remove());
            wishStatus.isFinished = true;
            return;
        }

        const nextSection = document.querySelector(target);
        const transition = document.getElementById('panda-transition');
        const runner = transition.querySelector('.panda-runner');
        const bg = transition.querySelector('.transition-bg');

        if (nextSection && currentSection !== nextSection) {
            console.log("Panda Transition to:", target);
            
            // Show transition container
            transition.style.display = 'flex';
            
            const tl = gsap.timeline();
            
            // 1. Panda & Background sweep in
            tl.to([bg, runner], {
                left: '0%',
                duration: 1.2,
                ease: 'power2.inOut',
                onStart: () => {
                    gsap.to(runner, { opacity: 1, duration: 0.3 });
                }
            });

            // 2. Mid-point: Swap Content
            tl.add(() => {
                currentSection.style.display = 'none';
                currentSection.style.opacity = '0';
                
                nextSection.style.display = 'flex';
                nextSection.style.opacity = '1';
                
                // Trigger wish typer if navigating to it
                if (target === '#wish') {
                    setTimeout(() => wishStatus.instance.go(), 1300);
                }

                ScrollTrigger.refresh();
                window.scrollTo(0, 0);
            });

            // 3. Panda & Background sweep out
            tl.to([bg, runner], {
                left: '-100%',
                duration: 1.2,
                ease: 'power2.inOut',
                onComplete: () => {
                    gsap.set([bg, runner], { left: '100%' });
                    gsap.set(runner, { opacity: 0 });
                    transition.style.display = 'none';
                }
            });
        }
    };

    // Hero Indicator Trigger
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            scrollToNext('#journey');
        });
    }

    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('[data-reveal]');
    revealElements.forEach((el) => {
        const type = el.getAttribute('data-reveal');
        const delay = el.getAttribute('data-delay') || 0;

        let fromVars = { 
            opacity: 0, 
            duration: 1.2, 
            delay: delay, 
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
            }
        };

        if (type === 'fade-up') fromVars.y = 80;
        if (type === 'zoom-in') fromVars.scale = 0.5;

        gsap.from(el, fromVars);
    });

    // Card Micro-interactions (Tilt Effect for gallery items)
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            gsap.to(item, {
                rotateX: rotateX,
                rotateY: rotateY,
                scale: 1.05,
                duration: 0.5,
                ease: "power2.out"
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 0.8,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });


    // Parallax Hero
    gsap.to('#hero', {
        backgroundPositionY: '30%',
        ease: 'none',
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // 3. Heart Catcher Game (Panen Cinta Panda)
    const gameCanvas = document.getElementById('game-canvas');
    const scoreElement = document.getElementById('score');
    const loveMeterFill = document.getElementById('love-meter-fill');
    const gameMessage = document.getElementById('game-message');
    const pandaCatcher = document.getElementById('panda-catcher');
    
    let progress = 0;
    const winProgress = 100;
    let gameActive = true;

    // Movement: Panda follows pointer
    gameCanvas.addEventListener('pointermove', (e) => {
        if (!gameActive) return;
        const rect = gameCanvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        
        // Boundaries
        x = Math.max(40, Math.min(rect.width - 40, x));
        
        gsap.to(pandaCatcher, {
            left: x,
            duration: 0.1,
            ease: "power1.out"
        });
    });

    function createFallingItem() {
        if (!gameActive || !gameCanvas.offsetParent) return; // Only if section is visible

        const item = document.createElement('div');
        item.className = 'falling-heart';
        
        const rand = Math.random();
        let itemType = 'heart';
        if (rand > 0.8) itemType = 'rose';
        else if (rand > 0.6) itemType = 'star';

        const content = { heart: '❤️', star: '✨', rose: '🌹' }[itemType];
        const points = { heart: 5, star: 10, rose: 20 }[itemType];

        item.innerHTML = content;
        item.style.left = (Math.random() * 80 + 10) + '%';
        item.style.top = '-50px';
        
        gameCanvas.appendChild(item);

        const duration = 2.5 + Math.random() * 1.5;
        
        const anim = gsap.to(item, {
            top: '410px',
            rotation: Math.random() * 360,
            duration: duration,
            ease: 'none',
            onUpdate: () => {
                // Collision Detection
                if (!gameActive) return;
                const catcherRect = pandaCatcher.getBoundingClientRect();
                const itemRect = item.getBoundingClientRect();

                if (
                    itemRect.bottom >= catcherRect.top &&
                    itemRect.top <= catcherRect.bottom &&
                    itemRect.right >= catcherRect.left &&
                    itemRect.left <= catcherRect.right
                ) {
                    anim.kill();
                    handleCatch(item, points);
                }
            },
            onComplete: () => {
                if (item.parentNode) item.remove();
            }
        });
    }

    function handleCatch(item, points) {
        progress = Math.min(winProgress, progress + points);
        scoreElement.textContent = progress;
        loveMeterFill.style.width = progress + '%';
        
        // Bounce panda
        gsap.to(pandaCatcher, { scale: 1.2, duration: 0.1, yoyo: true, repeat: 1 });

        gsap.to(item, {
            scale: 2,
            opacity: 0,
            y: -30,
            duration: 0.2,
            onComplete: () => item.remove()
        });

        if (progress >= winProgress) {
            winGame();
        }
    }

    function winGame() {
        gameActive = false;
        gameMessage.innerHTML = '<div class="win-banner">YEAY! Hadiah Buat Dedek : 🎁<br><span>I Love You More Than Anything And I Love You In Every Universe! ❤️</span></div>';
        
        // Fancy Win Sequence
        gsap.to(pandaCatcher, {
            left: '50%',
            bottom: '40%',
            scale: window.innerWidth < 768 ? 2 : 3,
            duration: 1,
            ease: "back.out(2)"
        });

        // Trigger Love Fireworks
        startLoveFireworks();

        for (let i = 0; i < 40; i++) {
            setTimeout(spawnWinParticle, i * 80);
        }
    }

    function spawnWinParticle() {
        const p = document.createElement('div');
        p.innerHTML = ['❤️', '✨', '🌹', '💖', '🌸'][Math.floor(Math.random() * 5)];
        p.style.position = 'absolute';
        p.style.left = '50%';
        p.style.top = '50%';
        p.style.fontSize = (Math.random() * 2 + 1) + 'rem';
        p.style.zIndex = '100';
        gameCanvas.appendChild(p);

        gsap.to(p, {
            x: 'random(-400, 400)',
            y: -window.innerHeight, // Fly up
            opacity: 0,
            scale: 0.5,
            rotation: 'random(-180, 180)',
            duration: 3,
            ease: "power1.out",
            onComplete: () => p.remove()
        });
    }

    // --- Optimized & Festive Fireworks System ---
    const fireworkCanvas = document.getElementById('fireworks');
    const ctx = fireworkCanvas.getContext('2d');
    let particles = [];
    let rockets = [];
    let animationId = null;

    function resizeCanvas() {
        fireworkCanvas.width = window.innerWidth;
        fireworkCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class FireworkParticle {
        constructor(x, y, color, velocity, isHeart = false) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.velocity = velocity;
            this.alpha = 1;
            this.friction = 0.96; 
            this.gravity = 0.04;
            this.size = Math.random() * 3 + 2; 
            this.decay = Math.random() * 0.01 + 0.008; 
            this.isHeart = isHeart;
            this.history = [];
            this.maxHistory = 8; 
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color.replace('rgb', 'rgba').replace(')', `, ${this.alpha})`);
            ctx.fill();

            if (this.history.length > 2) {
                ctx.beginPath();
                ctx.moveTo(this.history[0].x, this.history[0].y);
                for(let i = 1; i < this.history.length; i++) {
                    ctx.lineTo(this.history[i].x, this.history[i].y);
                }
                ctx.strokeStyle = this.color.replace('rgb', 'rgba').replace(')', `, ${this.alpha * 0.4})`);
                ctx.lineWidth = this.size * 0.8;
                ctx.stroke();
            }
        }

        update() {
            this.history.push({x: this.x, y: this.y});
            if (this.history.length > this.maxHistory) this.history.shift();

            this.velocity.x *= this.friction;
            this.velocity.y *= this.friction;
            this.velocity.y += this.gravity;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.alpha -= this.decay;
        }
    }

    class Rocket {
        constructor(x, y, targetY, color) {
            this.x = x;
            this.y = y;
            this.targetY = targetY;
            this.color = color;
            this.velocity = { x: (Math.random() - 0.5) * 3, y: -Math.random() * 6 - 12 };
            this.alpha = 1;
            this.exploded = false;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y + 15);
            ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        update() {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.velocity.y += 0.1;

            if (this.velocity.y >= 0 || this.y <= this.targetY) {
                this.exploded = true;
            }
        }
    }

    function createHeartBurst(x, y, color) {
        const particleCount = 120;
        const scale = window.innerWidth < 768 ? 8 : 15;
        
        for (let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2;
            const r = scale;
            const vx = r * 16 * Math.pow(Math.sin(angle), 3);
            const vy = -r * (13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle));
            
            particles.push(new FireworkParticle(x, y, color, {
                x: vx * 0.1 * (Math.random() * 0.4 + 0.8),
                y: vy * 0.1 * (Math.random() * 0.4 + 0.8)
            }, true));
        }
    }

    function createCircularBurst(x, y, color) {
        const particleCount = 100;
        const baseSpeed = window.innerWidth < 768 ? 6 : 12;
        
        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * baseSpeed + 4;
            particles.push(new FireworkParticle(x, y, color, {
                x: Math.cos(angle) * speed,
                y: Math.sin(angle) * speed
            }));
        }
    }

    const festiveColors = [
        'rgb(255, 0, 85)',
        'rgb(255, 77, 77)',
        'rgb(255, 175, 204)',
        'rgb(189, 224, 254)',
        'rgb(255, 215, 0)',
        'rgb(255, 255, 255)'
    ];

    function animateFireworks() {
        animationId = requestAnimationFrame(animateFireworks);
        ctx.clearRect(0, 0, fireworkCanvas.width, fireworkCanvas.height);

        for (let i = rockets.length - 1; i >= 0; i--) {
            rockets[i].update();
            rockets[i].draw();
            if (rockets[i].exploded) {
                if (Math.random() > 0.4) {
                    createHeartBurst(rockets[i].x, rockets[i].y, rockets[i].color);
                } else {
                    createCircularBurst(rockets[i].x, rockets[i].y, rockets[i].color);
                }
                rockets.splice(i, 1);
            }
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            if (particles[i].alpha <= 0) {
                particles.splice(i, 1);
            } else {
                particles[i].draw();
            }
        }

        if (particles.length > 800) {
            particles.splice(0, particles.length - 800);
        }
    }

    function launchRocket() {
        if (gameActive) return;
        
        const x = Math.random() * (fireworkCanvas.width * 0.8) + (fireworkCanvas.width * 0.1);
        const y = fireworkCanvas.height;
        const targetY = Math.random() * (fireworkCanvas.height * 0.5) + (fireworkCanvas.height * 0.1);
        const color = festiveColors[Math.floor(Math.random() * festiveColors.length)];
        
        rockets.push(new Rocket(x, y, targetY, color));
        
        setTimeout(launchRocket, 300 + Math.random() * 800);
    }

    function startLoveFireworks() {
        if (!animationId) animateFireworks();
        launchRocket();
        
        setTimeout(() => {
            createHeartBurst(fireworkCanvas.width * 0.5, fireworkCanvas.height * 0.3, "rgb(255, 0, 85)");
            createCircularBurst(fireworkCanvas.width * 0.25, fireworkCanvas.height * 0.4, "rgb(189, 224, 254)");
            createCircularBurst(fireworkCanvas.width * 0.75, fireworkCanvas.height * 0.4, "rgb(255, 215, 0)");
        }, 100);
    }

    setInterval(createFallingItem, 700);
});
