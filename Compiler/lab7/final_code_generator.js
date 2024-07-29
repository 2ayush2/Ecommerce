const fs = require('fs');

// Read input from file
fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) throw err;

    const lines = data.trim().split('\n');
    const outputLines = lines.map(line => {
        const [op, arg1, arg2, result] = line.trim().split(/\s+/);
        switch (op) {
            case '+': return `MOV R0, ${arg1}\nADD R0, ${arg2}\nMOV ${result}, R0`;
            case '*': return `MOV R0, ${arg1}\nMUL R0, ${arg2}\nMOV ${result}, R0`;
            case '-': return `MOV R0, ${arg1}\nSUB R0, ${arg2}\nMOV ${result}, R0`;
            case '/': return `MOV R0, ${arg1}\nDIV R0, ${arg2}\nMOV ${result}, R0`;
            case '=': return `MOV R0, ${arg1}\nMOV ${result}, R0`;
            default: return `Unknown operation: ${op}`;
        }
    }).join('\n');

    // Write to output file
    fs.writeFile('output.txt', outputLines, err => {
        if (err) throw err;
        console.log('Final code generation complete. Check output.txt.');
    });
});
