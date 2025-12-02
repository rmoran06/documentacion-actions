function suma(a, b) {
    return a + b;
}

function resta(a, b) {
    return a - b;
}

function multiplicacion(a, b) {
    return a * b;
}

function division(a, b) {
    if (b === 0) {
        throw new Error("No se puede dividir por cero");
    }
    return a / b;
}

// TODO: implement a function that returns true if a number is even
function esPar(n) {
    return n % 2 === 0;
}

console.log("🚀 Aplicación iniciada");
console.log("➕ Suma(5, 3):", suma(5, 3));
console.log("➖ Resta(10, 4):", resta(10, 4));
console.log("✖️  Multiplicación(6, 7):", multiplicacion(6, 7));
console.log("➗ División(20, 4):", division(20, 4));

// add esPar to the exports
module.exports = { suma, resta, multiplicacion, division, esPar };
