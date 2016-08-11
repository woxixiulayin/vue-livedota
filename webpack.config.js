module.exports = {
    entry: ["./dev/src/js/main.js"],
    output: {
        path: __dirname + "/public/src/js",
        filename: "main.bundle.js"
    },
    module: { //加载器配置 
        loaders: [ { test: /\.css$/, loader: 'style-loader!css-loader' }, 
        { test: /\.js$/, loader: 'babel-loader!jsx-loader?harmony'}, 
        { test: /\.scss$/, loader: 'style!css!sass?sourceMap'}, 
        { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'} 
        ] 
    },
    resolve: { //查找module的话从这里开始查找 
        root: __dirname + 'public/src/js' //绝对路径
    }
}