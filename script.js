// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight * 0.85) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Mobile Menu Toggle
function toggleMenu() {
    const nav = document.getElementById('main-nav');
    const hamburger = document.querySelector('.hamburger i');
    nav.classList.toggle('active');

    if (nav.classList.contains('active')) {
        hamburger.classList.remove('fa-bars');
        hamburger.classList.add('fa-times');
    } else {
        hamburger.classList.remove('fa-times');
        hamburger.classList.add('fa-bars');
    }
}

// Gallery Toggle Logic
function toggleGallery() {
    const extendedGallery = document.getElementById('extended-gallery');
    const viewAllLink = document.querySelector('.view-all-link');

    if (extendedGallery.style.display === 'none') {
        extendedGallery.style.display = 'grid';
        viewAllLink.innerHTML = 'Show Less <i class="fas fa-arrow-up"></i>';
    } else {
        extendedGallery.style.display = 'none';
        viewAllLink.innerHTML = 'View All <i class="fas fa-arrow-right"></i>';
        document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
    }
}

// Lightbox & Slideshow Logic
let currentSlide = 1;
const totalSlides = 40;
let slideshowInterval;

function openLightbox(index) {
    currentSlide = index;
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');

    img.src = `gallery/${currentSlide}.jpg`;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    updateLightboxMuteUI();
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
    stopSlideshow();
}

function changeSlide(step) {
    currentSlide += step;
    if (currentSlide > totalSlides) currentSlide = 1;
    if (currentSlide < 1) currentSlide = totalSlides;

    const img = document.getElementById('lightbox-img');

    // Smooth transition: remove class, change src, then re-add class
    img.classList.remove('lightbox-img-slide');
    img.src = `gallery/${currentSlide}.jpg`;

    // When image loads, trigger the smooth fade animation
    img.onload = function () {
        img.classList.add('lightbox-img-slide');
    };
}

function toggleSlideshow() {
    const btn = document.getElementById('slideshow-btn');
    if (slideshowInterval) {
        stopSlideshow();
    } else {
        startSlideshow();
        // Ensure audio plays when slideshow starts
        const bgAudio = document.getElementById('bg-audio');
        if (bgAudio && bgAudio.paused) {
            bgAudio.play().then(() => {
                updateAudioUI(true);
            }).catch(error => {
                console.log("Audio playback failed:", error);
            });
        }
    }
}

function startSlideshow() {
    const btn = document.getElementById('slideshow-btn');
    btn.innerHTML = '<i class="fas fa-pause"></i> Stop Slideshow';
    // Rhythmic interval: 4 seconds for a smooth, immersive feel
    slideshowInterval = setInterval(() => {
        changeSlide(1);
    }, 4000);
}

function stopSlideshow() {
    clearInterval(slideshowInterval);
    slideshowInterval = null;
    const btn = document.getElementById('slideshow-btn');
    if (btn) btn.innerHTML = '<i class="fas fa-play"></i> Start Slideshow';

    // Stop the background music when slideshow is stopped
    const bgAudio = document.getElementById('bg-audio');
    if (bgAudio && !bgAudio.paused) {
        bgAudio.pause();
        updateAudioUI(false);
    }
}

// Close mobile menu when clicking on a link
document.querySelectorAll('#main-nav a').forEach(link => {
    link.addEventListener('click', () => {
        const nav = document.getElementById('main-nav');
        const hamburger = document.querySelector('.hamburger i');
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            hamburger.classList.remove('fa-times');
            hamburger.classList.add('fa-bars');
        }
    });
});


// Active Menu Highlighting (Scroll Spy)
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

const highlightNav = () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', highlightNav);

// Smooth Scroll for Nav Links
navLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Update active class immediately on click
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        }
    });
});

