// budget controller (is simply an object containing methods)
const budgetController = (function() {

    const Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }   
    };

    Expense.prototype.getPercentage = function() {
        return this.percentage; 
    }

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

        deleteItem: function(type, id) {
            let ids, index;
            // id = 6
            // data.allItems[type][id];
            // ids = [1 2 4 6 8]
            // index = 3

            // solution is to create an array with all the id numbers we have
            // diff b/t map and foreach - map returns a brand new array
            // map also takes current, index, and array as arguments 
            ids = data.allItems[type].map(function(current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                // splice - first argument is position number of where we want to start deleting, 2nd argument is number of arguments we want to delete. 
                data.allItems[type].splice(index, 1);
            }
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

        calculatePercentages: function() {
            // a = 20, b = 10, c = 40, totalIncome = 100
            // a = 20 / 100 = 20%
            // b = 10 / 100 = 10%
            data.allItems.exp.forEach(function(current) {
                current.calcPercentage(data.totals.inc);
            });
        },

        getPercentages: function() {
            const allPerc = data.allItems.exp.map(function(current) {
                return current.getPercentage();
            });
            // returns array of all of the percentages
            return allPerc;
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage,
            };
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
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month',
    };

    const formatNumber = function(num, type) {
        let numSplit, int, dec;
        // + or - before number
        // exactly 2 decimal points
        // comma separating the thousands 
        
        // abs removes sign of number
        num = Math.abs(num);
        // gives a string that respects our rule with 2 decimal points 
        num = num.toFixed(2);

        numSplit = num.split('.');

        int = numSplit[0];
        // using length method on the string gives length of the string
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); // input 23510, output 23,510 (5 - 3 = 2) 
        }

        dec = numSplit[1];


        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
    };

    const nodeListForEach = function(list, callback) {
        for (let i = 0; i < list.length; i++) {
            // current = list[i] and index is i
            callback(list[i], i);
        }
    };
    
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

        // obj = newItem 
        addListItem: function(obj, type) {
            // create HTML string with placeholder text

            let html, newHtml, element; 

            if (type === 'inc') {
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMStrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            // replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            // have to do it on the newHtml so that the id placeholder is the new one and not the old html 
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
            // insert the HTML into the DOM 
            // beforeend ensures the newHTML will be inserted as a child of the element (income__list or expenses__list)
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        deleteListItem(selectorID) {
            // in javascript we can't delete an element but we can remove a child. we have to move up to parent element using parentNode and then use the removechild method. 
            const el = document.getElementById(selectorID)
            el.parentNode.removeChild(el);
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

        displayBudget: function(obj) {

            obj.budget > 0 ? type = 'inc' : type = 'exp';

            document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMStrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
            
            if (obj.percentage > 0) {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMStrings.percentageLabel).textContent = '---';
            }
        },

        displayPercentages: function(percentages) {
            const fields = document.querySelectorAll(DOMStrings.expensesPercLabel);
            // fields is a node list

            nodeListForEach(fields, function(current, index) {
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
                
            });
        },

        displayMonth: function() {
            let now, year, month, months;
            now = new Date();
            // dec is 11 bc it is 0 based 
            // const christmas = new Date(2019, 11, 25);

            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            month = now.getMonth();

            year = now.getFullYear();
            document.querySelector(DOMStrings.dateLabel).textContent = `${months[month]} ${year}`;
        },

        changedType: function() {
            const fields = document.querySelectorAll(
                `${DOMStrings.inputType}, ${DOMStrings.inputDescription}, ${DOMStrings.inputValue}`
            );

            nodeListForEach(fields, function(current) {
                current.classList.toggle('red-focus');
            });

            document.querySelector(DOMStrings.inputBtn).classList.toggle('red');
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

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
    };

    const updateBudget = function() {
        // 1. calculate the budget
        budgetCtrl.calculateBudget();
        // 2. return the budget
        const budget = budgetCtrl.getBudget();
        // 3. display the budget on the UI
        UICtrl.displayBudget(budget);
    };

    const updatePercentages = function() {
        // 1. calculate percentages
        budgetCtrl.calculatePercentages();
        // 2. read percentages from the budget controller
        const percentages = budgetCtrl.getPercentages();
        // 3. update the UI with the new percentages
        UICtrl.displayPercentages(percentages);
    }
    
    // function that is called when someone clicks button or presses enter key
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
            // 6. calculate and update percentages
            updatePercentages();
        }     
    };

    const ctrlDeleteItem = function(event) {
        // use parentNode to move up to each parent in the HTML code to get to the div element that you are interested in. id is the identifier of each item. (.id retrives the id from it)
        // console.log(event.target.parentNode.parentNode.parentNode.parentNode.id); 
        let itemID, splitID, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        // if there is an id 
        if(itemID) {
            // inc-1
            splitID = itemID.split('-');
            // returns an array ['inc', '1'];
            type = splitID[0];
            ID = parseInt(splitID[1]);

            // 1. delete the item from the data structure 
            budgetCtrl.deleteItem(type, ID);
            // 2. delete the item from the UI
            UICtrl.deleteListItem(itemID);
            // 3. update and show the new budget 
            updateBudget();
            // 4. calculate and update percentages
            updatePercentages();
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
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                    budget: 0,
                    totalInc: 0,
                    totalExp: 0,
                    percentage: -1,
            });
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();

