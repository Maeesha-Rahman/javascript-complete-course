// every javascript object has a prototype property, which makes inheritance possible in javascript
// the prototype property of an object is where we put methods and properties that we want other objects to inherit
// the constructor's prototype property is NOT the prototype of the constructor itself, it's the prototype of ALL instances that are created through it
// when a certain method (or property) is called, the search starts in the object itself, and if it cannot be found, the search moves on to the object's prototype. This continues until the method is found: prototype chain. 

// function constructor 

// let john = {
//     name: 'john',
//     yearOfBirth: 1990,
//     job: 'teacher'
// };

// let Person = function(name, yearOfBirth, job) {
//     this.name = name;
//     this.yearOfBirth = yearOfBirth;
//     this.job = job;
// }

// this object here is an instance of the Person object 
// when you use the 'new' operator, a brand new EMPTY object is created. the constructor function (Person) is called with the arguments that we specified. Calling a function creates a new execution context that also has a 'this' variable. In a regular function call the 'this' key word refers to the global object which we don't want... but the 'new' operator takes care of this. It makes the 'this' variable of the function point to the empty object that was created in the beginning with the 'new' operator. So when the code runs, the this variable is not global variable, and set on the new object, which is then assigned to the variable (john).
// all objects are instances of the object object
// john object will have prototype property of the Person prototype constructor & the object prototype constructor. and that's bc the person object constructor is an instance of the object function constructor, and so you can see the whole prototype chain in the console. 
// const john = new Person('john', 1990, 'teacher');

// inheritance in practice 
// Person.prototype.calculateAge = function() {
//     console.log(2019 - this.yearOfBirth);
// }

// Person.prototype.lastName = 'Smith';

// john.calculateAge();

// const jane = new Person('jane', 1969, 'designer');
// const mark = new Person('mark', 1948, 'retired');

// jane.calculateAge();
// mark.calculateAge();

// all john, jane, mark inherit this property lastName
// console.log(john.lastName);
// console.log(jane.lastName);
// console.log(mark.lastName);



// object.create

// let personProto = {
//     calculateAge: function() {
//         console.log(2019 - this.yearOfBirth);
//     }
// }

// let john = Object.create(personProto);
// john.name = 'john';
// john.yearOfBirth = 1990;
// john.job = 'teacher';

// let jane = Object.create(personProto, {
//     name: { value: 'jane' },
//     yearOfBirth: { value: 1969 },
//     job: { value: 'designer' }
// })


// primitives vs non-primitives (objects);

// primitives 
// let a = 23;
// let b = a;
// a = 46;
// console.log(a, b);


// objects 
// let obj1 = {
//     name: 'john',
//     age: 26
// }

// no copy of a new object was created here. we created a new reference that points to the first object. obj1 and obj2 both hold reference  that points to the exact same object in memory. if you change age in obj1 that change will be reflected on obj2 bc it's the exact same object.
// let obj2 = obj1;
// obj1.age = 30;
// console.log(obj1.age)
// console.log(obj2.age)

// functions 
// let age = 27;
// let obj = {
//     name: 'jonas',
//     city: 'lisbon'
// };

// function change(a, b) {
    // when you pass a primitive into a function, a copy is created. can change 'a' as much as we want bc it never mutates the variable on the outside. 
    // a = 30;
    // when you pass an object into function, you don't pass the object but a reference that points to the object. so when you change the object inside of function, it is mutated outside of the function.
//     b.city = 'san francisco';
// }

// change(age, obj)

// console.log(age);
// console.log(obj.city);

// passing functions as arguments 

// let years = [1990, 1965, 1937, 2005, 1998];

// function arrayCalc(arr, functionArgument) {
//     let arrResult = [];
//     for (let i = 0; i < arr.length; i++) {
//         arrResult.push(functionArgument(arr[i]));
//     }
//     return arrResult;
// }

// // callback functions 
// function calculateAge(element) {
//     return 2016 - element;
// }

// function isFullAge(el) {
//     return el >= 18;
// }

// function maxHeartRate(el) {
//     if (el >= 18 && el <= 81) {
//         return Math.round(206.9 - (0.67 + el));
//     } else {
//         return -1;
//     } 
// }

// const ages = arrayCalc(years, calculateAge);
// console.log(ages);
// const fullAges = arrayCalc(ages, isFullAge);
// const rates = arrayCalc(ages, maxHeartRate);
// console.log(rates);

// functions returning functions 

// function interviewQuestion(job) {
//     if (job === 'designer') {
//         return function(name) {
//             console.log(`${name}, can you please explain what UX design is?`);
//         }
//     } else if (job === 'teacher') {
//         return function(name) {
//             console.log(`What subject do you teach, ${name}?`);
//         }
//     } else {
//         return function(name) {
//             console.log(`Hello ${name}, what do you do?`);
//         }
//     }
// }

// let teacherQuestion = interviewQuestion('teacher');
// let designerQuestion = interviewQuestion('designer');
// let otherQuestion = interviewQuestion('architect');

// teacherQuestion('john');
// designerQuestion('john');
// designerQuestion('jane');

