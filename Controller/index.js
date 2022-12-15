const { decreaseBalance } = require('./component/decreaseBalance'),
    { increaseBalance } = require('./component/increaseBalance');

const { getUserBalance } = require('./transaction/balance'),
    { createTransaction } = require('./transaction/transaction'),
    { transactionHistory } = require('./transaction/transactionHistory');

const { fundWallet } = require('./flutter/fundWallet');

const { signup, login, logout } = require('./user/auth'),
    { form } = require('./user/form'),
    { forgotPassword, resetPassword } = require('./user/resetpassword');


const { flutterCharges } = require('./flutter/flutterCharges'),
    { flutterOther } = require('./flutter/flutterOthers'),
    { flutterTransfer } = require('./flutter/flutterTransfer'),
    { accountDetails } = require('./flutter/accountDetails'),
    { webHook } = require('./flutter/webHook')

const { verify } = require('./verify')



module.exports = {
    decreaseBalance,
    increaseBalance,
    fundWallet,
    getUserBalance,
    createTransaction,
    transactionHistory,
    signup,
    login,
    logout,
    form,
    forgotPassword,
    resetPassword,
    flutterCharges,
    flutterOther,
    flutterTransfer,
    accountDetails,
    webHook,
    verify
}