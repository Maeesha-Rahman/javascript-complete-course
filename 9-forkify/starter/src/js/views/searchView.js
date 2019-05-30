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
    elements.searchResPages.innerHTML = '';
}

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    })
    // can't save this into base.js bc it is an element that has not yet been created on load
    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
};

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

// type: 'prev' or 'next'
// if we are on 'prev' button and we're on page num 2. 2 - 1 = 1 so we can go to page number 1. 
// if we are on a 'next' button then we should go to page num 3 if we are on page num 2. so 2 + 1 = 3. 
// ${type === 'prev' ? page - 1 : page + 1}
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
    // num of pages = 30 / 10 = 3 pages
    // add the Math.ceil method to round up the numbers incase num of pages = a decimal number like 4.5 will now be 5 pages
    const pages = Math.ceil(numResults / resPerPage);
    
    let button;
    // if on page 1 and there are more than 1 pages
    if (page === 1 && pages > 1) {
        // only button to go to next page
        button = createButton(page, 'next');
    } else if (page < pages) {
        // both buttons
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    } // if page is === to the last page (pages) and only want prev button if there are more than 1 pages
    else if (page === pages && pages > 1) {
        // only button to go to previous page
        button = createButton(page, 'prev');
    };
    
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    // render results of current page
    // on page 1 (1-1) * 10 = 0 so we start with 0
    // on page 2 (2-1) * 10 = 10 so we start with 10
    // on page 3 (3-1) * 10 = 20 so we start with 20
    const start = (page - 1) * resPerPage;
    // on page 1 (1 * 10) = ends with 10
    // on page 2 (2 * 10) = ends with 20
    // on page 3 (3 * 10) = ends with 30
    const end = page * resPerPage;
    // recipes.forEach(el => renderRecipe(el));
    // same as:
    // recipes.forEach(renderRecipe);
    recipes.slice(start, end).forEach(renderRecipe);

    // render the pagination buttons
    renderButtons(page, recipes.length, resPerPage);
};