// Contact Form Submission
function submitForm(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const inquiry = document.getElementById('inquiry').value;
    const message = document.getElementById('message').value;

    // Create WhatsApp message
    const whatsappMessage = `Hello Parkhill College, my name is ${name}. ${inquiry ? `Inquiry about: ${inquiry}. ` : ''}Phone: ${phone}. Message: ${message}`;
    const whatsappUrl = `https://wa.me/263788528818?text=${encodeURIComponent(whatsappMessage)}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Show success message
    alert('Thank you for your message! We will get back to you soon.');

    // Reset form
    document.getElementById('contactForm').reset();
}

// Newsletter Subscription
function subscribeNewsletter(event) {
    event.preventDefault();

    const email = document.getElementById('newsletter-email').value;

    // Show success message
    alert(`Thank you for subscribing with ${email}! You will receive updates from Parkhill College.`);

    // Reset form
    document.getElementById('newsletter-email').value = '';
}

// ===== ENROLLMENT MODAL =====
function openEnrollModal() {
    const modal = document.getElementById('enrollModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent background scroll
}

function closeEnrollModal() {
    const modal = document.getElementById('enrollModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal when clicking outside the modal box
function handleModalClick(event) {
    if (event.target === document.getElementById('enrollModal')) {
        closeEnrollModal();
    }
}

// Close modal on Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeEnrollModal();
});

function submitEnrollment(event) {
    event.preventDefault();

    const parent = document.getElementById('enroll-parent').value.trim();
    const phone = document.getElementById('enroll-phone').value.trim();
    const student = document.getElementById('enroll-student').value.trim();
    const grade = document.getElementById('enroll-grade').value;
    const age = document.getElementById('enroll-age').value;
    const prevSchool = document.getElementById('enroll-prevschool').value.trim();
    const message = document.getElementById('enroll-message').value.trim();

    // Build WhatsApp message
    let waMsg = `📋 *PARKHILL COLLEGE - ENROLLMENT INQUIRY 2026*\n\n`;
    waMsg += `👤 *Parent/Guardian:* ${parent}\n`;
    waMsg += `📞 *Contact Number:* ${phone}\n`;
    waMsg += `🎓 *Student Name:* ${student}\n`;
    waMsg += `📚 *Grade/Form:* ${grade}\n`;
    if (age) waMsg += `🔢 *Age:* ${age}\n`;
    if (prevSchool) waMsg += `🏫 *Previous School:* ${prevSchool}\n`;
    if (message) waMsg += `💬 *Message:* ${message}\n`;
    waMsg += `\n_Sent from Parkhill College Website_`;

    const waUrl = `https://wa.me/263788528818?text=${encodeURIComponent(waMsg)}`;

    // Open WhatsApp with the pre-filled message
    window.open(waUrl, '_blank');

    // Close modal and reset form
    closeEnrollModal();
    document.getElementById('enrollForm').reset();
}

// ===== DARK MODE TOGGLE =====
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');

    // Update ALL theme toggle buttons (desktop + mobile)
    document.querySelectorAll('#theme-toggle i, #theme-toggle-mobile i').forEach(icon => {
        if (isDark) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });

    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Load saved theme
(function () {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        window.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('#theme-toggle i, #theme-toggle-mobile i').forEach(icon => {
                if (icon) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                }
            });
        });
    }
})();

