const fs = require('fs');

const keywords = ["auto", "break", "case", "char", "const", "continue", "default",
"do", "double", "else", "enum", "extern", "float", "for", "goto",
"if", "int", "long", "register", "return", "short", "signed",
"sizeof", "static", "struct", "switch", "typedef", "union",
"unsigned", "void", "volatile", "while"];

const operators = ['+', '-', '*', '/', '%', '='];

function isKeyword(buffer) {
    return keywords.includes(buffer);
}

fs.readFile('aa.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error while opening the file:', err);
        return;
    }

    let buffer = '';
    let tokens = [];
    
    for (let i = 0; i < data.length; i++) {
        const ch = data[i];

        // Check if the character is an operator
        if (operators.includes(ch)) {
            tokens.push({ type: 'operator', value: ch });
        }

        // Check if the character is alphanumeric or underscore
        if (/\w/.test(ch)) {
            buffer += ch;
        } else if ((ch === ' ' || ch === '\n') && buffer.length > 0) {
            if (isKeyword(buffer)) {
                tokens.push({ type: 'keyword', value: buffer });
            } else {
                tokens.push({ type: 'identifier', value: buffer });
            }
            buffer = '';
        }
    }

    // Check the last buffered identifier if any
    if (buffer.length > 0) {
        if (isKeyword(buffer)) {
            tokens.push({ type: 'keyword', value: buffer });
        } else {
            tokens.push({ type: 'identifier', value: buffer });
        }
    }

    tokens.forEach(token => {
        console.log(`${token.value} is ${token.type}`);
    });
});
