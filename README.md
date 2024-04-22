class Transaction {
    constructor(type, amount) {
      this._type = type;
      this._amount = amount;
      this._timestamp = new Date();
    }
  
    // Getters
    get type() {
      return this._type;
    }
  
    get amount() {
      return this._amount;
    }
  
    get timestamp() {
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
  
    // Getters
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
  
    // Methods
    deposit(amount) {
      if (amount > 0) {
        this._balance += amount;
        const transaction = new Transaction('Deposit', amount);
        this._transactions.push(transaction);
        return true;
      } else {
        console.log('Invalid amount for deposit.');
        return false;
      }
    }
  
    withdraw(amount) {
      if (amount > 0 && this._balance >= amount) {
        this._balance -= amount;
        const transaction = new Transaction('Withdrawal', amount);
        this._transactions.push(transaction);
        return true;
      } else {
        console.log('Invalid amount or insufficient funds for withdrawal.');
        return false;
      }
    }
  
    getTransactions() {
      return this._transactions;
    }
  }
  
  // sample usage
  const myAccount = new BankAccount(1130709156, 'valentine', 'jide');
  console.log('Initial Balance:', myAccount.balance);
  myAccount.deposit(60000);
  myAccount.withdraw(8000);
  console.log('Account Holder:', myAccount.accountHolder);
  console.log('Current Balance:', myAccount.balance);
  console.log('Transactions:', myAccount.getTransactions());
