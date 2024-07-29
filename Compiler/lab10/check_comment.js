// check_comment.js

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const isValidComment = (comment) => {
    comment = comment.trim();
    return comment.startsWith('//') ? 'Single-line comment' :
           (comment.startsWith('/*') && comment.endsWith('*/')) ? 'Multi-line comment' :
           'Not a comment';
};

rl.question('Enter comment: ', (input) => {
    console.log(isValidComment(input));
    rl.close();
});
