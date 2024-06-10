const localStorage = require('node-localstorage').LocalStorage;
localStorage = new localStorage('./scratch');
module.exports = localStorage;