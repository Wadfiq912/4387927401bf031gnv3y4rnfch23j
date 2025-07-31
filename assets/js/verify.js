// Fungsi ini dipanggil oleh Google selepas reCAPTCHA berjaya
function onRecaptchaSuccess(token) {
    console.log("reCAPTCHA Verified! Token:", token);
    
    // Hentikan sebarang timer yang mungkin masih berjalan
    clearInterval(window.tipInterval);

    const content = document.getElementById('popup-content-area');
    const overlay = document.getElementById('captcha-overlay');
    
    // Templat HTML untuk mesej kejayaan
    const verifiedHTML = `
        <div class="verified-icon">
            <svg viewBox="0 0 52 52">
                <circle class="check-circle" cx="26" cy="26" r="25"/>
                <path class="check-mark" d="M14 27l5.917 4.917L38 18"/>
            </svg>
        </div>
        <h3 class="char-animated-heading">Verification Complete</h3>`;
    
    content.innerHTML = verifiedHTML;
    animateHeading(content.querySelector('h3'));

    // Sembunyikan pop timbul selepas 2 saat
    setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.classList.add('popup-hidden');
            document.body.style.overflow = 'auto'; // Aktifkan semula skrol
        }, 500);
    }, 2000);
}

// Fungsi untuk menganimasikan teks tajuk
function animateHeading(headingElement) {
    if (!headingElement) return;
    const text = headingElement.textContent;
    headingElement.innerHTML = '';
    for (let i = 0; i < text.length; i++) {
        const charSpan = document.createElement('span');
        charSpan.className = 'char';
        charSpan.textContent = text[i] === ' ' ? '\u00A0' : text[i];
        charSpan.style.animationDelay = `${i * 0.04}s`;
        headingElement.appendChild(charSpan);
    }
}

// Fungsi untuk memulakan paparan Tips & Features
function showTipsAndFeatures() {
    const content = document.getElementById('popup-content-area');
    
    // Templat HTML untuk paparan menunggu
    const tipsHTML = `
        <div class="verifying-loader"></div>
        <p id="tip-text">NoneCloud uses the trusted Pterodactyl Panel for seamless server management.</p>
        <a href="https://nonecloud.top/discord" target="_blank" class="discord-link">
            <i class="bi bi-discord"></i>
            <span>Join our Community</span>
        </a>`;
    
    content.innerHTML = tipsHTML;

    // Senarai Tips & Ciri-ciri
    const tips = [
        "Feature: All servers are protected with enterprise-grade DDoS mitigation.",
        "Tip: Our network is optimized for ultra-low latency, ensuring smooth gameplay.",
        "Feature: Manage your server easily with our intuitive Pterodactyl Panel.",
        "Tip: Experience peak performance with our cutting-edge hardware.",
        "Feature: Get help anytime from our 24/7 expert support team."
    ];
    let tipIndex = 0;
    const tipElement = document.getElementById('tip-text');

    // Mula menukar tips setiap 3.5 saat
    window.tipInterval = setInterval(() => {
        tipElement.style.opacity = '0';
        setTimeout(() => {
            tipIndex = (tipIndex + 1) % tips.length;
            tipElement.innerText = tips[tipIndex];
            tipElement.style.opacity = '1';
        }, 500);
    }, 3500);
}

// Logik utama yang berjalan apabila halaman dimuatkan
document.addEventListener('DOMContentLoaded', function() {
    const content = document.getElementById('popup-content-area');
    
    // Templat HTML untuk paparan awal
    const initialHTML = `
        <h3 class="char-animated-heading">Please Verify Your Session</h3>
        <button 
            id="verify-button"
            class="g-recaptcha verify-button" 
            data-sitekey="6LfjcpUrAAAAADMiYnmhHF2tkXULDMURzJee2jqi" 
            data-callback="onRecaptchaSuccess"
            data-size="invisible">
            Click to Verify
        </button>`;

    // Paparkan kandungan awal
    content.innerHTML = initialHTML;
    document.body.style.overflow = 'hidden';
    animateHeading(content.querySelector('h3'));

    // Tambah event listener pada butang pengesahan
    document.getElementById('verify-button').addEventListener('click', () => {
        // Tukar ke paparan "menunggu" sebaik sahaja butang ditekan
        setTimeout(showTipsAndFeatures, 100); 
    });

    // Efek 3D Parallax pada tetikus
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
