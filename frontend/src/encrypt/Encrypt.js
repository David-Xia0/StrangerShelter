const crypto = require('crypto');
const algorithm = process.env.REACT_APP_ENCRYPT_ALGO;
const password = process.env.REACT_APP_ENCRYPT_KEY;

function encryptMessage(message) {
    var key = crypto.createCipher(algorithm, password);
    var encrypted = key.update(message, 'utf8', 'hex');
    encrypted += key.final('hex');
    console.log(encrypted);
    return encrypted;
};

function decryptMessage(message) {
    var key = crypto.createDecipher(algorithm, password);
    var decrypted = key.update(message, 'hex', 'utf8');
    decrypted += key.final('hex');
    console.log(decrypted);
    return decrypted;
};

module.exports = {encryptMessage, decryptMessage};
