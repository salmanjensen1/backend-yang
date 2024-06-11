require('dotenv').config();

const express = require('express');
const passport = require('passport');
const initializePassport = require('./passport/passport-config');

const app = express();
const port = process.env.PORT || 3000;

const authRouter = require('./routes/authRoute');

initializePassport(passport);

app.use(express.json());
app.use(passport.initialize());

app.use('/auth', authRouter);

app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send('This is a protected route');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
