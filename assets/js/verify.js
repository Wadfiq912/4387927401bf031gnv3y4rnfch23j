function onRecaptchaSuccess(token) {
    console.log("reCAPTCHA Verified! Token:", token);
    const overlay = document.getElementById('captcha-overlay');
    const content = document.getElementById('popup-content-area');

    // Change content to success message
    content.innerHTML = `<h3 class="char-animated-heading">Verification Complete</h3>`;
    animateHeading(content.querySelector('h3'));

    // Hide pop-up after 2 seconds
    setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.classList.add('popup-hidden');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }, 500);
    }, 2000);
}

function animateHeading(headingElement) {
    if (!headingElement) return;
    const text = headingElement.textContent;
    headingElement.innerHTML = '';
    for (let i = 0; i < text.length; i++) {
        const charSpan = document.createElement('span');
        charSpan.className = 'char';
        charSpan.textContent = text[i] === ' ' ? '\u00A0' : text[i]; // Use non-breaking space
        charSpan.style.animationDelay = `${i * 0.04}s`;
        headingElement.appendChild(charSpan);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.body.style.overflow = 'hidden'; // Disable scrolling initially
    animateHeading(document.querySelector('.char-animated-heading'));

    // 3D Parallax effect on mouse move
    const overlay = document.getElementById('captcha-overlay');
    const popup = document.getElementById('captcha-popup');
    overlay.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { offsetWidth, offsetHeight } = overlay;
        const x = (clientX - offsetWidth / 2) / (offsetWidth / 2);
        const y = (clientY - offsetHeight / 2) / (offsetHeight / 2);
        popup.style.setProperty('--transform-initial', `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`);
    });
});
