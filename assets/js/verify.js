document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('loading-overlay');
    const mainContent = document.getElementById('main-content');
    const tipElement = document.getElementById('tip-text');
    const progressRing = document.getElementById('progress-ring-fill');

    // Pengiraan untuk bar kemajuan bulat
    const radius = progressRing.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    progressRing.style.strokeDasharray = `${circumference} ${circumference}`;
    progressRing.style.strokeDashoffset = circumference;

    const tips = [
        "Powered by the trusted Pterodactyl Panel for seamless server management.",
        "Built on cutting-edge hardware for maximum performance.",
        "Protected with advanced DDoS mitigation to keep your servers safe.",
        "Optimized for ultra-low latency, ensuring smooth gameplay.",
        "Our dedicated support team is available 24/7 to help you."
    ];
    let tipIndex = 0;
    let typeInterval;
    let tipChangeInterval;

    // Fungsi untuk efek menaip
    function typewriterEffect(text) {
        let i = 0;
        tipElement.innerHTML = "";
        clearInterval(typeInterval);
        typeInterval = setInterval(() => {
            if (i < text.length) {
                tipElement.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 30); // Kelajuan menaip
    }

    // Mulakan penukaran tips
    function startTipCycling() {
        typewriterEffect(tips[tipIndex]);
        tipChangeInterval = setInterval(() => {
            tipIndex = (tipIndex + 1) % tips.length;
            typewriterEffect(tips[tipIndex]);
        }, 3500); // Tukar tip setiap 3.5 saat
    }
    
    // Mulakan semua animasi selepas halaman dimuatkan
    function startLoading() {
        startTipCycling();
        // Mulakan animasi bar kemajuan
        setTimeout(() => {
            progressRing.style.strokeDashoffset = '0';
        }, 100);

        // Selepas 8 saat, sembunyikan skrin pemuatan
        setTimeout(() => {
            clearInterval(tipChangeInterval);
            clearInterval(typeInterval);
            
            overlay.classList.add('glitch-out'); // Efek glitch

            setTimeout(() => {
                overlay.classList.add('fade-out'); // Efek pudar keluar
                mainContent.classList.remove('hidden');
                document.body.style.overflow = 'auto';

                setTimeout(() => {
                    overlay.remove();
                }, 600);
            }, 400);

        }, 8000); // 8000 milisaat = 8 saat
    }

    startLoading();
});
