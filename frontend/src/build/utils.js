module.exports = {
    rules: [{
        test: /\.less$/,
        use: [{
            loader: 'style-loader',
        }, {
            loader: 'css-loader', // translates CSS into CommonJS
        }, {
            loader: 'less-loader', // compiles Less to CSS
             options: {
           lessOptions: {
                 modifyVars: {
                     'primary-color': '#fff',
                           'link-color': '#fff',
                           'border-radius-base': '2px',
                         },
                javascriptEnabled: true,
                  }
       },
}],
// ...other rules
}],
// ...other config
}
