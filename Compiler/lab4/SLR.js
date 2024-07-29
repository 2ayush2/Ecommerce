const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const grammar = ['E->E+E', 'E->E/E', 'E->E*E', 'E->a', 'E->b'];
let stack = '', input = '', ip_ptr = 0;

const shift = () => stack += input[ip_ptr++];
const reduce = () => {
    const rules = { 'a': 'E->a', 'b': 'E->b', 'E+E': 'E->E+E', 'E/E': 'E->E/E', 'E*E': 'E->E*E' };
    for (let len = 3; len > 0; len--) {
        const subStack = stack.slice(-len);
        if (rules[subStack]) { stack = 'E'; return rules[subStack]; }
    }
    return '';
};

const output = (action) => process.stdout.write(`\n$${stack}\t${input.slice(ip_ptr)}\t${action}`);

const parse = () => {
    output('--');
    while (ip_ptr < input.length) {
        shift();
        output(`shift ${input[ip_ptr - 1]}`);
        let reduction;
        while ((reduction = reduce())) output(reduction);
    }
    output(stack === 'E' ? 'ACCEPT' : 'reject');
    rl.close();
};

rl.question('Enter input symbols: ', (symbols) => {
    input = symbols.trim();
    parse();
});
