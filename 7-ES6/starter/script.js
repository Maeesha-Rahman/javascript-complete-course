// blocks and IIFEs

// ES6
// block scope - like an IIFEs. created some data that is not accessible on the outside
{
    const a = 1;
    let b = 2;
    var c = 3;
}

// console.log(a + b); // will not log bc variables are inside block
console.log(c); // will still log bc variables declared with var are not block scoped but are function scoped

// ES5 
// (function() {
//     var c = 3;
// })

// console.log(c);

// arrow functions 

// const years = [1990, 1965, 1982, 1937];
// map has access to element, index, array
// let ages = years.map(el => 2019 - el);
// console.log(ages);

// ages = years.map((el, index) => `Age element ${index + 1}: ${2019 - el}.`);
// console.log(ages);

// ages = years.map((el, index) => {
//     const now = new Date().getFullYear();
//     const age = now - el;
//     return `Age element ${index + 1}: ${age}.`
// });
// console.log(ages);

// arrow functions and 'this' keyword. 

//Unlike other functions, arrow functions don't get their own 'this' keyword. They use the 'this' keyword of the function they are written in. - lexical 'this' variable.

// ES5
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function() {

        var self = this;
        document.querySelector('.green').addEventListener('click', function() {
            var str = 'this is box number ' + self.position + ' and it is ' + self.color;
            alert(str);
        });
    },
}
// the callback function is not a method it is a regular function so therefore 'this' keyword does not point to box5 object, but instead the window object. therefore the 'this' variables are undefined. a hack is to store the 'this' into a variable in the method before the regular function. 
// box5.clickMe();

// ES6
const box6 = {
    color: 'green',
    position: 1,
    clickMe: function() {

        document.querySelector('.green').addEventListener('click', () => {
            const str = `This is box number ${this.position} and it is ${this.color}`;
            alert(str);
        });
    },
}
// by using the arrow function, we have access to the 'this' keyword from method bc arrow function shares the lexical 'this' keyword of its surroundings 
// box6.clickMe();

const box7 = {
    color: 'green',
    position: 1,
    clickMe: () => {

        document.querySelector('.green').addEventListener('click', () => {
            const str = `This is box number ${this.position} and it is ${this.color}`;
            alert(str);
        });
    },
}
// by changing the method to arrow function, the this keyword is now from its lexical surroundings, which is the global context. so the method would no longer have its own this keyword. since the this keyword points to global window object, the variables are undefined. 
// box7.clickMe();

// function Person(name) {
//     this.name = name;
// }
// // ES5
// Person.prototype.myFriends = function(friends) {
//     var arr = friends.map(function(el) {
//         return this.name + ' is friends with ' + el;
//     }.bind(this));
//     console.log(arr);
// }

// var friends = ['bob', 'jane', 'mark']
// new Person('john').myFriends(friends);

// we call another callback function that does not access to 'this' from method. this keyword points to global object again. can use the hack to store 'this' in a variable first. or use the bind method. 

// ES6 

const Person = function(name) {
    this.name = name;
}
// ES5
Person.prototype.myFriends = function(friends) {
    const arr = friends.map(el => `${this.name} is friends with ${el}.`);
    console.log(arr);
}

const friends = ['bob', 'jane', 'mark']
const mike = new Person('mike');
mike.myFriends(friends);
// new Person('john').myFriends(friends);

// destructuring 

// ES6

// going to create a constant called name and year and the data will be stored in each of the variables
// const [name, age] = ['john', 26];
// console.log(name); // stores 'john'
// console.log(age); // stores 26 

// const obj = {
//     firstName: 'john',
//     lastName: 'smith',
// }

// const {firstName, lastName} = obj;
// console.log(firstName);
// console.log(lastName);

// const {firstName: a, lastName: b} = obj;
// console.log(a);
// console.log(b);

const calcAgeRetirement = (year) => {
    const age = new Date().getFullYear() - year;
    return [age, 65 - age];
}

const [age, retirement] = calcAgeRetirement(1990);
console.log(age);
console.log(retirement);

// arrays
// queryselector all returns a nodeList. we have to transform it into an array
const boxes = document.querySelectorAll('.box');

// converts nodelist from boxes to an array so we can use array methods on it
const boxesArr = Array.from(boxes);

boxesArr.forEach(cur => cur.style.backgroundColor = 'dodgerblue');

// if you want to use 'break' or 'continue' you cannot use map or foreach to loop but instead use a for loop

//ES5
// for(var i = 0; i < boxesArr5.length; i++) {
    
//     if(boxesArr5[i].className === 'box blue') {
//         continue;
//     }
    
//     boxesArr5[i].textContent = 'I changed to blue!';
    
// };

// ES6
for (const cur of boxesArr) {
    if (cur.className.includes('blue')) {
        continue;
    } else {
        cur.textContent = 'I changed to blue!';
    }
}

//ES5
// var ages = [12, 17, 8, 21, 14, 11];

// var full = ages.map(function(cur) {
//     return cur >= 18;
// });
// console.log(full);

// console.log(full.indexOf(true));
// console.log(ages[full.indexOf(true)]);


//ES6

// findIndex method 
// const findIndex = ages.findIndex(cur => cur >= 18);
// console.log(findIndex);
// find value that is greater than 18
// const find = ages.find(cur => cur >= 18);
// console.log(find);

// spread operator - takes an array and transforms it into single values

const addFourAges = (a, b, c, d) => {
    return a + b + c + d;
}

const sum1 = addFourAges(18, 30, 12, 21);
console.log(sum1);

const ages = [18, 30, 12, 21]

const sum2 = addFourAges(...ages);
console.log(sum2);

const familySmith = ['john', 'jane', 'mark'];

