import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = [];
    }
    // will have an array this.items that has elements that are objects which will have the count, unit, ingredient
    addItem (count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }
        // push into array
        this.items.push(item);
        return item;
    }
    // based on id, delete it from items array
    deleteItem (id) {
        // find index of element which satisfies the condition - if the element's id matches the passed in id
        const index = this.items.findIndex(el => el.id === id);
        // splice - pass in start index and then how many positions to mutate the original array
        // [2,4,8] splice(1, 1) -> returns 4, original array is now [2,8]
        // slice is different bc it accepts a start and end index and returns a new array - does not mutate original array
        // [2,4,8] slice(1, 1) -> returns nothing, original array is [2,4,8]
        // [2,4,8] slice(1, 2) -> returns 4, original array is [2,4,8]

        // start at position where item is located and take out one element 
        this.items.splice(index, 1)
    }

    updateCount(id, newCount) {
        // find() returns the element itself whereas findIndex() returns the index 
        // want to find the element that has the id that was passed in
        this.items.find(el => el.id === id).count = newCount;
    }
}