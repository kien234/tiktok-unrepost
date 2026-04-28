(function() {
    function injectScript(file) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = chrome.runtime.getURL(file);
            script.onload = () => {
                script.remove();
                resolve();
            };
            script.onerror = (e) => {
                console.error('[Extension] Load failed:', file, e);
                reject(e);
            };
            (document.head || document.documentElement).appendChild(script);
        });
    }

    // --- AUTO-CLICK LOGIC ---
    if (window.location.hash.includes('autounfav=1')) {
        console.log('[Extension] Auto-Unfavorite mode active');

        async function humanClick(element) {
            if (!element) return;
            const rect = element.getBoundingClientRect();
            const offsetX = Math.floor(Math.random() * (rect.width * 0.6)) + (rect.width * 0.2);
            const offsetY = Math.floor(Math.random() * (rect.height * 0.6)) + (rect.height * 0.2);
            const clickX = rect.left + offsetX;
            const clickY = rect.top + offsetY;

            element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
            element.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
            element.dispatchEvent(new MouseEvent('mousemove', { clientX: clickX, clientY: clickY, bubbles: true }));

            const delay = Math.floor(Math.random() * 300) + 200;
            await new Promise(resolve => setTimeout(resolve, delay));

            element.dispatchEvent(new MouseEvent('mousedown', { clientX: clickX, clientY: clickY, bubbles: true }));
            element.dispatchEvent(new MouseEvent('mouseup', { clientX: clickX, clientY: clickY, bubbles: true }));
            
            element.click();
            console.log(`[Extension] Human-clicked at: ${clickX}, ${clickY}`);
        }
        
        const tryUnfav = async () => {
            const favIcon = document.querySelector('[data-e2e="favorite-icon"]');
            if (favIcon) {
                const btn = favIcon.closest('button');
                const isFavorited = favIcon.querySelector('path[fill="#FACE15"]'); // Yellow path
                
                if (isFavorited) {
                    console.log('[Extension] Unfavoriting with human-like interaction...');
                    await humanClick(btn);
                    setTimeout(() => window.close(), 1500); 
                } else {
                    console.log('[Extension] Already unfavorited, closing.');
                    window.close();
                }
            } else {
                if (!window._unfavAttempts) window._unfavAttempts = 0;
                window._unfavAttempts++;
                if (window._unfavAttempts < 25) {
                    setTimeout(tryUnfav, 1000);
                } else {
                    window.close();
                }
            }
        };
        
        setTimeout(tryUnfav, 3000);
        return;
    }

    // Nạp SDK và Logic ... (existing)
    injectScript('javascript/webmssdk_5.1.3.js').then(() => {
        setTimeout(() => {
            injectScript('untrap.js');
            injectScript('inject.js');
        }, 300);
    }).catch(e => console.error('[Extension] Injection chain failed:', e));
})();