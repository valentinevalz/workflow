require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const MONGODB_URI = 'mongodb://localhost:27017/BANK';
const port = 3000


const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});
// Fetch all accounts
app.get('/accounts', async (req, res) => {
    const accounts = await BankAccount.find();
    res.json(accounts);
});

// Create Account
app.post('/accounts', async (req, res) => {
    const { accountNumber, firstName, lastName } = req.body;
    const account = new BankAccount({ accountNumber, firstName, lastName });
    await account.save();
    res.json(account);
});

// Fetch single account
app.get('/accounts/:id', async (req, res) => {
    const account = await BankAccount.findById(req.params.id);
    if (!account) return res.status(404).json({ message: 'Account not found' });
    res.json(account);
});

// Delete account
app.delete('/accounts/:id', async (req, res) => {
    await BankAccount.findByIdAndDelete(req.params.id);
    res.json({ message: 'Account deleted' });
});

// Update Account
app.put('/accounts/:id', async (req, res) => {
    const { firstName, lastName } = req.body;
    const account = await BankAccount.findByIdAndUpdate(req.params.id, { firstName, lastName }, { new: true });
    if (!account) return res.status(404).json({ message: 'Account not found' });
    res.json(account);
});

// Fetch all transactions for an account
app.get('/accounts/:id/transactions', async (req, res) => {
    const account = await BankAccount.findById(req.params.id);
    if (!account) return res.status(404).json({ message: 'Account not found' });
    res.json(account.transactions);
});

// Daily Withdrawal limit 
app.use((req, res, next) => {
        const curerntDate = new Date();
        let total =0;
        this._transactions.forEach(transaction => {
            if(transaction.timestamp.getDate() === currentDate.getDate()) {
                total += transaction.amount;
            }
        });
        return total;
       
    next();
});

// Withdrawal
app.post('/accounts/:id/withdraw', async (req, res) => {
    const { amount } = req.body;
    const account = await BankAccount.findById(req.params.id);
    if (!account) return res.status(404).json({ message: 'Account not found' });
    if (amount > account.balance) return res.status(400).json({ message: 'Insufficient funds' });
    account.balance -= amount;
    account.transactions.push({ type: 'Withdrawal', amount });
    await account.save();
    res.json(account);
});

// Deposit
app.post('/accounts/:id/deposit', async (req, res) => {
    const { amount } = req.body;
    const account = await BankAccount.findById(req.params.id);
    if (!account) return res.status(404).json({ message: 'Account not found' });
    account.balance += amount;
    account.transactions.push({ type: 'Deposit', amount });
    await account.save();
    res.json(account);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});






MODEL MONGOOSE

const bankAccountSchema = new mongoose.Schema({
    accountNumber: { type: Number, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    balance: { type: Number, default: 0 },
    transactions: { type: [Object], default: [] }
});

const BankAccount = mongoose.model('BankAccount', bankAccountSchema);

const transactionSchema = new mongoose.Schema({
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'BankAccount' },
    type: { type: String, enum: ['Deposit', 'Withdrawal', 'Transfer'], required: true },
    amount: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', transactionSchema);



DOCKERFILE

FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["node", "server.js"]


DOCKER-COMPOSE.YAML 

version: "3.8"

services: 
  server:
   build: .
   ports:
    - "3000:3000"