// interviewQuestion('teacher')('Mark');

// immediately invoked function expressions (IIFE)

// function game() {
//     let score = Math.random() * 10;
//     console.log(score >= 5);
// }
// game();

//IIFE
(function () {
    let score = Math.random() * 10;
    console.log(score >= 5);
})();

// function scoped variable
// console.log(score);

(function (goodLuck) {
    let score = Math.random() * 10;
    console.log(score >= 5 - goodLuck);
})(5);

// this is a function declaration with no name so JS will throw an arror, but if you surround it in smooth brackets, it will be a function expression and JS will not throw error. Then you have to call it. 
// function () {

// }


// closures 

// function retirement(retirementAge) {
//     let a = ' years left until retirement.';
//     return function(yearOfBirth) {
//         let age = 2016 - yearOfBirth;
//         console.log((retirementAge - age) + a)
//     }
// }

// store the returned function in retirementUS variable 
// let retirementUS = retirement(66);
// call the returned function 
// retirementUS(1990);

// retirement(66)(1990);

// let retirementGermany = retirement(65);
// let retirementIceland = retirement(67);

// retirementUS(1990);
// retirementGermany(1990);
// retirementIceland(1990);

// the return function is able to use the variable retirementAge and variable 'a' that was already executed in the outer function. this is example of closure. 
// an inner function always has access to the variables and parameters of its outer function, even after the outer function has returned and the execution context is gone. This is bc the variable object is still there, it is not gone. It sits in memory and can be accessed. The scope chain always stays intact.  

// rewrite using power of closures 

// function interviewQuestion(job) {
//     return function(name) {
//         if (job === 'designer') {
//             console.log(`${name}, can you please explain what UX design is?`);
//         } else if (job === 'teacher') {
//             console.log(`What subject do you teach, ${name}?`);
//         } else {
//             console.log(`Hello ${name}, what do you do?`);
//         }
//     }
// }

// interviewQuestion('teacher')('Mark');

// bind, call, and apply 

let john = {
    name: 'john',
    age: 26,
    job: 'teacher',
    presentation: function(style, timeOfDay) {
        if (style === 'formal') {
            console.log(`Good ${timeOfDay}, ladies and gentlemen. I'm ${this.name}. I am a ${this.job} and I am ${this.age} years old.`);
        } else if (style === 'friendly') {
            console.log(`Hey! What's up? I'm ${this.name}. I am a ${this.job} and I am ${this.age} years old. Have a nice ${timeOfDay}.`);
        }
    }
}

let emily = {
    name: 'emily',
    age: 35,
    job: 'designer',
}

john.presentation('formal', 'morning');

// the first argument is the 'this' variable so 'this' will no longer be john but it will be emily. 
// call method allows us to set the 'this' variable in the first argument
john.presentation.call(emily, 'friendly', 'afternoon');

// this is how to do the apply method. in this case it won't work bc the parameters don't expect an array but this is an example. 
// john.presentation.apply(emily, ['friendly', 'afternoon']);

// bind does not immediately call the function but it generates a copy of the function so we can store it somewhere. 
let johnFriendly = john.presentation.bind(john, 'friendly');

// currying - create a function based on another function but with some preset parameter. 
johnFriendly('morning');
johnFriendly('evening');

// preset argument to formal
let emilyFormal = john.presentation.bind(emily, 'formal');
emilyFormal('afternoon');

// using bind 
let years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, functionArgument) {
    let arrResult = [];
    for (let i = 0; i < arr.length; i++) {
        arrResult.push(functionArgument(arr[i]));
    }
    return arrResult;
}

// callback functions 
function calculateAge(element) {
    return 2016 - element;
}

function isFullAge(limit, el) {
    return el >= limit;
}

let ages = arrayCalc(years, calculateAge); // returns array of ages calculated 
let fullJapan = arrayCalc(ages, isFullAge.bind(this, 20));
console.log(ages);
console.log(fullJapan);

/////////////////////////////
// CODING CHALLENGE



// --- Let's build a fun quiz game in the console! ---

// 1. Build a function constructor called Question to describe a question. A question should include:
// a) question itself
// b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
// c) correct answer (I would use a number for this)


// 7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
// (function() {
//     let Question = function(question, answers, correctAnswer) {
//         this.question = question;
//         this.answers = answers;
//         this.correctAnswer = correctAnswer;
//     }
    
//     // 2. Create a couple of questions using the constructor
    
//     let questionOne = new Question('is javascript the coolest programming language?', ['yes', 'no'], 0);
//     let questionTwo = new Question('What is the name of this course\'s teacher?',['John', 'Micheal', 'Jonas'], 2);
//     let questionThree = new Question('What best describes coding?', ['Boring', 'Hard', 'Fun', 'Tediuos'], 2);
    
//     // 3. Store them all inside an array
    
//     let questions = [questionOne, questionTwo, questionThree];
    
//     // 4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).
    
//     let randomQuestion = Math.floor(questions.length * Math.random());
    
//     // questions[randomQuestion]; // random index number
    
