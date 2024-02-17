var express = require('express');
const app = express();

app.get('/auth', function(req, res) {
    res.json({
        text: 'hello world!'
    });
});

app.listen(8080, function () {
    console.log('App listening on port 8080')
});