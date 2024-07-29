const fs = require('fs');

// Read input from file
fs.readFile('./input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading input file:', err);
        return;
    }

    const lines = data.trim().split('\n');
    let output = '';

    lines.forEach(line => {
        // Trim extra spaces and split the line
        const parts = line.trim().split(/\s+/);
        
        // Check if the line has exactly 4 parts
        if (parts.length !== 4) {
            output += `Invalid line format: ${line}\n`;
            return;
        }
        
        const [op, arg1, arg2, result] = parts;

        switch (op) {
            case '+':
                output += `MOV R0, ${arg1}\nADD R0, ${arg2}\nMOV ${result}, R0\n`;
                break;
            case '*':
                output += `MOV R0, ${arg1}\nMUL R0, ${arg2}\nMOV ${result}, R0\n`;
                break;
            case '-':
                output += `MOV R0, ${arg1}\nSUB R0, ${arg2}\nMOV ${result}, R0\n`;
                break;
            case '/':
                output += `MOV R0, ${arg1}\nDIV R0, ${arg2}\nMOV ${result}, R0\n`;
                break;
            case '=':
                output += `MOV R0, ${arg1}\nMOV ${result}, R0\n`;
                break;
            default:
                output += `Unknown operation: ${op}\n`;
        }
    });

    // Write output to file
    fs.writeFile('./output.txt', output, err => {
        if (err) {
            console.error('Error writing output file:', err);
            return;
        }
        console.log('Output successfully written to output.txt');
    });
});
