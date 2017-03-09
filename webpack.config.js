module.exports = {
    entry: "./lib/main.js",
    output: {
        path: __dirname,
        filename: "kingdom.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};
