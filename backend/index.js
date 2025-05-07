const express = require('express');
const app = express();
const PORT = 3000;

// Test endpoint
app.get('/', (req, res) => {
    res.send('ERP Backend çalışıyor!');
});

// API Sağlık kontrolü (opsiyonel)
app.get('/api/status', (req, res) => {
    res.json({ status: 'OK', time: new Date() });
});

app.listen(PORT, () => {
    console.log(`Sunucu başlatıldı: http://localhost:${PORT}`);
});
