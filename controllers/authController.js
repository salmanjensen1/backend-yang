const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { PrismaClient } = require('@prisma/client');
const asyncHandler = require('express-async-handler');
const secret = process.env.JWT_SECRET;

const prisma = new PrismaClient();

const createUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword
        }
      });
      res.status(201).send('User registered');
    } catch (e) {
      res.status(400).send(`User already exists'`);
    }
  });

  const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
  
    if (!user) {
      return res.status(400).send('No user with that email');
    }
  
    try {
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id }, secret);
        res.json({ token });
      } else {
        res.status(400).send('Password incorrect');
      }
    } catch (e) {
      res.status(500).send(e.message);
    }
  });

  module.exports = {createUser, loginUser};