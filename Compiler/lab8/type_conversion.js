// type_conversion.js

function typeConversion() {
    let intVar = 10;
    let floatVar = 5.5;
    let doubleVar = 12.34;

    // Implicit Conversion
    let result1 = intVar + floatVar; // intVar implicitly converted to float
    let result2 = intVar + doubleVar; // intVar implicitly converted to double

    // Explicit Conversion
    let floatVar2 = 9.99;
    let intVar2 = Math.floor(floatVar2); // floatVar2 explicitly cast to int
    let doubleVar2 = 123.456;
    let floatVar3 = Number(doubleVar2); // doubleVar2 explicitly cast to float

    // Calculation with conversion
    let num1 = 10;
    let num2 = 20.5;
    let result3 = num1 / num2; // num1 implicitly converted to double
    let result4 = Math.floor(result3); // result3 explicitly cast to int

    console.log(`Implicit Conversion Result (int to float): ${result1.toFixed(2)}`);
    console.log(`Implicit Conversion Result (int to double): ${result2.toFixed(2)}`);
    console.log(`Explicit Conversion Result (float to int): ${intVar2}`);
    console.log(`Explicit Conversion Result (double to float): ${floatVar3.toFixed(2)}`);
    console.log(`Calculation Result with implicit conversion: ${result3.toFixed(2)}`);
    console.log(`Calculation Result with explicit conversion to int: ${result4}`);
}

typeConversion();
