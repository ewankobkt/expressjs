var express = require('express');
var app = express();

// pangatlong gagawin
// console.log(__dirname);
// app.use('/cssFiles', express.static(__dirname + 'myapp\\public\\stylesheets'));

// pangalawang gagawin
app.get('/', function (request, response) {
    response.send('Hello world!');
});

// eto unang gagawin kasama yung nasa express
app.listen(3000, function () {
    console.log('Listening at port 3000');
});