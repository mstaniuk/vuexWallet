export const debounce = function(callback, wait, immediate) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        let later = function() {
            timeout = null;
            if (!immediate) {
                callback.apply(context, args);
            }
        }
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            callback.apply(context, args);
        }
    }
};

export const distribute = function(values, staticValue, max) {
    var restSum = values
        .filter(function(v, i) { return i !== staticValue; })
        .reduce(function(a, b) { return a + b; }, 0);

    var weights = values.map(function(v, i) {
        if (i === staticValue) return null;
        if (restSum === 0) return roundTo(1 / (values.length - 1), 2);
        return v / restSum;
    });
    return weights.map(function(v, i) {
        if (v === null) {
            return values[i];
        }

        return v * (max - values[staticValue]);
    });
};

export const formatCurrency = function(value) {
    return value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1 ").replace('.', ',');
}

export const currencyToFloat = function(value) {
    return parseFloat(value.replace(/\D/g, ''));
}

export const checkDateFormat = function(date) {
    return /^\d{4}-\d{2}-\d{2}$/.test(date);
};

export const roundTo = function(v, n) {
    return Math.round(v * Math.pow(10, n)) / Math.pow(10, n);
}

export const formatDate = function(d) {
    if (!(d instanceof Date)) d = new Date();
    let dd = d.getDate();
    let mm = d.getMonth() + 1;
    let yyyy = d.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return yyyy + '-' + mm + '-' + dd;
}

// temp
export const fakeData = [{
        "id": "001",
        "name": "Testowy Fundusz #0",
        "risk": 2,
        "horizon": 3,
    },
    {
        "id": "002",
        "name": "Testowy Fundusz #2",
        "risk": 3,
        "horizon": 6,
    },
    {
        "id": "003",
        "name": "Testowy Fundusz #3",
        "risk": 3,
        "horizon": 6,
    },
    {
        "id": "004",
        "name": "Testowy Fundusz #4",
        "risk": 1,
        "horizon": 6,
    },
    {
        "id": "005",
        "name": "Testowy Fundusz #5",
        "risk": 5,
        "horizon": 5,
    },
    {
        "id": "006",
        "name": "Testowy Fundusz #6",
        "risk": 1,
        "horizon": 1,
    },
    {
        "id": "007",
        "name": "Testowy Fundusz #7",
        "risk": 1,
        "horizon": 1,
    },
    {
        "id": "008",
        "name": "Testowy Fundusz #8",
        "risk": 1,
        "horizon": 1,
    },
    {
        "id": "009",
        "name": "Testowy Fundusz #9",
        "risk": 1,
        "horizon": 1,
    }
]