import express from 'express';
import userRouter from './routers/UserRouter.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import passport from 'passport';

const __dirname = path.resolve();
dotenv.config({ path: path.join(__dirname, '/config/express.env') });

const app = express();
const port = 9002;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(cors());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// DEFAULT
app.get('/api/version', (request, response) => {
  response.status(200).json({ version: 'v1' });
});

// POSTGRES
// User Handling
app.use(userRouter);

app.listen(port, () => {
  console.log(`User Management Backend is running on port ${port}`);
});
