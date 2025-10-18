require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const authRouter = require('./routers/authRoutes');

const app = express();

// CORS: pozwól frontowi z Vite (5173) i zezwól na cookies
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));

app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected'))
  .catch(err => { console.error(err); process.exit(1); });

// Ping do testu z frontu
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Twój router auth: ma ścieżki /signup, /signin, /signout
app.use('/api/auth', authRouter);

// (opcjonalnie) strona główna
app.get('/', (req, res) => res.json({ message: 'Hello from the server' }));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
