var esRand;

esRand = (function () {
    var abs,
        cos,
        pow,
        now,
        lastCos,
        esRand;

    abs = Math.abs;
    cos = Math.cos;
    pow = Math.pow;
    
    now = typeof process === 'object'
    && typeof process.hrtime === 'function'
        ? function () {
            var hrtime;
            
            hrtime = process.hrtime();
            
            return hrtime[0] * 1000
            + hrtime[1] / 1000 / 1000
            + +new Date();
        }
        : typeof performance === 'object'
        && typeof performance.now === 'function'
            ? performance.now.bind(performance)
            : typeof Date.now === 'function'
                ? Date.bind(Date)
                : function now() {
                    return +new Date();
                };

    lastCos = cos(now());

    esRand = function esRand() {
        var value,
            range;

        value = 0;
        range = 0;

        do {
            lastCos += cos(now());
            value += +((~~(lastCos * 1e18) % 10) * pow(10, range));
        } while ((range += 1) < 18);

        value = abs(value * 1e-18);

        return value;
    };

    return esRand;
}());

console.log(esRand(12))