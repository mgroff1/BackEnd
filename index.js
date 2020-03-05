require('dotenv').config();

const server = require('./api/server.js');

const port = process.env.PORT || 5150;
 server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));

 document.getElementById('body').innerHTML = '< button class = "button" > < a style = "font-size:3.2rem; background:red; color: black; border-radius:7px;"'+
'href = \'./index.html\' > SEE API DOC < /a></button >'
