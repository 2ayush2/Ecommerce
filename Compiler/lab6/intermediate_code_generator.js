const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let str, tempCh = 'z';

const processExpression = () => {
    const ops = [...str.matchAll(/[+\-*/]/g)];
    let output = '';

    ops.forEach(({ index: pos, 0: op }) => {
        let left = str.slice(0, pos).replace(/[^a-zA-Z0-9_]/g, '').trim();
        let right = str.slice(pos + 1).replace(/[^a-zA-Z0-9_]/g, '').trim();

        output += `\t${tempCh} := ${left} ${op} ${right}\t${str.slice(0, pos) + tempCh + str.slice(pos + 1)}\n`;
        tempCh = String.fromCharCode(tempCh.charCodeAt(0) - 1);
    });

    if (ops.length === 0) {
        let finalExpr = str.replace(/[^a-zA-Z0-9_]/g, '').trim();
        output += `\t${tempCh} := ${finalExpr}\n`;
    }

    console.log('\n\tIntermediate Code\t\tExpression\n');
    console.log(output);
};

rl.question('Enter the Expression: ', input => {
    str = input.trim();
    processExpression();
    rl.close();
});
