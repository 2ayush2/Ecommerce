const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Grammar rules
const grammar = [
    'E->E+E',
    'E->E/E',
    'E->E*E',
    'E->a',
    'E->b'
];

let ip_sym = ''; // Input symbol string
let stack = '';  // Stack for parser
let ip_ptr = 0;  // Pointer for the input symbol

// Function to perform shift operation
const shift = () => {
    stack += ip_sym[ip_ptr]; // Add current symbol to stack
    ip_sym = ip_sym.slice(1); // Remove symbol from input
    ip_ptr++; // Move pointer forward
};

// Function to perform reduction based on grammar rules
const reduce = () => {
    const reductions = {
        'a': 'E->a',
        'b': 'E->b',
        'E+E': 'E->E+E',
        'E/E': 'E->E/E',
        'E*E': 'E->E*E'
    };
    // Check for possible reductions from the end of the stack
    for (let len = 3; len > 0; len--) {
        const subStack = stack.slice(-len);
        if (reductions[subStack]) {
            stack = 'E'; // Replace matched part with 'E'
            return reductions[subStack];
        }
    }
    return ''; // No reduction
};

// Function to output results
const outputResult = (stack, input, action) => {
    // Just showing results in a minimal format
    process.stdout.write(`\n$${stack}\t\t${input}\t\t${action}`);
};

// Main parsing function
const parse = () => {
    outputResult('', ip_sym, '--'); // Initial state
    while (ip_ptr < ip_sym.length) {
        shift(); // Perform shift operation
        outputResult(stack, ip_sym, `shift ${ip_sym[ip_ptr]}`);
        
        let reduction;
        // Perform reductions while applicable
        while ((reduction = reduce())) {
            outputResult(stack, ip_sym, reduction);
            stack = 'E'; // Reset stack to 'E'
        }
    }
    
    // Final check
    if (stack === 'E') {
        outputResult(stack, ip_sym, 'ACCEPT');
    } else {
        outputResult(stack, ip_sym, 'reject');
    }
    
    rl.close(); // Close readline interface
};

rl.question('Enter the input symbols:\t', (input) => {
    ip_sym = input.trim(); // Read input and trim extra spaces
    parse(); // Start parsing
});
