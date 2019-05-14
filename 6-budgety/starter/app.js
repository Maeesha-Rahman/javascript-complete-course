const budgetController = (function() {

    let x = 23; 

    const add = function(a) {
        return x + a;
    }
    // publicTest will always have access to x variable and add function bc they are in the closure. publictest is returned so it is not in the closure.
    return {
        publicTest: function(b) {
            console.log(add(b));
        }
    }

})();

const UIController = (function() {
    // some code
})();

