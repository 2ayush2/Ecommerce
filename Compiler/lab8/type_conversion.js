// type_conversion.js

const typeConversion = () => {
    const intVar = 10, floatVar = 5.5, doubleVar = 12.34;
    const result1 = intVar + floatVar;
    const result2 = intVar + doubleVar;
    const intVar2 = Math.floor(9.99);
    const floatVar3 = 123.456;

    console.log(`Implicit Conversion Result (int to float): ${result1.toFixed(2)}`);
    console.log(`Implicit Conversion Result (int to double): ${result2.toFixed(2)}`);
    console.log(`Explicit Conversion Result (float to int): ${intVar2}`);
    console.log(`Explicit Conversion Result (double to float): ${floatVar3.toFixed(2)}`);
    console.log(`Calculation Result with implicit conversion: ${(10 / 20.5).toFixed(2)}`);
    console.log(`Calculation Result with explicit conversion to int: ${Math.floor(10 / 20.5)}`);
};

typeConversion();
