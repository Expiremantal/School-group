const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

app.use(bodyParser.json());

// PostgreSQL Pool setup
const pool = new Pool({
  user: 'your-username',
  host: 'localhost',
  database: 'ShortlistPro_DB',
  password: 'your-password',
  port: 5432,
});

// Middleware for token authentication
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(403);

  jwt.verify(token, 'SECRET_KEY', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// User registration
app.post('/register', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    await pool.query(
      'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)',
      [first_name, last_name, email, hashedPassword]
    );
    res.status(201).send('User registered!');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// User login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ user_id: user.user_id, email: user.email }, 'SECRET_KEY');
      res.json({ token });
    } else {
      res.status(400).send('Invalid email or password');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get applicants (Protected Route)
app.get('/applicants', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM applicants WHERE user_id = $1', [req.user.user_id]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
