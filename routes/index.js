module.exports = function(BASE_URL) {
    var express = require('express');
    var router = express.Router();
    var request = require('request');

    if (/\/$/.test(BASE_URL)) {
        BASE_URL = BASE_URL.substring(0, BASE_URL.length - 1);
    }

    /* GET proxy */
    router.get('*', function (req, res) {
        request
            .get(BASE_URL + req.url)
            .pipe(res);
    });

    /* POST proxy */
    router.post('*', function (req, res) {
        req.pipe(request.post(BASE_URL + req.url))
           .pipe(res);
    });

    return router;
};
