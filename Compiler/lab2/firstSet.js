const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let numOfProductions;
const productionSet = [];

// Add value to result set if not already present
const addToResultSet = (result, val) => {
    if (!result.includes(val)) result.push(val);
};

// Compute FIRST set for a non-terminal
const FIRST = (result, c) => {
    if (!/^[A-Z]$/.test(c)) { // Terminal check
        addToResultSet(result, c);
        return;
    }

    for (const prod of productionSet) {
        if (prod[0] === c) {
            if (prod[2] === '$') {
                addToResultSet(result, '$');
            } else {
                for (let i = 2; i < prod.length; i++) {
                    const subResult = [];
                    FIRST(subResult, prod[i]);
                    subResult.forEach(val => addToResultSet(result, val));
                    if (!subResult.includes('$')) break;
                }
            }
        }
    }
};

// Read number of productions and production strings
const readProductions = () => {
    rl.question('Number of productions: ', (num) => {
        numOfProductions = parseInt(num, 10);
        const readNext = (index) => {
            if (index < numOfProductions) {
                rl.question(`Production ${index + 1}: `, (prod) => {
                    productionSet[index] = prod;
                    readNext(index + 1);
                });
            } else {
                getFirstSet();
            }
        };
        readNext(0);
    });
};

// Query FIRST set
const getFirstSet = () => {
    rl.question('\nFind FIRST of: ', (c) => {
        const result = [];
        FIRST(result, c);
        console.log(`FIRST(${c}) = { ${result.join(' ')} }`);
        rl.question("Press 'y' to continue: ", (choice) => {
            if (choice.toLowerCase() === 'y') {
                getFirstSet();
            } else {
                rl.close();
            }
        });
    });
};

// Start the program
readProductions();