//     Question.prototype.displayQuestion = function() {
//         // display question
//         console.log(this.question);
//         // display possible answers
//         for (let i = 0; i < this.answers.length; i ++) {
//             console.log(i + ': ' + this.answers[i]);
//         }
//     }
    
//     questions[randomQuestion].displayQuestion();
    
//     // 5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.
//     // use parseInt to convert answer from string to a number.
//     let userAnswer = parseInt(prompt(`Choose the correct answer.`));
    
//     // 6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).
    
//     Question.prototype.checkAnswer = function() {
//         if (userAnswer === this.correctAnswer) {
//             console.log('you got it right.');
//         } else {
//             console.log('try again.');
//         }
//     }
    
//     // same thing as typing
//     // questionOne.checkAnswer();
//     // calling a method on an object
//     questions[randomQuestion].checkAnswer();
// })();

// (function() {
//     let Question = function(question, answers, correctAnswer) {
//         this.question = question;
//         this.answers = answers;
//         this.correctAnswer = correctAnswer;
//     }
    
//     // 2. Create a couple of questions using the constructor
    
//     let questionOne = new Question('is javascript the coolest programming language?', ['yes', 'no'], 0);
//     let questionTwo = new Question('What is the name of this course\'s teacher?',['John', 'Micheal', 'Jonas'], 2);
//     let questionThree = new Question('What best describes coding?', ['Boring', 'Hard', 'Fun', 'Tediuos'], 2);
    
//     // 3. Store them all inside an array
    
//     let questions = [questionOne, questionTwo, questionThree];
    
//     // 4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).
    
//     let randomQuestion = Math.floor(questions.length * Math.random());
    
//     // questions[randomQuestion]; // random index number
    
//     Question.prototype.displayQuestion = function() {
//         // display question
//         console.log(this.question);
//         // display possible answers
//         for (let i = 0; i < this.answers.length; i ++) {
//             console.log(i + ': ' + this.answers[i]);
//         }
//     }
    
//     questions[randomQuestion].displayQuestion();
    
//     // 5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.
//     // use parseInt to convert answer from string to a number.
//     let userAnswer = parseInt(prompt(`Choose the correct answer.`));
    
//     // 6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).
    
//     Question.prototype.checkAnswer = function() {
//         if (userAnswer === this.correctAnswer) {
//             console.log('you got it right.');
//         } else {
//             console.log('try again.');
//         }
//     }
    
//     // same thing as typing
//     // questionOne.checkAnswer();
//     // calling a method on an object
//     questions[randomQuestion].checkAnswer();
// })();

// --- Expert level ---

(function() {
    let Question = function(question, answers, correctAnswer) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }
    
    // 2. Create a couple of questions using the constructor
    
    let questionOne = new Question('is javascript the coolest programming language?', ['yes', 'no'], 0);
    let questionTwo = new Question('What is the name of this course\'s teacher?',['John', 'Micheal', 'Jonas'], 2);
    let questionThree = new Question('What best describes coding?', ['Boring', 'Hard', 'Fun', 'Tediuos'], 2);
    
    // 3. Store them all inside an array
    
    let questions = [questionOne, questionTwo, questionThree];
    
    // 4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).
    
    // let randomQuestion = Math.floor(questions.length * Math.random());
    
    // questions[randomQuestion]; // random index number
    
    Question.prototype.displayQuestion = function() {
        // display question
        console.log(this.question);
        // display possible answers
        for (let i = 0; i < this.answers.length; i ++) {
            console.log(i + ': ' + this.answers[i]);
        }
    }
    
    // questions[randomQuestion].displayQuestion();
    
    // 5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.
    // use parseInt to convert answer from string to a number.
    // let userAnswer = parseInt(prompt(`Choose the correct answer.`));
    
    // 6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).
    
    Question.prototype.checkAnswer = function(userAnswer, callback) {
        let userScore;
        if (userAnswer === this.correctAnswer) {
            console.log('you got it right.');
            userScore = callback(true);
        } else {
            console.log('try again.');

            userScore = callback(false);
        }

        this.displayScore(userScore);
    }


     // 11. Display the score in the console. Use yet another method for this.

     Question.prototype.displayScore = function(score) {
        console.log(`Your current score is ${score}`);
        console.log('-------------------------------');
    }
    
    // same thing as typing
    // questionOne.checkAnswer();
    // calling a method on an object
    // questions[randomQuestion].checkAnswer();

     // 10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

     function score() {
        let userScore = 0; 
        return function(correct) {
            if (correct) {
                userScore++;
            }
            return userScore;
        }
    }

    let keepScore = score();

    // 8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

    function nextQuestion() {
    
        let randomQuestion = Math.floor(questions.length * Math.random());

        questions[randomQuestion].displayQuestion();

        let userAnswer = prompt(`Choose the correct answer.`);

        // 9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

        if (userAnswer !== 'exit') {
            questions[randomQuestion].checkAnswer(parseInt(userAnswer), keepScore);
            // call this function again
            nextQuestion();
        }
    }

    nextQuestion();

})();