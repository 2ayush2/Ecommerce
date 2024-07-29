const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const stack = [];
const ops = new Set(['+', '-', '*', '/']); // Operators set for quick lookup

const push = (c) => stack.push(c);
const pop = () => stack.length ? stack.pop() : 'x';
const printStat = () => process.stdout.write(`\n$${stack.join('')}$`);

const parse = (input) => {
    input = input.replace(/id/g, 'E'); // Replace 'id' with 'E'
    let i = 0;

    while (i < input.length) {
        if (input[i] === 'E') {
            push('E');
            printStat();
            process.stdout.write(' id');
        } else if (ops.has(input[i]) || input[i] === 'E') {
            push(input[i]);
            printStat();
        }
        i++;
    }
    printStat();

    while (stack.length) {
        let ch = pop();
        if (ch === 'x') break;
        if (ops.has(ch)) {
            if (pop() !== 'E') {
                process.stdout.write("\nError: invalid expression");
                return;
            }
            push('E');
            printStat();
        }
    }
    process.stdout.write(stack.length === 1 && stack[0] === 'E' ? "\nAccepted" : "\nRejected");
};

// Main execution
rl.question('Enter the expression: ', (expression) => {
    parse(expression.trim());
    rl.close();
});