const familyMiller = ['mary', 'bob', 'ann'];

const bigFamily = [...familySmith, 'lily', ...familyMiller];
console.log(bigFamily);

// can also use the spread operator on nodelist

const heading = document.querySelector('h1');
const boxes2 = document.querySelectorAll('.box');
// heading is a node not a nodelist but boxes is a nodelist
const all = [heading, ...boxes2];

// Array.from transforms it and returns an array
Array.from(all).forEach(cur => cur.style.color = 'purple');

// rest parameters

// allow us to pass arbitary number of arguments to a function and use these arguments in that function 
// rest parameters look the same as spread operators but are very different - rest parameters recieve single values and transforms them into an array when we call a function w/ multiple parameters 


//ES5
// function isFullAge5() {
        // arguments is a special variable we have access to with all functions
//     //console.log(arguments);
//     var argsArr = Array.prototype.slice.call(arguments);
    
//     argsArr.forEach(function(cur) {
//         console.log((2016 - cur) >= 18);
//     })
// }


//isFullAge5(1990, 1999, 1965);
//isFullAge5(1990, 1999, 1965, 2016, 1987);


//ES6
// when we call the function and pass in arguments, they will be transformed into an array. we can access that years array automatically in a function and use it. 
// const isFullAge = (...years) => {
//     // console.log(years);
//     years.forEach(cur => console.log((2019 - cur) >= 18));
// }

// isFullAge(1990, 2003, 1965, 2016, 1993);

const isFullAge = (limit, ...years) => {
    // console.log(years);
    years.forEach(cur => console.log((2019 - cur) >= limit));
}
// set 18 as the limit when you call the function as it's the first parameter 
isFullAge(18, 1990, 2003, 1965, 2016, 1993);

// default parameters 

const SmithPerson = function(firstName, yearOfBirth, lastName = 'smith', nationality = 'canadian') {

    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}

const john = new SmithPerson('john', 1990);
console.log(john);
const emily = new SmithPerson('emily', 1983, 'diaz', 'spanish');
console.log(emily);

// maps

const question = new Map();
// first param is key, 2nd param is value
question.set('question', 'what is the name of the latest major javascript version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'correct answer');
question.set(false, 'pls try again');

// to retrieve data use get and then put in the key you want to see the value 
// console.log(question.get('question'));
// console.log(question.size);

// to delete. question(key)
// question.delete(4);

if(question.has(4)) {
    // question.delete(4);
    // console.log('answer 4 is here')
}

// to delete everything
// question.clear();

// question.forEach((value, key) => {
//     console.log(`this is ${key}, and it's set to ${value}`);
// })

// entries returns all entries of our question map 
// we can then use destructuring to store the key and values into to separate values. destructuring using brackets [key, value]
// for (let [key, value] of question.entries()) {
//     if (typeof(key) === 'number') {
//         console.log(`Answer ${key}: ${value}`);
//     }
// }

// const ans = parseInt(prompt('write the correct answer.'));

// if user answer is equal to the value of the key we used in .get()
// const correctAnswer = question.get(ans === question.get('correct'));
// console.log(correctAnswer);

// classes 

// ES5 

// var Person5 = function(name, yearOfBirth, job) {
//     this.name = name;
//     this.yearOfBirth = yearOfBirth;
//     this.job = job;
// }

// Person5.prototype.calculateAge = function() {
//     var age = new Date().getFullYear() - this.yearOfBirth;
//     console.log(age);
// }

// var john5 = new Person5('john', 1990, 'teacher');

// console.log(john5)

// ES6 

// class declaration - all classes have to have constructor method
// class Person6 {
//     constructor(name, yearOfBirth, job) {
//         this.name = name;
//         this.yearOfBirth = yearOfBirth;
//         this.job = job;
//     }

//     calculateAge() {
//         const age = new Date().getFullYear() - this.yearOfBirth;
//         console.log(age);
//     }

//     static greeting() {
//         console.log('hey');
//     }
// }

// const john6 = new Person6('john', 1990, 'teacher');

// Person6.greeting();
// john6.calculateAge();

// console.log(john6)

// classes with subclasses 

//ES5
// var Person5 = function(name, yearOfBirth, job) {
//     this.name = name;
//     this.yearOfBirth = yearOfBirth;
//     this.job = job;
// }

// Person5.prototype.calculateAge = function() {
//     var age = new Date().getFullYear() - this.yearOfBirth;
//     console.log(age);
// }

// var Athlete5 = function(name, yearOfBirth, job, olymicGames, medals) {
//     Person5.call(this, name, yearOfBirth, job);
//     this.olymicGames = olymicGames;
//     this.medals = medals;
// }

// Athlete5.prototype = Object.create(Person5.prototype);


// Athlete5.prototype.wonMedal = function() {
//     this.medals++;
//     console.log(this.medals);
// }


// var johnAthlete5 = new Athlete5('John', 1990, 'swimmer', 3, 10);

// johnAthlete5.calculateAge();
// johnAthlete5.wonMedal();


//ES6
class Person6 {
    constructor(name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    calculateAge() {
        const age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }
}

// subclass
// need to say subclass extends the superclass 
class Athlete6 extends Person6 {
    constructor(name, yearOfBirth, job, olympicGames, medals) {
        // calling super will automatically call the superclass so we don't have to manually set any 'this' variables 
        super(name, yearOfBirth, job);
        this.olympicGames = olympicGames;
        this.medals = medals;
    }

    wonMedal() {
        this.medals++;
        console.log(this.medals);
    }
}

const johnAthlete6 = new Athlete6('john', 1990, 'swimmer', 3, 10);

johnAthlete6.calculateAge();
johnAthlete6.wonMedal();

