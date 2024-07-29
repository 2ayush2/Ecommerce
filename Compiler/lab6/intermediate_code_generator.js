const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let str, tempCh = 'z', left = '', right = '';

const findOperators = () => {
    return str.split('').reduce((ops, char, idx) => {
        if ('+-*/:'.includes(char)) ops.push({ pos: idx, op: char });
        return ops;
    }, []);
};

const updateStr = (pos, char) => str = str.substring(0, pos) + char + str.substring(pos + 1);

const processExpression = (ops) => {
    ops.forEach(({ pos, op }) => {
        let i = pos - 1;
        left = '';
        while (i >= 0 && !'+*/:'.includes(str[i])) left = str[i--] + left;
        i = pos + 1;
        right = '';
        while (i < str.length && !'+*/:'.includes(str[i])) right += str[i++];

        // Print the intermediate code and the updated expression
        process.stdout.write(`\t${tempCh} := ${left} ${op} ${right}\t\t${updateStr(pos, tempCh)}\n`);
        
        // Update the temporary variable for the next operation
        tempCh = String.fromCharCode(tempCh.charCodeAt(0) + 1);
    });

    // Final assignment if there are no more operators
    if (!ops.length) {
        let i = str.length - 1;
        left = '';
        while (i >= 0 && !'+*/:'.includes(str[i])) left = str[i--] + left;
        process.stdout.write(`\t${tempCh} := ${left}\n`);
    }
};

rl.question('Enter the Expression: ', (input) => {
    str = input.trim();
    const ops = findOperators();
    process.stdout.write('\n\tIntermediate Code\t\tExpression\n\n');
    processExpression(ops);
    rl.close();
});
