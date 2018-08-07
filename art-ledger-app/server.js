var express = require("express");
var app = express();

//serve static file (index.html, images, css)
app.use(express.static(__dirname + '/views'));

// set port number to 3000
var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
