# class Transaction {
    constructor(type, amount) {
        this._type = type;
        this._amount = amount;
        this._timestamp = new Date();
    }

    getType() {
        return this._type;
    }

    setType(type) {
        this._type = type;
    }

    getAmount() {
        return this._amount;
    }

    setAmount(amount) {
        this._amount = amount;
    }

    getTimestamp() {
        return this._timestamp;
    }
}

class BankAccount {
    constructor(accountNumber, firstName, lastName) {
        this._accountNumber = accountNumber;
        this._firstName = firstName;
        this._lastName = lastName;
        this._accountHolder = `${firstName} ${lastName}`;
        this._balance = 0;
        this._transactions = [];
    }

    get accountNumber() {
        return this._accountNumber;
    }

    get firstName() {
        return this._firstName;
    }

    get lastName() {
        return this._lastName;
    }

    get accountHolder() {
        return this._accountHolder;
    }

    get balance() {
        return this._balance;
    }

    get transactions() {
        return this._transactions;
    }

    deposit(amount) {
        if (amount > 0) {
            this._balance += amount;
            const transaction = new Transaction("Deposit", amount);
            this._transactions.push(transaction);
            return true;
        } else {
            return false;
        }
    }

    withdraw(amount) {
        if (amount > 0 && amount <= this._balance) {
            this._balance -= amount;
            const transaction = new Transaction("Withdrawal", amount);
            this._transactions.push(transaction);
            return true;
        } else {
            return false;
        }
    }

    getTransactions() {
        return 