// ===== OPTIONS MENU OVERLAY =====
function toggleOptionsMenu() {
    const overlay = document.getElementById('options-overlay');
    if (overlay.style.display === 'flex') {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    } else {
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// ===== CALENDAR TABS =====
function showTerm(termNumber) {
    // Hide all term contents
    const contents = document.querySelectorAll('.term-content');
    contents.forEach(content => content.style.display = 'none');

    // Deactivate all buttons
    const tabs = document.querySelectorAll('.cal-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
        tab.style.background = 'transparent';
        tab.style.color = 'var(--primary-gold)';
    });

    // Show selected term
    const activeContent = document.getElementById('term' + termNumber);
    activeContent.style.display = 'block';

    // Activate selected button
    const activeTab = tabs[termNumber - 1];
    activeTab.classList.add('active');
    activeTab.style.background = 'var(--primary-gold)';
    activeTab.style.color = 'white';
}

// ===== BACKGROUND AUDIO CONTROL =====
function toggleAudioSlider() {
    if (window.innerWidth <= 968) {
        const mobileWrapper = document.getElementById('volume-wrapper-mobile');
        if (mobileWrapper) mobileWrapper.classList.toggle('active');
    } else {
        const wrapper = document.getElementById('volume-wrapper');
        if (wrapper) wrapper.classList.toggle('active');
    }
}

function toggleAudio() {
    const bgAudio = document.getElementById('bg-audio');
    if (!bgAudio) return;

    if (bgAudio.paused) {
        bgAudio.play().then(() => {
            updateAudioUI(true);
        }).catch(error => {
            console.log("Audio playback failed:", error);
        });
    } else {
        bgAudio.pause();
        updateAudioUI(false);
    }
}

function updateAudioUI(isPlaying) {
    // Update desktop AND mobile audio toggle icons
    document.querySelectorAll('#audio-toggle i, #audio-toggle-mobile i').forEach(icon => {
        if (isPlaying) {
            icon.classList.remove('fa-volume-mute');
            icon.classList.add('fa-volume-up');
        } else {
            icon.classList.remove('fa-volume-up');
            icon.classList.add('fa-volume-mute');
        }
    });

    // Update both play/pause buttons
    document.querySelectorAll('#play-pause-btn i, #play-pause-btn-mobile i').forEach(btnIcon => {
        if (isPlaying) {
            btnIcon.classList.remove('fa-play');
            btnIcon.classList.add('fa-pause');
        } else {
            btnIcon.classList.remove('fa-pause');
            btnIcon.classList.add('fa-play');
        }
    });
}

function updateVolume(val) {
    const bgAudio = document.getElementById('bg-audio');
    if (bgAudio) {
        bgAudio.volume = parseFloat(val);
        // Sync both slider inputs
        document.querySelectorAll('#volume-slider, #volume-slider-mobile').forEach(slider => {
            slider.value = val;
        });

        // Update both desktop and mobile audio icons
        document.querySelectorAll('#audio-toggle i, #audio-toggle-mobile i').forEach(icon => {
            if (parseFloat(val) == 0) {
                icon.classList.remove('fa-volume-up');
                icon.classList.add('fa-volume-mute');
            } else if (!bgAudio.paused) {
                icon.classList.remove('fa-volume-mute');
                icon.classList.add('fa-volume-up');
            }
        });
    }
}

// Close volume slider when clicking outside
document.addEventListener('click', (e) => {
    // Desktop volume outside check
    const wrapper = document.getElementById('volume-wrapper');
    const container = document.querySelector('.audio-control-container');
    if (wrapper && wrapper.classList.contains('active') && !container.contains(e.target)) {
        wrapper.classList.remove('active');
    }

    // Mobile volume outside check
    const mobileWrapper = document.getElementById('volume-wrapper-mobile');
    const mobileContainer = document.querySelector('.mobile-audio-container');
    if (mobileWrapper && mobileWrapper.classList.contains('active') && !mobileContainer.contains(e.target)) {
        mobileWrapper.classList.remove('active');
    }
});

// Initial Volume Setup
document.addEventListener('DOMContentLoaded', () => {
    const bgAudio = document.getElementById('bg-audio');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeSliderMobile = document.getElementById('volume-slider-mobile');
    if (bgAudio) {
        const defaultVolume = volumeSlider ? parseFloat(volumeSlider.value) : 0.5;
        bgAudio.volume = defaultVolume;
        if (volumeSlider) volumeSlider.value = defaultVolume;
        if (volumeSliderMobile) volumeSliderMobile.value = defaultVolume;
    }
});

// ===== SIDE MENU (STARLINK STYLE) =====
function toggleSideMenu() {
    const sideMenu = document.getElementById('side-menu');
    sideMenu.classList.toggle('active');
}

// ===== FULL PAGE OVERLAYS =====
function openOverlaySection(type) {
    const overlay = document.getElementById('options-overlay');
    const calendarContent = document.getElementById('calendar-overlay-content');
    const owaContent = document.getElementById('owa-overlay-content');

    // Reset contents
    calendarContent.style.display = 'none';
    owaContent.style.display = 'none';

    // Show requested content
    if (type === 'calendar') {
        calendarContent.style.display = 'block';
    } else if (type === 'owa') {
        owaContent.style.display = 'block';
    }

    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scroll
    toggleSideMenu(); // Close sidebar
}

function closeOverlaySection() {
    const overlay = document.getElementById('options-overlay');
    overlay.style.display = 'none';
    document.body.style.overflow = ''; // Restore scroll
}

function toggleLightboxMute() {
    const bgAudio = document.getElementById('bg-audio');
    if (!bgAudio) return;
    bgAudio.muted = !bgAudio.muted;
    updateLightboxMuteUI();
}

function updateLightboxMuteUI() {
    const bgAudio = document.getElementById('bg-audio');
    const muteBtn = document.getElementById('lightbox-mute-btn');
    if (bgAudio && muteBtn) {
        if (bgAudio.muted) {
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i> Unmute';
        } else {
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i> Mute';
        }
    }
}

// Expose functions globally to window for inline onclick handlers to work in ES Modules
window.toggleTheme = toggleTheme;
window.toggleMenu = toggleMenu;
window.toggleAudioSlider = toggleAudioSlider;
window.toggleAudio = toggleAudio;
window.toggleSideMenu = toggleSideMenu;
window.openOverlaySection = openOverlaySection;
window.closeOverlaySection = closeOverlaySection;
window.showTerm = showTerm;
window.openEnrollModal = openEnrollModal;
window.closeEnrollModal = closeEnrollModal;
window.toggleGallery = toggleGallery;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.changeSlide = changeSlide;
window.toggleSlideshow = toggleSlideshow;
window.submitForm = submitForm;
window.subscribeNewsletter = subscribeNewsletter;
window.submitEnrollment = submitEnrollment;
window.handleModalClick = handleModalClick;
window.updateVolume = updateVolume;
window.toggleLightboxMute = toggleLightboxMute;



