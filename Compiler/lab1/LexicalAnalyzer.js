const fs = require('fs');
const keywords = new Set([
    "auto", "break", "case", "char", "const", "continue", "default",
    "do", "double", "else", "enum", "extern", "float", "for", "goto",
    "if", "int", "long", "register", "return", "short", "signed",
    "sizeof", "static", "struct", "switch", "typedef", "union",
    "unsigned", "void", "volatile", "while"
]);
const operators = new Set(['+', '-', '*', '/', '%', '=']);
function isKeyword(word) {
    return keywords.has(word);
}
fs.readFile('aa.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error while opening the file:', err);
        return;
    }
    let buffer = '';
    const tokens = [];
    for (const ch of data) {
        if (operators.has(ch)) {
            tokens.push({ type: 'operator', value: ch });
        } else if (/\w/.test(ch)) {
            buffer += ch;
        } else if (/\s/.test(ch) || [';', '(', ')'].includes(ch)) {
            if (buffer) {
                tokens.push({
                    type: isKeyword(buffer) ? 'keyword' : 'identifier',
                    value: buffer
                });
                buffer = '';
            }
            if ([';', '(', ')'].includes(ch)) {
                tokens.push({ type: 'delimiter', value: ch });
            }
        }
    }
    if (buffer) {
        tokens.push({
            type: isKeyword(buffer) ? 'keyword' : 'identifier',
            value: buffer
        });
    }
    const lines = [];
    let line = '';
    tokens.forEach(({ value, type }, index) => {
        if (index > 0 && index % 4 === 0) {
            lines.push(line.trim());
            line = '';
        }
        line += `${value}: ${type}  `;
    });
    if (line) {
        lines.push(line.trim());
    }
    lines.forEach((line, index) => {
        console.log(`Line ${index + 1}: ${line}`);
    });
});
