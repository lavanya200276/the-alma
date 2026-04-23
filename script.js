document.addEventListener("DOMContentLoaded", () => {
    // Current Year for Footer
    document.getElementById("year").textContent = new Date().getFullYear();

    // DOM Elements
    const printOptions = document.querySelectorAll('input[name="print"]');
    const colorOptions = document.querySelectorAll('input[name="color"]');
    const colorOverlay = document.getElementById("color-overlay");
    const printIconElem = document.getElementById("print-icon-elem");
    const printKanjiElem = document.getElementById("print-kanji-elem");
    const engravingInput = document.getElementById("engraving-input");
    const orderBtn = document.getElementById("place-order-btn");
    const previewLoader = document.getElementById("preview-loader");

    // Print Logic mapping
    const printMap = {
        'berserk': { icon: 'fa-fire', kanji: '炎', color: '#ff3300' },
        'shinobi': { icon: 'fa-bolt', kanji: '雷', color: '#ffff00' },
        'reaper':  { icon: 'fa-skull', kanji: '死', color: '#a020f0' },
        'mech':    { icon: 'fa-robot', kanji: '機', color: '#00ffff' }
    };

    // Color definitions for overlay mapping
    const colorMap = {
        'void': 'rgba(10, 10, 10, 0.95)', // Deep black
        'blood': 'rgba(80, 5, 5, 0.85)', // Dark red metallic
        'phantom': 'rgba(10, 15, 30, 0.85)' // Dark blue
    };

    // Handle Print Change
    printOptions.forEach(option => {
        option.addEventListener("change", (e) => {
            triggerSyncEffect(() => {
                const selected = e.target.value;
                const data = printMap[selected];
                
                // Update Icon
                printIconElem.className = `fa-solid ${data.icon} fa-4x print-icon`;
                
                // Update Kanji
                printKanjiElem.textContent = data.kanji;
            });
        });
    });

    // Handle Color Change Simulation
    colorOptions.forEach(option => {
        option.addEventListener("change", (e) => {
            triggerSyncEffect(() => {
                const selectedColor = e.target.value;
                colorOverlay.style.backgroundColor = colorMap[selectedColor];
            });
        });
    });

    // Simulate Holographic HUD scanning effect
    function triggerSyncEffect(callback) {
        previewLoader.style.display = 'flex';
        
        setTimeout(() => {
            callback();
        }, 300); // 300ms loading effect

        setTimeout(() => {
            previewLoader.style.display = 'none';
        }, 800);
    }

    // Set initial configuration
    colorOverlay.style.backgroundColor = colorMap['void'];
    printIconElem.className = `fa-solid ${printMap['berserk'].icon} fa-4x print-icon`;
    printKanjiElem.textContent = printMap['berserk'].kanji;

    // WhatsApp Order Integration
    orderBtn.addEventListener("click", () => {
        
        // Gather selections
        let selectedColor = "Void Black";
        colorOptions.forEach(opt => {
            if(opt.checked) selectedColor = opt.nextElementSibling.nextElementSibling.textContent;
        });

        let selectedPrint = "Flame Demon";
        printOptions.forEach(opt => {
            if(opt.checked) selectedPrint = opt.nextElementSibling.querySelector('span').textContent;
        });

        const hunterTag = engravingInput.value.trim() || "[NO TAG]";
        
        // WhatsApp Setup
        const phoneNumber = "919876543210"; // Replace with actual business WhatsApp number
        
        // Format the message
        const message = `*[THE ALMA : GEAR ACQUISITION]*\n\nInitiating request for custom armory shaker.\n\n*DATA:* \n- ELEMENT: ${selectedPrint}\n- ARMOR COLOR: ${selectedColor}\n- HUNTER TAG: ${hunterTag}\n\n*POWER LEVEL:* ₹899\n\nAwaiting deployment coordinates (Payment/Shipping info).`;
        
        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        // Glitch effect on button
        const originalText = orderBtn.innerHTML;
        orderBtn.innerHTML = 'UPLOADING DATA...';
        
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            orderBtn.innerHTML = originalText;
        }, 800);
    });

    // Smooth Scroll specifically for nav anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
