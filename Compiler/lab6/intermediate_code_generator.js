const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let str, tempCh = 'z';

const findOperators = () => str.split('').reduce((ops, char, idx) => {
    if ('+-*/'.includes(char)) ops.push({ pos: idx, op: char });
    return ops;
}, []);

const processExpression = (ops) => {
    ops.forEach(({ pos, op }) => {
        let left = str.slice(0, pos).replace(/[^a-zA-Z0-9]/g, '').split('').reverse().join('');
        let right = str.slice(pos + 1).replace(/[^a-zA-Z0-9]/g, '');

        process.stdout.write(`\t${tempCh} := ${left} ${op} ${right}\t\t${str.substring(0, pos) + tempCh + str.substring(pos + 1)}\n`);
        tempCh = String.fromCharCode(tempCh.charCodeAt(0) - 1);
    });

    if (!ops.length) {
        let left = str.replace(/[^a-zA-Z0-9]/g, '');
        process.stdout.write(`\t${tempCh} := ${left}\n`);
    }
};

rl.question('Enter the Expression: ', (input) => {
    str = input.trim();
    process.stdout.write('\n\tIntermediate Code\t\t\tExpression\n\n');
    processExpression(findOperators());
    rl.close();
});
