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

    const data = {
        allItems: {
            exp: [],
            inc: [],
        },
        totals: {
            exp: 0,
            inc: 0
        },
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
        inputBtn: '.add__btn'
    }
    
    // has to be public.
    return {
        getInput: function() {
            // the controller needs to recieve all of these values which is why we have to return this object 
            return {
                type: document.querySelector(DOMStrings.inputType).value, // will either be inc (+) or exp (-)
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value,
            };
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
    
    const ctrlAddItem = function() {
        let input, newItem;
        // 1. get the input data
        input = UICtrl.getInput();
        // console.log(input);
        // 2. add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        // 3. add the item to the UI
        // 4. calculate the budget
        // 5. display the budget on the UI
       
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

