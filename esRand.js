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
    
    now = performance
    && performance.now
        ? performance.now.bind(performance)
        : Date.now
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
