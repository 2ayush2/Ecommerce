const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let productions = [];

// Add value to result set if not present
const addToResultSet = (result, val) => {
    if (!result.includes(val)) result.push(val);
};

// Compute FIRST set for a symbol
const FIRST = (c) => {
    if (!/^[A-Z]$/.test(c)) return [c];
    const result = [];
    productions.forEach(prod => {
        if (prod[0] === c) {
            if (prod[2] === '#') addToResultSet(result, '#');
            else {
                for (let i = 2; i < prod.length; i++) {
                    const firstOfNext = FIRST(prod[i]);
                    firstOfNext.forEach(val => addToResultSet(result, val));
                    if (!firstOfNext.includes('#')) break;
                }
            }
        }
    });
    return result;
};

// Compute FOLLOW set for a symbol
const FOLLOW = (c) => {
    const result = [];
    if (productions.some(prod => prod[0] === c)) result.push('$');
    productions.forEach(prod => {
        for (let i = 2; i < prod.length; i++) {
            if (prod[i] === c) {
                if (i + 1 < prod.length) {
                    const firstOfNext = FIRST(prod[i + 1]);
                    firstOfNext.forEach(val => addToResultSet(result, val));
                }
                if (i + 1 === prod.length && c !== prod[0]) {
                    FOLLOW(prod[0]).forEach(val => addToResultSet(result, val));
                }
            }
        }
    });
    return result;
};

// Read productions and process FOLLOW queries
const readInput = () => {
    rl.question('Number of productions: ', (num) => {
        const readProductions = (index) => {
            if (index < num) {
                rl.question(`Production ${index + 1}: `, (prod) => {
                    productions[index] = prod;
                    readProductions(index + 1);
                });
            } else {
                queryFollowSet();
            }
        };
        readProductions(0);
    });
};

// Query FOLLOW set
const queryFollowSet = () => {
    rl.question('\nFind FOLLOW of: ', (c) => {
        const result = FOLLOW(c);
        console.log(`FOLLOW(${c}) = { ${result.join(' ')} }`);
        rl.question("Press 'y' to continue: ", (choice) => {
            if (choice.toLowerCase() === 'y') queryFollowSet();
            else rl.close();
        });
    });
};

// Start the program
readInput();
