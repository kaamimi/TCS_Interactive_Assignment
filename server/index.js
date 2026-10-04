require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT;

// In-memory "database" with one demo user so reviewers can log in instantly
const users = [
  {
    id: 1,
    name: 'Demo User',
    email: 'demo@demo.com',
    password: bcrypt.hashSync('pwd123', 10),
  },
];

// Middleware: checks the JWT on protected routes
function authenticate(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}

// Register
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  if (users.find((u) => u.email === email)) {
    return res.status(409).json({ message: 'Email already registered' });
  }
  const hashed = await bcrypt.hash(password, 10);
  users.push({ id: Date.now(), name, email, password: hashed });
  res.status(201).json({ message: 'Registered successfully' });
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
  res.json({ token, user: { name: user.name, email: user.email } });
});

// Protected dashboard data
app.get('/api/dashboard', authenticate, (req, res) => {
  res.json({
    message: `Welcome back, ${req.user.name}!`,
    user: { name: req.user.name, email: req.user.email },
    stats: [
      { label: 'Total Projects', value: 12 },
      { label: 'Tasks Completed', value: 87 },
      { label: 'Pending Reviews', value: 5 },
    ],
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));