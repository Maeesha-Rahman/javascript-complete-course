///////////////////////////////////////
// Lecture: Hoisting

//functions 
// *** hoisting only works for function declarations not function expressions 
// calculateAge(1999);

// const calculateAge = (year) => {
//     console.log(2019 - year);
// }

// calculateAge(1999);
// function declaration
// function calculateAge(year) {
//     console.log(2019 - year);
// }


// retirement(1965);

// const retirement = function(year) {
//     console.log(65 - (2019 - year));
// }

// variables 
console.log(age);
var age = 23;

function foo() {
    var age = 65;
    console.log(age);
}
foo();
console.log(age);

// console.log(age);
// const age = 23;

















///////////////////////////////////////
// Lecture: Scoping


// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/



// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword









