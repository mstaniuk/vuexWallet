const sass = require('node-sass');
const watch = require('node-watch');
const postcss = require('postcss');
const fs = require('fs');
const performanceNow = require("performance-now");
const colors = require('colors');
const autoprefixesOptions = {
    browsers: 'last 3 versions, >1%, not bb < 10, not ie < 11, Chrome > 54, ff > 50, iOS >= 8',
};

const autoprefixer = require('autoprefixer')(autoprefixesOptions);
const CleanCSS = require('clean-css');

const scss = function () {
    return new Promise((resolve, reject) => {
        sass.render(
            { file: './app/scss/main.scss' },
            function (err, result) {
                if (err !== null) {
                    reject(err.formatted);
                } else {
                    resolve(result.css);
                }
            }
        );
    });
};

const prefix = function (css) {
    return new Promise((resolve, reject) => {
        postcss([autoprefixer])
            .process(css)
            .then((result) => {
                result
                    .warnings()
                    .forEach((warn) => {
                        console.warn(warn.toString());
                    });
                resolve(result.css);
            })
    });
}

const minify = function (css) {
    return new CleanCSS({ returnPromise: true }).minify(css);
}

const save = function (css, fileName) {
    return new Promise((resolve, reject) => {
        fs.writeFile("./dist/" + fileName + ".css", css, function (err) {
            if (err) reject(err);
            resolve(css);
        });
    });
}

console.log('Watching: ' + './app/scss'.green);
watch('./app/scss', { recursive: true }, function (evt, name) {
    console.log('SCSS'.green + ' changed');
    const time = performanceNow();

    if (!fs.existsSync('./dist')) {
        fs.mkdirSync('./dist')
    }

    scss()
        .then(prefix)
        .then((css) => save(css, 'styles'))
        .then(minify)
        .then((css) => save(css.styles, 'styles.min'))
        .catch((error) => console.log(error.toString().bgWhite.red))
        .then(() => {
            console.log(('Finished in ' + ((performanceNow() - time).toFixed(2)) + 'ms'));
        });
});

