const fs = require('fs');

// Read input from file
fs.readFile('./input.txt', 'utf8', (err, data) => {
    if (err) return console.error('Error reading input file:', err);

    const output = data.trim().split('\n').map(line => {
        const [op, arg1, arg2, result] = line.trim().split(/\s+/);

        if (![op, arg1, arg2, result].every(Boolean)) {
            return `Invalid line format: ${line}`;
        }

        const operations = {
            '+': `MOV R0, ${arg1}\nADD R0, ${arg2}\nMOV ${result}, R0`,
            '*': `MOV R0, ${arg1}\nMUL R0, ${arg2}\nMOV ${result}, R0`,
            '-': `MOV R0, ${arg1}\nSUB R0, ${arg2}\nMOV ${result}, R0`,
            '/': `MOV R0, ${arg1}\nDIV R0, ${arg2}\nMOV ${result}, R0`,
            '=': `MOV R0, ${arg1}\nMOV ${result}, R0`
        };

        return operations[op] || `Unknown operation: ${op}`;
    }).join('\n') + '\n';

    // Write output to file
    fs.writeFile('./output.txt', output, err => {
        if (err) return console.error('Error writing output file:', err);
        console.log('Output successfully written to output.txt');
    });
});
