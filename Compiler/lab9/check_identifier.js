// check_identifier.js

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const isValidIdentifier = (identifier) => {
    if (identifier.length === 0) return false;

    // Check if the first character is valid
    if (!/^[a-zA-Z_]$/.test(identifier[0])) return false;

    // Check remaining characters
    for (let i = 1; i < identifier.length; i++) {
        if (!/^[a-zA-Z0-9_]$/.test(identifier[i])) return false;
    }

    return true;
};

rl.question('Enter an identifier: ', (input) => {
    const identifier = input.trim();

    if (isValidIdentifier(identifier)) {
        console.log('\nValid identifier');
    } else {
        console.log('\nNot a valid identifier');
    }

    rl.close();
});
