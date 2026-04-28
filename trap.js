(function() {
    let _internalAc = null;
    const targets = ['byted_acrawler', '_mssdk', 'acrawler', 'BD_ACRAWLER'];
    
    function capture(val, name) {
        if (val && typeof val.sign === 'function' && !window.my_acrawler) {
            window.my_acrawler = val;
            console.log(`%c[Trap] Captured signature engine from: window.${name}`, 'color:#FE2C55;font-weight:bold');
            return true;
        }
        return false;
    }

    targets.forEach(name => {
        let internalVal = window[name] || null;
        if (internalVal) capture(internalVal, name);

        try {
            Object.defineProperty(window, name, {
                get: function() { return internalVal; },
                set: function(val) {
                    internalVal = val;
                    capture(val, name);
                },
                configurable: true
            });
        } catch(e) {}
    });

    // Brute-force scanner for already initialized SDKs or hidden objects
    const scan = () => {
        for (let key in window) {
            if (targets.includes(key)) continue;
            try {
                const obj = window[key];
                if (obj && typeof obj.sign === 'function' && !window.my_acrawler) {
                    if (capture(obj, key)) break;
                }
            } catch(e) {}
        }
    };
    
    // Scan periodically and immediately
    setInterval(scan, 2000);
    scan();
})();
