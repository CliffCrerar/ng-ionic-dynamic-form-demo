const PROXY_CONFIG = [
    {
        context: [
           '/api'
        ],
        target: "http://35.221.48.218:5984",
        secure: false,
        pathRewrite:{
            "^/api":"dynamic-forms-demo/_all_docs?include_docs=true"
        },
        "changeOrigin": true
    }
]

module.exports = PROXY_CONFIG;
