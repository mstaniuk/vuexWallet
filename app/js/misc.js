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

export const distribute = function(values, staticIndexes, max) {
    const staticSum = values
        .filter((e, i) => staticIndexes.indexOf(i) > -1)
        .reduce((a, b) => a + b, 0);
    const valuesSum = values.reduce((a, b) => a + b, 0);
    const restSum = valuesSum - staticSum;
    const diff = max - valuesSum;
    const weights = values.map((v, i) => {
        if (staticIndexes.indexOf(i) > -1) return 0;
        if (restSum === 0) return 1 / (values.length - staticIndexes.length);
        return v / restSum;
    });

    return values.map((v, i) => v + weights[i] * diff);
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