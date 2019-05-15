// budget controller
const budgetController = (function() {

    const Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    const Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    const calculateTotal = function(type) {
        let sum = 0; 
        data.allItems[type].forEach(function(current, index, array) {
            sum = sum + current.value; 
        });
        // should be equal to sum we just calculated
        data.totals[type] = sum;
    };

    const data = {
        allItems: {
            exp: [],
            inc: [],
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1,
    };

    return {
        addItem: function(type, des, val) {
            let newItem, ID;

            // ID = last ID + 1
            // create new ID
            if (data.allItems[type].length > 0) {
                // if the array has 5 items the last one should be 5 - 1 since arrays are 0 based
                // ie: data.allItems[exp][5 - 1].id + 1;
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            };

            // create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            // push it into our data structure
            data.allItems[type].push(newItem);
            // return the new element so other modules have access
            return newItem;
        },

        calculateBudget: function() {

            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // calculate the percentage of income that we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage,
            }
        },

        testing: function() {
            console.log(data);
        }
    };

    // let x = 23; 

    // const add = function(a) {
    //     return x + a;
    // }
    // // publicTest will always have access to x variable and add function bc they are in the closure. publictest is returned so it is not in the closure.
    // return {
    //     publicTest: function(b) {
    //         // this gets saved in the z variable 
    //         return add(b);
    //     }
    // }

})();

// UI controller
const UIController = (function() {

    const DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
    }
    
    // has to be public.
    return {
        getInput: function() {
            // the controller needs to recieve all of these values which is why we have to return this object 
            return {
                type: document.querySelector(DOMStrings.inputType).value, // will either be inc (+) or exp (-)
                description: document.querySelector(DOMStrings.inputDescription).value,
                // parseFloat converts the string to a number
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value),
            };
        },

        addListItem: function(obj, type) {
            // create HTML string with placeholder text

            let html, newHtml, element; 

            if (type === 'inc') {
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMStrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            // replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            // have to do it on the newHtml so that the id placeholder is the new one and not the old html 
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            // insert the HTML into the DOM 
            // beforeend ensures the newHTML will be inserted as a child of the element (income__list or expenses__list)
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: function() {
            let fields, fieldsArr;

            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);

            // set the 'this' variable into fields & this will trick the slice method into thinking it was given an array and so it will return an array 
            fieldsArr = Array.prototype.slice.call(fields);

            // loop over array and clear all the fields that were selected 

            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });

            // focus back to the first element input (in this case, inputDescription)
            fieldsArr[0].focus();
        },

        // expose DOMStrings object into public so it can be accessed by other modules 
        getDOMStrings: function() {
            return DOMStrings;
        }
    };

})();

// controller knows about the other two modules and can use their code
// global app controller
const controller = (function(budgetCtrl, UICtrl) {

    const setupEventListeners = function() {

        // can now access DOMStrings since it has been exposed to public 
        const DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        // the key press event happens in the global document
        document.addEventListener('keypress', function(event) {
            // some older browsers don't have keycode property but have which property. use both to account for all browsers. 
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };

    const updateBudget = function() {
        // 1. calculate the budget
        budgetCtrl.calculateBudget();
        // 2. return the budget
        const budget = budgetCtrl.getBudget();
        // 3. display the budget on the UI
        console.log(budget);
    }
    
    const ctrlAddItem = function() {
        let input, newItem;
        // 1. get the input data
        input = UICtrl.getInput();
        // console.log(input);

        if (input.description !== "" && input.value !== NaN && input.value > 0) {
            // 2. add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            // 3. add the item to the UI
            UICtrl.addListItem(newItem, input.type);
            // 4. clear the fields
            UICtrl.clearFields();
            // 5. calculate and update budget
            updateBudget();
        }
       
    };

    // let z = budgetCtrl.publicTest(5);

    // return {
    //     anotherPublic: function() {
    //         console.log(z);
    //     }
    // }

    return {
        init: function() {
            // console.log('start');
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();

