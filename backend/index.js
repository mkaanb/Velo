const express = require('express');
const app = express();
const PORT = 3000;

const dataMap = {
    products,
    customers
};

// Test endpoint
app.get('/', (req, res) => {
    res.send('ERP Backend çalışıyor!');
});

// API Sağlık kontrolü (opsiyonel)
app.get('/api/status', (req, res) => {
    res.json({ status: 'OK', time: new Date() });
});

app.get('/api/:module', (req, res) => {
    const { module } = req.params;
    const data = dataMap[module];

    if (data) {
        res.json(data);
    } else {
        res.status(404).json({ error: 'Modül bulunamadı' });
    }
});

app.listen(PORT, () => {
    console.log(`Sunucu başlatıldı: http://localhost:${PORT}`);
});
