const express = require('express');
const mysql = require('mysql');
const app = express();

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'ShortlistPro_DB'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// API to fetch resumes
app.get('/api/resumes', (req, res) => {
    const sql = 'SELECT * FROM applicants';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Serve CV files
app.get('/files/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);
    res.download(filePath); // Trigger the download
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
