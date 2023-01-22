function and(num1 = 1, num2 = 1) {
    console.log(`Number 1 in base 2: ${num1.toString(2)}`)
    console.log(`Number 2 in base 2: ${num2.toString(2)}`)

    let result = (num1 & num2);

    console.log(result, " : ", result.toString(2));
    let res2 = result >> 1
    console.log("Shift: ", res2, " : ", res2.toString(2))
}

function add(a, b) {
    let counts = 1;
    while(b != 0) {
        console.log(`---------------------- (Looped ${counts} times)`)
        console.log(`A: ${a.toString(2)} -- B: ${b.toString(2)}`)
        let carry = a & b;
        console.log(`Carry: ${carry.toString(2)} -- Actual Value: ${carry}`)
        a = a ^ b;
        console.log(`A^B: ${a.toString(2)}`)

        b = carry << 1;
        console.log(`B Shift left: ${b.toString(2)}`)

        counts++
    }

    return a;
}

function negate(a) {
    return add(~a, 1);
}

function subtract(a, b) {
    return add(a, negate(b));
}

function multiply(a, b) {
    let result = 0;

    while(b > 0) {

        if(b & 1) {
            result += a;
        }

        a = a << 1;
        b = b >> 1;
    }

    return result;
}

console.log(multiply(-2,21));