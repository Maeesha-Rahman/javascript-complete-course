// export const add = (a, b) => a + b;
// export const multiply = (a, b) => a * b;
// export const ID = 23;

import { elements } from './base';

// arrow function - one line suggests implicit return 
export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
}

// 'pasta with tomato and spinach'
// using the split method will split the string into an array with 5 elements [pasta, with, tomato, and, spinish];
// since we now have an array, we can use the reduce method on it (accumulator, current)
// initial value of accumulator is set to 0 and throughout the loops we add to it 

/*
// 'pasta with tomato and spinach'
acc: 0 / acc + cur.length = 0 + 5 = 5 // newTitle = ['pasta']
acc: 5 // acc + cur.length = 5 + 4 = 9 // newTitle = ['pasta', 'with']
acc: 9 // acc + cur.length = 9 + 6 = 15 // newTitle = ['pasta', 'with', 'tomato']
acc: 15 // acc + cur.length = 15 + 3 = 18 // newTitle = ['pasta', 'with', 'tomato']
acc: 18 // acc + cur.length = 18 + 7 = 25 // newTitle = ['pasta', 'with', 'tomato']
*/

const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            // return the new accumulator for the next iteration 
            return acc + cur.length;
        }, 0);

        // return the result
        // join() will join elements of an array into a string separated by spaces (opposite of split method)
        return `${newTitle.join(' ')} ...`;
    } 
    return title;
}

const renderRecipe = recipe => {
    const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = recipes => {
    // recipes.forEach(el => renderRecipe(el));
    // same as:
    recipes.forEach(renderRecipe);
};