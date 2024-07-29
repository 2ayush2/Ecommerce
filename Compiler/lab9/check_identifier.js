// check_identifier.js

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const isValidIdentifier = (id) => /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(id.trim());

rl.question('Enter an identifier: ', (input) => {
    console.log(isValidIdentifier(input) ? 'Valid identifier' : 'Not a valid identifier');
    rl.close();
});
