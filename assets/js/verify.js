document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('loading-overlay');
    const mainContent = document.getElementById('main-content');
    const tipElement = document.getElementById('tip-text');
    const progressBarFill = document.getElementById('progress-bar-fill');
    
    // Senarai Tips & Ciri-ciri
    const tips = [
        "Powered by the trusted Pterodactyl Panel for seamless server management.",
        "Built on cutting-edge hardware for maximum performance.",
        "Protected with advanced DDoS mitigation to keep your servers safe.",
        "Optimized for ultra-low latency, ensuring smooth gameplay.",
        "Our dedicated support team is available 24/7 to help you."
    ];
    let tipIndex = 0;

    // Fungsi untuk menukar tips
    function changeTip() {
        tipElement.style.opacity = '0'; // Pudar keluar
        setTimeout(() => {
            tipIndex = (tipIndex + 1) % tips.length; // Pergi ke tip seterusnya
            tipElement.innerText = tips[tipIndex];
            tipElement.style.opacity = '1'; // Pudar masuk
        }, 500); // Tunggu 0.5s sebelum tukar teks
    }

    // Mulakan penukaran tips setiap 2.5 saat
    const tipInterval = setInterval(changeTip, 2500);

    // Mulakan animasi bar kemajuan sejurus selepas halaman dimuatkan
    setTimeout(() => {
        progressBarFill.style.width = '100%';
    }, 100);

    // Selepas 8 saat, sembunyikan skrin pemuatan
    setTimeout(() => {
        clearInterval(tipInterval); // Berhentikan penukaran tips
        overlay.classList.add('fade-out'); // Tambah kelas untuk efek pudar keluar
        mainContent.classList.remove('hidden'); // Tunjukkan kandungan utama laman web
        
        // Buang overlay dari DOM selepas animasi selesai untuk prestasi lebih baik
        setTimeout(() => {
            overlay.remove();
        }, 800); // Masa mesti sepadan dengan 'transition' dalam CSS

    }, 8000); // 8000 milisaat = 8 saat
});
