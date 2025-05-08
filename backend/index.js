const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// JSON parser
app.use(express.json());

// Ana endpoint
app.get('/', (req, res) => {
    res.send('ERP Backend çalışıyor!');
});

// Dinamik route yükleyici
const routesPath = path.join(__dirname, 'routes');

fs.readdirSync(routesPath).forEach((file) => {
    const route = require(`./routes/${file}`);
    const routeName = file.replace('.js', '');
    app.use(`/api/${routeName}`, route);
});

app.listen(PORT, () => {
    console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
